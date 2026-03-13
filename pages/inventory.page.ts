import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly backpackAddButton: Locator;
  readonly shoppingCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backpackAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
  }

  async addBackpackToCart() {
    await this.backpackAddButton.click();
  }

  async openCart() {
    await this.shoppingCart.click();
  }
}