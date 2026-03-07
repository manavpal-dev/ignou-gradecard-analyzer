const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // This ensures the browser is installed inside your project folder
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};