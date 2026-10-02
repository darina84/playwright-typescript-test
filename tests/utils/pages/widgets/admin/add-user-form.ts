import { type Locator, type Page } from '@playwright/test';

export class AddUserForm {
  readonly page: Page;
  readonly userRoleDropdown: Locator;
  readonly employeeNameInput: Locator;
  readonly usernameInput: Locator;
  readonly statusDropdown: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userRoleDropdown = page.locator('.oxd-select-wrapper').nth(0);
    this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]');
    this.usernameInput = page.locator('input[placeholder="Username"]');
    this.statusDropdown = page.locator('.oxd-select-wrapper').nth(1);
    this.passwordInput = page.locator('input[autocomplete="new-password"]').nth(0);
    this.confirmPasswordInput = page.locator('input[autocomplete="new-password"]').nth(1);
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async fillForm({
    username,
    employeeName,
    password,
    role = 'Admin',
    status = 'Enabled',
  }: {
    username: string;
    employeeName: string;
    password: string;
    role?: string;
    status?: string;
  }) {
    await this.userRoleDropdown.click();
    await this.page.getByRole('option', { name: role }).click();

    await this.employeeNameInput.fill(employeeName);
    await this.usernameInput.fill(username);

    await this.statusDropdown.click();
    await this.page.getByRole('option', { name: status }).click();

    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async save() {
    await this.saveButton.click();
  }
}
