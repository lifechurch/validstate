# Contribution Guide

Validstate is one of Life.Church's first Open Source projects as part of our [opendigerati](https://www.opendigerati.com/) initiative. 
Because of this we are continuously trying to improve the process for contributing to our projects. 
This document outlines our current process, but please check back here every time you wish to contribute. 

## Open Development
All work on Validstate happens directly on GitHub. Both Life.Church team members and external contributors send pull requests which go through the same review process.

## Branch Organization
We will do our best to keep the master branch in good shape, with tests passing at all times. But in order to move fast, we will make API changes that your application might not be compatible with. We recommend that you use the latest stable version of Validstate in your application.
If you send a pull request, please do it against the master branch. We maintain stable branches for major versions separately but we don’t accept pull requests to them directly. Instead, we cherry-pick non-breaking changes from master to the latest stable major version.

## Semantic Versioning
Validstate follows [semantic versioning](http://semver.org/). We release patch versions for bugfixes, minor versions for new features, and major versions for any breaking changes. When we make breaking changes, we also introduce deprecation warnings in a minor version so that our users learn about the upcoming changes and migrate their code in advance.

We tag every pull request with a label marking whether the change should go in the next patch, minor, or a major version. 

Every significant change is documented in the [changelog](./CHANGELOG.md) file.

## Bugs
### Where to Find Known Issues
We are using GitHub Issues for our public bugs. We keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new task, try to make sure your problem doesn’t already exist.

### Reporting New Issues
When reporting new issues, please be as detailed as possible and provide the following:
* Version of Validstate
* Version of React
* Version of Redux
* Steps to Reproduce the Bug
* Any steps you have tried to resolve the issue

### Security Bugs
For bugs dealing with security vulnerabilities please **do not** post a public issue. Please email the code maintainers @wintheday or @CodyMcMichael. 

### Proposing a Change
If you intend to change the API, add a new validator, or make any non-trivial changes to the implementation, we recommend filing an issue. This lets us reach an agreement on your proposal before you put significant effort into it.
If you’re only fixing a bug, it’s fine to submit a pull request right away but we still recommend to file an issue detailing what you’re fixing. This is helpful in case we don’t accept that specific fix but want to keep track of the issue.

### Your First Pull Request
If this is your first ever Pull Request we are honored you have chosen to join Open Source through our community. You can learn the basics of Github and how Pull Requests work from this free video series:
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

### Sending a Pull Request
The code maintainers are monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation. For breaking changes we may need to fix our internal uses of Validstate, which could cause some delay. We’ll do our best to provide updates and feedback throughout the process.

#### Before submitting a pull request, please make sure the following is done:
1. Fork the repository and create your branch from master.
2. Run `npm install` from the repository root.
3. If you’ve fixed a bug or added code that should be tested, add tests!
4. Ensure the test suite passes `npm test`. 
