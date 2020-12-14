'use strict'

const ud = require('../urban-dictionary')

ud.autocomplete('test').then((results) => {
  console.log('autocomplete (promise)')

  console.log(results.join(', '))
}).catch((error) => {
  console.error(`autocomplete (promise) - error ${error.message}`)
})

ud.autocomplete('test', (error, results) => {
  if (error) {
    console.error(`autocomplete (callback) error - ${error.message}`)
    return
  }

  console.log('autocomplete (promise)')

  console.log(results.join(', '))
})
