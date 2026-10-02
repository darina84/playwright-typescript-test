import { expect, type Locator, type Page } from '@playwright/test';

export class AdminPage {
  readonly page: Page;
  readonly adminMenu: Locator;
  readonly userManagementMenu: Locator;
  readonly usersTab: Locator;
  readonly addUserButton: Locator;
  readonly systemUsersHeader: Locator;
  readonly usernameInput: Locator;
  readonly employeeNameInput: Locator;
  readonly roleDropdown: Locator;
  readonly statusDropdown: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminMenu = page.getByRole('link', { name: 'Admin' });
    this.userManagementMenu = page.getByRole('menuitem', { name: 'User Management' });
    this.usersTab = page.getByRole('link', { name: 'Users' });
    this.addUserButton = page.getByRole('button', { name: 'Add' });
    this.systemUsersHeader = page.getByRole('heading', { name: 'System Users' });
    this.usernameInput = page.locator('input[placeholder="Username"]');
    this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]');
    this.roleDropdown = page.locator('.oxd-select-wrapper').nth(0);
    this.statusDropdown = page.locator('.oxd-select-wrapper').nth(1);
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async open() {
    await this.adminMenu.click();
    await this.systemUsersHeader.waitFor({ state: 'visible' });
  }

  async goToUsers() {
    await this.adminMenu.click();
    await this.usersTab.click();
    await this.systemUsersHeader.waitFor({ state: 'visible' });
  }

  async clickAddUser() {
    await this.addUserButton.click();
  }

  async searchUser(username: string) {
    await this.usernameInput.fill(username);
    await this.searchButton.click();
  }

  async expectAdminPage() {
    await expect(this.systemUsersHeader).toBeVisible();
    await expect(this.addUserButton).toBeVisible();
  }
}
