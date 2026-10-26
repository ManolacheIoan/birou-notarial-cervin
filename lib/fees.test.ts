import { describe, expect, it } from "vitest";
import { saleFeeConfig } from "@/data/fees";
import { estimateSale, formatLei, formatPercent, notaryFeeBani, parseAmount } from "@/lib/fees";

const fee = (lei: number) => notaryFeeBani(Math.round(lei * 100)) / 100;
const line = (value: number, id: string, shortHold = false) => {
  const e = estimateSale(value, { shortHold });
  if (!e.ok) throw new Error(e.message);
  return e.lines.find((l) => l.id === id)!.amount;
};

describe("parseAmount", () => {
  it.each([
    ["250000", 250000],
    ["250.000", 250000],
    ["250 000", 250000],
    ["1.250.000", 1250000],
    ["250.000,50", 250000.5],
    ["1250,5", 1250.5],
    ["99.99", 99.99],
    ["250.00", 250],
    [" 300 000 lei ", 300000],
    ["0", 0],
  ])("%s → %s", (input, expected) => {
    expect(parseAmount(input)).toBe(expected);
  });

  it.each(["", "   ", "abc", "-100", "12,345,678", "1.2.3", "1,234", "1e6", "12,"])(
    "„%s” nu este o sumă",
    (input) => expect(parseAmount(input)).toBeNull(),
  );
});

describe("treptele de onorariu sunt continue", () => {
  it("la fiecare limită, cele două formule dau aceeași valoare", () => {
    const b = saleFeeConfig.brackets;
    for (let i = 1; i < b.length; i++) {
      const prev = b[i - 1];
      const end = prev.fixed + ((prev.upTo! - prev.from) * prev.ratePercent) / 100;
      expect(end, `limita ${b[i].from}`).toBeCloseTo(b[i].fixed, 2);
      expect(prev.upTo).toBe(b[i].from);
    }
    expect(b[0].from).toBe(0);
    expect(b.at(-1)!.upTo).toBeNull();
  });
});

describe("onorariul notarial", () => {
  it("se aplică minimul pentru valori mici", () => {
    expect(fee(0.01)).toBe(230);
    expect(fee(1_000)).toBe(230);
    // 2,2% din 10.454,54 = 229,99999 → minimul; peste 10.454,55 → procent
    expect(fee(10_454.54)).toBe(230);
    expect(fee(10_500)).toBe(231);
  });

  it("valorile de la limita treptelor", () => {
    expect(fee(20_000)).toBe(440);
    expect(fee(20_000.01)).toBe(440);
    expect(fee(35_000)).toBe(725);
    expect(fee(100_000)).toBe(1_730);
    expect(fee(200_000)).toBe(2_830);
    expect(fee(600_000)).toBe(6_430);
    expect(fee(1_000_000)).toBe(8_830);
  });

  it("rotunjire la ban, jumătate în sus", () => {
    // 20.000,25 → 440 + 1,9% × 0,25 = 440,00475 → 440,00
    expect(fee(20_000.25)).toBe(440);
    // 100.000,50 → 1.730 + 1,1% × 0,50 = 1.730,0055 → 1.730,01
    expect(fee(100_000.5)).toBe(1_730.01);
  });
});

describe("estimateSale", () => {
  it("valori invalide", () => {
    expect(estimateSale(null)).toMatchObject({ ok: false, reason: "invalid" });
    expect(estimateSale(Number.NaN)).toMatchObject({ ok: false, reason: "invalid" });
    expect(estimateSale(0)).toMatchObject({ ok: false, reason: "too-small" });
    expect(estimateSale(-5)).toMatchObject({ ok: false, reason: "too-small" });
    expect(estimateSale(0.004)).toMatchObject({ ok: false, reason: "too-small" });
    expect(estimateSale(Infinity)).toMatchObject({ ok: false, reason: "too-large" });
    expect(estimateSale(saleFeeConfig.maxValue + 1)).toMatchObject({ ok: false, reason: "too-large" });
    expect(estimateSale(saleFeeConfig.maxValue).ok).toBe(true);
  });

  it("exemplu complet: 350.000 lei, deținut de mult timp", () => {
    const e = estimateSale(350_000);
    if (!e.ok) throw new Error();
    const byId = Object.fromEntries(e.lines.map((l) => [l.id, l.amount]));
    expect(byId.onorariu).toBe(4_180); // 2.830 + 0,9% × 150.000
    expect(byId.tva).toBe(877.8); // 21% × 4.180
    expect(byId["carte-funciara"]).toBe(525); // 0,15% × 350.000
    expect(byId["impozit-transfer"]).toBe(3_500); // 1%
    expect(e.buyerTotal).toBe(4_180 + 877.8 + 525 + 40 + 60);
    expect(e.sellerTotal).toBe(3_500);
    expect(e.total).toBeCloseTo(e.buyerTotal + e.sellerTotal, 2);
  });

  it("deținere scurtă: impozitul crește", () => {
    expect(line(350_000, "impozit-transfer", true)).toBe(10_500);
  });

  it("taxa de carte funciară are un minim", () => {
    expect(line(10_000, "carte-funciara")).toBe(60);
    expect(line(40_000, "carte-funciara")).toBe(60);
    expect(line(40_001, "carte-funciara")).toBe(60);
    expect(line(50_000, "carte-funciara")).toBe(75);
  });

  it("TVA rotunjită la ban", () => {
    // 10.500,50 → onorariu 231,01 → TVA 48,5121 → 48,51
    expect(line(10_500.5, "onorariu")).toBe(231.01);
    expect(line(10_500.5, "tva")).toBe(48.51);
  });

  it("totalurile sunt exacte la ban (fără erori de virgulă mobilă)", () => {
    for (const v of [0.01, 1, 999.99, 12_345.67, 99_999.99, 1_234_567.89, saleFeeConfig.maxValue]) {
      const e = estimateSale(v);
      if (!e.ok) throw new Error(String(v));
      for (const n of [e.total, e.buyerTotal, e.sellerTotal, ...e.lines.map((l) => l.amount)]) {
        expect(Math.round(n * 100) / 100, String(v)).toBe(n);
      }
    }
  });

  it("valoarea se rotunjește la ban înainte de calcul", () => {
    const e = estimateSale(100_000.004);
    expect(e.ok && e.value).toBe(100_000);
  });
});

describe("formatare", () => {
  it("lei cu separatori românești", () => {
    expect(formatLei(0)).toBe("0,00 lei");
    expect(formatLei(1234.5)).toBe("1.234,50 lei");
    expect(formatLei(1_000_000, 0)).toBe("1.000.000 lei");
    expect(formatLei(-12.3)).toBe("−12,30 lei");
  });
  it("procente", () => {
    expect(formatPercent(0.15)).toBe("0,15%");
    expect(formatPercent(21)).toBe("21%");
  });
});
