const webCrawler = function (jsonObj) {
  // array of internet pages to crawl
  const internetArr = jsonObj.pages

  // instantiate stores for pages
  const success = []
  const skipped = []
  const error = []

  // add properties to pages objects so we don't duplicate crawling and pushing
  internetArr.forEach(page => page.crawled = false)
  internetArr.forEach(page => page.skipped = false)

  // function for crawling page objects
  const crawl = (page) => {
    // change crawled property
    page.crawled = true
    // add page to success array
    success.push(page.address)
    // iterate over page links
    page.links.forEach(link => {
      // find linked page on page array and store index for traversal purposes
      const linkedPageIndex = internetArr.findIndex(element => element.address === link)
      // if linked page doesn't exist and not in error array yet, push it
      if (linkedPageIndex === -1 && !error.some(errorAdrs => errorAdrs === link)) {
        error.push(link)
      // else if already crawled linked page and not in skipped array, push it
      } else if (internetArr[linkedPageIndex].crawled === true && internetArr[linkedPageIndex].skipped == false) {
        skipped.push(internetArr[linkedPageIndex].address)
        internetArr[linkedPageIndex].skipped = true
      // else if not yet crawled, crawl that page
      } else if (internetArr[linkedPageIndex].crawled === false) {
        crawl(internetArr[linkedPageIndex])
      }
    })
  }

  // start with the first page object in the internet pages array
  crawl(internetArr[0])

  // at the end, return sorted array results
  return ({
    Success: success,
    Skipped: skipped,
    Error: error,
  })
}

// export the function for testing purposes
module.exports = webCrawler
