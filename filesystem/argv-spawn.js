'use strict';
const fs = require('fs');
const spawn = require('child_process').spawn;
const filename = process.argv[2];
const command = process.argv[3];
let args = process.argv.slice(4);


if (!filename) {
  throw Error('A file to watch must be specified!');
}

args.push(filename);

fs.watch(filename, () => {
  const ls = spawn(command, args);
  ls.stdout.pipe(process.stdout);
});

console.log(`Now watching ${filename} for changes...`);
