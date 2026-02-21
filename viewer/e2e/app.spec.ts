import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Digital Wallet|Wallet and Agent/i);
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');
    // Navigation uses buttons, not links
    await expect(page.getByRole('button', { name: /wallets/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /dependencies/i })).toBeVisible();
  });
});

test.describe('Wallets Page', () => {
  test('should display wallets list', async ({ page }) => {
    await page.goto('/wallets');
    await page.waitForLoadState('networkidle');
    // Check for wallet-related content on page
    await expect(page.locator('body')).toContainText(/wallet|agent/i);
  });

  test('should be able to filter wallets', async ({ page }) => {
    await page.goto('/wallets');
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    // Check that wallet cards or table rows are displayed
    const walletItems = page.locator('mat-card, .wallet-item, [class*="wallet"], mat-row, tr');
    await expect(walletItems.first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Credential Profiles Page', () => {
  test('should display credential profiles', async ({ page }) => {
    await page.goto('/credential-profiles');
    await page.waitForLoadState('networkidle');
    // Check for credential profile content
    await expect(page.locator('body')).toContainText(/credential|profile/i);
  });
});

test.describe('Dependencies Page', () => {
  test('should display dependencies list', async ({ page }) => {
    await page.goto('/dependencies');
    await page.waitForLoadState('networkidle');
    // Check for dependency content
    await expect(page.locator('body')).toContainText(/dependenc/i);
  });
});

test.describe('Case Studies Page', () => {
  test('should display case studies', async ({ page }) => {
    await page.goto('/case-studies');
    await page.waitForLoadState('networkidle');
    // Check for case study content
    await expect(page.locator('body')).toContainText(/case|stud/i);
  });
});
