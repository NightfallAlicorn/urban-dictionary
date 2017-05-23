# urban-dictionary-node
[![build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![contributions](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](#contributing)
[![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)]()
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![status](https://img.shields.io/badge/status-stable-brightgreen.svg)]()

Badges from [Shields.io](http://shields.io)

* [Actions](#actions)
    * [random](#random)
    * [search](#search)
* [FAQ](#faq)
* [Object Dictionary](#object-dictionary)

## Actions

### random
Use this to obtain a random definiation.

Due to the way that Urban Dictionary's API works. It will in fact retrieve 10 definitions at once. This action will store all 10 in a cache on first use and provide them 1 at a time on each use. Each entry that gets provided gets removed from the cache. Once all the entries have been provided, it will retrieve another 10 once the cache is empty. Until all the entries have been provided, all the definitions that are currently stored in the cache are provided first.

*Arguments*

* `callback` **{Function}**
    * `entry` **{Array of Definition Object}**

E.g

```javascript
const ud = require('./UrbanDictionaryNode')

ud.random(function (entry) {
  if (!entry) {
    console.log('Unable to rearch urbandictionary.com for more definitions.')
  } else {
    console.log(entry.word)
    console.log(entry.definition)
    console.log(entry.example)
  }
})
```

### search
Use this to manually retrieve an already existing definition.

*Arguments*

* `definition` **{String}** The definition to search for.
* `callback` **{Function}**
    * `entries` **{Array of Definition Objects}**
    * `tags` **{Array of String}** Tags of related words.
    * `sounds` **{Array of String}** Full link addresses to `.mp3` and `.wav` files.

E.g

```javascript
const ud = require('./UrbanDictionaryNode')

var definition = "word"

ud.search(definition, function (entries, tags, sounds) {
  if (!entry) {
    console.log(definition + ' is not defined.')
  } else {
    console.log(entries[0].word)
    console.log(entries[0].definition)
    console.log(entries[0].example)
  }
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

## Object Dictionary

* **Definition Object**
    * `author` **{String}** Name of the poster.
    * `current_vote` **{String}** Unknown. It only returns an empty string.
    * `defid` **{Number}** The unique definition entry ID.
    * `definition` **{String}** The definition description.
    * `example` **{String}** An example use of the definition.
    * `permalink` **{String}** A shortened link to Urban Dictionary page of the definition.
    * `thumbs_down` **{Number}** Number of down votes.
    * `thumbs_up` **{Number}** Number of up votes.
    * `word` **{String}** The word of the definition. Be aware that the casing might be different.
