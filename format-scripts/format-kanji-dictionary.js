var fs = require('fs')
var kanjiString = fs.readFileSync('kanji-dictionary.txt').toString()

var kanjiDictionary = {}

kanjiString
  .split('\n')
  .filter(line => line.length > 0)
  .map(line => {
    var [kanji, _, pronunciation, _, _, translations] = line.split('|')
    return {kanji, translation: [pronunciation, translations].filter(c => c.length > 0).join('; ')}
  }).forEach(entry => {
    kanjiDictionary[entry.kanji] = entry.translation
  })

fs.writeFileSync('kanji-dictionary.json', JSON.stringify(kanjiDictionary))
