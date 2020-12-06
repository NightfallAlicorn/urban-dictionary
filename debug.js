'use strict'

const ud = require('./urban-dictionary')

const id = 217456
const word = 'test'

// TO-DO: Make this script more tidier

/*
ud.defid(id).then((result) => {
  console.log(`defid (promise) - ${result.definition}`)
}).catch((error) => {
  console.error(`defid (promise) - ${error.message}`)
})

ud.defid(id, (error, result) => {
  if (error) {
    console.error(`defid (callback) - ${error.message}`)
    return
  }
  console.log(`defid (callback) - ${result.definition}`)
})
*/

ud.random(id).then((result) => {
  console.log(`random (promise) - ${result[0].definition}`)
}).catch((error) => {
  console.error(`random (promise) - ${error.message}`)
})

ud.random((error, result) => {
  if (error) {
    console.error(`random (callback) - ${error.message}`)
    return
  }
  console.log(`random (callback) - ${result[0].definition}`)
})

/*
ud.term(noResultTest).then((results) => {
  console.log(results[0].definition)
}).catch((error) => {
  console.error(`term (promise) - ${error.message}`)
})

ud.term(noResultTest, (error, results) => {
  if (error) {
    console.error(`term (callback) - ${error.message}`)
    return
  }
  console.log(results[0].definition)
})
*/
