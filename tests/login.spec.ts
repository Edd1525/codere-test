import { test, expect, type Page } from "@playwright/test";
import { Login } from "./pages/login.page";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Login", () => {
  const userName = "testcaes22";
  const password = "Vale2015";
  const wrongPassword = "wrongPassword123";
  const wrongUserName = "wrongUserName";

  test("should allow login to the Codere application", async ({ page }) => {
    const login = new Login(page);
    await login.acceptAllCookies();

    await login.fillLoginForm(userName, password);
    await page.waitForLoadState("domcontentloaded");

    await expect(login.userNameLabel).toBeVisible();
  });

  test("should restrict login with incorrect Password to the Codere application", async ({ page }) => {
    const login = new Login(page);
    await login.acceptAllCookies();

    await login.fillLoginForm(userName, wrongPassword);
    await page.waitForLoadState("domcontentloaded");

    await expect(login.isVisibleErrorLabel()).toBeTruthy();
    await expect(login.userNameLabel).toBeHidden();
  });

  test("Should restrict login with incorrect User Name to the Codere application", async ({ page }) => {
    const login = new Login(page);
    await login.acceptAllCookies();

    await login.fillLoginForm(wrongUserName, password);
    await page.waitForLoadState("domcontentloaded");

    await expect(login.isVisibleErrorLabel()).toBeTruthy();
    await expect(login.userNameLabel).toBeHidden();
  });

  test.skip('Should be able to close session', async ({ page }) => {
  });

  test.skip("Should block the account after many failed login attempts", async ({ page }) => {
  });
});
