import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { users } from '../../fixtures/users';

test.describe('Logout tests', () => {

  test('standard user can logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await test.step('Login as standard user', async () => {
      await loginPage.goto();
      await loginPage.login(users.standard.username, users.standard.password);
    });

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