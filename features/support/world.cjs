const { setWorldConstructor } = require('@cucumber/cucumber');
const { generateRandomPassword, generateRandomUsername } = require('../../helpers/helpers.cjs');

class CustomWorld {
  constructor() {
    this.username = generateRandomUsername();
    this.password = generateRandomPassword();
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setWorldConstructor(CustomWorld);
