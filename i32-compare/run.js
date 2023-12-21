/**
 * Run test function for i32-compare in nodejs.
 */
import I32Compare from './i32-compare.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const i32Compare = new I32Compare();
    await i32Compare.load();

    // Check isZero function
    console.log('isZero(0) = ' + i32Compare.isZero(0));
    console.log('isZero(12) = ' + i32Compare.isZero(12));

    // Check isEqual function
    console.log('isEqual(0, 0) = ' + i32Compare.isEqual(0, 0));
    console.log('isEqual(1, 1) = ' + i32Compare.isEqual(1, 1));
    console.log('isEqual(-1, -1) = ' + i32Compare.isEqual(-1, -1));
    console.log('isEqual(0, 1) = ' + i32Compare.isEqual(0, 1));
    console.log('isEqual(1, 2) = ' + i32Compare.isEqual(1, 2));
    console.log('isEqual(-1, 1) = ' + i32Compare.isEqual(-1, 1));

    // Check isNotEqual function
    console.log('isNotEqual(0, 0) = ' + i32Compare.isNotEqual(0, 0));
    console.log('isNotEqual(1, 1) = ' + i32Compare.isNotEqual(1, 1));
    console.log('isNotEqual(-1, -1) = ' + i32Compare.isNotEqual(-1, -1));
    console.log('isNotEqual(0, 1) = ' + i32Compare.isNotEqual(0, 1));
    console.log('isNotEqual(1, 2) = ' + i32Compare.isNotEqual(1, 2));
    console.log('isNotEqual(-1, 1) = ' + i32Compare.isNotEqual(-1, 1));

    // Check isGreaterThanSigned function
    console.log('isGreaterThanSigned(0, 0) = ' + i32Compare.isGreaterThanSigned(0, 0));
    console.log('isGreaterThanSigned(1, 1) = ' + i32Compare.isGreaterThanSigned(1, 1));
    console.log('isGreaterThanSigned(-1, -1) = ' + i32Compare.isGreaterThanSigned(-1, -1));
    console.log('isGreaterThanSigned(0, 1) = ' + i32Compare.isGreaterThanSigned(0, 1));
    console.log('isGreaterThanSigned(1, 0) = ' + i32Compare.isGreaterThanSigned(1, 0));
    console.log('isGreaterThanSigned(0, -1) = ' + i32Compare.isGreaterThanSigned(0, -1));
    console.log('isGreaterThanSigned(-1, 0) = ' + i32Compare.isGreaterThanSigned(-1, 0));
    console.log('isGreaterThanSigned(-1, 1) = ' + i32Compare.isGreaterThanSigned(-1, 1));
    console.log('isGreaterThanSigned(1, -1) = ' + i32Compare.isGreaterThanSigned(1, -1));

    // Check isGreaterThanUnsigned function
    console.log('isGreaterThanUnsigned(0, 0) = ' + i32Compare.isGreaterThanUnsigned(0, 0));
    console.log('isGreaterThanUnsigned(1, 1) = ' + i32Compare.isGreaterThanUnsigned(1, 1));
    console.log('isGreaterThanUnsigned(-1, -1) = ' + i32Compare.isGreaterThanUnsigned(-1, -1));
    console.log('isGreaterThanUnsigned(0, 1) = ' + i32Compare.isGreaterThanUnsigned(0, 1));
    console.log('isGreaterThanUnsigned(1, 0) = ' + i32Compare.isGreaterThanUnsigned(1, 0));
    console.log('isGreaterThanUnsigned(0, -1) = ' + i32Compare.isGreaterThanUnsigned(0, -1));
    console.log('isGreaterThanUnsigned(-1, 0) = ' + i32Compare.isGreaterThanUnsigned(-1, 0));
    console.log('isGreaterThanUnsigned(-1, 1) = ' + i32Compare.isGreaterThanUnsigned(-1, 1));
    console.log('isGreaterThanUnsigned(1, -1) = ' + i32Compare.isGreaterThanUnsigned(1, -1));

    // Check isGreaterThanOrEqualSigned function
    console.log('isGreaterThanOrEqualSigned(0, 0) = ' + i32Compare.isGreaterThanOrEqualSigned(0, 0));
    console.log('isGreaterThanOrEqualSigned(1, 1) = ' + i32Compare.isGreaterThanOrEqualSigned(1, 1));
    console.log('isGreaterThanOrEqualSigned(-1, -1) = ' + i32Compare.isGreaterThanOrEqualSigned(-1, -1));
    console.log('isGreaterThanOrEqualSigned(0, 1) = ' + i32Compare.isGreaterThanOrEqualSigned(0, 1));
    console.log('isGreaterThanOrEqualSigned(1, 0) = ' + i32Compare.isGreaterThanOrEqualSigned(1, 0));
    console.log('isGreaterThanOrEqualSigned(0, -1) = ' + i32Compare.isGreaterThanOrEqualSigned(0, -1));
    console.log('isGreaterThanOrEqualSigned(-1, 0) = ' + i32Compare.isGreaterThanOrEqualSigned(-1, 0));
    console.log('isGreaterThanOrEqualSigned(-1, 1) = ' + i32Compare.isGreaterThanOrEqualSigned(-1, 1));
    console.log('isGreaterThanOrEqualSigned(1, -1) = ' + i32Compare.isGreaterThanOrEqualSigned(1, -1));

    // Check isGreaterThanOrEqualUnsigned function
    console.log('isGreaterThanOrEqualUnsigned(0, 0) = ' + i32Compare.isGreaterThanOrEqualUnsigned(0, 0));
    console.log('isGreaterThanOrEqualUnsigned(1, 1) = ' + i32Compare.isGreaterThanOrEqualUnsigned(1, 1));
    console.log('isGreaterThanOrEqualUnsigned(-1, -1) = ' + i32Compare.isGreaterThanOrEqualUnsigned(-1, -1));
    console.log('isGreaterThanOrEqualUnsigned(0, 1) = ' + i32Compare.isGreaterThanOrEqualUnsigned(0, 1));
    console.log('isGreaterThanOrEqualUnsigned(1, 0) = ' + i32Compare.isGreaterThanOrEqualUnsigned(1, 0));
    console.log('isGreaterThanOrEqualUnsigned(0, -1) = ' + i32Compare.isGreaterThanOrEqualUnsigned(0, -1));
    console.log('isGreaterThanOrEqualUnsigned(-1, 0) = ' + i32Compare.isGreaterThanOrEqualUnsigned(-1, 0));
    console.log('isGreaterThanOrEqualUnsigned(-1, 1) = ' + i32Compare.isGreaterThanOrEqualUnsigned(-1, 1));
    console.log('isGreaterThanOrEqualUnsigned(1, -1) = ' + i32Compare.isGreaterThanOrEqualUnsigned(1, -1));

    // Check isLessThanSigned function
    console.log('isLessThanSigned(0, 0) = ' + i32Compare.isLessThanSigned(0, 0));
    console.log('isLessThanSigned(1, 1) = ' + i32Compare.isLessThanSigned(1, 1));
    console.log('isLessThanSigned(-1, -1) = ' + i32Compare.isLessThanSigned(-1, -1));
    console.log('isLessThanSigned(0, 1) = ' + i32Compare.isLessThanSigned(0, 1));
    console.log('isLessThanSigned(1, 0) = ' + i32Compare.isLessThanSigned(1, 0));
    console.log('isLessThanSigned(0, -1) = ' + i32Compare.isLessThanSigned(0, -1));
    console.log('isLessThanSigned(-1, 0) = ' + i32Compare.isLessThanSigned(-1, 0));
    console.log('isLessThanSigned(-1, 1) = ' + i32Compare.isLessThanSigned(-1, 1));
    console.log('isLessThanSigned(1, -1) = ' + i32Compare.isLessThanSigned(1, -1));
    
    // Check isLessThanUnsigned function
    console.log('isLessThanUnsigned(0, 0) = ' + i32Compare.isLessThanUnsigned(0, 0));
    console.log('isLessThanUnsigned(1, 1) = ' + i32Compare.isLessThanUnsigned(1, 1));
    console.log('isLessThanUnsigned(-1, -1) = ' + i32Compare.isLessThanUnsigned(-1, -1));
    console.log('isLessThanUnsigned(0, 1) = ' + i32Compare.isLessThanUnsigned(0, 1));
    console.log('isLessThanUnsigned(1, 0) = ' + i32Compare.isLessThanUnsigned(1, 0));
    console.log('isLessThanUnsigned(0, -1) = ' + i32Compare.isLessThanUnsigned(0, -1));
    console.log('isLessThanUnsigned(-1, 0) = ' + i32Compare.isLessThanUnsigned(-1, 0));
    console.log('isLessThanUnsigned(-1, 1) = ' + i32Compare.isLessThanUnsigned(-1, 1));
    console.log('isLessThanUnsigned(1, -1) = ' + i32Compare.isLessThanUnsigned(1, -1));

    // Check isLessThanOrEqualSigned function
    console.log('isLessThanOrEqualSigned(0, 0) = ' + i32Compare.isLessThanOrEqualSigned(0, 0));
    console.log('isLessThanOrEqualSigned(1, 1) = ' + i32Compare.isLessThanOrEqualSigned(1, 1));
    console.log('isLessThanOrEqualSigned(-1, -1) = ' + i32Compare.isLessThanOrEqualSigned(-1, -1));
    console.log('isLessThanOrEqualSigned(0, 1) = ' + i32Compare.isLessThanOrEqualSigned(0, 1));
    console.log('isLessThanOrEqualSigned(1, 0) = ' + i32Compare.isLessThanOrEqualSigned(1, 0));
    console.log('isLessThanOrEqualSigned(0, -1) = ' + i32Compare.isLessThanOrEqualSigned(0, -1));
    console.log('isLessThanOrEqualSigned(-1, 0) = ' + i32Compare.isLessThanOrEqualSigned(-1, 0));
    console.log('isLessThanOrEqualSigned(-1, 1) = ' + i32Compare.isLessThanOrEqualSigned(-1, 1));
    console.log('isLessThanOrEqualSigned(1, -1) = ' + i32Compare.isLessThanOrEqualSigned(1, -1));

    // Check isLessThanOrEqualUnsigned function
    console.log('isLessThanOrEqualUnsigned(0, 0) = ' + i32Compare.isLessThanOrEqualUnsigned(0, 0));
    console.log('isLessThanOrEqualUnsigned(1, 1) = ' + i32Compare.isLessThanOrEqualUnsigned(1, 1));
    console.log('isLessThanOrEqualUnsigned(-1, -1) = ' + i32Compare.isLessThanOrEqualUnsigned(-1, -1));
    console.log('isLessThanOrEqualUnsigned(0, 1) = ' + i32Compare.isLessThanOrEqualUnsigned(0, 1));
    console.log('isLessThanOrEqualUnsigned(1, 0) = ' + i32Compare.isLessThanOrEqualUnsigned(1, 0));
    console.log('isLessThanOrEqualUnsigned(0, -1) = ' + i32Compare.isLessThanOrEqualUnsigned(0, -1));
    console.log('isLessThanOrEqualUnsigned(-1, 0) = ' + i32Compare.isLessThanOrEqualUnsigned(-1, 0));
    console.log('isLessThanOrEqualUnsigned(-1, 1) = ' + i32Compare.isLessThanOrEqualUnsigned(-1, 1));
    console.log('isLessThanOrEqualUnsigned(1, -1) = ' + i32Compare.isLessThanOrEqualUnsigned(1, -1));
}();
