import { expect, test, type Page } from "@playwright/test";
import { FIXED_NOW } from "./helpers";

async function open(page: Page, query = "") {
  await page.clock.setFixedTime(FIXED_NOW);
  await page.goto(`/programari/${query}`);
}

async function fillValid(page: Page) {
  await page.getByLabel("Nume și prenume").fill("Ana Pop");
  await page.getByLabel("Telefon").fill("0722 123 456");
  await page.getByLabel("Serviciu").selectOption("procura");
  await page.getByLabel("Ziua preferată").fill("2026-11-04");
  await page.getByRole("checkbox", { name: /Sunt de acord/ }).check();
}

test("programare: trimiterea goală arată rezumatul erorilor și mută focusul", async ({ page }) => {
  await open(page);
  await page.getByRole("button", { name: "Trimite cererea" }).click();
  const summary = page.locator(".error-summary");
  await expect(summary).toBeFocused();
  await expect(summary.getByRole("link")).toHaveCount(5);
  await expect(page.getByLabel("Nume și prenume")).toHaveAttribute("aria-invalid", "true");
  // Linkul din rezumat duce la câmp
  await summary.getByRole("link", { name: /numele/ }).click();
  await expect(page.getByLabel("Nume și prenume")).toBeFocused();
  // Erorile dispar pe măsură ce se corectează
  await page.getByLabel("Nume și prenume").fill("Ana Pop");
  await expect(summary.getByRole("link")).toHaveCount(4);
});

test("programare: validări de telefon, e-mail și zi", async ({ page }) => {
  await open(page);
  await fillValid(page);
  await page.getByLabel("Telefon").fill("12345");
  await page.getByLabel(/E-mail/).fill("ana@");
  await page.getByLabel("Ziua preferată").fill("2026-11-08"); // duminică
  await page.getByRole("button", { name: "Trimite cererea" }).click();
  await expect(page.getByText("Numărul nu pare valid", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("Adresa de e-mail nu pare validă.").first()).toBeVisible();
  await expect(page.getByText("Duminica biroul este închis", { exact: false }).first()).toBeVisible();
  await page.getByLabel("Ziua preferată").fill("2026-11-01"); // ieri
  await expect(page.getByText("Alegeți o zi de azi încolo.").first()).toBeVisible();
});

test("programare: în demo nu se trimite nimic, iar rezultatul spune asta deschis", async ({ page }) => {
  const posts: string[] = [];
  // Next face cereri HEAD de preîncărcare pe același domeniu; datele s-ar trimite prin POST/PUT.
  page.on("request", (r) => ["POST", "PUT", "PATCH"].includes(r.method()) && posts.push(r.url()));
  await open(page, "?serviciu=procura");
  await expect(page.getByLabel("Serviciu")).toHaveValue("procura");
  await fillValid(page);
  await page.getByRole("button", { name: "Trimite cererea" }).click();
  const heading = page.getByRole("heading", { name: "Cererea este pregătită, dar nu a fost trimisă" });
  await expect(heading).toBeFocused();
  await expect(page.getByText("datele dumneavoastră nu au ajuns la noi", { exact: false })).toBeVisible();
  await expect(page.locator(".form-result__summary")).toContainText("miercuri, 4 noiembrie");
  await expect(page.getByRole("link", { name: /^Sună la/ })).toHaveAttribute("href", /^tel:\+40/);
  const mail = await page.getByRole("link", { name: "Trimite e-mailul pregătit" }).getAttribute("href");
  expect(decodeURIComponent(mail!)).toContain("Nume: Ana Pop");
  expect(posts).toEqual([]);

  await page.getByRole("button", { name: "Completează din nou" }).click();
  await expect(page.getByLabel("Nume și prenume")).toHaveValue("");
});

test("programare: serviciile doar informative nu apar în listă", async ({ page }) => {
  await open(page, "?serviciu=traduceri-legalizate");
  await expect(page.getByLabel("Serviciu")).toHaveValue("");
  await expect(page.getByLabel("Serviciu").locator("option", { hasText: "Traduceri legalizate" })).toHaveCount(0);
});
