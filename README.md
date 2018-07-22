# urban-dictionary
[![contributions](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![status](https://img.shields.io/badge/status-stable-brightgreen.svg)]()

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

[![NPM](https://nodei.co/npm/urban-dictionary.png)](https://npmjs.org/package/urban-dictionary)


Badges from: [NodeICO](https://nodei.co), [standard JS](https://standardjs.com) and [Shields IO](http://shields.io)

---

## Installing

### Via NPM (Recommended)

Install Node.js with the NPM extra component. This is included by default during a default install on Windows. Then open your command terminal and use one of the following. Local is for the current project folder. Global will install and work on all your projects that require the module.

Local Install: `npm install urban-dictionary`

Global Install `npm install urban-dictionary -g`

Local Uninstall `npm uninstall urban-dictionary`

Global Uninstall `npm uninstall urban-dictionary -g`

### Via Downloadable Zip

Download the latest release from [GitHub](https://github.com/NightfallAlicorn/urban-dictionary/releases) and extract the urban-dictionary.js into your project folder. Beware that you have got to `require('./urban-dictionary')` with the `./` prefix for local directory when you install by zip.

---

* [Installing](#installing)
* [Actions](#actions)
    * [defid](#defid)
    * [random](#random)
    * [term](#term)
* [FAQ](#faq)
* [Object Dictionary](#object-dictionary)

## Actions

### defid
Use this to retrieve a specific definition entry by defid.

*Arguments*

* `id` **Number** The definition entry to retrieve.
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

var id = 217456

// Callback example.
ud.defid(id, (error, entry) => {
  if (error) {
    console.error(error.message)
  } else {
    console.log(entry.word)
    console.log(entry.definition)
    console.log(entry.example)
  }
})

// Promise example.
ud.defid(id).then((result) => {
  console.log(result.word)
  console.log(result.definition)
  console.log(result.example)
}).catch((error) => {
  console.error(error.message)
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

### term
Use this to retrieve a specific definition.

*Arguments*

* `definition` **String** The definition to search for.
* `callback` **Function**
    * `error` **Error** If there's an error else **null**.
    * `entries` **Array of [Definition Object](#definition-object)**
    * `tags` **Array of String** Tags of related words.
    * `sounds` **Array of String** Full link addresses to `.mp3` and `.wav` files.

*Return*

* `return` **Promise**
    * `then` **Object**
      * `entries` **Array of [Definition Object](#definition-object)**
      * `tags` **Array of String** Tags of related words.
      * `sounds` **Array of String** Full link addresses to `.mp3` and `.wav` files.
    * `catch` **Error**

E.g.

```javascript
'use strict'

const ud = require('urban-dictionary')

var definition = 'word'

// Callback example.
ud.term(definition, (error, entries, tags, sounds) => {
  if (error) {
    console.error(error.message)
  } else {
    console.log(entries[0].word)
    console.log(entries[0].definition)
    console.log(entries[0].example)
  }
})

// Promise example.
ud.term(definition).then((result) => {
  const entries = result.entries
  console.log(entries[0].word)
  console.log(entries[0].definition)
  console.log(entries[0].example)
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
* Q: Why use standardjs coding style?
    * A: There are many different coding rules of JavaScript being used today. Since this standard is being used by many packages and is becoming common on github. I've decided to start using it myself and quickly started to like it. It saves time by not having to worry which rules to follow or finding ways around strict styles such as JSLint.
* Q: One of the methods isn't working?
    * A: Give it a day or two. The chances are that something had gone down on urbandictionary.com API server. It has happened before after I thought they removed one of their URL methods. If it's still not working after two days, post an [issue](https://github.com/NightfallAlicorn/urban-dictionary/issues) and I'll check it out.
* Q: Is it possible to use both callback and promise at the same time?
    * A: Yes. However, it's not recommended. Do note that if you do decide to use them both, callback will run first before the promise.

## Object Dictionary

### Definition Object

* `author` **String** Name of the poster.
* `current_vote` **String** Unknown. It only returns an empty string.
* `defid` **Number** The unique definition entry ID.
* `definition` **String** The definition description.
* `example` **String** An example use of the definition.
* `permalink` **String** A shortened link to Urban Dictionary page of the definition.
* `thumbs_down` **Number** Number of down votes.
* `thumbs_up` **Number** Number of up votes.
* `word` **String** The word of the definition. Be aware that the casing might be different.
