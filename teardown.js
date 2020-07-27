// teardown.js
const os = require('os');
const rimraf = require('rimraf');
const path = require('path');
const chalk = require('chalk');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
module.exports = async function () {
  console.log(chalk.black.bgMagenta(' Tearing Down the Environment... '))
  // close the browser instance
  await global.__BROWSER_GLOBAL__.close();

  // clean-up the wsEndpoint file
  rimraf.sync(DIR);
};