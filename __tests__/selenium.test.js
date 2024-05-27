// const { expect } = require('chai');
const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');
// import('chai').then(chai => {
  let driver;

  describe('Selenium Tests', function() {
    this.timeout(30000);
  
    before(async function() {
      expect = (await import('chai')).expect;
      let options = new chrome.Options();
      options.addArguments('headless');
      options.addArguments('disable-gpu');
      options.addArguments('no-sandbox');
  
      driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build();
  
      try {
        await driver.get('https://www.google.com/ncr');
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
      } catch (error) {
        console.error('Error in before hook:', error);
        throw error;
      }
    });
  
    after(async function() {
      if (driver) {
        await driver.quit();
      }
    });
  
    it('Title should be correct', async function() {
      console.log("Checking title...");

      await driver.get('https://localhost:3000');
      const title = await driver.getTitle();
      console.log("title: ", title)
      expect(title).to.equal('OneClicks');
    });
  
    it('Header should be visible', async function() {
      await driver.get('https://localhost:3000');
      const header = await driver.findElement(By.tagName('h1'));
      const isVisible = await header.isDisplayed();
      expect(isVisible).to.be.true;
    });

    it('Clicks on the Home Button', async () => {
      await driver.get('https://localhost:3000'); // Assuming your app is running on localhost
      const bodyElement = await driver.wait(until.elementLocated(By.css('body')), 10000);

      // Find all anchor elements on the page
      const allAnchorElements = await driver.findElements(By.tagName('a'));
    
      // Filter the anchor elements to find the one with the text "Home"
      let homeButton;
      for (const anchorElement of allAnchorElements) {
        const text = await anchorElement.getText();
        if (text === 'Home') {
          homeButton = anchorElement;
          break;
        }
      }
    
      // Click on the Home button if found
      if (homeButton) {
        await homeButton.click();
    
        // Wait for the page to load or for a specific element to appear
        await driver.wait(until.titleIs('OneClicks'), 10000); // Replace 'Home Page Title' with the expected title of your home page
    
        // Assert that we are on the home page
        const pageTitle = await driver.getTitle();
        assert.strictEqual(pageTitle, 'OneClicks'); // Replace 'Home Page Title' with the expected title of your home page
      } else {
        throw new Error('Home button not found');
      }
    
    });
  
});