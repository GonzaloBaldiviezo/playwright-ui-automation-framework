import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { users } from '../../fixtures/users';

test.describe('Checkout flow', () => {

  test('standard user can complete a purchase', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('Login as standard user', async () => {
      await loginPage.goto();
      await loginPage.login(users.standard.username, users.standard.password);
    });

    await test.step('Add backpack to cart', async () => {
      await inventoryPage.addBackpackToCart();
      await inventoryPage.openCart();
    });

    await test.step('Proceed to checkout', async () => {
      await cartPage.checkout();
    });

    await test.step('Fill checkout info and complete purchase', async () => {
      await checkoutPage.completeCheckout('John', 'Doe', '12345');
    });

    await test.step('Verify order completion', async () => {
      await expect(checkoutPage.confirmationMessage).toBeVisible();
    });

  });

});