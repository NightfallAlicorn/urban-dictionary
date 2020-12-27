'use strict'

const ud = require('../urban-dictionary')

// Callback
ud.define('test', (error, results) => {
  if (error) {
    console.error(`define (callback) error - ${error.message}`)
    return
  }

  console.log('define (callback)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
})

// Promise
ud.define('test').then((results) => {
  console.log('define (promise)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
}).catch((error) => {
  console.error(`define (promise) - error ${error.message}`)
})
