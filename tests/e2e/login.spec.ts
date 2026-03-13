import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { users } from '../../fixtures/users';

test.describe('Login tests', () => {

  test('standard user can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open login page', async () => {
      await loginPage.goto();
    });

    await test.step('Login with standard user', async () => {
      await loginPage.login(users.standard.username, users.standard.password);
    });

    await test.step('Verify successful login', async () => {
      await expect(page).toHaveURL(/inventory/);
    });
  });

  test('locked out user cannot login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open login page', async () => {
      await loginPage.goto();
    });

    await test.step('Attempt login with locked user', async () => {
      await loginPage.login(users.locked.username, users.locked.password);
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
    });
  });

  test('login fails with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open login page', async () => {
      await loginPage.goto();
    });

    await test.step('Login with invalid credentials', async () => {
      await loginPage.login('invalid_user', 'wrong_password');
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
    });
  });

});