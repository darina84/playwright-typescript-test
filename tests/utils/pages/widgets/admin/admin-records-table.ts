import { type Locator, type Page } from '@playwright/test';

export class AdminRecordsTable {
  readonly page: Page;
  readonly rows: Locator;
  readonly checkboxes: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rows = page.locator('.oxd-table-card');
    this.checkboxes = page.locator('input[type="checkbox"]');
    this.deleteButton = page.getByRole('button', { name: 'Delete Selected' });
  }

  async selectRowByUsername(username: string) {
    const row = this.rows.filter({ hasText: username });
    await row.locator('input[type="checkbox"]').check();
  }

  async deleteSelected() {
    await this.deleteButton.click();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
  }
}
