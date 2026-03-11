import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { users } from '../../fixtures/users';

test.describe('Login tests', () => {

  test('standard user can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory/);
  });

  test('locked out user cannot login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.locked.username, users.locked.password);

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('login fails with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');

    await expect(loginPage.errorMessage).toBeVisible();
  });

});