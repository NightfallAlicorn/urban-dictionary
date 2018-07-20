'use strict'

const ud = require('./urban-dictionary')

ud.random((error, entry) => {
  if (error) {
    console.error(`term (callback) - ${error.message}`)
    return
  }

  console.log(`random (callback) - ${entry.word} - ${entry.definition.substring(0, 50)}`)
}).then((result) => {
  console.log(`random (promise) - ${result.word} - ${result.definition.substring(0, 50)}`)
}).catch((error) => {
  console.log(`random (promise) - ${error.message}`)
})

ud.term('test', (error, entries, tags, sounds) => {
  if (error) {
    console.error(`term (callback) - ${error.message}`)
    return
  }

  console.log(`term (callback) - ${entries[0].word} - ${entries[0].definition.substring(0, 50)}`)
}).then((result) => {
  const entries = result.entries
  console.log(`term (promise) - ${entries[0].word} - ${entries[0].definition.substring(0, 50)}`)
}).catch((error) => {
  console.error(`term (promise) - ${error.message}`)
})
