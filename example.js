'use strict'

const ud = require('./urban-dictionary')

var definition = 'word'

// Random callback example.
ud.random((error, entry) => {
  if (error) {
    console.error(error.message)
  } else {
    console.log(entry.word)
    console.log(entry.definition)
    console.log(entry.example)
  }
})

// Random promise example.
ud.random().then((result) => {
  console.log(result.word)
  console.log(result.definition)
  console.log(result.example)
}).catch((error) => {
  console.error(error.message)
})

// Term callback example.
ud.term(definition, (error, entries, tags, sounds) => {
  if (error) {
    console.error(error.message)
  } else {
    console.log(entries[0].word)
    console.log(entries[0].definition)
    console.log(entries[0].example)
  }
})

// Term promise example.
ud.term(definition).then((result) => {
  const entries = result.entries
  console.log(entries[0].word)
  console.log(entries[0].definition)
  console.log(entries[0].example)
}).catch((error) => {
  console.error(error.message)
})
