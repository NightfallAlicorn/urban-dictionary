'use strict'

const http = require('http')
const querystring = require('querystring')
const utilities = require('util')

const promises = {}
const callbacks = {}
const methods = {}

/**
 *
 * @param {string} pathname The API pathname to use.
 * @param {Object} query Optional. An object containing the query data.
 */
const get = (pathname, query) => {
  return new Promise((resolve, reject) => {
    const options = {
      host: 'api.urbandictionary.com',
      method: 'GET'
    }

    if (!query) {
      options.path = `/v0/${pathname}`
    } else {
      options.path = `/v0/${pathname}?${querystring.stringify(query)}`
    }

    const request = http.request(options, (response) => {
      let data = ''

      response.on('data', (chunk) => {
        data += chunk
      })

      response.on('end', () => {
        let result = null

        try {
          result = JSON.parse(data)
          resolve(result)
        } catch (error) {
          result = null
          reject(new Error('Failed to parse retrieved Urban Dictionary JSON.'))
        }
      })
    })

    request.on('error', (error) => {
      const statusCode = error.status

      if (statusCode === 500) {
        reject(new Error('Unable to connect to Urban Dictionary API. Their servers may be temporary offline.'))
      }
    })

    request.end()
  })
}

const noResults = () => {
  return new Error('No results founds.')
}

promises.autocompleteExtra = async (term) => {
  if (typeof term !== 'string') {
    throw new TypeError('term has to be a string.')
  }

  return get('autocomplete-extra', { term: term }).then((result) => {
    if (!result.results[0]) {
      throw noResults()
    }
    return result.results
  })
}

promises.autocomplete = async (term) => {
  if (typeof term !== 'string') {
    throw new TypeError('term has to be a string.')
  }

  return get('autocomplete', { term: term }).then((result) => {
    if (!result[0]) {
      throw noResults()
    }
    return result
  })
}

promises.defid = async (id) => {
  if (typeof id !== 'number') {
    throw new TypeError('id has to be a number')
  }

  return get('define', { defid: id }).then((result) => {
    if (!result.list[0]) {
      throw noResults()
    }
    return result.list[0]
  })
}

promises.random = async () => {
  return get('random').then((result) => {
    if (!result.list[0]) {
      throw noResults()
    }
    return result.list
  })
}

promises.term = async (term) => {
  if (typeof word !== 'string') {
    throw new TypeError('term has to be a string.')
  }

  return get('define', { term: term }).then((result) => {
    if (!result.list[0]) {
      throw noResults()
    }
    return result.list
  })
}

promises.wordsOfTheDay = async () => {
  return get('words-of-the-day').then((result) => {
    if (!result.list[0]) {
      throw noResults()
    }
    return result.list
  })
}

// Create callback versions of the promise methods
/*
Object.keys(promises).forEach((property) => {
  callbacks[property] = utilities.callbackify(promises[property])
})

methods.defid = (id, callback) => { return (!callback ? promises.defid(id) : callbacks.defid(id, callback)) }
methods.random = (callback) => { return (!callback ? promises.random() : callbacks.random(callback)) }
methods.term = (word, callback) => { return (!callback ? promises.term(word) : callbacks.term(word, callback)) }
*/

Object.keys(promises).forEach((property) => {
  // Create callbackify variations of the async function promises.
  callbacks[property] = utilities.callbackify(promises[property])

  // Create the public methods control flow for the callbacks and promises while forwarding the arguments.
  methods[property] = (...args) => {
    if (typeof args[args.length - 1] === 'function') {
      return callbacks[property](...args)
    } else {
      return promises[property](...args)
    }
  }
})

module.exports = methods
