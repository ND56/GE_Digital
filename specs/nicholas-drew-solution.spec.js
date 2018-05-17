// require my function for use in testing
const webCrawler = require('../scripts/nicholas-drew-solution.js')

// sample data provided by GE; used in testing
const internet1 = {
  "pages": [
    {
      "address":"http://foo.bar.com/p1",
      "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p3", "http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p2",
      "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p4",
      "links": ["http://foo.bar.com/p5", "http://foo.bar.com/p1", "http://foo.bar.com/p6"]
    },
    {
      "address":"http://foo.bar.com/p5",
      "links": []
    },
    {
      "address":"http://foo.bar.com/p6",
      "links": ["http://foo.bar.com/p7", "http://foo.bar.com/p4", "http://foo.bar.com/p5"]
    }
  ]
}

const internet2 = {
  "pages": [
      {
      "address":"http://foo.bar.com/p1",
      "links": ["http://foo.bar.com/p2"]
    },
    {
      "address":"http://foo.bar.com/p2",
      "links": ["http://foo.bar.com/p3"]
    },
    {
      "address":"http://foo.bar.com/p3",
      "links": ["http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p4",
      "links": ["http://foo.bar.com/p5"]
    },
    {
      "address":"http://foo.bar.com/p5",
      "links": ["http://foo.bar.com/p1"]
    },
    {
      "address":"http://foo.bar.com/p6",
      "links": ["http://foo.bar.com/p1"]
    }
  ]
}

// Expected output of the internet JSON objects provided by GE; used in testing
const internet1Output = {
  Success: ["http://foo.bar.com/p1", "http://foo.bar.com/p2", "http://foo.bar.com/p4", "http://foo.bar.com/p5", "http://foo.bar.com/p6"],
  Skipped: ["http://foo.bar.com/p2", "http://foo.bar.com/p4", "http://foo.bar.com/p1", "http://foo.bar.com/p5"],
  Error: ["http://foo.bar.com/p3", "http://foo.bar.com/p7"]
}

const internet2Output = {
  Success: ["http://foo.bar.com/p1", "http://foo.bar.com/p2", "http://foo.bar.com/p3", "http://foo.bar.com/p4", "http://foo.bar.com/p5"],
  Skipped: ["http://foo.bar.com/p1"],
  Error: []
}

// Define the test suite that holds all tests related to my function
describe('Web Crawler Suite', function() {
    // First Test: My Success Array contains all elements from the expected
    // Success array for the "Internet 1" JSON object
    test(`The Success array returned from my function should have the same
      elements found in the expected Success output that GE provided in
      connection with the "Internet 1" JSON object.`,
      function() {
        internet1Output.Success.forEach(element => {
          expect(webCrawler(internet1).Success).toContain(element)
        })
        console.log('Expected Success Array, Internet 1:', internet1Output.Success)
        console.log('My Success Array, Internet 1:', webCrawler(internet1).Success)
      }
    )
    // Second Test: My Success Array contains no elements that are not found in
    // the expected Success array for the "Internet 1" JSON object
    test(`The Success array returned from my function should contain no
      elements that are not found in the expected Success output that GE
      provided in connection with the "Internet 1" JSON object.`,
      function() {
        webCrawler(internet1).Success.every(element => {
          expect(internet1Output.Success).toContain(element)
        })
      }
    )
    // Third Test: My Skipped Array contains all elements from the expected
    // Skipped array for the "Internet 1" JSON object
    test(`The Skipped array returned from my function should have the same
      elements found in the expected Skipped output that GE provided in
      connection with the "Internet 1" JSON object.`,
      function() {
        internet1Output.Skipped.forEach(element => {
          expect(webCrawler(internet1).Skipped).toContain(element)
        })
        console.log('Expected Skipped Array, Internet 1:', internet1Output.Skipped)
        console.log('My Skipped Array, Internet 1:', webCrawler(internet1).Skipped)
      }
    )
    // Fourth Test: My Skipped Array contains no elements that are not found in
    // the expected Skipped array for the "Internet 1" JSON object
    test(`The Skipped array returned from my function should contain no
      elements that are not found in the expected Skipped output that GE
      provided in connection with the "Internet 1" JSON object.`,
      function() {
        webCrawler(internet1).Skipped.every(element => {
          expect(internet1Output.Skipped).toContain(element)
        })
      }
    )
    // Fifth Test: My Error Array contains all elements from the expected
    // Error array for the "Internet 1" JSON object
    test(`The Error array returned from my function should have the same
      elements found in the expected Error output that GE provided in
      connection with the "Internet 1" JSON object.`,
      function() {
        internet1Output.Error.forEach(element => {
          expect(webCrawler(internet1).Error).toContain(element)
        })
        console.log('Expected Error Array, Internet 1:', internet1Output.Error)
        console.log('My Error Array, Internet 1:', webCrawler(internet1).Error)
      }
    )
    // Sixth Test: My Error Array contains no elements that are not found in
    // the expected Error array for the "Internet 1" JSON object
    test(`The Error array returned from my function should contain no
      elements that are not found in the expected Error output that GE
      provided in connection with the "Internet 1" JSON object.`,
      function() {
        webCrawler(internet1).Error.every(element => {
          expect(internet1Output.Error).toContain(element)
        })
      }
    )
    // Final Test: My returned arrays should match the expected arrays for the
    // "Internet 2" JSON object
    test(`The arrays returned from my function should have the same elements
      found in the expected output that GE provided in connection with the
      "Internet 2" JSON object.`,
      function() {
        expect(webCrawler(internet2)).toMatchObject(internet2Output)
        console.log('Expected Succcess Array, Internet 2:', internet2Output.Success)
        console.log('My Success Array, Internet 2:', webCrawler(internet2).Success)
        console.log('Expected Skipped Array, Internet 2:', internet2Output.Skipped)
        console.log('My Skipped Array, Internet 2:', webCrawler(internet2).Skipped)
        console.log('Expected Error Array, Internet 2:', internet2Output.Error)
        console.log('My Error Array, Internet 2:', webCrawler(internet2).Error)
      }
    )
})
