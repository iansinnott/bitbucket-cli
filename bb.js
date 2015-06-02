#!/usr/bin/env node --harmony

var app = require('commander');

var package = require('./package.json');

app
  .version(package.version)
  .command('create [name]', 'Create a new repository with [name]')
  .command('list', 'List all repositories you own')
  .parse(process.argv);
