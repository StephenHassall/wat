/**
 * Run test function for reverse-string in nodejs.
 */
import ReverseString from './reverse-string.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const reverseString = new ReverseString();
    await reverseString.load();

    // Reverse the text
    const result = reverseString.reverse('Hello World');

    // Log result
    console.log(result);
}();
