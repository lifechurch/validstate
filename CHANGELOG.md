# Changelog

## Unreleased
* Ability to add custom validation messages on nested objects
* Adds requireGroup rule
* Adds elementOf rule
* Fix state properties cross reducer collision
* Find validstate reducer based on state default

## 1.1.3 - 2019-10-11
### Fixed
* Fixed a bug in the validations when an array was submitted as a validation value. It needs to be a comma-separted string instead.


## 1.1.2 - 2019-10-11
### Added
* Adds new excludes validation rule
* Adds tests
* Updates validstate docs
* Updates both gem and yarn packages

### Fixed
* Fixed a bug in the regex method where the `value` and `regex` arguments were out of order.

## 1.1.1 - 2018-12-16
### Changed
* Added the `/tests` and `/docs` directories to the `.npmignore` file

### Fixed
* Fixed a bug where the `/tests` and `/docs` directories were included in the build and causing the app to fail.

## 1.1.0 - 2018-09-04
### Added
* Adds the ability to run validations on nested objects (nth) levels deep.
* Adds validations for American phone numbers, credit cards, value includes, and regex.
* Updates [validstate docs](http://validstate.herokuapp.com) with new validations

### Changed
* Custom validation messages are not currently available on nested objects, only single level.

## 1.0.0 - 2017-11-01
* Initial Public Release
