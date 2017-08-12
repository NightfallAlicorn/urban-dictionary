'use strict'

const ud = require('urban-dictionary')

ud.random(function (error, entry) {
  if (error) {
    console.error(error.message)
    return
  }
  console.log('Urban Dictionary - Random Definition')
  console.log('Word: ' + entry.word)
  console.log('Definition: ' + entry.definition)
})
