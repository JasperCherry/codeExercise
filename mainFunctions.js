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
    // arrays for matched words and indexes where thy occur
    var matchesWords = [];
    var matchesIndexes = [];
    // search through dictionary for match
    for (var x = 0; x < dictionary.length; x++) {
      var foundIndex = textString.indexOf(dictionary[x]);
      // search the string until all indexes of occurance are found
      while (foundIndex != -1) {
        // the matched word is valid if first position after last character is equal to empty space, coma or dot,
        // or the last position of the word is also the last position of searched string
        if ((textString[foundIndex + dictionary[x].length] == '.') || (textString[foundIndex + dictionary[x].length] == ',') || (textString[foundIndex + dictionary[x].length] == ' ') || (foundIndex + dictionary[x].length == textString.length)) {
          // the first position before the word is equal to empty space, coma or dot
          // or the first position of the word is also first position of the searched string
          if ((textString[foundIndex - 1] == '.') || (textString[foundIndex - 1] == ',') || (textString[foundIndex - 1] == ' ') || (foundIndex == 0)) {
            var addNew = true;
            for (var z = 0; z < matchesIndexes.length; z++) {
              // if the index was already found, check if the matching word is longer then previous
              // if so, then replace it because the longer one is the correct one
              if (foundIndex == matchesIndexes[z] && dictionary[x].length > matchesWords[z].length) {
                matchesWords[z] = dictionary[x];
                addNew = false;
              }
            }
            // if the index of matched word is not in the array, add the matched word
            if (addNew) {
              matchesWords.push(dictionary[x]);
              matchesIndexes.push(foundIndex);
            }
          }
        }
        // redirect to new position in string to continue search in while loop
        foundIndex = textString.indexOf(dictionary[x], foundIndex + 1);
      }
    }
    // final output
    var finalWords = this.removeDuplicates(matchesWords);
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
