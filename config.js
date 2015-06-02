/* eslint-disable no-process-exit */

var path = require('path');
var _ = require('lodash');

var BASE_ENDPOINT = 'https://bitbucket.org/api/1.0';

var ENDPOINTS = {
  list: BASE_ENDPOINT + '/user/repositories',
  repositories: BASE_ENDPOINT + '/repositories'
};

var CREDENTIALS;

try {
  CREDENTIALS = require(path.join(process.env.HOME, '.bitbucketrc'));
} catch (e) {
  console.error("Error: Could not read configuration file at ~/.bitbucketrc");
  process.exit(1);
}

if (!CREDENTIALS.username || !CREDENTIALS.password) {
  console.error('It appears your username or password is not present in your ~/.bitbucketrc file. Please add a username and password and try again.');
  process.exit(1);
}

module.exports = _.extend({}, CREDENTIALS, { endpoints: ENDPOINTS });

