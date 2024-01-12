import { test, expect } from "@playwright/test";

const CLIENT_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(CLIENT_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("grey@email.com");
  await page.locator("[name=password]").fill("password");

  await page.getByRole("button", { name: "Log In" }).click();

  await expect(page.getByText("User Signed In Successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow the user to register", async ({ page }) => {
  const testEmail = `test_Register_${
    Math.floor(Math.random() * 9000) + 10000
  }@test.com`;
  await page.goto(CLIENT_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create An Account" }).click();
  await expect(
    page.getByRole("heading", { name: "Create An Account" })
  ).toBeVisible();
  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_LastName@email.com");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password");
  await page.locator("[name=confirmPassword]").fill("password");
  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
