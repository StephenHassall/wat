/**
 * Run test function for in-range in nodejs.
 */
import InRange from './in-range.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const inRange = new InRange();
    await inRange.load();

    // Check in range function
    console.log('inRange(0, 0, 0) = ' + inRange.inRange(0, 0, 0));
    console.log('inRange(1, 0, 2) = ' + inRange.inRange(1, 0, 2));
    console.log('inRange(0, 1, 3) = ' + inRange.inRange(0, 1, 3));
    console.log('inRange(1, 1, 3) = ' + inRange.inRange(1, 1, 3));
    console.log('inRange(2, 1, 3) = ' + inRange.inRange(2, 1, 3));
    console.log('inRange(3, 1, 3) = ' + inRange.inRange(3, 1, 3));
    console.log('inRange(4, 1, 3) = ' + inRange.inRange(4, 1, 3));
}();
