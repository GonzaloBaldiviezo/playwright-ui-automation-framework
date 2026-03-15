import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { users } from '../../fixtures/users';

test.describe('Checkout validation tests', () => {

  test('user cannot continue checkout with empty information', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('Login as standard user', async () => {
      await loginPage.goto();
      await loginPage.login(users.standard.username, users.standard.password);
    });

    await test.step('Add product to cart', async () => {
      await inventoryPage.addBackpackToCart();
    });

    await test.step('Open cart and proceed to checkout', async () => {
      await inventoryPage.openCart();
      await cartPage.checkout();
    });

    await test.step('Attempt to continue checkout with empty form', async () => {
      await checkoutPage.continueCheckout();
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(checkoutPage.errorMessage).toBeVisible();
    });

  });

});