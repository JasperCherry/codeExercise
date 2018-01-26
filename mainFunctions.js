'use strict';
const url = require('url');

module.exports = {

  // loading all phrases from dictionary
  loadDictionary: function(inputFile) {
    var dictionary = [];
    const fs = require('fs');
    const readline = require('readline');
    const instream = fs.createReadStream(inputFile);
    const outstream = new(require('stream'))();
    const rl = readline.createInterface(instream, outstream);
    //console.log('Started loading phrases.');
    rl.on('line', function(line) {
      dictionary.push(line);
    });
    rl.on('close', function(line) {
      dictionary.push(line);
      //console.log('Phrases has been loaded');
    });
    return dictionary;
  },

  // parsing url querystring into text
  parseUrl: function(targetUrl) {
    var url_parts = url.parse(targetUrl, true);
    var textString = url_parts.query.text;
    return textString;
  },

  // searching for phrases in text (case sensitive)
  searchPhrases: function(dictionary, textString) {
    // arrays for matched words where thy occur
    var matchedWords = [];
    // search through dictionary for match
    for (var x = 0; x < dictionary.length; x++) {
      var foundIndex = textString.indexOf(dictionary[x]);
      // search the string until all occurance are found
      while (foundIndex != -1) {
        // the matched word is valid if first position after last character is equal to empty space, coma or dot,
        // or the last position of the word is also the last position of searched string
        if ((textString[foundIndex + dictionary[x].length] == '.') || (textString[foundIndex + dictionary[x].length] == ',') || (textString[foundIndex + dictionary[x].length] == ' ') || (foundIndex + dictionary[x].length == textString.length)) {
          // the first position before the word is equal to empty space, coma or dot
          // or the first position of the word is also first position of the searched string
          if ((textString[foundIndex - 1] == '.') || (textString[foundIndex - 1] == ',') || (textString[foundIndex - 1] == ' ') || (foundIndex == 0)) {
            // check if new matched string can be contain in other strings allready matched
            var checkFurther = true;
            for (var z = 0; z < matchedWords.length; z++) {
              if (matchedWords[z].indexOf(dictionary[x]) != -1) {
                checkFurther = false;
                break;
              }
            }
            // check if new matched string can contain other strings allready matched
            // set null all that can be found in the new one
            if (checkFurther) {
              for (var z = 0; z < matchedWords.length; z++) {
                if (dictionary[x].indexOf(matchedWords[z]) != -1) {
                  matchedWords[z] = null;
                }
              }
              matchedWords.push(dictionary[x]);
              var newMatchedWords = [];
              for (var d = 0; d < matchedWords.length; d++) {
                if (matchedWords[d] != null) {
                  newMatchedWords.push(matchedWords[d]);
                }
              }
              matchedWords = newMatchedWords;
            }
          }
        }
        // redirect to new position in string to continue search in while loop
        foundIndex = textString.indexOf(dictionary[x], foundIndex + 1);
      }
    }
    // final output
    var finalWords = this.removeDuplicates(matchedWords);
    // return final result, array of strings
    return finalWords;
  },

  // eliminate duplicated words from array
  removeDuplicates: function(wordsArray) {
    var finalArray = [];
    // loop through words array and match duplicated words as null
    for (var z = 0; z < wordsArray.length; z++) {
      for (var w = z + 1; w < wordsArray.length; w++) {
        if (wordsArray[z] == wordsArray[w]) {
          wordsArray[w] = null;
        }
      }
    }
    // push all positions other then null to final array
    for (var d = 0; d < wordsArray.length; d++) {
      if (wordsArray[d] != null) {
        finalArray.push(wordsArray[d]);
      }
    }
    return finalArray;
  }

}
