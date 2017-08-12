'use strict'

const ud = require('./urban-dictionary')

ud.random(function (error, entry) {
  if (error) {
    console.error(error)
    return
  }
  console.log('Urban Dictionary - Random Definition')
  console.log('Word: ' + entry.word)
  console.log('Definition: ' + entry.definition)
})
