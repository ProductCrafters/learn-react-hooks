var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const { describe, it, beforeEach, afterEach } = require('mocha')

const Page = require('./browserWrapper')
const expect = chai.expect

;(async function tests() {
  try {
    describe('Can Load Articles', async function() {
      this.timeout(50000)
      let driver, page

      beforeEach(async () => {
        page = new Page()
        driver = page.driver
        await page.visit('http://localhost:3000')
      })

      afterEach(async () => await page.quit())

      it('can load 20 articles', async () => {
        const result = await page.findByXPath(`//div[contains(@class, 'article')]`)
        expect(result.length).to.equal(20)
      })

      it('can browse to article details', async () => {
        const link = await page.findSingleByXPath(`(//div[contains(@class, 'article')]/a)[3]`)
        const linkText = await link.getText()

        await link.click()
        const detailsPageTitle = await page.findSingleByXPath(`//span[contains(@class, 'articleName')]`)
        const detailsPageTitleText = await detailsPageTitle.getText()
        expect(linkText).to.equal(detailsPageTitleText)
      })

      it('can fetch articles for the second page', async () => {
        const fetchButton = await page.findSingleByXPath(`//button[contains(@class, 'fetchMoreButton')]`)
        const pagerButtonSelector = `(//div[contains(@class, 'btn-group')])[1]/button[contains(@class, 'pageButton')]`
        await fetchButton.click()
        await page.findSingleByXPath(`//h5[contains(@class, 'loading')]`)


        const fetchedPages = await page.findByXPath(pagerButtonSelector)
        expect(fetchedPages.length).to.equal(2)

      })
    })
  } catch (ex) {
    console.log(new Error(ex.message))
  } finally {
  }
})()
