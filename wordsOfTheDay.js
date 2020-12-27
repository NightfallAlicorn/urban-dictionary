'use strict'

const ud = require('../urban-dictionary')

// Callback
ud.wordsOfTheDay((error, results) => {
  if (error) {
    console.error(`wordsOfTheDay (callback) error - ${error.message}`)
    return
  }

  console.log('wordsOfTheDay (callback)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
})

// Promise
ud.wordsOfTheDay().then((results) => {
  console.log('wordsOfTheDay (promise)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
}).catch((error) => {
  console.error(`wordsOfTheDay (promise) - error ${error.message}`)
})
