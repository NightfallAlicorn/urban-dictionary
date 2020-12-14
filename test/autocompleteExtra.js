'use strict'

const ud = require('../urban-dictionary')

ud.autocompleteExtra('test').then((results) => {
  console.log('autocompleteExtra (promise)')

  results.forEach(({ preview, term }) => {
    console.log(`${term} - ${preview}`)
  })
}).catch((error) => {
  console.error(`autocomplete (promise) - ${error.message}`)
})

ud.autocompleteExtra('test', (error, results) => {
  if (error) {
    console.error(`autocomplete (callback) - ${error.message}`)
    return
  }

  console.log('autocompleteExtra (callback)')

  results.forEach(({ preview, term }) => {
    console.log(`${term} - ${preview}`)
  })
})
