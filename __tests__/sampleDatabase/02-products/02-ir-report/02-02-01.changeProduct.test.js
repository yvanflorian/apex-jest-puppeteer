let page = global.__HOMEPAGE__ ;
let frame;

test ("Opening the Page:BreadCrumb Label should be 'products' ", async() =>{
   await page.goto(global.__HOMEPAGEURL__.replace("home","products"));
   // await page.screenshot({fullPage: true,path:"products.png"});
   const pageTitle = await page.$eval(".t-Breadcrumb-label",el => el.textContent);
   expect(pageTitle).toBe("Products");
});
test("Test Filtering the IR on the Name and opening the modal", async() => {
   await page.click("th#IRRproductsName");
   await page.waitForSelector("#productsIRR_sort_widget_search_field");
   await page.type("#productsIRR_sort_widget_search_field","Wallet");
   await page.keyboard.press('Enter');
   await page.waitForSelector("a#IRR_PRODUCT_NAME_ELEMENT");
   await page.focus("a#IRR_PRODUCT_NAME_ELEMENT");
   await page.keyboard.press('Enter');
   await page.waitForSelector("iframe");
   const elementHandle = await page.$('iframe');
   frame = await elementHandle.contentFrame();
   let title = await frame.title();
   let frameUrl = await frame.url();
   expect(frameUrl).toContain("f_productdetails");
});

test("Changing the Product Name: Append few Characters ", async() => {
   await frame.click("#P6_PRODUCT_NAME");
   await frame.type("#P6_PRODUCT_NAME","(Auto Change)");
   await frame.click("#jest_apply_change");
   let redirectURL = await page.mainFrame().url();
   expect(redirectURL).toContain("products");
});