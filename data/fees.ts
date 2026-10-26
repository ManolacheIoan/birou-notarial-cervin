/**
 * Onorarii și taxe ORIENTATIVE, cu valori FICTIVE (proiect demonstrativ).
 * Calculul efectiv se face în lib/fees.ts; aici sunt doar regulile, ușor de editat.
 */
import type { ServiceSlug } from "@/data/services";

export type FeeRow = {
  slug: ServiceSlug;
  label: string;
  /** Text afișat, ex. „de la 180 lei”. */
  fee: string;
  note?: string;
};

export const feeTable: FeeRow[] = [
  { slug: "vanzare-cumparare", label: "Contract de vânzare-cumpărare imobil", fee: "procent din valoare", note: "vezi estimatorul de mai jos" },
  { slug: "donatie", label: "Contract de donație imobil", fee: "procent din valoare", note: "similar vânzării, cu grilă proprie" },
  { slug: "ipoteca", label: "Contract de ipotecă", fee: "de la 450 lei", note: "în funcție de valoarea creditului" },
  { slug: "succesiune", label: "Dezbatere succesorală", fee: "de la 600 lei", note: "în funcție de masa succesorală" },
  { slug: "testament", label: "Testament autentic", fee: "de la 250 lei" },
  { slug: "procura", label: "Procură", fee: "de la 120 lei", note: "procură generală sau specială" },
  { slug: "declaratie", label: "Declarație autentică", fee: "de la 80 lei" },
  { slug: "legalizare-semnatura", label: "Legalizare de semnătură", fee: "de la 40 lei", note: "pe semnătură" },
  { slug: "contract-auto", label: "Contract auto autentic", fee: "de la 180 lei" },
  { slug: "redactare-acte", label: "Redactare act", fee: "de la 200 lei", note: "în funcție de complexitate" },
  { slug: "traduceri-legalizate", label: "Legalizarea semnăturii traducătorului", fee: "de la 40 lei", note: "pe document; traducerea se plătește separat" },
];

/** Fiecare treaptă: onorariu = fix + procent × (valoare − de la). Toate sumele în lei. */
export type FeeBracket = { from: number; upTo: number | null; fixed: number; ratePercent: number };

export type SaleFeeConfig = {
  brackets: FeeBracket[];
  minimumFee: number;
  vatPercent: number;
  /** Taxa de înscriere în cartea funciară, procent din valoare. */
  landRegistryPercent: number;
  landRegistryMinimum: number;
  /** Impozitul datorat de vânzător, procent din valoare, în funcție de perioada deținerii. */
  transferTax: { shortHoldPercent: number; longHoldPercent: number; thresholdYears: number };
  /** Costuri fixe adăugate la fiecare dosar. */
  fixedCosts: { label: string; amount: number }[];
  /** Valoarea maximă acceptată de estimator. */
  maxValue: number;
};

export const saleFeeConfig: SaleFeeConfig = {
  brackets: [
    { from: 0, upTo: 20_000, fixed: 0, ratePercent: 2.2 },
    { from: 20_000, upTo: 35_000, fixed: 440, ratePercent: 1.9 },
    { from: 35_000, upTo: 65_000, fixed: 725, ratePercent: 1.6 },
    { from: 65_000, upTo: 100_000, fixed: 1_205, ratePercent: 1.5 },
    { from: 100_000, upTo: 200_000, fixed: 1_730, ratePercent: 1.1 },
    { from: 200_000, upTo: 600_000, fixed: 2_830, ratePercent: 0.9 },
    { from: 600_000, upTo: null, fixed: 6_430, ratePercent: 0.6 },
  ],
  minimumFee: 230,
  vatPercent: 21,
  landRegistryPercent: 0.15,
  landRegistryMinimum: 60,
  transferTax: { shortHoldPercent: 3, longHoldPercent: 1, thresholdYears: 3 },
  fixedCosts: [
    { label: "Extras de carte funciară pentru autentificare", amount: 40 },
    { label: "Arhivare, copii și exemplare suplimentare", amount: 60 },
  ],
  maxValue: 50_000_000,
};
