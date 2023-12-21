/**
 * Run test function for i32-math in nodejs.
 */
import I32Math from './i32-math.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const i32Math = new I32Math();
    await i32Math.load();

    // Check add function
    console.log('add(0, 0) = ' + i32Math.add(0, 0));
    console.log('add(0, 1) = ' + i32Math.add(0, 1));
    console.log('add(1, 0) = ' + i32Math.add(1, 0));
    console.log('add(-1, 0) = ' + i32Math.add(-1, 0));
    console.log('add(0, -1) = ' + i32Math.add(0, -1));
    console.log('add(1, 2) = ' + i32Math.add(1, 2));
    console.log('add(2, 1) = ' + i32Math.add(2, 1));
    console.log('add(5, -1) = ' + i32Math.add(5, -1));
    console.log('add(-1, 5) = ' + i32Math.add(-1, 5));

    // Check subtract function
    console.log('subtract(0, 0) = ' + i32Math.subtract(0, 0));
    console.log('subtract(1, 0) = ' + i32Math.subtract(1, 0));
    console.log('subtract(0, 1) = ' + i32Math.subtract(0, 1));
    console.log('subtract(-1, 0) = ' + i32Math.subtract(-1, 0));
    console.log('subtract(0, -1) = ' + i32Math.subtract(0, -1));
    console.log('subtract(1, 1) = ' + i32Math.subtract(1, 1));
    console.log('subtract(-1, -1) = ' + i32Math.subtract(-1, -1));
    console.log('subtract(3, 1) = ' + i32Math.subtract(3, 1));
    console.log('subtract(1, 3) = ' + i32Math.subtract(1, 3));

    // Check multiply function
    console.log('multiply(0, 0) = ' + i32Math.multiply(0, 0));
    console.log('multiply(1, 0) = ' + i32Math.multiply(1, 0));
    console.log('multiply(0, 1) = ' + i32Math.multiply(0, 1));
    console.log('multiply(1, 2) = ' + i32Math.multiply(1, 2));
    console.log('multiply(2, 1) = ' + i32Math.multiply(2, 1));
    console.log('multiply(-1, 2) = ' + i32Math.multiply(-1, 2));
    console.log('multiply(2, -1) = ' + i32Math.multiply(2, -1));
    console.log('multiply(1, -2) = ' + i32Math.multiply(1, -2));
    console.log('multiply(-2, 1) = ' + i32Math.multiply(-2, 1));
    console.log('multiply(-1, -2) = ' + i32Math.multiply(-1, -2));
    console.log('multiply(-2, -1) = ' + i32Math.multiply(-2, -1));
    console.log('multiply(2, 3) = ' + i32Math.multiply(2, 3));
    console.log('multiply(3, 2) = ' + i32Math.multiply(3, 2));

    // Check divideSigned function
    console.log('divideSigned(0, 1) = ' + i32Math.divideSigned(0, 1));
    console.log('divideSigned(0, -1) = ' + i32Math.divideSigned(0, -1));
    console.log('divideSigned(1, 1) = ' + i32Math.divideSigned(1, 1));
    console.log('divideSigned(-1, 1) = ' + i32Math.divideSigned(-1, 1));
    console.log('divideSigned(1, -1) = ' + i32Math.divideSigned(1, -1));
    console.log('divideSigned(2, 1) = ' + i32Math.divideSigned(2, 1));
    console.log('divideSigned(-2, 1) = ' + i32Math.divideSigned(-2, 1));
    console.log('divideSigned(2, -1) = ' + i32Math.divideSigned(2, -1));
    console.log('divideSigned(2, 2) = ' + i32Math.divideSigned(2, 2));
    console.log('divideSigned(-2, -2) = ' + i32Math.divideSigned(-2, -2));
    console.log('divideSigned(4, 2) = ' + i32Math.divideSigned(4, 2));
    console.log('divideSigned(12, 4) = ' + i32Math.divideSigned(12, 4));
    console.log('divideSigned(4, 3) = ' + i32Math.divideSigned(4, 3));
    console.log('divideSigned(7, 3) = ' + i32Math.divideSigned(7, 3));
    console.log('divideSigned(3, 7) = ' + i32Math.divideSigned(3, 7));

    // Check divideUnsigned function
    console.log('divideUnsigned(0, 1) = ' + i32Math.divideUnsigned(0, 1));
    console.log('divideUnsigned(0, -1) = ' + i32Math.divideUnsigned(0, -1));
    console.log('divideUnsigned(1, 1) = ' + i32Math.divideUnsigned(1, 1));
    console.log('divideUnsigned(2, 2) = ' + i32Math.divideUnsigned(2, 2));
    console.log('divideUnsigned(12, 4) = ' + i32Math.divideUnsigned(12, 4));
    console.log('divideUnsigned(12, -4) = ' + i32Math.divideUnsigned(12, -4));
    console.log('divideUnsigned(-12, 4) = ' + i32Math.divideUnsigned(-12, 4));
    console.log('divideUnsigned(4, 3) = ' + i32Math.divideUnsigned(4, 3));
    console.log('divideUnsigned(7, 3) = ' + i32Math.divideUnsigned(7, 3));
    console.log('divideUnsigned(3, 7) = ' + i32Math.divideUnsigned(3, 7));

    // Check remainderSigned function
    console.log('remainderSigned(0, 1) = ' + i32Math.remainderSigned(0, 1));
    console.log('remainderSigned(0, -1) = ' + i32Math.remainderSigned(0, -1));
    console.log('remainderSigned(0, 2) = ' + i32Math.remainderSigned(0, 2));
    console.log('remainderSigned(0, -2) = ' + i32Math.remainderSigned(0, -2));
    console.log('remainderSigned(1, 1) = ' + i32Math.remainderSigned(1, 1));
    console.log('remainderSigned(2, 1) = ' + i32Math.remainderSigned(2, 1));
    console.log('remainderSigned(4, 2) = ' + i32Math.remainderSigned(4, 2));
    console.log('remainderSigned(5, 2) = ' + i32Math.remainderSigned(5, 2));
    console.log('remainderSigned(9, 3) = ' + i32Math.remainderSigned(9, 3));
    console.log('remainderSigned(10, 3) = ' + i32Math.remainderSigned(10, 3));
    console.log('remainderSigned(11, 3) = ' + i32Math.remainderSigned(11, 3));
    console.log('remainderSigned(9, -3) = ' + i32Math.remainderSigned(9, -3));
    console.log('remainderSigned(10, -3) = ' + i32Math.remainderSigned(10, -3));
    console.log('remainderSigned(11, -3) = ' + i32Math.remainderSigned(11, -3));
    console.log('remainderSigned(-9, 3) = ' + i32Math.remainderSigned(-9, 3));
    console.log('remainderSigned(-10, 3) = ' + i32Math.remainderSigned(-10, 3));
    console.log('remainderSigned(-11, 3) = ' + i32Math.remainderSigned(-11, 3));

    // Check remainderUnsigned function
    console.log('remainderUnsigned(0, 1) = ' + i32Math.remainderUnsigned(0, 1));
    console.log('remainderUnsigned(0, -1) = ' + i32Math.remainderUnsigned(0, -1));
    console.log('remainderUnsigned(0, 2) = ' + i32Math.remainderUnsigned(0, 2));
    console.log('remainderUnsigned(0, -2) = ' + i32Math.remainderUnsigned(0, -2));
    console.log('remainderUnsigned(1, 1) = ' + i32Math.remainderUnsigned(1, 1));
    console.log('remainderUnsigned(2, 1) = ' + i32Math.remainderUnsigned(2, 1));
    console.log('remainderUnsigned(4, 2) = ' + i32Math.remainderUnsigned(4, 2));
    console.log('remainderUnsigned(5, 2) = ' + i32Math.remainderUnsigned(5, 2));
    console.log('remainderUnsigned(9, 3) = ' + i32Math.remainderUnsigned(9, 3));
    console.log('remainderUnsigned(10, 3) = ' + i32Math.remainderUnsigned(10, 3));
    console.log('remainderUnsigned(11, 3) = ' + i32Math.remainderUnsigned(11, 3));
    console.log('remainderUnsigned(9, -3) = ' + i32Math.remainderUnsigned(9, -3));
    console.log('remainderUnsigned(10, -3) = ' + i32Math.remainderUnsigned(10, -3));
    console.log('remainderUnsigned(11, -3) = ' + i32Math.remainderUnsigned(11, -3));
    console.log('remainderUnsigned(-9, 3) = ' + i32Math.remainderUnsigned(-9, 3));
    console.log('remainderUnsigned(-10, 3) = ' + i32Math.remainderUnsigned(-10, 3));
    console.log('remainderUnsigned(-11, 3) = ' + i32Math.remainderUnsigned(-11, 3));
}();
