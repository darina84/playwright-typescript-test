import { type Locator, type Page } from '@playwright/test';

export class SystemUsersFilter {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly employeeNameInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[placeholder="Username"]');
    this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
  }

  async filterByUsername(username: string) {
    await this.usernameInput.fill(username);
    await this.searchButton.click();
  }

  async reset() {
    await this.resetButton.click();
  }
}
