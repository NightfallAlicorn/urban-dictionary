'use strict'

const ud = require('../urban-dictionary')

// Callback
ud.getDefinitionByDefid(217456, (error, result) => {
  if (error) {
    console.error(`getDefinitionByDefid (callback) error - ${error.message}`)
    return
  }

  console.log('getDefinitionByDefid (callback)')

  Object.entries(result).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
})

// Promise
ud.getDefinitionByDefid(217456).then((result) => {
  console.log('getDefinitionByDefid (promise)')

  Object.entries(result).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
}).catch((error) => {
  console.error(`getDefinitionByDefid (promise) - error ${error.message}`)
})
