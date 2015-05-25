#!/usr/bin/env node --harmony

var app = require('commander');

var config = require('./package.json');

app
  .version(config.version)
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add cheese of a specific type [swiss]', 'swiss')
  .parse(process.argv);

console.log('You ordered pizza with:');
if (app.peppers) console.log("\t- peppers");
if (app.pineapple) console.log("\t- pineapple");
if (app.bbqSauce) console.log("\t- bbq-sauce");
console.log("\t- %s cheese", app.cheese);
