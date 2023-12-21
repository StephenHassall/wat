/**
 * Run test function for if-then-else in nodejs.
 */
import IfThenElse from './if-then-else.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const ifThenElse = new IfThenElse();
    await ifThenElse.load();

    // Check example 1 function
    console.log('example1(1, 1, 0) = ' + ifThenElse.example1(1, 1, 0));
    console.log('example1(0, 1, 0) = ' + ifThenElse.example1(0, 1, 0));
    console.log('example1(2, 1, 0) = ' + ifThenElse.example1(2, 1, 0));

    // Check example 2 function
    console.log('example2(1, 1, 0) = ' + ifThenElse.example2(1, 1, 0));
    console.log('example2(0, 1, 0) = ' + ifThenElse.example2(0, 1, 0));
    console.log('example2(2, 1, 0) = ' + ifThenElse.example2(2, 1, 0));

    // Check example 3 function
    console.log('example3(1, 1, 0) = ' + ifThenElse.example3(1, 1, 0));
    console.log('example3(0, 1, 0) = ' + ifThenElse.example3(0, 1, 0));
    console.log('example3(2, 1, 0) = ' + ifThenElse.example3(2, 1, 0));

    // Check example 4 function
    console.log('example4(1, 1, 0) = ' + ifThenElse.example4(1, 1, 0));
    console.log('example4(0, 1, 0) = ' + ifThenElse.example4(0, 1, 0));
    console.log('example4(2, 1, 0) = ' + ifThenElse.example4(2, 1, 0));

    // Check example 5 function
    console.log('example5(1, 1, 0) = ' + ifThenElse.example5(1, 1, 0));
    console.log('example5(0, 1, 0) = ' + ifThenElse.example5(0, 1, 0));
    console.log('example5(2, 1, 0) = ' + ifThenElse.example5(2, 1, 0));
}();
