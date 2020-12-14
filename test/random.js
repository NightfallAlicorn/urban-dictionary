'use strict'

const ud = require('../urban-dictionary')

ud.random().then((results) => {
  console.log('random (promise)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
}).catch((error) => {
  console.error(`random (promise) - error ${error.message}`)
})

ud.random((error, results) => {
  if (error) {
    console.error(`random (callback) error - ${error.message}`)
    return
  }

  console.log('random (promise)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
})
