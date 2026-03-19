import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly backpackAddButton: Locator;
  readonly shoppingCart: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly bikeLightAddButton: Locator;
  readonly sortDropdown: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backpackAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.bikeLightAddButton = page.locator('#add-to-cart-sauce-labs-bike-light');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemPrices = page.locator('.inventory_item_price');
  }

  async addBackpackToCart() {
    await this.backpackAddButton.click();
  }

  async openCart() {
    await this.shoppingCart.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async addBikeLightToCart() {
    await this.bikeLightAddButton.click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }
}