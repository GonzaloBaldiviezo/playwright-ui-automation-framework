import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { users } from '../../fixtures/users';

test.describe('Cart remove product tests', () => {

  test('standard user can remove product from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await test.step('Login as standard user', async () => {
      await loginPage.goto();
      await loginPage.login(users.standard.username, users.standard.password);
    });

    await test.step('Add products to cart', async () => {
      await inventoryPage.addBackpackToCart();
      await inventoryPage.addBikeLightToCart();
    });

    await test.step('Open cart', async () => {
      await inventoryPage.openCart();
      await expect(cartPage.cartItems).toHaveCount(2);
    });

    await test.step('Remove one product from cart', async () => {
      await cartPage.removeBackpack();
    });

    await test.step('Verify cart has one remaining item', async () => {
      await expect(cartPage.cartItems).toHaveCount(1);
    });

  });

});