'use strict'

const ud = require('../urban-dictionary')

// Callback
ud.autocomplete('test', (error, results) => {
  if (error) {
    console.error(`autocomplete (callback) error - ${error.message}`)
    return
  }

  console.log('autocomplete (callback)')

  console.log(results.join(', '))
})

// Promise
ud.autocomplete('test').then((results) => {
  console.log('autocomplete (promise)')

  console.log(results.join(', '))
}).catch((error) => {
  console.error(`autocomplete (promise) - error ${error.message}`)
})
