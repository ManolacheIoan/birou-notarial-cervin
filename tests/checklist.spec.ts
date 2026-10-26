import { expect, test } from "@playwright/test";

const sheet = (page: import("@playwright/test").Page) => page.locator(".checklist__sheet");

test("lista de acte: serviciu, situații, bifare și adresă partajabilă", async ({ page }) => {
  await page.goto("/acte-necesare/");
  await expect(sheet(page).getByRole("heading", { level: 2 })).toHaveText("Vânzare-cumpărare imobile");
  await expect(sheet(page)).not.toContainText("Certificat de căsătorie");

  await page.getByRole("checkbox", { name: "Una dintre părți este căsătorită" }).check();
  await expect(sheet(page)).toContainText("Certificat de căsătorie");
  await expect(page).toHaveURL(/serviciu=vanzare-cumparare&situatii=casatorit/);

  // Bifarea documentelor actualizează progresul
  await expect(sheet(page)).toContainText("0 din 7 documente pregătite");
  await sheet(page).getByRole("checkbox", { name: /Act de identitate/ }).check();
  await expect(sheet(page)).toContainText("1 din 7 documente pregătite");

  // Schimbarea serviciului resetează situațiile și bifele
  await page.getByRole("radio", { name: "Legalizări de semnături" }).check();
  await expect(sheet(page).getByRole("heading", { level: 2 })).toHaveText("Legalizări de semnături");
  await expect(sheet(page)).toContainText("0 din 2 documente pregătite");
  await expect(page).toHaveURL(/serviciu=legalizare-semnatura$/);
  await expect(page.getByRole("group", { name: /Bifați ce se aplică/ })).toHaveCount(0);
});

test("lista de acte: deschisă din adresă, cu situații", async ({ page }) => {
  await page.goto("/acte-necesare/?serviciu=succesiune&situatii=imobile,conturi");
  await expect(page.getByRole("radio", { name: "Succesiuni (dezbateri succesorale)" })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Moștenirea include imobile" })).toBeChecked();
  await expect(sheet(page)).toContainText("Actele de proprietate ale imobilelor");
  await expect(sheet(page)).toContainText("Extrase sau adeverințe de la bancă");
  await expect(sheet(page)).not.toContainText("Cartea de identitate și certificatul de înmatriculare");
});

test("lista de acte: serviciu invalid în adresă → serviciul implicit", async ({ page }) => {
  await page.goto("/acte-necesare/?serviciu=nu-exista");
  await expect(sheet(page).getByRole("heading", { level: 2 })).toHaveText("Vânzare-cumpărare imobile");
});

test("lista de acte: avertizarea și tipărirea", async ({ page }) => {
  await page.goto("/acte-necesare/?serviciu=procura");
  await expect(sheet(page)).toContainText("Ghid general, nu o listă definitivă");
  await page.evaluate(() => {
    (window as unknown as { printed: number }).printed = 0;
    window.print = () => {
      (window as unknown as { printed: number }).printed++;
    };
  });
  await page.getByRole("button", { name: "Tipărește lista" }).click();
  expect(await page.evaluate(() => (window as unknown as { printed: number }).printed)).toBe(1);
  // La tipărire, comenzile dispar și lista rămâne
  await page.emulateMedia({ media: "print" });
  await expect(page.getByRole("button", { name: "Tipărește lista" })).toBeHidden();
  await expect(page.getByRole("radio", { name: "Procuri" })).toBeHidden();
  await expect(sheet(page)).toBeVisible();
});

test("lista de acte: se folosește doar cu tastatura", async ({ page }) => {
  await page.goto("/acte-necesare/");
  await page.getByRole("radio", { name: "Vânzare-cumpărare imobile" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("radio", { name: "Donații" })).toBeChecked();
  await expect(sheet(page).getByRole("heading", { level: 2 })).toHaveText("Donații");
  const first = sheet(page).getByRole("checkbox").first();
  await first.focus();
  await page.keyboard.press("Space");
  await expect(first).toBeChecked();
});
