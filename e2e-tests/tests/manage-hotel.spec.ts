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

test("should display user hotels", async ({ page }) => {
  await page.goto(`${CLIENT_URL}/my-hotels`);
  await expect(page.getByText("hot hotel")).toBeVisible();
  await expect(page.getByText("Hot Holidays with Sunsets")).toBeVisible();
  await expect(page.getByText("hot city, Chille")).toBeVisible();
  await expect(page.getByText("Romantic")).toBeVisible();
  await expect(page.getByText("£ 2 per Night")).toBeVisible();
  await expect(page.getByText("4 Star Rating")).toBeVisible();
  await expect(page.getByText("2 adult(s), 3 child(s)")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${CLIENT_URL}/my-hotels`);
  await page.getByRole("link", { name: "View Details" }).first().click();
  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("hot hotel update");
  await page.locator('[name="name"]').fill("hot hotel new update");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Updated")).toBeVisible();
  await page.reload();
  await expect(page.locator('[name="name"]')).toHaveValue(
    "hot hotel new update"
  );
  await page.locator('[name="name"]').fill("hot hotel update");
  await page.getByRole("button", { name: "Save" }).click();
});
