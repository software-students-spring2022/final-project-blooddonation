### How to run Javascript Unit Testing (WORK IN PROGRESS)

### What is Unit Testing and what does it do

* Unit Testing will allow us to check all small pieces of cide to deliver information and check the final result.Failure in a unit test shows without a doubt which part of the code doesn’t work.

### What the test is for

The goal of the unit test is to make your tests:
-Readable
-Maintainable
-Trustworthy

### Guidelines

* The goal of unit tests is to prove that the smallest unit of code behaves exactly as you expect in isolation.
-Each test should have a unique name clearly stating what unit is being tested.
-Each test should test only one unit per test, although one test can include several assertions. Create multiple tests for multiple units of functionality.
-Each test should follow the project's JavaScript Code Guidelines


### Testing
 The testing for the backend of the project will be done using **Mocha** and **Chai**

 If you want to test code in the browser using these mentioned tool, do the following , 
 
 run npm install mocha chai --save-dev
 npm install -g mocha

* This installs the packages mocha and chai. Mocha is the library that allows us to run tests, and Chai contains some helpful functions that we’ll use to verify our test results.
 
* to unit test your application, you need to include Chai, by using **var chai = require('chai');** at the top of the test file.
* You can run the tests using the **mocha** command, instead if opening a browser.

* We use Mocha's CSS styles to help us give our tests the correct formatting.
* The testing files will be stored in setuptests

In order to help you write test names properly, you can use the "unit of work - scenario/context - expected behaviour" pattern:







### Run Test
To run test in the **frontend** directory, install by using **npm install** and launch by using **npm start**
To run Test in the **backend** directory, install by using **npm install** and launch by using **npm start**
