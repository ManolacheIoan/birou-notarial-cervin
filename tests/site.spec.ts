import { expect, test } from "@playwright/test";
import { BUSINESS_NAME } from "../config/site";
import { FIXED_NOW, pages } from "./helpers";

test("nicio cerere externă: toate paginile, lista de acte, estimatorul și formularul", async ({ page, baseURL }) => {
  const external: string[] = [];
  page.on("request", (r) => {
    const url = r.url();
    if (!url.startsWith(baseURL!) && !url.startsWith("data:") && !url.startsWith("blob:")) external.push(url);
  });
  for (const path of [...pages, "/pagina-inexistenta/"]) {
    await page.goto(path);
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
    await page.waitForLoadState("networkidle");
  }
  await page.goto("/acte-necesare/");
  await page.getByRole("radio", { name: "Donații" }).check();
  await page.goto("/onorarii/");
  await page.getByLabel("Valoarea din contract (lei)").fill("120000");
  await page.clock.setFixedTime(FIXED_NOW);
  await page.goto("/programari/");
  await page.getByLabel("Nume și prenume").fill("Ana Pop");
  await page.getByLabel("Telefon").fill("0722123456");
  await page.getByLabel("Serviciu").selectOption("procura");
  await page.getByLabel("Ziua preferată").fill("2026-11-04");
  await page.getByRole("checkbox", { name: /Sunt de acord/ }).check();
  await page.getByRole("button", { name: "Trimite cererea" }).click();
  await expect(page.getByRole("heading", { name: /nu a fost trimisă/ })).toBeVisible();
  await page.waitForLoadState("networkidle");
  expect(external).toEqual([]);
});

test("toate paginile: titlu, un singur h1, noindex, limba română, fără erori în consolă", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  for (const path of pages) {
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(200);
    await expect(page.locator("h1"), path).toHaveCount(1);
    await expect(page).toHaveTitle(new RegExp(BUSINESS_NAME));
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ro");
  }
  expect(errors).toEqual([]);
});

test("fără deplasare de layout pe pagina de start", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(3500); // animația ștampilei se încheie
  const cls = await page.evaluate(
    () =>
      new Promise<number>((resolve) => {
        let total = 0;
        new PerformanceObserver((list) => {
          for (const e of list.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) {
            if (!e.hadRecentInput) total += e.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
        setTimeout(() => resolve(total), 300);
      }),
  );
  expect(cls).toBeLessThan(0.02);
});

test("pagina 404 are status 404 și legături utile", async ({ page }) => {
  const res = await page.goto("/nu-exista/");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("nu figurează în registru");
  await expect(page.getByRole("link", { name: "Înapoi la prima pagină" })).toBeVisible();
});

test("tastatura: „Sari la conținut” duce la conținut", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Sari la conținut" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#continut$/);
});

test("telefon: bara „Sună / Programează-te” și meniul cu tastatura", async ({ page, isMobile }) => {
  test.skip(!isMobile, "doar pe telefon");
  await page.goto("/");
  const bar = page.locator(".callbar");
  await expect(bar.getByRole("link", { name: "Sună" })).toHaveAttribute("href", /^tel:\+40/);
  await expect(bar.getByRole("link", { name: "Programează-te" })).toHaveAttribute("href", "/programari/");

  const toggle = page.getByRole("button", { name: "Meniu" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Echipa" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("desktop: bara de jos e ascunsă, meniul principal e vizibil", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "doar pe desktop");
  await page.goto("/");
  await expect(page.locator(".callbar")).toBeHidden();
  await expect(page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Onorarii" })).toBeVisible();
  await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Onorarii" }).click();
  await expect(page).toHaveURL(/\/onorarii\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Cât costă, orientativ");
});

test("mișcare redusă: ștampila e deja ridicată și amprenta e vizibilă", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  const impression = page.locator(".stamp-scene__impression");
  await expect.poll(async () => Number(await impression.evaluate((el) => getComputedStyle(el).opacity))).toBeGreaterThan(0.8);
  const anim = await page.locator(".stamp-scene__stamp").evaluate((el) => getComputedStyle(el).animationName);
  expect(anim).toBe("none");
  await ctx.close();
});

test("întrebări frecvente: acordeon cu tastatura", async ({ page }) => {
  await page.goto("/intrebari-frecvente/");
  const q = page.getByRole("button", { name: "Ce acte trebuie să aduc?" });
  await expect(q).toHaveAttribute("aria-expanded", "false");
  await q.focus();
  await page.keyboard.press("Enter");
  await expect(q).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("region", { name: "Ce acte trebuie să aduc?" })).toContainText("Acte necesare");
  await page.keyboard.press("Space");
  await expect(q).toHaveAttribute("aria-expanded", "false");
});
