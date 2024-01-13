import { test, expect } from "@playwright/test";
import path from "path";

const CLIENT_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(`${CLIENT_URL}/`);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("grey@email.com");
  await page.locator("[name=password]").fill("password");
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page.getByText("User Signed In Successfully")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${CLIENT_URL}/add-hotel`);
  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("Test Hotel with New Deescription");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Business").click();
  await page.getByLabel("Parking").check();
  await page.getByLabel("Spa").check();
  await page.locator('[name="adultCount"]').fill("1");
  await page.locator('[name="childCount"]').fill("1");
  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "download-23.jpg"),
    path.join(__dirname, "files", "download-31.jpg"),
  ]);
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved")).toBeVisible();
});
