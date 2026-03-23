import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { users } from '../../fixtures/users';

test.describe('Checkout validation tests', { tag: ['@e2e'] }, () => {

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('user cannot continue checkout with empty information', async () => {
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