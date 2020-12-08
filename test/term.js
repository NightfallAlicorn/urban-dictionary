'use strict'

const ud = require('../urban-dictionary')

ud.term('test').then((results) => {
  console.log(results)
}).catch((error) => {
  console.error(`term (promise) - ${error.message}`)
})

ud.term('test', (error, results) => {
  if (error) {
    console.error(`term (callback) - ${error.message}`)
    return
  }
  console.log(results)
})
