import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("agilan1@gmail.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Enter max price").fill("99");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("1 clinics found")).toBeVisible();
  await expect(page.getByText("batra")).toBeVisible();
});


test("should show clinic detail", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Enter max price").fill("99");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Batra").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});
