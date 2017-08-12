'use strict'

// The example script requires the module script to be in the same directory when run.
const ud = require('./urban-dictionary')

ud.random(function (error, entry) {
  if (error) {
    console.error(error.message)
    return
  }
  console.log('Urban Dictionary - Random Definition')
  console.log('Word: ' + entry.word)
  console.log('Definition: ' + entry.definition)
})
