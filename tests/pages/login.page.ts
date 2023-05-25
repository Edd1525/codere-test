import { expect, Locator, Page, chromium } from "@playwright/test";

export class Login {
  readonly page: Page;
  readonly accessButton: Locator;
  readonly userNameField: Locator;
  readonly passwordField: Locator;
  readonly submitButton: Locator;
  readonly agreeCookiesButton: Locator;
  readonly userNameLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accessButton = page.getByRole("button", { name: "Acceder" });
    this.agreeCookiesButton = page.getByRole("button", { name: "ACEPTAR" });
    this.userNameField = page.getByRole("textbox", { name: "Usuario / Correo electrónico" });
    this.passwordField = page.getByLabel("Contraseña");
    this.submitButton = page.locator("login-page").getByRole("button", { name: "Acceder" });
    this.userNameLabel = page.getByRole("button", { name: "testcaes22" });
  }

  async acceptAllCookies() {
    await this.agreeCookiesButton.click();
  }

  async gotoLogin() {
    await this.page.goto("/login");
  }

  async isVisibleErrorLabel() {
    try {
      return await this.page.getByRole("heading", { name: "Error de inicio de sesión" }).isVisible({ timeout: 10000 });
    } catch (error) {
      console.error("An error occurred while checking the visibility of the error label:", error);
      return false;
    }
  }

  async fillLoginForm(username: string, password: string) {
    try {
      await this.accessButton.click();
      await this.userNameField.type(username);
      await this.passwordField.type(password);
      await this.submitButton.click();
    } catch (error) {
      console.error("An error occurred while filling the login form:", error);
    }
  }
}
