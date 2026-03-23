import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { users } from '../../fixtures/users';

test.describe('Complete purchase flow', { tag: ['@e2e'] }, () => {

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

  test('standard user can complete a purchase successfully', async () => {
    await test.step('Add products to cart', async () => {
      await inventoryPage.addBackpackToCart();
      await inventoryPage.addBikeLightToCart();
    });

    await test.step('Open cart and verify products', async () => {
      await inventoryPage.openCart();
      await expect(cartPage.cartItems).toHaveCount(2);
    });

    await test.step('Proceed to checkout', async () => {
      await cartPage.checkout();
    });

    await test.step('Fill checkout information', async () => {
      await checkoutPage.completeCheckout(
        'John',
        'Doe',
        '12345'
      );
    });

    await test.step('Finish purchase', async () => {
      await checkoutPage.finishCheckout();
    });

    await test.step('Verify order confirmation', async () => {
      await expect(checkoutPage.completeHeader).toHaveText(
        'Thank you for your order!'
      );
    });
  });

});