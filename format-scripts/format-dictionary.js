var fs = require('fs')

var dictionaryText = fs.readFileSync('dictionary.txt').toString()

// I'm keeping track of the total amount of repeats and all the words that 
// have repeats so that I can look at the dictionary's information.
var repeats = {}
var repeatCount = 0

var createDictionary = dictionaryText => {
  // The dictionary is going to have Japanese words as keys and an array
  // of the English translations as the values.
  var dictionary = {}

  dictionaryText
    .split('\n')
    .filter(line => line.length > 0)
    .forEach(line => {
      // Assumption: the Japanese word has no spaces in it
      var [japaneseWord, ...otherWords] = line.trim().split(' ')

      if (dictionary[japaneseWord]) {
        repeats[japaneseWord] = (repeats[japaneseWord] || 0) + 1
        repeatCount += 1
      }

      dictionary[japaneseWord] = (dictionary[japaneseWord] || []).concat(otherWords.join(' ').replace(/["`\\]/g, ''))
    })

  return dictionary
}

var dictionary = createDictionary(dictionaryText)

var maxRepeats = Object.keys(repeats).reduce((max, word) => {
  if (max === undefined || repeats[word] > max.count) {
    return {count: repeats[word], text: word}
  } else {
    return max
  }
}, undefined)

console.log(Object.keys(dictionary).length)
console.log('unique repeat count: ' + Object.keys(repeats).length)
console.log('max repeat, count: ' + maxRepeats.count + ', word: ' + maxRepeats.text)
console.log('total repeat count: ' + repeatCount)
// Looking at a typical dictionary entry
console.log('首:\n' + dictionary['首'].join('\n----\n'))

fs.writeFileSync('dictionary.json', JSON.stringify(dictionary))
var dict = JSON.parse(fs.readFileSync('dictionary.json').toString())
