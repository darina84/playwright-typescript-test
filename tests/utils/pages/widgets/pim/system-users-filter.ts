import { type Locator, type Page } from '@playwright/test';

export class PIMSystemUsersFilter {
  readonly page: Page;
  readonly employeeNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]');
    this.employeeIdInput = page.locator('input[placeholder="Type for hints..."]').nth(1);
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
  }

  async filterByEmployeeId(employeeId: number | string) {
    await this.employeeIdInput.fill(String(employeeId));
    await this.searchButton.click();
  }

  async filterByEmployeeName(employeeName: string) {
    await this.employeeNameInput.fill(employeeName);
    await this.searchButton.click();
  }

  async reset() {
    await this.resetButton.click();
  }
}
