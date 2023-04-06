# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [unreleased]
### Added
### Changed
### Fixed
### Removed
### BREAKING CHANGES

## [2.0.2] - 2023-04-06

### Changed
- chore(deps): Update devDependencies

## [2.0.1] - 2022-12-07

### Changed
- chore(deps): Update devDependencies

## [2.0.0] - 2022-08-30

### Added
- docs: Add Webpack config alternative to docs

### Changed
- chore(deps): Update devDependencies

### Removed
- chore: Drop support for Node.js 10.x and 12.x. Add tests using Node.js 18.x.

## [1.2.0] - 2022-01-27

### Changed
- chore(#44): Add peerDependenciesMeta to make node-sass optional
- chore(deps): Update devDependencies
- chore: Use Node 16 in workflows

## [1.1.0] - 2021-12-06

### Added
- feat(#37). Support not defining a done callback. This happens when node-sass works in sync mode.

### Changed
- chore(#36): Support Node versions greater than 10.0.0
- chore(engines): Use NodeJs 16 and 17 to run tests in Windows in the workflow
- refactor: Refactor to make the code simpler
- chore(deps): Update devDependencies

### Removed
- docs: Remove broken npm dependencies badge

## [1.0.3] - 2021-12-06

### Changed
- chore(deps): Update devDependencies
- chore: Support any NodeJS version greater than 12.0.0
- test: Update NodeJS versions used in workflows

## [1.0.2] - 2021-05-29

### Changed
- chore(deps): Update devDependencies
- chore: Migrate Sonar project

## [1.0.1] - 2020-12-21
### Added
- chore(ci): Run tests in Windows OS in pipeline

### Changed
- chore(ci): Migrate from Travis CI to GitHub actions
- chore(deps): Support all Node.js releases that have not passed their end date
- chore(deps): Update devDependencies
- style(lint): Adapt code to new prettier version
- test(unit): Use Jest for unit tests
- chore(Sonar): Update Sonar config

### Fixed
- fix: Define imports on Windows using also / as path separator (#22)

## [1.0.0] - 2019-06-18
### Added
- First release
