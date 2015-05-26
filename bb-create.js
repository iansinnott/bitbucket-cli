#!/usr/bin/env node --harmony

var app = require('commander');
var req = require('superagent');

var config = require('./config.js');

app
  .option('-P, --public', 'Make repository public')
  .parse(process.argv);

var name = app.args[0];

if (!name) {
  console.error('You must provide a repository name. Example:');
  console.error("\n\t$ bb create my-repo\n");
  process.exit(1);
}

req
  .post(config.repositories)
  .send({ name: name })
  .end(function(err, res) {
    if (!res.ok) {
      console.error('There was an error!!!');
      return;
    }

    console.log('Oh yay, everything is ok');
  });

console.log("You just created the '%s' repo", name);

if (app.public) console.log('you wanted to make this public');
