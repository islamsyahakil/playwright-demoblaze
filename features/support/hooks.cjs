const { BeforeAll, AfterAll, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(60 * 1000);
let browser;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: true }); // CI: headless
});

AfterAll(async () => {
  if (browser) await browser.close();
});

Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.context) await this.context.close();
});
