const { readFileSync } = require('fs')
const babelConfig = JSON.parse(readFileSync('./.babelrc', 'utf8'))
require('@babel/register')(babelConfig)
require('@babel/polyfill')

module.exports = {
  "testEnvironment": "node",
  "verbose": true,
  "transform": {
    "^.+\\.js?$": "babel-jest"
  },
  "testRegex": "(/test/.*|(\\.|/)(test))\\.(js?)$",
  "moduleFileExtensions": ["js"],
  "testPathIgnorePatterns": [
    "<rootDir>/test/setup.js",
    "<rootDir>/test/utils",
    "<rootDir>/test/seeds",
    "<rootDir>/test/fixtures",
    "<rootDir>/test/teardown.js",
    "<rootDir>/test/setupAfterEnv.js"
  ],
  "resetMocks": true,
  "globalSetup": "<rootDir>/test/setup.js",
  "globalTeardown": "<rootDir>/test/teardown.js",
  "setupFilesAfterEnv": [
    "<rootDir>/test/setupAfterEnv.js", 
  ] 
};