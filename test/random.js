'use strict'

const ud = require('../urban-dictionary')

// Callback
ud.random((error, results) => {
  if (error) {
    console.error(`random (callback) error - ${error.message}`)
    return
  }

  console.log('random (callback)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
})

// Promise
ud.random().then((results) => {
  console.log('random (promise)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
}).catch((error) => {
  console.error(`random (promise) - error ${error.message}`)
})
