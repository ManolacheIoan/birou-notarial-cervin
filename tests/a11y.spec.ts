import { expect, test } from "@playwright/test";
import { audit, FIXED_NOW, pages } from "./helpers";

for (const path of [...pages, "/nu-exista/"]) {
  test(`axe: ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
    await page.waitForTimeout(1200); // aparițiile la derulare se încheie
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(3200); // animația ștampilei se încheie
    expect(await audit(page)).toEqual([]);
  });
}

test("axe: formularul cu erori și starea de rezultat", async ({ page }) => {
  await page.clock.setFixedTime(FIXED_NOW);
  await page.goto("/programari/");
  await page.getByRole("button", { name: "Trimite cererea" }).click();
  expect(await audit(page)).toEqual([]);
  await page.getByLabel("Nume și prenume").fill("Ana Pop");
  await page.getByLabel("Telefon").fill("0722123456");
  await page.getByLabel("Serviciu").selectOption("testament");
  await page.getByLabel("Ziua preferată").fill("2026-11-05");
  await page.getByRole("checkbox", { name: /Sunt de acord/ }).check();
  await page.getByRole("button", { name: "Trimite cererea" }).click();
  await expect(page.getByRole("heading", { name: /nu a fost trimisă/ })).toBeVisible();
  expect(await audit(page)).toEqual([]);
});

test("axe: estimator cu eroare și listă de acte cu situații", async ({ page }) => {
  await page.goto("/onorarii/");
  await page.getByLabel("Valoarea din contract (lei)").fill("abc");
  expect(await audit(page)).toEqual([]);
  await page.goto("/acte-necesare/?serviciu=vanzare-cumparare&situatii=casatorit,credit");
  expect(await audit(page)).toEqual([]);
});

test("axe: meniul deschis pe telefon", async ({ page, isMobile }) => {
  test.skip(!isMobile, "doar pe telefon");
  await page.goto("/");
  await page.getByRole("button", { name: "Meniu" }).click();
  expect(await audit(page)).toEqual([]);
});
