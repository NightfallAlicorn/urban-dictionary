'use strict'

const ud = require('./urban-dictionary')

ud.defid(217456, (error, entry) => {
  if (error) {
    console.error(`defid (callback) - ${error.message}`)
    return
  }

  console.log(`defid (callback) - ${entry.word} - ${entry.definition.substring(0, 50)}`)
}).then((result) => {
  console.log(`defid (promise) - ${result.word} - ${result.definition.substring(0, 50)}`)
}).catch((error) => {
  console.error(`defid (promise) - ${error.message}`)
})

ud.random((error, entry) => {
  if (error) {
    console.error(`term (callback) - ${error.message}`)
    return
  }

  console.log(`random (callback) - ${entry.word} - ${entry.definition.substring(0, 50)}`)
}).then((result) => {
  console.log(`random (promise) - ${result.word} - ${result.definition.substring(0, 50)}`)
}).catch((error) => {
  console.error(`random (promise) - ${error.message}`)
})

ud.term('word', (error, entries, tags, sounds) => {
  if (error) {
    console.error(`term (callback) - ${error.message}`)
    return
  }

  console.log(`term (callback) - ${entries[0].word} - ${entries[0].definition.substring(0, 50)}`)
  console.log(`term (callback) - defid ${entries[0].defid}`)
}).then((result) => {
  const entries = result.entries
  console.log(`term (promise) - ${entries[0].word} - ${entries[0].definition.substring(0, 50)}`)
}).catch((error) => {
  console.error(`term (promise) - ${error.message}`)
})
