let page = global.__HOMEPAGE__ ;
let frame;

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

test("New Customer: Step1 Success", async() => {
   await frame.waitForSelector("#P11_CUSTOMER_OPTIONS_0");
   await frame.focus("#P11_CUSTOMER_OPTIONS_0");
   await page.keyboard.press('ArrowUp');
   await page.keyboard.press('ArrowUp');
   await page.keyboard.press('Tab');
   await frame.waitForSelector("#P11_CUST_FIRST_NAME");
   await frame.type("#P11_CUST_FIRST_NAME","Remesha");
   await frame.type("#P11_CUST_LAST_NAME","Yvan Florian(Auto)");  
   await frame.type("#P11_CREDIT_LIMIT","3645.768");
   await frame.type("#P11_CUST_STREET_ADDRESS1","Gao er fu xihuayuan");
   await frame.type("#P11_CUST_STREET_ADDRESS2","Jianing");
   await frame.type("#P11_CUST_CITY","Nanjing");
   await frame.focus("#P11_CUST_STATE","Remesha");
   await page.keyboard.press('ArrowDown');
   await page.keyboard.press('ArrowDown');
   await page.keyboard.press('ArrowDown');
   await page.keyboard.press('ArrowDown');
   await page.keyboard.press('ArrowDown');
   await page.keyboard.press('ArrowDown');
   await page.keyboard.press('Enter'); 
   await page.keyboard.press('Tab');
   await page.keyboard.press('Tab');
   await frame.type("#P11_CUST_POSTAL_CODE","0000");
   await frame.type("#P11_CUST_EMAIL","yvanflorian@mydomain.com");
   await frame.type("#P11_PHONE_NUMBER1","123-456-7890");
   await frame.type("#P11_PHONE_NUMBER2","666-456-7890");
   await frame.type("#P11_URL","https://www.yvanflorian.wordpress.com");
   await frame.type("#P11_TAGS","#puppeteer #jest");
   await frame.click("#jest_next_step1");
   await frame.waitForNavigation();
   let frameUrlStep2 = await frame.url();
   expect(frameUrlStep2).toContain("placeorder_orderitems");
});