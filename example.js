'use strict'

const ud = require('./urban-dictionary')

ud.define('test').then((results) => {
  console.log(results[0].word)
  console.log(results[0].definition)
}).catch((error) => {
  console.error(error.message)
})
