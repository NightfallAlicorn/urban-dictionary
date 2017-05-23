'use strict'

const http = require('http')

var methods = {}
var randomCache = []

function get (url, callback) {
  http.get(url, function (result) {
    var data = ''
    result.on('data', function (buffer) {
      data += buffer
    })
    result.on('end', function () {
      try {
        callback(JSON.parse(data))
      } catch (error) {
        callback(undefined)
      }
    })
  })
}

methods.random = function random (callback) {
  if (!randomCache[0]) {
    get('http://api.urbandictionary.com/v0/random', function (result) {
      if (!result) {
        callback(undefined)
        return
      }
      randomCache = result.list
      callback(randomCache[0])
      randomCache.splice(0, 1)
    })
  } else {
    callback(randomCache[0])
    randomCache.splice(0, 1)
  }
}

methods.search = function search (word, callback) {
  get('http://api.urbandictionary.com/v0/define?term=' + encodeURIComponent(word), function (result) {
    if (!result || result.result_type !== 'exact') {
      callback(undefined)
    } else {
      callback(result.list, result.tags, result.sounds)
    }
  })
}

module.exports = methods
