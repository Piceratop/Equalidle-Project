const readline = require('readline');
const fs = require('fs');

// Specify the file path
const filePath = './test.txt';

// Create a readable stream
const stream = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false
});

// Read each line and log it to the console
stream.on('line', (line) => {
    console.log(line);
});

// Handle end of file event
stream.on('close', () => {
    console.log('Finished reading the file.');
});
