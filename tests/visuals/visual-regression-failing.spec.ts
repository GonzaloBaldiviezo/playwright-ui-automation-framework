import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { users } from '../../fixtures/users';

test.describe.skip('Visual regression failure demo (intentional)', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('intentional failure to show screenshot diff report', async ({ page }) => {
    // This test is designed to fail by comparing against a deliberately wrong baseline.

    await expect(page).toHaveScreenshot('failing-snapshot.png', {
      animations: 'disabled',
    });
  });
});
