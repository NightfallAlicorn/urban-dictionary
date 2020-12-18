# urban-dictionary
[![contributions](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![status](https://img.shields.io/badge/status-stable-brightgreen.svg)]()

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

[![NPM](https://nodei.co/npm/urban-dictionary.png)](https://npmjs.org/package/urban-dictionary)


Badges from: [NodeICO](https://nodei.co), [standard JS](https://standardjs.com) and [Shields IO](http://shields.io)

---

* [What's New](#what's-new)
* [Installing](#installing)
* [Actions](#actions)
  * [autocompleteExtra](#autocomplteExtra)
  * [autocomplete](#autocomplete)
  * [defid](#defid)
  * [random](#random)
  * [term](#term)
  * [wordsOfTheDay](#wordsOfTheDay)
* [FAQ](#faq)
* [Object Dictionary](#object-dictionary)
  * [AutocompleteExtraObject](#AutocompleteExtraObject)
  * [DefinitionObject](#DefinitionObject)

---

## What's New

* Rewritten the module with more ES6 features.
* Module size has been reduced slightly.
* New methods have been added with the help from [this](https://github.com/NightfallAlicorn/urban-dictionary/issues/8) posted issue.
  * `autocompleteExtra` 
  * `autocomplete`
  * `words_of_the_day`
* At some point. Urban had stopped providing `sounds` and `tags` with certain methods. These have been removed from the module.
* The code has been updated to reflect on [StandardJS](https://standardjs.com/) new coding standards.
* Better layout and formatting of this README.md file.

## Installing

### Via NPM (Recommended)

Install Node.js with the NPM extra component. This is included by default during a default install on Windows. Then open your command terminal and use one of the following. Local is for the current project folder. Global will install and work on all your projects that require the module.

Local Install: `npm install urban-dictionary`

Global Install `npm install urban-dictionary -g`

Local Uninstall `npm uninstall urban-dictionary`

Global Uninstall `npm uninstall urban-dictionary -g`

### Via Downloadable Zip

Download the latest release from [GitHub](https://github.com/NightfallAlicorn/urban-dictionary/releases) and extract the urban-dictionary.js into your project folder. Beware that you have got to `require('./urban-dictionary')` with the `./` prefix for local directory when you install by zip.

## Actions

### autocomplete

Use this to retrieve an array up to 20 search suggested strings.

*Arguments*

* `term` **String** The term to lookup.
* `callback` **Function**
    * `error` **Error** if there's an error else **null**.
    * `data` **Array of String**

*Return*

* `return` **Promise**
    * `then` **Array of String**
    * `catch` **Error**

E.g.

```javascript
'use strict'

const ud = require('../urban-dictionary')

// Callback
ud.autocomplete('test', (error, results) => {
  if (error) {
    console.error(`autocomplete (callback) error - ${error.message}`)
    return
  }

  console.log('autocomplete (callback)')

  console.log(results.join(', '))
})

// Promise
ud.autocomplete('test').then((results) => {
  console.log('autocomplete (promise)')

  console.log(results.join(', '))
}).catch((error) => {
  console.error(`autocomplete (promise) - error ${error.message}`)
})
```

### autocompleteExtra

Use this to retrieve an array up to 20 search suggested [AutocompleteExtraObject](#AutocompleteExtraObject) that contain a preview and suggested term.

*Arguments*

* `term` **String** The term to lookup.
* `callback` **Function**
    * `error` **Error** if there's an error else **null**.
    * `data` **Array of [AutocompleteExtraObject](#AutocompleteExtraObject]**

*Return*

* `return` **Promise**
    * `then` **Array of [AutocompleteExtraObject](#AutocompleteExtraObject]**
    * `catch` **Error**

E.g.

```javascript
'use strict'

const ud = require('../urban-dictionary')

// Callback
ud.autocompleteExtra('test', (error, results) => {
  if (error) {
    console.error(`autocomplete (callback) - ${error.message}`)
    return
  }

  console.log('autocompleteExtra (callback)')

  results.forEach(({ preview, term }) => {
    console.log(`${term} - ${preview}`)
  })
})

// Promise
ud.autocompleteExtra('test').then((results) => {
  console.log('autocompleteExtra (promise)')

  results.forEach(({ preview, term }) => {
    console.log(`${term} - ${preview}`)
  })
}).catch((error) => {
  console.error(`autocomplete (promise) - ${error.message}`)
})
```

### define

Use this to retrieve an array up to 10 [DefinitionObject](#DefinitionObject).

*Arguments*

* `term` **String** The definition to lookup.
* `callback` **Function**
    * `error` **Error** If there's an error else **null**.
    * `definitions` **Array of [DefinitionObject](#DefinitionObject)**

*Return*

* `return` **Promise**
    * `then` **Array of [DefinitionObject](#DefinitionObject)**
    * `catch` **Error**

E.g.

```javascript
'use strict'

const ud = require('../urban-dictionary')

ud.define('test').then((results) => {
  console.log('define (promise)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
}).catch((error) => {
  console.error(`define (promise) - error ${error.message}`)
})

ud.define('test', (error, results) => {
  if (error) {
    console.error(`define (callback) error - ${error.message}`)
    return
  }

  console.log('define (callback)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
})
```

### getDefinitionByDefid

Use this to retrieve a specific definition by its defid.

*Arguments*

* `defid` **Number** The definition defid to retrieve.
* `callback` **Function**
    * `error` **Error** if there's an error else **null**.
    * `definition` **[DefinitionObject](#DefinitionObject)**

*Return*

* `return` **Promise**
    * `then` **[DefinitionObject](#DefinitionObject)**
    * `catch` **Error**

E.g.

```javascript
'use strict'

const ud = require('../urban-dictionary')

// Callback
ud.getDefinitionByDefid(217456, (error, result) => {
  if (error) {
    console.error(`getDefinitionByDefid (callback) error - ${error.message}`)
    return
  }

  console.log('getDefinitionByDefid (callback)')

  Object.entries(result).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
})

// Promise
ud.getDefinitionByDefid(217456).then((result) => {
  console.log('getDefinitionByDefid (promise)')

  Object.entries(result).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
}).catch((error) => {
  console.error(`getDefinitionByDefid (promise) - error ${error.message}`)
})
```

### random

Use this to obtain a random definition.

Due to the way that Urban Dictionary's API works. It will in fact retrieve 10 definitions at once. This action will store all 10 in a cache on first use and provide them 1 at a time on each use. Each entry that gets provided gets removed from the cache. Once all the entries have been provided, it will retrieve another 10 once the cache is empty. Until all the entries have been provided, all the definitions that are currently stored in the cache are provided first.

*Arguments*

* `callback` **Function**
    * `error` **Error** If there's an error else **null**.
    * `entry` **[Definition Object](#definition-object)**

*Return*

* `return` **Promise**
    * `then` **[Definition Object](#definition-object)**
    * `catch` **Error**

E.g.

```javascript
'use strict'

const ud = require('urban-dictionary')

// Callback example.
ud.random((error, entry) => {
  if (error) {
    console.error(error.message)
  } else {
    console.log(entry.word)
    console.log(entry.definition)
    console.log(entry.example)
  }
})

// Promise example.
ud.random().then((result) => {
  console.log(result.word)
  console.log(result.definition)
  console.log(result.example)
}).catch((error) => {
  console.error(error.message)
})
```

## FAQ

* Q: Where did you get the URL to access Urban Dictionary's API? They hadn't got a documented page.
    * A: I just found them floating around on the web years ago. I don't have a source, sorry.
* Q: Are there any more methods?
    * A: Sorry. But these are the only URLs I'm aware of:
        * `http://api.urbandictionary.com/v0/define` with `?term=WORD_HERE` or `?defid=DEFID_HERE`
        * `http://api.urbandictionary.com/v0/random`
* Q: If they haven't documented it. Are we even allowed to use their site API?
    * A: I don't really know the answer. However, sites nowadays use an authorization name and password in the URL queries to restrict their API access to certain individuals. If Urban Dictionary didn't want others using it, they would had done so by now. In short: As long as we don't abuse the API to spam requests, we should be fine.
* Q: Why use StandardJS coding style?
    * A: There are many different coding rules of JavaScript being used today. Since this standard is being used by many packages and is becoming common on github. I've decided to start using it myself and quickly started to like it. It saves time by not having to worry which rules to follow or finding ways around strict styles such as JSLint.
* Q: One of the methods isn't working?
    * A: Give it a day or two. The chances are that something had gone down on urbandictionary.com API server. It has happened before after I thought they removed one of their URL methods. If it's still not working after two days, post an [issue](https://github.com/NightfallAlicorn/urban-dictionary/issues) and I'll check it out.
* Q: Is it possible to use both callback and promise at the same time?
    * A: This feature is no longer available and was removed after v2.1.1 since it created poor coding practices.

## Object Dictionary

### AutocompleteExtraObject

| Name    | Type   | Explanation                               |
| :-      | :-     | :-                                        |
| preview | String | An example usage of the term possibility. |
| term    | String | An auto complete term possibility.        |

### DefinitionObject

**Be aware that the `date` property is only available for the `wordsOfTheDay` method.**

| Name         | Type   | Explanation                                                                                     |
| :-           | :-     | :-                                                                                              |
| author       | String | Name of the definition poster.                                                                  |
| current_vote | String | Unknown.                                                                                        |
| date         | String | The date when this definition was posted on Words of the Day.                                   |
| defid        | Number | The unique ID for this definition.                                                              |
| definition   | String | An explanation of the term.                                                                     |
| example      | String | An example usage of the definition.                                                             |
| permalink    | String | Link to the definition page.                                                                    |
| sound_urls   | Array  | Presumably an Array of Strings containing URLs. I hadn't seen any results with any data though. |
| thumbs_down  | Number | The number of declined votes for the definition.                                                |
| thumbs_up    | Number | The number of accepted votes for the definition.                                                |
| word         | String | Word used to find this definition.                                                              |
| written_on   | String | The date the definition was posted. Format: "[YYYY]-[MM]-[DD]T[HH]:[MM]:[SS].[MMM][Z]"          |
