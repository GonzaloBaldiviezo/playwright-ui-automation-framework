import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { users } from '../../fixtures/users';

test.describe('Cart remove product tests', { tag: ['@e2e'] }, () => {

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('standard user can remove product from cart', async () => {
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