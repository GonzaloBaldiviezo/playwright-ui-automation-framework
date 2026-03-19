import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { users } from '../../fixtures/users';

test.describe('Product sorting tests', () => {

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('products should be sorted by price low to high', async () => {
    await test.step('Sort products by price low to high', async () => {
      await inventoryPage.sortBy('lohi');
    });

    await test.step('Capture product prices', async () => {
      const pricesText = await inventoryPage.itemPrices.allTextContents();
      const prices = pricesText.map(p => Number(p.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sortedPrices);
    });
  });

  test('products should be sorted by price high to low', async () => {
    await test.step('Sort products by price high to low', async () => {
      await inventoryPage.sortBy('hilo');
    });

    await test.step('Capture product prices', async () => {
      const pricesText = await inventoryPage.itemPrices.allTextContents();
      const prices = pricesText.map(p => Number(p.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sortedPrices);
    });
  });

});