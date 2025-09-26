import { Page } from '@playwright/test';

export async function LancerURL(page: Page, url: string) {
  await page.goto(url);
  await page.evaluate(() => (window.performance.mark("perf:Start")));
}