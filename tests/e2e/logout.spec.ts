import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { users } from '../../fixtures/users';

test.describe('Logout tests', { tag: ['@e2e'] }, () => {

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('standard user can logout successfully', async ({ page }) => {
    await test.step('Verify inventory page is visible', async () => {
      await expect(page).toHaveURL(/inventory/);
    });

    await test.step('Perform logout', async () => {
      await inventoryPage.logout();
    });

    await test.step('Verify login page is displayed after logout', async () => {
      await expect(page).toHaveURL(/saucedemo\.com\/$/);
    });
  });

});