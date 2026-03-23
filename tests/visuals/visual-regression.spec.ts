import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { users } from '../../fixtures/users';

test.describe('Visual regression snapshots', { tag: ['@visual-regression'] }, () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('inventory page matches baseline', async ({ page }) => {
    await expect(inventoryPage.backpackAddButton).toBeVisible();

    await expect(page).toHaveScreenshot('inventory-page.png', {
      animations: 'disabled',
      maxDiffPixels: 12000,
    });
  });

  test('checkout confirmation matches baseline', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();
    await cartPage.checkout();

    await checkoutPage.completeCheckout('John', 'Doe', '12345');
    await checkoutPage.finishCheckout();

    await expect(checkoutPage.confirmationMessage).toBeVisible();
    await expect(page).toHaveScreenshot('checkout-confirmation.png', {
      animations: 'disabled',
      maxDiffPixels: 12000,
    });
  });
});
