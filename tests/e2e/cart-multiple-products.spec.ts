import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { users } from '../../fixtures/users';

test.describe('Cart multiple products tests', () => {

  test('standard user can add multiple products to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await test.step('Login as standard user', async () => {
      await loginPage.goto();
      await loginPage.login(users.standard.username, users.standard.password);
    });

    await test.step('Add backpack to cart', async () => {
      await inventoryPage.addBackpackToCart();
    });

    await test.step('Add bike light to cart', async () => {
      await inventoryPage.addBikeLightToCart();
    });

    await test.step('Open cart and verify items', async () => {
      await inventoryPage.openCart();
      await expect(cartPage.cartItems).toHaveCount(2);
    });
  });

});