import type { Page } from '@playwright/test';
import { BasePage } from './base-page';
import { LoginPage } from './login';
import { AdminPage } from './admin';

export class AppPage extends BasePage {
  readonly loginPage: LoginPage;
  readonly adminPage: AdminPage;

  constructor(page: Page) {
    super(page);
    this.loginPage = new LoginPage(page);
    this.adminPage = new AdminPage(page);
  }

  async openLoginPage() {
    await this.loginPage.goto();
    await this.loginPage.expectLoginPage();
    return this.loginPage;
  }

  async loginAsAdmin() {
    await this.openLoginPage();
    await this.loginPage.loginAsAdmin();
    await this.waitForUrl(/.*\/dashboard\/index$/);
    return this.adminPage;
  }
}
