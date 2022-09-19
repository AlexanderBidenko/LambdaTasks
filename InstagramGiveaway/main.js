const fs = require('fs');
const readline = require('readline');

const existInAllFiles = require('./existInAllFiles');
const existInAtLeastTen = require('./existInAtLeastTen');
const uniqueValues = require('./uniqueValues');
const randomWinner = require('./randomWinner');


uniqueValues().then(result => console.log('uniqueValues:', result));
existInAllFiles().then(result => console.log('existInAllFiles:', result));
existInAtLeastTen().then(result => console.log('existInAtLeastTen:', result));

//Случайный победитель выбирается из тех кто есть хотя бы в 10 файлах (файлы выбираются в случайном порядке)
randomWinner().then(result => console.log('Today random winner is:', result));
