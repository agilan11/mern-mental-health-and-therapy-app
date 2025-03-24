import { test, expect } from "@playwright/test";
import path from "path";

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


test("should allow user to add a clinic", async ({ page }) => {
    await page.goto(`${UI_URL}add-clinic`);
  
    await page.locator('[name="name"]').fill("Test Clinic");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page
      .locator('[name="description"]')
      .fill("This is a description for the Test Hotel");
    await page.locator('[name="pricePerSession"]').fill("100");
    await page.selectOption('select[name="starRating"]', "3");
  
    await page.locator('text=Couples Therapy').click();
    await page.locator('text=Anxiety Disorders').click();
    await page.locator('text=Parking').click();
    

  
    await page.setInputFiles('[name="imageFiles"]', [
      path.join(__dirname, "files", "1.png"),
    ]);
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Clinic Saved!")).toBeVisible();
  });
  
  test("should display hotels", async ({ page }) => {
    await page.goto(`${UI_URL}my-clinics`);
  
    await expect(page.getByText("LA Wellness Center")).toBeVisible();
    await expect(page.getByText("LA Wellness Center offers expert mental health counseling")).toBeVisible();
    await expect(page.getByText("Los Angeles, USA")).toBeVisible();
    await expect(page.getByText("Couples Therapy")).toBeVisible();
    await expect(page.getByText("$1000 per session")).toBeVisible();
    await expect(page.getByText("1 Star Rating")).toBeVisible();
  
    await expect(
      page.getByRole("link", { name: "View Details" }).first()
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Clinic" })).toBeVisible();
  });
