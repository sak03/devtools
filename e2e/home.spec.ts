import { expect, test } from "@playwright/test";

test("home shows catalog", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "everyday utility",
  );
  await expect(page.getByRole("link", { name: /JSON Formatter/i })).toBeVisible();
});

test("json tool formats", async ({ page }) => {
  await page.goto("/tools/json");
  await expect(
    page.getByRole("heading", { name: /JSON Formatter/i }),
  ).toBeVisible();
  const input = page.locator("textarea").first();
  await input.fill('{"hello":"world"}');
  await page.getByRole("button", { name: "Format" }).click();
  const output = page.locator("textarea").nth(1);
  await expect(output).toContainText('"hello"');
  await expect(output).toContainText('"world"');
});

test("theme toggle switches class", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const group = page.getByRole("group", { name: "Color theme" });
  await expect(group).toBeVisible();

  await group.getByRole("button", { name: "Light theme" }).click();
  await expect
    .poll(async () => page.evaluate(() => document.documentElement.className))
    .toMatch(/light/);
  await expect(html).not.toHaveClass(/dark/);

  await group.getByRole("button", { name: "Dark theme" }).click();
  await expect
    .poll(async () => page.evaluate(() => document.documentElement.className))
    .toMatch(/dark/);
});
