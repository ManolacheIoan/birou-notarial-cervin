import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

export const pages = [
  "/",
  "/servicii/",
  "/acte-necesare/",
  "/onorarii/",
  "/procedura/",
  "/echipa/",
  "/programari/",
  "/intrebari-frecvente/",
  "/contact/",
  "/confidentialitate/",
  "/termeni/",
];

/** Luni, 2 noiembrie 2026, 10:00 ora României: aceleași zile valide la fiecare rulare. */
export const FIXED_NOW = new Date("2026-11-02T10:00:00+02:00");

export async function audit(page: Page) {
  const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  return r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
}
