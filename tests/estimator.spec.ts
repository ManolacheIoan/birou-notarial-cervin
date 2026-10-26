import { expect, test } from "@playwright/test";

const total = (page: import("@playwright/test").Page) => page.locator(".estimator__total strong");
const row = (page: import("@playwright/test").Page, name: RegExp) =>
  page.locator(".estimate tr").filter({ has: page.getByRole("rowheader", { name }) }).locator("td");

test("estimator: valoarea implicită și defalcarea", async ({ page }) => {
  await page.goto("/onorarii/");
  await expect(total(page)).toHaveText("9.182,80 lei");
  await expect(row(page, /^Onorariu notarial/)).toHaveText("4.180,00 lei");
  await expect(row(page, /^TVA/)).toHaveText("877,80 lei");
  await expect(row(page, /^Subtotal cumpărător/)).toHaveText("5.682,80 lei");
  await expect(row(page, /^Subtotal vânzător/)).toHaveText("3.500,00 lei");
  await expect(page.getByText("Cifrele sunt orientative și nu reprezintă o ofertă")).toBeVisible();
});

test("estimator: formate românești, minim, limite de treaptă și deținere scurtă", async ({ page }) => {
  await page.goto("/onorarii/");
  const input = page.getByLabel("Valoarea din contract (lei)");

  await input.fill("1.000");
  await expect(row(page, /^Onorariu notarial/)).toHaveText("230,00 lei");
  await expect(row(page, /^Înscriere în cartea funciară/)).toHaveText("60,00 lei");

  await input.fill("20 000");
  await expect(row(page, /^Onorariu notarial/)).toHaveText("440,00 lei");

  await input.fill("100.000,50");
  await expect(row(page, /^Onorariu notarial/)).toHaveText("1.730,01 lei");

  await input.fill("350000");
  await page.getByRole("checkbox", { name: /mai puțin de 3 ani/ }).check();
  await expect(row(page, /^Impozit/)).toHaveText("10.500,00 lei");
});

test("estimator: valori invalide afișează un mesaj, fără total", async ({ page }) => {
  await page.goto("/onorarii/");
  const input = page.getByLabel("Valoarea din contract (lei)");
  for (const [value, msg] of [
    ["abc", /Introduceți valoarea/],
    ["0", /mai mare decât zero/],
    ["60.000.000", /contactați direct/],
  ] as const) {
    await input.fill(value);
    await expect(page.locator(".field__error")).toHaveText(msg);
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(total(page)).toHaveCount(0);
  }
  await input.fill("");
  await expect(page.getByText("Introduceți valoarea pentru a vedea estimarea.")).toBeVisible();
});
