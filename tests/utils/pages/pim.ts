import { expect, type Locator, type Page } from '@playwright/test';

export class PIMPage {
  readonly page: Page;
  readonly pimMenu: Locator;
  readonly employeeListHeader: Locator;
  readonly addEmployeeButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;
  readonly employeeIdFilterInput: Locator;
  readonly employeeNameFilterInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenu = page.getByRole('link', { name: 'PIM' });
    this.employeeListHeader = page.getByRole('heading', { name: 'Employee Information' });
    this.addEmployeeButton = page.getByRole('button', { name: 'Add' });
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Employee Id', { exact: true }) })
      .locator('input');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.employeeIdFilterInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Employee Id', { exact: true }) })
      .locator('input');
    this.employeeNameFilterInput = page.locator('input[placeholder="Type for hints..."]').nth(0);
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async open() {
    await this.pimMenu.click();
    await this.employeeListHeader.waitFor({ state: 'visible' });
  }

  async clickAddEmployee() {
    await this.addEmployeeButton.click();
  }

  async createEmployee(firstName: string, lastName: string, employeeId?: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    if (employeeId) {
      await this.employeeIdInput.fill(employeeId);
    }

    await this.saveButton.click();
    await expect(this.page.getByText('Successfully Saved', { exact: true })).toBeVisible();
  }

  async filterEmployeesByEmployeeId(employeeId: number | string) {
    await this.employeeIdFilterInput.fill(String(employeeId));
    await this.searchButton.click();
    const employeeRow = this.page
      .locator('.oxd-table-card')
      .filter({ has: this.page.getByText(String(employeeId), { exact: true }) });
    await expect(employeeRow).toHaveCount(1);
  }

  async deleteEmployeeAndAssertDeletion(employeeId: number | string, successMessage = 'Successfully Deleted') {
    const employeeRow = this.page.locator('.oxd-table-card').filter({ hasText: String(employeeId) });

    await expect(employeeRow).toBeVisible();
    await employeeRow.getByRole('checkbox').check({ force: true });
    await this.deleteButton.click();
    await this.confirmDeleteButton.click();

    await expect(this.page.getByText(successMessage)).toBeVisible();
    await expect(employeeRow).toHaveCount(0);
  }

  async expectPimPage() {
    await expect(this.employeeListHeader).toBeVisible();
    await expect(this.addEmployeeButton).toBeVisible();
  }
}
