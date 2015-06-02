#!/usr/bin/env node --harmony

'use strict';

/* eslint-disable camelcase,no-process-exit */

var app = require('commander');
var req = require('superagent');
require('colors');

var config = require('./config.js');

/**
 * Given a repository object returned from the server, parse it into a viable
 * bitbucket remote URL.
 *
 * Outputs something like: git@bitbucket.org:some-user/some-repo.git
 *
 * @param {object} repo Repository
 * @param {string} The remote url of the repo
 */
function buildRemoteURL(repo) {
  return [
    repo.scm, // => 'git
    '@bitbucket.org:',
    repo.owner, // => 'some-user'
    '/',
    repo.slug, // => 'some-repo'
    '.git'
  ].join('');
}

app
  .option('-P, --public', 'Make repository public [false]')
  .option('-D, --description', 'Repository description')
  .parse(process.argv);

var name = app.args[0];
var description = app.description || '';
var is_private = app.public ? false : true;

if (!name) {
  console.error('You must provide a repository name. Example:');
  console.error("\n\t$ bb create my-repo\n");
  process.exit(1);
}

req
  .post(config.endpoints.repositories)
  .send({
    name: name,
    description: description,
    is_private: is_private
  })
  .auth(config.username, config.password)
  .end(function(err, res) {
    if (err || !res.ok)
      return console.error('There was an error!!!', err.message);

    console.log(res.body.name.green, 'successfully created.', "\n");
    console.log('To get started, add the remote and push any existing code:', "\n");
    console.log("\tgit remote add origin %s", buildRemoteURL(res.body));
    console.log('\tgit push -u origin --all', "\n");
  });

/*
{
  scm: 'git',
  has_wiki: true|false,
  last_updated: 'date string',
  no_forks: true|false,
  forks_count: 0,
  created_on: 'date string',
  owner: 'username',
  logo: 'logo url',
  email_mailinglist: '',
  is_mq: true|false,
  size: 0,
  read_only: true|false,
  fork_of: null,
  mq_of: null,
  state: 'creating',
  utc_created_on: 'date string',
  website: '',
  description: '',
  has_issues: true|false,
  is_fork: true|false,
  slug: 'repo slug',
  is_private: true|false,
  name: 'repo name',
  language: '',
  utc_last_updated: 'date-string',
  email_writers: true|false,
  no_public_forks: true|false,
  creator: null,
  resource_uri: '/1.0/repositories/<username>/<slug>'
}
*/
