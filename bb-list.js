#!/usr/bin/env node --harmony

var app = require('commander');

app.parse(process.argv);

if (app.args.length) {
  console.error('list takes no arguments');
  process.exit(1);
}

/**
 * List all my repositories.
 * TODO: Really not sure what URL would make this work. Check out v2 of the api
 * docs.
 */

console.log('Listing all repositories');
