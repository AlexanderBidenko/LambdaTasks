import got from 'got';
import {strict as assert} from 'assert'
import { dataAnalytics } from '../src/dataAnalytics'
const fs = require("fs");
const os = require("os")

// interactionSimulation('./tests/test1in.txt', './tests/test1out.txt')

const testData1 =  ['Lorem',       'Ipsum',        'is',          'simply',      'dummy', 
'text',        'of',           'the',         'printing',    'and',   
'typesetting', 'industry.',    'Lorem',       'Ipsum',       'has',   
'been',        'the',          "industry's",  'standard',    'dummy', 
'text',        'ever',         'since',       'the',         '1500s,',
'when',        'an',           'unknown',     'printer',     'took',  
'a',           'galley',       'of',          'type',        'and',   
'scrambled',   'it',           'to',          'make',        'a',     
'type',        'specimen',     'book.',       'It',          'has',   
'survived',    'not',          'only',        'five',        'centuries,',
'but',         'also',         'the',         'leap',        'into',
'electronic',  'typesetting,', 'remaining',   'essentially', 'unchanged.',
'It',          'was',          'popularised', 'in',          'the',
'1960s',       'with',         'the',         'release',     'of',
'Letraset',    'sheets',       'containing',  'Lorem',       'Ipsum',
'passages,',   'and',          'more',        'recently',    'with',
'desktop',     'publishing',   'software',    'like',        'Aldus',
'PageMaker',   'including',    'versions',    'of',          'Lorem',
'Ipsum.']

const testData2 = ['1', '1234', '23', '44', '22', '111', '123450', '321', '2345', '5']
const testData3 = ['a', 'a', 'b', 'b', '1', '2', '1'] 





it("1. Words by name (from A to Z).", async () => {
    let res = new dataAnalytics().alphabetSort(testData1);
    let trueanswer = [
            '1500s,',      '1960s',     'a',           'a',            'Aldus',
            'also',        'an',        'and',         'and',          'and',
            'been',        'book.',     'but',         'centuries,',   'containing',
            'desktop',     'dummy',     'dummy',       'electronic',   'essentially',
            'ever',        'five',      'galley',      'has',          'has',
            'in',          'including', "industry's",  'industry.',    'into',
            'Ipsum',       'Ipsum',     'Ipsum',       'Ipsum.',       'is',
            'it',          'It',        'It',          'leap',         'Letraset',
            'like',        'Lorem',     'Lorem',       'Lorem',        'Lorem',
            'make',        'more',      'not',         'of',           'of',
            'of',          'of',        'only',        'PageMaker',    'passages,',
            'popularised', 'printer',   'printing',    'publishing',   'recently',
            'release',     'remaining', 'scrambled',   'sheets',       'simply',
            'since',       'software',  'specimen',    'standard',     'survived',
            'text',        'text',      'the',         'the',          'the',
            'the',         'the',       'the',         'to',           'took',
            'type',        'type',      'typesetting', 'typesetting,', 'unchanged.',
            'unknown',     'versions',  'was',         'when',         'with',
            'with']
    for (let i = 0; i++; i< res.length) {
        assert(res[i] === trueanswer[i])
    }    
})



it("2. Show digits from the smallest.", async () => {
    let res = new dataAnalytics().ascendingNumberSort(testData2)
    let trueanswer = [
        1,    5,   22,
       23,   44,  111,
      321, 1234, 2345,
   123450
    ]
    for (let i = 0; i++; i< res.length) {
        assert(res[i] === trueanswer[i])
    }
})



it("3. Show digits from the bigest.", async () => {
    let res = new dataAnalytics().descendingNumbersSort(testData2)
    let trueanswer = [
        123450, 2345, 1234,
           321,  111,   44,
            23,   22,    5,
             1
      ]
    for (let i = 0; i++; i< res.length) {
        assert(res[i] === trueanswer[i])
    }
})



it("4. Words by quantity of leters.", async () => {
    let res = new dataAnalytics().quantityOfLetersSort(testData1)
    let trueanswer = ['a',            'a',          'is',          'of',          'an',
        'of',           'it',         'to',          'It',          'It',
        'in',           'of',         'of',          'the',         'and',
        'has',          'the',        'the',         'and',         'has',
        'not',          'but',        'the',         'was',         'the',
        'the',          'and',        'text',        'been',        'text',
        'ever',         'when',       'took',        'type',        'make',
        'type',         'only',       'five',        'also',        'leap',
        'into',         'with',       'more',        'with',        'like',
        'Lorem',        'Ipsum',      'dummy',       'Lorem',       'Ipsum',
        'dummy',        'since',      'book.',       '1960s',       'Lorem',
        'Ipsum',        'Aldus',      'Lorem',       'simply',      '1500s,',
        'galley',       'sheets',     'Ipsum.',      'unknown',     'printer',
        'release',      'desktop',    'printing',    'standard',    'specimen',
        'survived',     'Letraset',   'recently',    'software',    'versions',
        'industry.',    'scrambled',  'remaining',   'passages,',   'PageMaker',
        'including',    "industry's", 'centuries,',  'electronic',  'unchanged.',
        'containing',   'publishing', 'typesetting', 'essentially', 'popularised',
        'typesetting,'
      ]
    for (let i = 0; i++; i< res.length) {
        assert(res[i] === trueanswer[i])
    }
})



it("5. Only unique words.", async () => {
    let res = new dataAnalytics().findUniqueWords(testData3);
    assert(res.size === 2)
})
it("6. Only unique numbers.", async () => {
    let res = new dataAnalytics().findUniqueNumbers(testData3)
    assert(res.size === 2)    
})
it("7. Unique values", async () => {
    let res = new dataAnalytics().findUniqueValues(testData3)
    assert(res.size === 4)
})
