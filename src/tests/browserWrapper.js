const { Builder, By, until } = require('selenium-webdriver')

const Page = function() {
  this.driver = new Builder().forBrowser('chrome').build()

  this.visit = async function(theUrl) {
    return await this.driver.get(theUrl)
  }

  this.quit = async function() {
    return await this.driver.quit()
  }

  this.findByXPath = async function(xpath) {
    await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000, 'Looking for element')
    return await this.driver.findElements(By.xpath(xpath))
  }

  this.findSingleByXPath = async function(xpath) {
    const elements = await this.findByXPath(xpath)
    return elements[0]
  }
}

module.exports = Page
