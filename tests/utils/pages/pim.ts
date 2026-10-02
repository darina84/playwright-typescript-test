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
  readonly searchEmployeeInput: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly employeeRecordsTable: Locator;
  readonly employeeIdFilterInput: Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly noRecordsFoundText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenu = page.getByRole('link', { name: 'PIM' });
    this.employeeListHeader = page.getByRole('heading', { name: 'Employee Information' });
    this.addEmployeeButton = page.getByRole('button', { name: 'Add' });
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('input[class*="oxd-input"]').nth(2);
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.searchEmployeeInput = page.locator('input[placeholder="Type for hints..."]');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.employeeRecordsTable = page.locator('.oxd-table');
    this.employeeIdFilterInput = page.locator('input[placeholder="Type for hints..."]').nth(0);
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
    this.noRecordsFoundText = page.getByText('No Records Found');
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
  }

  async searchEmployee(name: string) {
    await this.searchEmployeeInput.fill(name);
    await this.searchButton.click();
  }

  async filterEmployeesByEmployeeId(employeeId: number) {
    await this.employeeIdFilterInput.fill(String(employeeId));
    await this.searchButton.click();
  }

  async deleteEmployeeAndAssertDeletion(test: string) {
    await this.page.getByRole('checkbox').nth(0).check();
    await this.deleteButton.click();
    await this.confirmDeleteButton.click();

    await expect(this.page.getByText(test)).toBeVisible();
    await expect(this.noRecordsFoundText).toBeVisible();
  }

  async expectPimPage() {
    await expect(this.employeeListHeader).toBeVisible();
    await expect(this.addEmployeeButton).toBeVisible();
  }
}
