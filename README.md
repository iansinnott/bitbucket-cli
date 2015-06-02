# BitBucket CLI (Node.js)

This is a CLI for interacting with [BitBucket][bb].

[bb]: https://bitbucket.org/

Currently it only supports listing and creating repositories.

## Usage

List all your repositories (public & private):

```
$ bb list
```

Create a new private repo with a description:

```
$ bb create my-super-repo -D "This is the repo description"
```

To create a public repo, use the `-P` option:

```
$ bb create my-super-repo -P
```

## Full API

#### `list`

List all of your public and private repos:

```
$ bb list
```

`list` takes no options.

#### `create`

```
$ bb create [name] [options]
```

The name argument is required.

`create` has two options:

* `-D, --description [string]`: Specify the repository description. 
* `-P, --public`: Make the repository public (defaults to false)

**That's right.** Just _two_ commands.

### Other Options

#### `--version`

Display the version number.

#### `--help`

Display the help text.

## Authentication

To take actions on your behalf, the CLI needs your username and password. To give it the information it needs you have a number of options:

#### Configuration file

Create a `.bitbucketrc` file at your user root. On a Mac or Linux you could create the file with `touch`:

```
$ touch ~/.bitbucketrc
```

Then add the following configuration code to the file. Don't forget to use your own username and password, otherwise BitBucket will give you an authentication error.

```js
// ~/.bitbucketrc
module.exports = {
  username: '<your username or email here>',
  password: '<your password here>'
};
```

#### Using environment variables:

```
$ export BITBUCKET_USERNAME=<username>
$ export BITBUCKET_PASSWORD=<password>
$ bb create some-repo
```

#### Inline environment variables

```
$ BITBUCKET_USERNAME=<username> BITBUCKET_PASSWORD=<password> bb list
```

With this approach, you will have to write our your username and password every time, but you could always create an alias if you prefer.

#### A note on storing plain-text passwords

It's not a good idea to store plane-text passwords on your computer in case someone gained access to your hard drive. That being said, it really adds a lot of convenience, so just no the risks if you decide to store your password anywhere on your system in a human-readable form.

This script will never store your password and it only ever sends it to BitBucket. If you're not convinced feel free to read the code. As of this writing its only a few hundred lines so it should be a really quick read :)

## Infrequently Asked Questions

**Q:** Will this ever support OAuth instead of Basic Auth

**A:** Maybe! I just wanted to get something up and running quickly and using Basic Auth was the best way to do that.


**Q:** There are other CLIs out there, why build a new one?

**A:** Initially I didn't find one for Node.js.


**Q:** Is this affiliated with BitBucket or Atlassian in any way?

**A:** Nope. I'm pretty sure they would implement more than two commands if they rolled their own CLI. They also probably wouldn't host it on GitHub. :wink:


**Q:** Why is this hosted on GitHub?

**A:** Because GitHub already has an [outstanding CLI tool][hub] for making repositories on the fly.

[hub]: https://hub.github.com/
