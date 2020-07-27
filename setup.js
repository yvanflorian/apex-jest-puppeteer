const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const os = require('os');
const chalk = require('chalk');
const globalVals = {
      _loginURL : "http://localhost:8085/ords/ui_demos/r/sampledatabase/login_desktop",
      _testUser : "test_user",
      _testPassword : "test_user_password",
   }

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function () {
   console.log();
   console.log(chalk.black.bgBlue(' Setting up our Environment... '))
   //uncomment below options to actually open up the browser
   const browser = await puppeteer.launch(
      // {
      //   headless:false,
      //   slowMo: 8,
      //   defaultViewport:null,
      //   args: ["--start-maximized"]
      // }
    );
   // store the browser instance so we can teardown it later
   // this global is only available in the teardown but not in TestEnvironments
   global.__BROWSER_GLOBAL__ = browser;
   const usernameField = "#P101_USERNAME";
   const pwdField = "#P101_PASSWORD";
   const signInButton = "#P101_LOGIN_APP";
   let page = await browser.newPage();
   console.log(">> Page Login URL = ",globalVals._loginURL);    
   await page.goto(globalVals._loginURL); 
   await page.click(usernameField);
   await page.type(usernameField,globalVals._testUser);
   await page.click(pwdField);
   await page.type(pwdField,globalVals._testPassword);
   const [homePageRedirect] = await Promise.all([
      page.waitForNavigation(),
      page.click(signInButton),
    ]);
   const homepageURL = await page.mainFrame().url();
   if (!homepageURL.includes("home")){
      throw new Error("Login Failed! Cannot Run Tests")
   }
   console.log('>> HomePageUrl = ',homepageURL)

   // use the file system to expose the wsEndpoint for TestEnvironments
   mkdirp.sync(DIR);
   fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
   fs.writeFileSync(path.join(DIR, 'brURLEndpoint'), homepageURL);
};