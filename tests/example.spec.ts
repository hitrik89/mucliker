import { test, expect } from '@playwright/test';

test('Abuse MU', async ({ page }) => {
  await login();

  for(let i = 0; i < 5; i++)
  {
    await buy();
    await page.reload();  
    await sell();
    await page.reload();  
    await page.waitForTimeout(5000);
  }
  page.close();
  
  async function login() {
    await page.goto('https://abyssmu.eu/');

    // Click the get started link.
    await page.getByText("Account Login").first().click();

    await page.getByPlaceholder("Username").fill("");
    await page.getByPlaceholder("Password").fill("");
    await page.getByRole('button', { name: 'Login' }).first().click();
  }
  async function buy() {
    await page.getByText("User Panel").first().click();
  
    await page.getByText("Webshop").first().click();
  
    await page.getByText("[KITS]").first().click();
  
    await page.getByText("Dark Phoenix Kit").first().click();
  
    await page.getByText("Buy Kit For 5000 WCoinC").first().click();
  
    await page.getByText("Item has been added in your warehouse");
    await page.waitForTimeout(1000);
  }
  
  async function sell() {
    await page.waitForTimeout(1000);
    await page.getByText("User Panel").first().click();
    await page.waitForTimeout(1000);
    await page.getByText("Warehouse").first().click();
    await page.waitForTimeout(1000);
    let items = await page.$$(".grid-item > img");
    while (items.length > 0) {
      await page.locator(".grid-item > img").first().click();
      await page.waitForTimeout(1000);

      var item = await page.getByRole('button', { name: 'Return Item' }).first();
      item.click();
      await page.mouse.move(0, 100);
      //  await page.getByText("Return Item").first().click();
      await page.locator(".mvc-buttons-style-success").first().click();

      await page.getByText("Success:Item cost has been returned.");
      await page.waitForTimeout(1000);
      items = await page.$$(".grid-item > img");
    }
  }

});


