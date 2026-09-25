/**
 * Headless smoke test for the LearnSQL UI.
 *
 * Usage: node scripts/smoke.mjs [baseURL]
 */

import { chromium } from 'playwright';

const base = process.argv[2] || 'http://127.0.0.1:4174/';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (err) => errors.push(String(err)));
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text());
});

await page.goto(base, { waitUntil: 'networkidle' });
await page.waitForSelector('.brand', { timeout: 10000 });
const brand = await page.textContent('.brand');
const title = await page.title();

// Sandbox should have schema tables after boot
await page.waitForSelector('.table-card', { timeout: 15000 });
const tables = await page.$$eval('.table-card h3', (nodes) =>
  nodes.map((n) => n.childNodes[0]?.textContent?.trim() || n.textContent || ''),
);

// Run a query from the editor
await page.fill('.sql-editor', "SELECT name, city FROM customers WHERE city = 'London';");
await page.click('button.primary');
await page.waitForSelector('.data-grid td', { timeout: 10000 });
const rows = await page.$$eval('.data-grid tbody tr', (trs) =>
  trs.map((tr) => tr.textContent || ''),
);

// Meta command: help
await page.fill('.console-input', 'help');
await page.press('.console-input', 'Enter');
await page.waitForTimeout(200);
const logText = await page.textContent('.console-log');

// Open levels and pick first challenge
await page.click('text=Levels');
await page.waitForSelector('.modal');
await page.click('.level-item');
await page.waitForTimeout(500);
const dialogVisible = await page.$('.modal');

await page.screenshot({ path: 'output/playwright/learn-sql-smoke.png', fullPage: true });

console.log(
  JSON.stringify(
    {
      title,
      brand: brand?.replace(/\s+/g, ''),
      tables,
      rows,
      helpLogged: (logText || '').includes('Commands'),
      dialogVisible: !!dialogVisible,
      errors,
    },
    null,
    2,
  ),
);

await browser.close();
if (errors.length > 0) process.exitCode = 1;
