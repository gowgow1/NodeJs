import fs from 'fs';
import csv from 'csvtojson';

const csvFilePath = './csv/nodejs-hw1-ex1.csv';
const txtFilePath = './csv/example.txt';

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);

readStream.pipe(csv()).pipe(writeStream);

readStream.on('error', error => console.error('Error readstream:', error));
writeStream.on('error', error => console.error('Error writestream', error));