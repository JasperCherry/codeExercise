'use strict'

const mainFunctions = require('./mainFunctions');
const expect = require('chai').expect

describe('mainFunctions module', () => {

  describe('parseUrl function', () => {
    it('should confirm existance of parseUrl function', () => {
      expect(mainFunctions.parseUrl).to.be.a('function')
    })
    it('return the text from a querystring', () => {
      expect(mainFunctions.parseUrl("/?text=I%20like%20trains")).to.be.eql('I like trains')
    })
    it('return the text from a querystring, one word only', () => {
      expect(mainFunctions.parseUrl("/?text=random")).to.be.eql('random')
    })
    it('return empty string', () => {
      expect(mainFunctions.parseUrl("/?text=")).to.be.eql('')
    })
  })

  describe('loadDictionary function', () => {
    it('should confirm existance of loadDictionary function', () => {
      expect(mainFunctions.loadDictionary).to.be.a('function')
    })
    it('should return array of strings', () => {
      expect(mainFunctions.loadDictionary('phrases')).to.be.an('array')
    })
  })

  describe('searchPhrases function', () => {
    var testDictionary = ["cat", "dog", "solenya"];
    it('should confirm existance of searchPhrases function', () => {
      expect(mainFunctions.searchPhrases).to.be.a('function')
    })
    var testString1 = "I have a cat. Also have a dog. I like cats but cats dont like dogs. Not many cats around since solenya arrived.";
    it('should return all 3 words', () => {
      expect(mainFunctions.searchPhrases(testDictionary, testString1)).to.be.eql(['cat', 'dog', 'solenya'])
    })
    var testString2 = "dog cats Cat";
    it('should return one word only as other dont match perfectly', () => {
      expect(mainFunctions.searchPhrases(testDictionary, testString2)).to.be.eql(['dog'])
    })
    var testString3 = "Some words cat. Some words dog, Some words solenya";
    it('should return all 3 words', () => {
      expect(mainFunctions.searchPhrases(testDictionary, testString3)).to.be.eql(['cat', 'dog', 'solenya'])
    })
    var testString4 = "some wordcat";
    it('should return empty array as word do not match perfectly', () => {
      expect(mainFunctions.searchPhrases(testDictionary, testString4)).to.be.eql([])
    })
  })

  describe('removeDuplicates function', () => {
    it('should confirm existance of removeDuplicates function', () => {
      expect(mainFunctions.removeDuplicates).to.be.a('function')
    })
    var testArray1 = ['one', 'one', 'two', 'three', 'two']
    it('should return number 3 of array length', () => {
      expect(mainFunctions.removeDuplicates(testArray1).length).to.be.eql(3)
    })
    var testArray2 = []
    it('should return empty array', () => {
      expect(mainFunctions.removeDuplicates(testArray2)).to.be.eql([])
    })
  })

})
