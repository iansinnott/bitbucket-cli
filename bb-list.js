#!/usr/bin/env node --harmony
'use strict';

var app = require('commander');
var request = require('superagent');

var config = require('./config.js');

app.parse(process.argv);

if (app.args.length) {
  console.error('The list command takes no arguments');
  process.exit(1);
}

/**
 * List all my repositories.
 */
request
  .get(config.endpoints.list)
  .auth(config.username, config.password)
  .end(function(err, res) {
    if (!res.ok) {
      console.error('There was an error!!!', err.message);
      return;
    }
    res.body.forEach(function(repo, i) {
      console.log('%s (%s/%s)', repo.name, repo.owner, repo.slug);
    });
  });

console.log('Listing all repositories');

/*

 Response body looks like looks like:

 [ {
  scm: 'git',
  has_wiki: true|false,
  last_updated: 'string date
  no_forks: true|false,
  created_on: 'string date',
  owner: 'owner name',
  logo: 'repository logo url',
  email_mailinglist: '',
  is_mq: true|false,
  size: Number,
  read_only: true|false,
  fork_of: null,
  mq_of: null,
  state: 'available',
  utc_created_on: 'string date',
  website: '',
  description: 'string description',
  has_issues: true|false,
  is_fork: true|false,
  slug: 'bitbucket slug',
  is_private: true|false,
  name: 'BitBucket CLI',
  language: 'javascript',
  utc_last_updated: 'string date',
  email_writers: true,
  no_public_forks: true|false,
  creator: null,
  resource_uri: '/1.0/repositories/<username>/<slug>' },
  { ... },
  etc
 *
*/

