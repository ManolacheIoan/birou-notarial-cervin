/**
 * Estimator ORIENTATIV pentru un contract de vânzare-cumpărare, după regulile
 * fictive din data/fees.ts. Calculele se fac în bani (întregi), ca să evităm
 * erorile de rotunjire ale numerelor zecimale; fiecare rând se rotunjește
 * „jumătate în sus” la ban, iar totalurile sunt sume de rânduri deja rotunjite.
 */
import { saleFeeConfig, type SaleFeeConfig } from "@/data/fees";

export type Payer = "cumparator" | "vanzator";

export type FeeLine = { id: string; label: string; amount: number; payer: Payer; note?: string };

export type Estimate =
  | { ok: false; reason: "empty" | "invalid" | "too-small" | "too-large"; message: string }
  | {
      ok: true;
      value: number;
      lines: FeeLine[];
      buyerTotal: number;
      sellerTotal: number;
      total: number;
    };

const toBani = (lei: number) => Math.round(lei * 100);
const toLei = (bani: number) => bani / 100;
/** Procent → puncte de bază întregi (2,2% → 220). */
const bps = (percent: number) => Math.round(percent * 100);
/** Procent dintr-o sumă în bani, rotunjit la ban (jumătate în sus; sumele sunt pozitive). */
const pct = (bani: number, percent: number) => Math.round((bani * bps(percent)) / 10_000);

/**
 * Citește o sumă scrisă „românește”: 250000, 250.000, 250 000, 250.000,50, 1250,5.
 * Întoarce `null` dacă textul nu este o sumă validă.
 */
export function parseAmount(input: string): number | null {
  const s = input.replace(/[\s ]/g, "").replace(/(lei|ron)$/i, "");
  if (!s) return null;
  let normalized: string;
  if (s.includes(",")) {
    // Virgula = zecimale, punctele = separatori de mii.
    if (!/^\d{1,3}(\.\d{3})*,\d{1,2}$|^\d+,\d{1,2}$/.test(s)) return null;
    normalized = s.replace(/\./g, "").replace(",", ".");
  } else if (/^\d{1,3}(\.\d{3})+$/.test(s)) {
    normalized = s.replace(/\./g, "");
  } else if (/^\d+(\.\d{1,2})?$/.test(s)) {
    normalized = s;
  } else {
    return null;
  }
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

/** Onorariul notarial (fără TVA), în bani, după treapta în care cade valoarea. */
export function notaryFeeBani(valueBani: number, config: SaleFeeConfig = saleFeeConfig): number {
  const bracket =
    config.brackets.find((b) => b.upTo === null || valueBani <= toBani(b.upTo)) ??
    config.brackets[config.brackets.length - 1];
  const fee = toBani(bracket.fixed) + pct(valueBani - toBani(bracket.from), bracket.ratePercent);
  return Math.max(fee, toBani(config.minimumFee));
}

export function estimateSale(
  value: number | null,
  options: { shortHold?: boolean } = {},
  config: SaleFeeConfig = saleFeeConfig,
): Estimate {
  if (value === null || Number.isNaN(value)) {
    return { ok: false, reason: "invalid", message: "Introduceți valoarea în lei, de exemplu 350.000." };
  }
  if (!Number.isFinite(value) || value > config.maxValue) {
    return {
      ok: false,
      reason: "too-large",
      message: `Pentru valori de peste ${formatLei(config.maxValue, 0)} vă rugăm să ne contactați direct.`,
    };
  }
  const valueBani = toBani(value);
  if (valueBani <= 0) {
    return { ok: false, reason: "too-small", message: "Valoarea trebuie să fie mai mare decât zero." };
  }

  const fee = notaryFeeBani(valueBani, config);
  const vat = pct(fee, config.vatPercent);
  const registry = Math.max(pct(valueBani, config.landRegistryPercent), toBani(config.landRegistryMinimum));
  const t = config.transferTax;
  const transferPercent = options.shortHold ? t.shortHoldPercent : t.longHoldPercent;
  const transfer = pct(valueBani, transferPercent);

  const lines: FeeLine[] = [
    { id: "onorariu", label: "Onorariu notarial", amount: toLei(fee), payer: "cumparator" },
    { id: "tva", label: `TVA la onorariu (${formatPercent(config.vatPercent)})`, amount: toLei(vat), payer: "cumparator" },
    {
      id: "carte-funciara",
      label: `Înscriere în cartea funciară (${formatPercent(config.landRegistryPercent)})`,
      amount: toLei(registry),
      payer: "cumparator",
    },
    ...config.fixedCosts.map((c, i) => ({
      id: `fix-${i}`,
      label: c.label,
      amount: toLei(toBani(c.amount)),
      payer: "cumparator" as const,
    })),
    {
      id: "impozit-transfer",
      label: `Impozit la transferul proprietății (${formatPercent(transferPercent)})`,
      amount: toLei(transfer),
      payer: "vanzator",
      note: options.shortHold
        ? `imobil deținut de mai puțin de ${t.thresholdYears} ani`
        : `imobil deținut de cel puțin ${t.thresholdYears} ani`,
    },
  ];

  const sum = (payer?: Payer) =>
    lines.filter((l) => !payer || l.payer === payer).reduce((acc, l) => acc + toBani(l.amount), 0);
  return {
    ok: true,
    value: toLei(valueBani),
    lines,
    buyerTotal: toLei(sum("cumparator")),
    sellerTotal: toLei(sum("vanzator")),
    total: toLei(sum()),
  };
}

/** 1234.5 → „1.234,50 lei” (separatori românești, independent de browser). */
export function formatLei(amount: number, decimals = 2): string {
  const fixed = Math.abs(amount).toFixed(decimals);
  const [int, dec] = fixed.split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${amount < 0 ? "−" : ""}${grouped}${dec ? `,${dec}` : ""} lei`;
}

export function formatPercent(p: number): string {
  return `${String(p).replace(".", ",")}%`;
}
