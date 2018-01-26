'use strict';
const micro = require('micro');
const {send} = require('micro');
const port = 8080;
const mainFunctions = require('./mainFunctions');

// loading phrases
var dictionary = mainFunctions.loadDictionary('phrases');

const server = micro(async (req, res) => {
  // parsing URL to get the string of text
  var textString = mainFunctions.parseUrl(req.url);
  // search phrases
  var matchedWords = mainFunctions.searchPhrases(dictionary, textString);
  // send back matched words
  send(res, 200, matchedWords);
})

server.listen(port);
console.log("Server is listening at port:" + port);
