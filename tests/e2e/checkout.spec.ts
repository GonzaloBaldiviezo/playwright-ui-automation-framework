import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { users } from '../../fixtures/users';

test.describe('Checkout flow', { tag: ['@e2e'] }, () => {

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login as standard user
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    // Add product to cart and proceed to checkout
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();
    await cartPage.checkout();
  });

  test('standard user can complete a purchase', async () => {
    await test.step('Fill checkout info and complete purchase', async () => {
      await checkoutPage.completeCheckout('John', 'Doe', '12345');
    });

    await test.step('Finish checkout', async () => {
      await checkoutPage.finishCheckout();
    });

    await test.step('Verify order completion', async () => {
      await expect(checkoutPage.confirmationMessage).toBeVisible();
    });
  });

});