import { Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  await page.locator('xpath=//*[contains(@id,"username-")]').fill(username);
  await page.locator('xpath=//*[@id="password"]').fill(password);
  await page.locator('xpath=//span[text()="Valider"]').click();
}