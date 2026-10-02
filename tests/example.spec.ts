import { test, expect } from '@playwright/test';
import { AppPage } from './utils/pages/app';
import { PIMPage } from './utils/pages/pim';

test('open OrangeHRM login page and login as admin', async ({ page }) => {
  const app = new AppPage(page);

  await app.openLoginPage();
  await app.loginAsAdmin();

  await expect(page).toHaveURL(/.*\/dashboard\/index$/);
});

test('create, filter, and delete an employee by employee ID', async ({ page }) => {
  const app = new AppPage(page);
  const pim = new PIMPage(page);
  const employeeId = Number(Date.now().toString().slice(-6));

  await app.loginAsAdmin();
  await pim.open();
  await pim.expectPimPage();

  await pim.clickAddEmployee();
  await pim.createEmployee('Automation', 'User', String(employeeId));

  await expect(page).toHaveURL(/.*\/pim\/viewPersonalDetails\/\d+$/);

  await pim.open();
  await pim.filterEmployeesByEmployeeId(employeeId);
  await pim.deleteEmployeeAndAssertDeletion('Successfully Deleted');
});
