/**
 * Run test function for f64-compare in nodejs.
 */
import F64Compare from './f64-compare.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const f64Compare = new F64Compare();
    await f64Compare.load();

    // Check isEqual function
    console.log('isEqual(0.0, 0.0) = ' + f64Compare.isEqual(0.0, 0.0));
    console.log('isEqual(1.0, 1.0) = ' + f64Compare.isEqual(1.0, 1.0));
    console.log('isEqual(-1.0, -1.0) = ' + f64Compare.isEqual(-1.0, -1.0));
    console.log('isEqual(0.0, 1.0) = ' + f64Compare.isEqual(0.0, 1.0));
    console.log('isEqual(1.0, 2.0) = ' + f64Compare.isEqual(1.0, 2.0));
    console.log('isEqual(-1.0, 1.0) = ' + f64Compare.isEqual(-1.0, 1.0));
    console.log('isEqual(12.34, 12.34) = ' + f64Compare.isEqual(12.34, 12.34));
    console.log('isEqual(12.345, 12.346) = ' + f64Compare.isEqual(12.345, 12.346));


    // Check isNotEqual function
    console.log('isNotEqual(0.0, 0.0) = ' + f64Compare.isNotEqual(0.0, 0.0));
    console.log('isNotEqual(1.0, 1.0) = ' + f64Compare.isNotEqual(1.0, 1.0));
    console.log('isNotEqual(-1.0, -1.0) = ' + f64Compare.isNotEqual(-1.0, -1.0));
    console.log('isNotEqual(0.0, 1.0) = ' + f64Compare.isNotEqual(0.0, 1.0));
    console.log('isNotEqual(1.0, 2.0) = ' + f64Compare.isNotEqual(1.0, 2.0));
    console.log('isNotEqual(-1.0, 1.0) = ' + f64Compare.isNotEqual(-1.0, 1.0));
    console.log('isNotEqual(12.34, 12.34) = ' + f64Compare.isNotEqual(12.34, 12.34));
    console.log('isNotEqual(12.345, 12.346) = ' + f64Compare.isNotEqual(12.345, 12.346));


    // Check isGreaterThan function
    console.log('isGreaterThan(0.0, 0.0) = ' + f64Compare.isGreaterThan(0.0, 0.0));
    console.log('isGreaterThan(1.0, 1.0) = ' + f64Compare.isGreaterThan(1.0, 1.0));
    console.log('isGreaterThan(-1.0, -1.0) = ' + f64Compare.isGreaterThan(-1.0, -1.0));
    console.log('isGreaterThan(0.0, 1.0) = ' + f64Compare.isGreaterThan(0.0, 1.0));
    console.log('isGreaterThan(1.0, 0.0) = ' + f64Compare.isGreaterThan(1.0, 0.0));
    console.log('isGreaterThan(0.0, -1.0) = ' + f64Compare.isGreaterThan(0.0, -1.0));
    console.log('isGreaterThan(-1.0, 0.0) = ' + f64Compare.isGreaterThan(-1.0, 0.0));
    console.log('isGreaterThan(-1.0, 1.0) = ' + f64Compare.isGreaterThan(-1.0, 1.0));
    console.log('isGreaterThan(1.0, -1.0) = ' + f64Compare.isGreaterThan(1.0, -1.0));
    console.log('isGreaterThan(12.34, 12.34) = ' + f64Compare.isGreaterThan(12.34, 12.34));
    console.log('isGreaterThan(12.345, 12.346) = ' + f64Compare.isGreaterThan(12.345, 12.346));
    console.log('isGreaterThan(12.346, 12.345) = ' + f64Compare.isGreaterThan(12.346, 12.345));


    // Check isGreaterThanOrEqual function
    console.log('isGreaterThanOrEqual(0.0, 0.0) = ' + f64Compare.isGreaterThanOrEqual(0.0, 0.0));
    console.log('isGreaterThanOrEqual(1.0, 1.0) = ' + f64Compare.isGreaterThanOrEqual(1.0, 1.0));
    console.log('isGreaterThanOrEqual(-1.0, -1.0) = ' + f64Compare.isGreaterThanOrEqual(-1.0, -1.0));
    console.log('isGreaterThanOrEqual(0.0, 1.0) = ' + f64Compare.isGreaterThanOrEqual(0.0, 1.0));
    console.log('isGreaterThanOrEqual(1.0, 0.0) = ' + f64Compare.isGreaterThanOrEqual(1.0, 0.0));
    console.log('isGreaterThanOrEqual(0.0, -1.0) = ' + f64Compare.isGreaterThanOrEqual(0.0, -1.0));
    console.log('isGreaterThanOrEqual(-1.0, 0.0) = ' + f64Compare.isGreaterThanOrEqual(-1.0, 0.0));
    console.log('isGreaterThanOrEqual(-1.0, 1.0) = ' + f64Compare.isGreaterThanOrEqual(-1.0, 1.0));
    console.log('isGreaterThanOrEqual(1.0, -1.0) = ' + f64Compare.isGreaterThanOrEqual(1.0, -1.0));
    console.log('isGreaterThanOrEqual(12.34, 12.34) = ' + f64Compare.isGreaterThanOrEqual(12.34, 12.34));
    console.log('isGreaterThanOrEqual(12.345, 12.346) = ' + f64Compare.isGreaterThanOrEqual(12.345, 12.346));
    console.log('isGreaterThanOrEqual(12.346, 12.345) = ' + f64Compare.isGreaterThanOrEqual(12.346, 12.345));


    // Check isLessThan function
    console.log('isLessThan(0.0, 0.0) = ' + f64Compare.isLessThan(0.0, 0.0));
    console.log('isLessThan(1.0, 1.0) = ' + f64Compare.isLessThan(1.0, 1.0));
    console.log('isLessThan(-1.0, -1.0) = ' + f64Compare.isLessThan(-1.0, -1.0));
    console.log('isLessThan(0.0, 1.0) = ' + f64Compare.isLessThan(0.0, 1.0));
    console.log('isLessThan(1.0, 0.0) = ' + f64Compare.isLessThan(1.0, 0.0));
    console.log('isLessThan(0.0, -1.0) = ' + f64Compare.isLessThan(0.0, -1.0));
    console.log('isLessThan(-1.0, 0.0) = ' + f64Compare.isLessThan(-1.0, 0.0));
    console.log('isLessThan(-1.0, 1.0) = ' + f64Compare.isLessThan(-1.0, 1.0));
    console.log('isLessThan(1.0, -1.0) = ' + f64Compare.isLessThan(1.0, -1.0));
    console.log('isLessThan(12.34, 12.34) = ' + f64Compare.isLessThan(12.34, 12.34));
    console.log('isLessThan(12.345, 12.346) = ' + f64Compare.isLessThan(12.345, 12.346));
    console.log('isLessThan(12.346, 12.345) = ' + f64Compare.isLessThan(12.346, 12.345));
    

    // Check isLessThanOrEqual function
    console.log('isLessThanOrEqual(0.0, 0.0) = ' + f64Compare.isLessThanOrEqual(0.0, 0.0));
    console.log('isLessThanOrEqual(1.0, 1.0) = ' + f64Compare.isLessThanOrEqual(1.0, 1.0));
    console.log('isLessThanOrEqual(-1.0, -1.0) = ' + f64Compare.isLessThanOrEqual(-1.0, -1.0));
    console.log('isLessThanOrEqual(0.0, 1.0) = ' + f64Compare.isLessThanOrEqual(0.0, 1.0));
    console.log('isLessThanOrEqual(1.0, 0.0) = ' + f64Compare.isLessThanOrEqual(1.0, 0.0));
    console.log('isLessThanOrEqual(0.0, -1.0) = ' + f64Compare.isLessThanOrEqual(0.0, -1.0));
    console.log('isLessThanOrEqual(-1.0, 0.0) = ' + f64Compare.isLessThanOrEqual(-1.0, 0.0));
    console.log('isLessThanOrEqual(-1.0, 1.0) = ' + f64Compare.isLessThanOrEqual(-1.0, 1.0));
    console.log('isLessThanOrEqual(1.0, -1.0) = ' + f64Compare.isLessThanOrEqual(1.0, -1.0));
    console.log('isLessThanOrEqual(12.34, 12.34) = ' + f64Compare.isLessThanOrEqual(12.34, 12.34));
    console.log('isLessThanOrEqual(12.345, 12.346) = ' + f64Compare.isLessThanOrEqual(12.345, 12.346));
    console.log('isLessThanOrEqual(12.346, 12.345) = ' + f64Compare.isLessThanOrEqual(12.346, 12.345));
}();
