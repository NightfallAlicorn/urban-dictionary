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
 * @param {object} query Optional. An object containing the query data.
 */
const get = (pathname, query) => {
  return new Promise((resolve, reject) => {
    const options = {
      host: 'api.urbandictionary.com',
      path: (!query ? `/v0/${pathname}` : `/v0/${pathname}?${querystring.stringify(query)}`)
    }

    const request = http.get(options, (response) => {
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
  }).catch((error) => {
    throw error
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
  }).catch((error) => {
    throw error
  })
}

promises.define = async (term) => {
  if (typeof term !== 'string') {
    throw new TypeError('term has to be a string.')
  }

  return get('define', { term: term }).then((result) => {
    if (!result.list[0]) {
      throw noResults()
    }
    return result.list
  }).catch((error) => {
    throw error
  })
}

promises.getDefinitionByDefid = async (id) => {
  if (typeof id !== 'number') {
    throw new TypeError('id has to be a number')
  }

  return get('define', { defid: id }).then((result) => {
    if (!result.list[0]) {
      throw noResults()
    }
    return result.list[0]
  }).catch((error) => {
    throw error
  })
}

promises.random = async () => {
  return get('random').then((result) => {
    if (!result.list[0]) {
      throw noResults()
    }
    return result.list
  }).catch((error) => {
    throw error
  })
}

promises.wordsOfTheDay = async () => {
  return get('words_of_the_day').then((result) => {
    if (!result.list[0]) {
      throw noResults()
    }
    return result.list
  }).catch((error) => {
    throw error
  })
}

// Create callback versions of the promise methods
Object.keys(promises).forEach((property) => {
  callbacks[property] = utilities.callbackify(promises[property])
})

/**
 * @typedef {object} DefinitionObject
 * @property {string} author
 * @property {string} current_vote
 * @property {string} date
 * @property {number} defid
 * @property {string} definition
 * @property {string} example
 * @property {string} permalink
 * @property {string[]} sound_urls
 * @property {number} thumbs_down
 * @property {number} thumbs_up
 * @property {string} word
 * @property {string} written_on
 * @param {DefinitionObject}
 */

/**
 * Get an array up to 20 autocomplete extra objects.
 * @param {string} term
 * @param {function(error, array):void} callback
 * @return {promise}
 */
methods.autocompleteExtra = (term, callback) => {
  return (!callback ? promises.autocompleteExtra(term) : callbacks.autocompleteExtra(term, callback))
}

/**
 * Get an array up to 20 suggested words by term.
 * @param {string} term
 * @param {function(error, array):void} callback
 * @return {promise}
 */
methods.autocomplete = (term, callback) => {
  return (!callback ? promises.autocomplete(term) : callbacks.autocomplete(term, callback))
}

/**
 * Get an array up to 10 definition objects by term.
 * @param {string} term
 * @param {function(error, DefinitionObject[]):void} callback
 * @return {promise}
 */
methods.define = (term, callback) => {
  return (!callback ? promises.define(term) : callbacks.define(term, callback))
}

/**
 * Get a definition object by its defid.
 * @param {number} defid
 * @param {function} callback
 * @return {promise}
 */
methods.getDefinitionByDefid = (defid, callback) => {
  return (!callback ? promises.getDefinitionByDefid(defid) : callbacks.getDefinitionByDefid(defid, callback))
}

/**
 * Get an array up to 10 random definition objects.
 * @param {function(error, DefinitionObject):void} callback
 * @return {promise}
 */
methods.random = (callback) => {
  return (!callback ? promises.random() : callbacks.random(callback))
}

/**
 * Get an array of 10 daily definition objects by Words of the Day.
 * @param {function(error, DefinitionObject):void} callback
 * @return {promise}
 */
methods.wordsOfTheDay = (callback) => {
  return (!callback ? promises.wordsOfTheDay() : callbacks.wordsOfTheDay(callback))
}

module.exports = methods
