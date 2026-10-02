import { type Locator, type Page } from '@playwright/test';

export class AddEmployeeForm {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly createLoginDetailsToggle: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('input.oxd-input').nth(3);
    this.createLoginDetailsToggle = page.locator('.oxd-switch-input');
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[type="password"]').nth(0);
    this.confirmPasswordInput = page.locator('input[type="password"]').nth(1);
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async fillForm({
    firstName,
    lastName,
    employeeId,
    username,
    password,
    middleName = '',
    createLoginDetails = false,
  }: {
    firstName: string;
    lastName: string;
    employeeId?: string;
    username?: string;
    password?: string;
    middleName?: string;
    createLoginDetails?: boolean;
  }) {
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);

    if (employeeId) {
      await this.employeeIdInput.fill(employeeId);
    }

    if (createLoginDetails && username && password) {
      await this.createLoginDetailsToggle.click();
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.confirmPasswordInput.fill(password);
    }
  }

  async save() {
    await this.saveButton.click();
  }
}
