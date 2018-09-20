'use strict'

const http = require('http')
const querystring = require('querystring')

var methods = {}
var randomCache = []

process.on('unhandledRejection', () => {
  // This is a place holder to prevent missing Promise catch errors.
  // Since the user may use a callback instead of a Promise object.
})

/**
 * Copies an object without it being linked to the original.
 * @param {object} object Original object.
 * @return {object} Deep copied object.
 */
function deepCopy (object) {
  return JSON.parse(JSON.stringify(object))
}

/**
 * Retrieves a JSON parsed object.
 * @param {string} url The full URL to retrieve from.
 * @param {function(error, object):void} callback
 * * argument[0] {error} error
 * * argument[1] {object} Parsed JSON result.
 */
function get (url, callback) {
  // https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_http_get_options_callback
  http.get(url, (result) => {
    const contentType = result.headers['content-type']
    const statusCode = result.statusCode

    let error

    if (statusCode !== 200) {
      error = new Error(`Unable to send request for definitions. Status code: '${statusCode}'`)
      error.code = 'ERR_REQUEST_SEND'
    } else if (contentType.indexOf('application/json') === -1) {
      error = new Error(`Content retrieved isn't JSON. Content type: '${contentType}'`)
      error.code = 'ERR_RESPONSE_NOT_JSON'
    }

    if (error) {
      // Removes response data to clear up memory.
      result.resume()
      callback(error)
      return
    }

    result.setEncoding('utf8')

    let rawData = ''

    result.on('data', (buffer) => {
      rawData += buffer
    })

    result.on('end', () => {
      let data = null
      let error = null

      try {
        data = JSON.parse(rawData)
      } catch (unusedError) {
        // In case somehow the data got set to not null. This is more of a failsafe.
        data = null
        error = new Error('Failed to parse retrieved Urban Dictionary JSON.')
        error.code = 'ERR_JSON_PARSE'
      }

      callback(error, data)
    })
  })
}

/**
 * Asynchronously obtain Urban Dictionary term entry by defid.
 * @param {number} id Definition entry to retrieve.
 * @param {function(error, object):promise} callback
 * * argument[0] {error} error
 * * argument[1] {object} entry
 * * * 'author' {string} Name of the poster.
 * * * 'current_vote' {string} Unknown. It only returns an empty string.
 * * * 'defid' {number} The unique definition entry ID.
 * * * 'definition' {string} The definition description.
 * * * 'example' {string} An example use of the definition.
 * * * 'permalink' {string} A shortened link to Urban Dictionary page of the definition.
 * * * 'thumbs_down' {number} Number of down votes.
 * * * 'thumbs_up' {number} Number of up votes.
 * * * 'word' {string} The word of the definition. Be aware that the casing might be different.
 * @return {promise} Returns a promise object containing the 'entry' property.
 */
methods.defid = function defid (id, callback) {
  if (typeof id !== 'number') {
    let error = new TypeError('id has to be a number.')
    error.code = 'ERR_ID_NOT_NUMBER'

    throw error
  }

  return new Promise((resolve, reject) => {
    const query = querystring.stringify({'defid': id})

    get('http://api.urbandictionary.com/v0/define?' + query, (error, result) => {
      if (error) {
        if (typeof callback === 'function') {
          callback(error)
        }

        reject(error)
        return
      }

      if (!result.list[0]) {
        let error = new Error('defid ' + id + " doesn't exist or has been deleted.")
        error.code = 'ERR_DEFINITION_NOT_FOUND'

        if (typeof callback === 'function') {
          callback(error)
        }

        reject(error)
        return
      }

      if (typeof callback === 'function') {
        callback(null, result.list[0])
      }

      resolve(result.list[0])
    })
  })
}

/**
 * Asynchronously obtain a random definition from Urban Dictionary.
 *
 * When called, 10 definitions are downloaded at once and are output 1 at a time.
 * Once all 10 cache definitions are used, new ones are automatically downloaded.
 * @param {function(error, object):promise} callback
 * * argument[0] {error} error
 * * argument[1] {object} entry
 * * * 'author' {string} Name of the poster.
 * * * 'current_vote' {string} Unknown. It only returns an empty string.
 * * * 'defid' {number} The unique definition entry ID.
 * * * 'definition' {string} The definition description.
 * * * 'example' {string} An example use of the definition.
 * * * 'permalink' {string} A shortened link to Urban Dictionary page of the definition.
 * * * 'thumbs_down' {number} Number of down votes.
 * * * 'thumbs_up' {number} Number of up votes.
 * * * 'word' {string} The word of the definition. Be aware that the casing might be different.
 * @return {promise} Returns a promise object containing the 'entry' property.
 */
methods.random = function random (callback) {
  return new Promise((resolve, reject) => {
    if (!randomCache[0]) {
      get('http://api.urbandictionary.com/v0/random', (error, result) => {
        if (error) {
          if (typeof callback === 'function') {
            callback(error)
          }

          reject(error)
          return
        }

        randomCache = result.list
        let entry = deepCopy(randomCache[0])
        randomCache.splice(0, 1)

        if (typeof callback === 'function') {
          callback(null, entry)
        }

        resolve(entry)
      })
    } else {
      let entry = deepCopy(randomCache[0])
      randomCache.splice(0, 1)

      if (typeof callback === 'function') {
        callback(null, entry)
      }

      resolve(entry)
    }
  })
}

/**
 * Asynchronously obtain Urban Dictionary by term.
 * @param {number|string} word Definition to search for.
 * @param {function(error, array, array, array):promise} callback
 * * argument[0] {error} error
 * * argument[1] {array of object} entries
 * * * 'author' {string} Name of the poster.
 * * * 'current_vote' {string} Unknown. It only returns an empty string.
 * * * 'defid' {number} The unique definition entry ID.
 * * * 'definition' {string} The definition description.
 * * * 'example' {string} An example use of the definition.
 * * * 'permalink' {string} A shortened link to Urban Dictionary page of the definition.
 * * * 'thumbs_down' {number} Number of down votes.
 * * * 'thumbs_up' {number} Number of up votes.
 * * * 'word' {string} The word of the definition. Be aware that the casing might be different.
 * * argument[2] {array of string} tags Tags of related words.
 * * argument[3] {array of string} sounds Full link addresses to .mp3 and .wav files.
 * @return {promise} Returns a promise object containing entries, tags and sounds properties.
 */
methods.term = function term (word, callback) {
  if (typeof word !== 'string') {
    let error = new TypeError('word has to be a string.')
    error.code = 'ERR_WORD_NOT_STRING'

    throw error
  }

  return new Promise((resolve, reject) => {
    const query = querystring.stringify({'term': word})

    get('http://api.urbandictionary.com/v0/define?' + query, (error, result) => {
      if (error) {
        if (typeof callback === 'function') {
          callback(error)
        }

        reject(error)
        return
      }

      if (!result.list[0]) {
        let error = new Error(word + ' is undefined.')
        error.code = 'ERR_WORD_UNDEFINED'

        if (typeof callback === 'function') {
          callback(error)
        }

        reject(error)
        return
      }

      if (typeof callback === 'function') {
        callback(null, result.list, result.tags, result.sounds)
      }

      resolve({'entries': result.list, 'tags': result.tags, 'sounds': result.sounds})
    })
  })
}

module.exports = methods
