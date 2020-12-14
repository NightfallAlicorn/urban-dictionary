'use strict'

const ud = require('../urban-dictionary')

ud.term('test').then((results) => {
  console.log('term (promise)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
}).catch((error) => {
  console.error(`term (promise) - error ${error.message}`)
})

ud.term('test', (error, results) => {
  if (error) {
    console.error(`term (callback) error - ${error.message}`)
    return
  }

  console.log('term (promise)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
})
