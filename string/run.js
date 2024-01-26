/**
 * Run test function for string functions in nodejs.
 */
import StringTest from './string.js';
import StringRunTest from './test.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const stringTest = new StringTest();
    await stringTest.load();

    // Run tests
    StringRunTest.testUnicodeEncoding(stringTest);
    StringRunTest.testCopy(stringTest);
    StringRunTest.testAppend(stringTest);
    StringRunTest.testCompare(stringTest);
    StringRunTest.testCharAt(stringTest);
    StringRunTest.testStartsWith(stringTest);
    StringRunTest.testEndsWith(stringTest);
    StringRunTest.testIndexOf(stringTest);
    StringRunTest.testLastIndexOf(stringTest);
    StringRunTest.testRepeat(stringTest);
    StringRunTest.testSubstring(stringTest);
    StringRunTest.testTrimStart(stringTest);
    StringRunTest.testTrimEnd(stringTest);
    StringRunTest.testTrim(stringTest);
    StringRunTest.testGetNext(stringTest);
}();
