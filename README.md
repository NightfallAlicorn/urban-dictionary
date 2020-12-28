# urban-dictionary

[![contributions](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![github-issue](https://img.shields.io/github/issues/NightfallAlicorn/urban-dictionary)](https://github.com/NightfallAlicorn/urban-dictionary/issues)
[![npm-license](https://img.shields.io/npm/l/urban-dictionary)](LICENSE)
[![npm-version](https://img.shields.io/npm/v/urban-dictionary)](https://www.npmjs.com/package/urban-dictionary)
[![npm-downloads](https://img.shields.io/npm/dm/urban-dictionary)](https://www.npmjs.com/package/urban-dictionary)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Badges from: [NodeICO](https://nodei.co), [standard JS](https://standardjs.com) and [Shields IO](http://shields.io)

* [What's New](#whats-new)
* [Installing](#installing)
* [Actions](#actions)
  * [autocompleteExtra](#autocompleteExtra)
  * [autocomplete](#autocomplete)
  * [define](#define)
  * [getDefinitionByDefid](#getDefinitionByDefid)
  * [random](#random)
  * [wordsOfTheDay](#wordsOfTheDay)
* [FAQ](#faq)
* [Object Dictionary](#object-dictionary)
  * [AutocompleteExtraObject](#AutocompleteExtraObject)
  * [DefinitionObject](#DefinitionObject)

## What's New

**v3.0.0**

* Module rewritten with more up-to-date ES6 features.
* Module size has been reduced slightly.
* New methods have been added with the help from [this](https://github.com/NightfallAlicorn/urban-dictionary/issues/8) posted issue.
  * [autocompleteExtra](#autocompleteExtra) 
  * [autocomplete](#autocomplete)
  * [words_of_the_day](#words_of_the_day)
* At some point. Urban had stopped providing `sounds` and `tags` with certain methods. These have been removed from the module.
* The following methods have been renamed for clarity.
  * `defid` to [getDefinitionByDefid](#getDefinitionByDefid)
  * `term` to [define](#define)
* The code has been updated to reflect on [StandardJS](https://standardjs.com/) new standards.
* Better layout and formatting of this README.md file.
* Included [example.js](example.js) to be included in the npm package.
* For developers of this module.
  * I've removed `debug.js` and split the methods into separate .js files under [./test](./test) for easier debugging.
  * I've included a [urls.txt](./test/urls.txt) file under [./test](./test) for a list of known Urban URLs.
  * I've added some vscode automated project rules to make sure the tab spaces are correct.

Be sure to check the README.md (this document). Methods from v2.2.1 may will not work on v3.0.0.

## Installing

### Via NPM (Recommended)

Install Node.js with the NPM extra component. This is included by default during a default install on Windows. Then open your command terminal and use one of the following. Local is for the current project folder. Global will install and work on all your projects that require the module.

Local Install: `npm install urban-dictionary`

Global Install `npm install urban-dictionary -g`

Local Uninstall `npm uninstall urban-dictionary`

Global Uninstall `npm uninstall urban-dictionary -g`

If you're installing locally. Be sure to run `npm init` in the top directory of the project to avoid issues.

### Via Downloadable Zip

Download the latest release from [GitHub](https://github.com/NightfallAlicorn/urban-dictionary/releases) and extract the urban-dictionary.js into your project folder. Beware that you have got to `require('./urban-dictionary')` with the `./` prefix for local directory when you install by zip.

## Actions

### autocomplete

Use this to retrieve an array up to 20 search suggested strings.

*Arguments*

* `term` **String** The term to lookup.
* `callback` **Function**
    * `error` **Error** if there's an error else **null**.
    * `results` **Array of String**

*Return*

* `return` **Promise** if no **Function** is provided for `callback`.
    * `then` **Array of String**
    * `catch` **Error**

E.g.

```javascript
'use strict'

const ud = require('urban-dictionary')

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
    * `result` **Array of [AutocompleteExtraObject](#AutocompleteExtraObject)**

*Return*

* `return` **Promise** if no **Function** is provided for `callback`.
    * `then` **Array of [AutocompleteExtraObject](#AutocompleteExtraObject)**
    * `catch` **Error**

E.g.

```javascript
'use strict'

const ud = require('urban-dictionary')

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
    * `results` **Array of [DefinitionObject](#DefinitionObject)**

*Return*

* `return` **Promise** if no **Function** is provided for `callback`.
    * `then` **Array of [DefinitionObject](#DefinitionObject)**
    * `catch` **Error**

E.g.

```javascript
'use strict'

const ud = require('urban-dictionary')

// Callback
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

// Promise
ud.define('test').then((results) => {
  console.log('define (promise)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
}).catch((error) => {
  console.error(`define (promise) - error ${error.message}`)
})
```

### getDefinitionByDefid

Use this to retrieve a specific [DefinitionObject](#DefinitionObject) by its defid.

*Arguments*

* `defid` **Number** The definition defid to retrieve.
* `callback` **Function**
    * `error` **Error** if there's an error else **null**.
    * `result` **[DefinitionObject](#DefinitionObject)**

*Return*

* `return` **Promise** if no **Function** is provided for `callback`.
    * `then` **[DefinitionObject](#DefinitionObject)**
    * `catch` **Error**

E.g.

```javascript
'use strict'

const ud = require('urban-dictionary')

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

Use this to retrieve an array up to 10 random [DefinitionObject](#DefinitionObject).

*Arguments*

* `callback` **Function**
    * `error` **Error** If there's an error else **null**.
    * `results` **Array of [DefinitionObject](#DefinitionObject)**

*Return*

* `return` **Promise** if no **Function** is provided for `callback`.
    * `then` **Array of [DefinitionObject](#DefinitionObject)**
    * `catch` **Error**

E.g.

```javascript
'use strict'

const ud = require('urban-dictionary')

// Callback
ud.random((error, results) => {
  if (error) {
    console.error(`random (callback) error - ${error.message}`)
    return
  }

  console.log('random (callback)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
})

// Promise
ud.random().then((results) => {
  console.log('random (promise)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
}).catch((error) => {
  console.error(`random (promise) - error ${error.message}`)
})
```

### wordsOfTheDay

Use this to retrieve an array with 10 Words of the Day [DefinitionObject](#DefinitionObject).

*Arguments*

* `callback` **Function**
    * `error` **Error** If there's an error else **null**.
    * `results` **Array of [DefinitionObject](#DefinitionObject)**

*Return*

* `return` **Promise** if no **Function** is provided for `callback`.
    * `then` **Array of [DefinitionObject](#DefinitionObject)**
    * `catch` **Error**

E.g.

```javascript
'use strict'

const ud = require('urban-dictionary')

// Callback
ud.wordsOfTheDay((error, results) => {
  if (error) {
    console.error(`wordsOfTheDay (callback) error - ${error.message}`)
    return
  }

  console.log('wordsOfTheDay (callback)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
})

// Promise
ud.wordsOfTheDay().then((results) => {
  console.log('wordsOfTheDay (promise)')

  Object.entries(results[0]).forEach(([key, prop]) => {
    console.log(`${key}: ${prop}`)
  })
}).catch((error) => {
  console.error(`wordsOfTheDay (promise) - error ${error.message}`)
})
```

## FAQ

* Q: Where did you get the URL to access Urban Dictionary's API? They hadn't got a documented page.
    * A: I just found them floating around on the web years ago. I don't have a source, sorry.
* Q: Are there any more methods?
    * A: These are the only URL methods that I'm aware of: [test/urls.txt](test/urls.txt).
* Q: If they haven't documented it. Are we even allowed to use their site API?
    * A: I don't really know the answer. However, sites nowadays use an authorization name and password in the URL queries to restrict their API access to certain individuals. If Urban Dictionary didn't want others using it, they would had done so by now. In short: As long as we don't abuse the API to spam requests, we should be fine.
* Q: Why use StandardJS coding style?
    * A: There are many different coding rules of JavaScript being used today. Since this standard is being used by many packages and is becoming common on github. I've decided to start using it myself and quickly started to like it. It saves time by not having to worry which rules to follow or finding ways around strict styles such as JSLint.
* Q: One of the methods isn't working?
    * A: Give it a day or two. The chances are that api.urbandictionary.com is down. It has happened before after I thought they removed one of their URL methods. If it's still not working after two days, post an [issue](https://github.com/NightfallAlicorn/urban-dictionary/issues) and I'll check it out.
* Q: Is it possible to use both callback and promise at the same time?
    * A: This feature is no longer available and was removed after v2.1.1 since it leads to poor coding practices and should be avoided.

## Object Dictionary

### AutocompleteExtraObject

| Name    | Type   | Explanation                               |
| :-      | :-     | :-                                        |
| preview | String | An example usage of the term possibility. |
| term    | String | An auto complete term possibility.        |

### DefinitionObject

**Be aware that the `date` property is only available for the [wordsOfTheDay](#wordsOfTheDay) method.**

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
| word         | String | The term used to find this definition.                                                              |
| written_on   | String | The date the definition was posted. Format: "[YYYY]-[MM]-[DD]T[HH]:[MM]:[SS].[MMM][Z]"          |
