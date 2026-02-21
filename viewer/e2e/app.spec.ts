import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Digital Wallet/i);
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /wallets/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /dependencies/i })).toBeVisible();
  });
});

test.describe('Wallets Page', () => {
  test('should display wallets list', async ({ page }) => {
    await page.goto('/wallets');
    await expect(page.locator('h1, h2').first()).toContainText(/wallet/i);
  });

  test('should be able to filter wallets', async ({ page }) => {
    await page.goto('/wallets');
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    // Check that wallet cards are displayed
    const walletItems = page.locator('mat-card, .wallet-item, [class*="wallet"]');
    await expect(walletItems.first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Credential Profiles Page', () => {
  test('should display credential profiles', async ({ page }) => {
    await page.goto('/credential-profiles');
    await expect(page.locator('h1, h2').first()).toContainText(/credential|profile/i);
  });
});

test.describe('Dependencies Page', () => {
  test('should display dependencies list', async ({ page }) => {
    await page.goto('/dependencies');
    await expect(page.locator('h1, h2').first()).toContainText(/dependenc/i);
  });
});

test.describe('Case Studies Page', () => {
  test('should display case studies', async ({ page }) => {
    await page.goto('/case-studies');
    await expect(page.locator('h1, h2').first()).toContainText(/case|stud/i);
  });
});
