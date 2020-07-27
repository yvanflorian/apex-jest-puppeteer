let page = global.__HOMEPAGE__ ;

test("Re-direct to the Orders Page", async() => {
   let orders = global.__HOMEPAGEURL__.replace("home","orders");
   await page.goto(orders);
   let pageTitle = await page.$eval(".t-Breadcrumb-label",el => el.textContent);
   expect(pageTitle).toBe("Orders");
});


test("Opening Place Orders Dialog Page: Page Alias check", async() => {
   await page.click("#ENTER_NEW_ORDER");
   await page.waitForSelector("iframe");
   const elementHandle = await page.$('iframe');
   frame = await elementHandle.contentFrame();
   await frame.waitForNavigation();
   let frameUrl = frame.url();
   expect(frameUrl).toContain("placeorder_identifycustomer");
});