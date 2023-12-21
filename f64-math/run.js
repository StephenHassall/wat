/**
 * Run test function for f64-math in nodejs.
 */
import F64Math from './f64-math.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const f64Math = new F64Math();
    await f64Math.load();

    // Check add function
    console.log('add(0.0, 0.0) = ' + f64Math.add(0.0, 0.0));
    console.log('add(0.0, 1.0) = ' + f64Math.add(0.0, 1.0));
    console.log('add(1.0, 0.0) = ' + f64Math.add(1.0, 0.0));
    console.log('add(-1.0, 0.0) = ' + f64Math.add(-1.0, 0.0));
    console.log('add(0.0, -1.0) = ' + f64Math.add(0.0, -1.0));
    console.log('add(1.0, 2.0) = ' + f64Math.add(1.0, 2.0));
    console.log('add(2.0, 1.0) = ' + f64Math.add(2.0, 1.0));
    console.log('add(5.0, -1.0) = ' + f64Math.add(5.0, -1.0));
    console.log('add(-1.0, 5.0) = ' + f64Math.add(-1.0, 5.0));
    console.log('add(12.34, 12.34) = ' + f64Math.add(12.34, 12.34));
    console.log('add(12.345, 12.346) = ' + f64Math.add(12.345, 12.346));
    console.log('add(12.346, 12.345) = ' + f64Math.add(12.346, 12.345));

    // Check subtract function
    console.log('subtract(0.0, 0.0) = ' + f64Math.subtract(0.0, 0.0));
    console.log('subtract(1.0, 0.0) = ' + f64Math.subtract(1.0, 0.0));
    console.log('subtract(0.0, 1.0) = ' + f64Math.subtract(0.0, 1.0));
    console.log('subtract(-1.0, 0.0) = ' + f64Math.subtract(-1.0, 0.0));
    console.log('subtract(0.0, -1.0) = ' + f64Math.subtract(0.0, -1.0));
    console.log('subtract(1.0, 1.0) = ' + f64Math.subtract(1.0, 1.0));
    console.log('subtract(-1.0, -1.0) = ' + f64Math.subtract(-1.0, -1.0));
    console.log('subtract(3.0, 1.0) = ' + f64Math.subtract(3.0, 1.0));
    console.log('subtract(1.0, 3.0) = ' + f64Math.subtract(1.0, 3.0));
    console.log('subtract(12.34, 12.34) = ' + f64Math.subtract(12.34, 12.34));
    console.log('subtract(12.345, 12.346) = ' + f64Math.subtract(12.345, 12.346));
    console.log('subtract(12.346, 12.345) = ' + f64Math.subtract(12.346, 12.345));

    // Check multiply function
    console.log('multiply(0.0, 0.0) = ' + f64Math.multiply(0.0, 0.0));
    console.log('multiply(1.0, 0.0) = ' + f64Math.multiply(1.0, 0.0));
    console.log('multiply(0.0, 1.0) = ' + f64Math.multiply(0.0, 1.0));
    console.log('multiply(1.0, 2.0) = ' + f64Math.multiply(1.0, 2.0));
    console.log('multiply(2.0, 1.0) = ' + f64Math.multiply(2.0, 1.0));
    console.log('multiply(-1.0, 2.0) = ' + f64Math.multiply(-1.0, 2.0));
    console.log('multiply(2.0, -1.0) = ' + f64Math.multiply(2.0, -1.0));
    console.log('multiply(1.0, -2.0) = ' + f64Math.multiply(1.0, -2.0));
    console.log('multiply(-2.0, 1.0) = ' + f64Math.multiply(-2.0, 1.0));
    console.log('multiply(-1.0, -2.0) = ' + f64Math.multiply(-1.0, -2.0));
    console.log('multiply(-2.0, -1.0) = ' + f64Math.multiply(-2.0, -1.0));
    console.log('multiply(2.0, 3.0) = ' + f64Math.multiply(2.0, 3.0));
    console.log('multiply(3.0, 2.0) = ' + f64Math.multiply(3.0, 2.0));
    console.log('multiply(12.34, 12.34) = ' + f64Math.multiply(12.34, 12.34));
    console.log('multiply(12.345, 12.346) = ' + f64Math.multiply(12.345, 12.346));
    console.log('multiply(12.346, 12.345) = ' + f64Math.multiply(12.346, 12.345));

    // Check divide function
    console.log('divide(0.0, 1.0) = ' + f64Math.divide(0.0, 1.0));
    console.log('divide(0.0, -1.0) = ' + f64Math.divide(0.0, -1.0));
    console.log('divide(1.0, 1.0) = ' + f64Math.divide(1.0, 1.0));
    console.log('divide(-1.0, 1.0) = ' + f64Math.divide(-1.0, 1.0));
    console.log('divide(1.0, -1.0) = ' + f64Math.divide(1.0, -1.0));
    console.log('divide(2.0, 1.0) = ' + f64Math.divide(2.0, 1.0));
    console.log('divide(-2.0, 1.0) = ' + f64Math.divide(-2.0, 1.0));
    console.log('divide(2.0, -1.0) = ' + f64Math.divide(2.0, -1.0));
    console.log('divide(2.0, 2.0) = ' + f64Math.divide(2.0, 2.0));
    console.log('divide(-2.0, -2.0) = ' + f64Math.divide(-2.0, -2.0));
    console.log('divide(4.0, 2.0) = ' + f64Math.divide(4.0, 2.0));
    console.log('divide(12.0, 4.0) = ' + f64Math.divide(12.0, 4.0));
    console.log('divide(4.0, 3.0) = ' + f64Math.divide(4.0, 3.0));
    console.log('divide(7.0, 3.0) = ' + f64Math.divide(7.0, 3.0));
    console.log('divide(3.0, 7.0) = ' + f64Math.divide(3.0, 7.0));
    console.log('divide(12.34, 12.34) = ' + f64Math.divide(12.34, 12.34));
    console.log('divide(12.345, 12.346) = ' + f64Math.divide(12.345, 12.346));
    console.log('divide(12.346, 12.345) = ' + f64Math.divide(12.346, 12.345));
    console.log('divide(0.0, 0.0) = ' + f64Math.divide(0.0, 0.0)); // = NaN
    console.log('divide(1.0, 0.0) = ' + f64Math.divide(1.0, 0.0)); // = Infinite
    console.log('divide(-1.0, 0.0) = ' + f64Math.divide(-1.0, 0.0)); // = -Infinite

    // Check absolute function
    console.log('absolute(0.0) = ' + f64Math.absolute(0.0));
    console.log('absolute(1.0) = ' + f64Math.absolute(1.0));
    console.log('absolute(-1.0) = ' + f64Math.absolute(-1.0));
    console.log('absolute(12.34) = ' + f64Math.absolute(12.34));
    console.log('absolute(-12.34) = ' + f64Math.absolute(-12.34));

    // Check negate function
    console.log('negate(0.0) = ' + f64Math.negate(0.0));
    console.log('negate(1.0) = ' + f64Math.negate(1.0));
    console.log('negate(-1.0) = ' + f64Math.negate(-1.0));
    console.log('negate(12.34) = ' + f64Math.negate(12.34));
    console.log('negate(-12.34) = ' + f64Math.negate(-12.34));

    // Check ceiling function
    console.log('ceiling(0.0) = ' + f64Math.ceiling(0.0));
    console.log('ceiling(0.1) = ' + f64Math.ceiling(0.1));
    console.log('ceiling(0.4) = ' + f64Math.ceiling(0.4));
    console.log('ceiling(0.5) = ' + f64Math.ceiling(0.5));
    console.log('ceiling(0.6) = ' + f64Math.ceiling(0.6));
    console.log('ceiling(0.9) = ' + f64Math.ceiling(0.9));
    console.log('ceiling(1.0) = ' + f64Math.ceiling(1.0));
    console.log('ceiling(1.1) = ' + f64Math.ceiling(1.1));
    console.log('ceiling(-0.1) = ' + f64Math.ceiling(-0.1));
    console.log('ceiling(-0.4) = ' + f64Math.ceiling(-0.4));
    console.log('ceiling(-0.5) = ' + f64Math.ceiling(-0.5));
    console.log('ceiling(-0.6) = ' + f64Math.ceiling(-0.6));
    console.log('ceiling(-0.9) = ' + f64Math.ceiling(-0.9));
    console.log('ceiling(-1.0) = ' + f64Math.ceiling(-1.0));
    console.log('ceiling(-1.1) = ' + f64Math.ceiling(-1.1));

    // Check floor function
    console.log('floor(0.0) = ' + f64Math.floor(0.0));
    console.log('floor(0.1) = ' + f64Math.floor(0.1));
    console.log('floor(0.4) = ' + f64Math.floor(0.4));
    console.log('floor(0.5) = ' + f64Math.floor(0.5));
    console.log('floor(0.6) = ' + f64Math.floor(0.6));
    console.log('floor(0.9) = ' + f64Math.floor(0.9));
    console.log('floor(1.0) = ' + f64Math.floor(1.0));
    console.log('floor(1.1) = ' + f64Math.floor(1.1));
    console.log('floor(-0.1) = ' + f64Math.floor(-0.1));
    console.log('floor(-0.4) = ' + f64Math.floor(-0.4));
    console.log('floor(-0.5) = ' + f64Math.floor(-0.5));
    console.log('floor(-0.6) = ' + f64Math.floor(-0.6));
    console.log('floor(-0.9) = ' + f64Math.floor(-0.9));
    console.log('floor(-1.0) = ' + f64Math.floor(-1.0));
    console.log('floor(-1.1) = ' + f64Math.floor(-1.1));

    // Check nearest function
    console.log('nearest(0.0) = ' + f64Math.nearest(0.0));
    console.log('nearest(0.1) = ' + f64Math.nearest(0.1));
    console.log('nearest(0.4) = ' + f64Math.nearest(0.4));
    console.log('nearest(0.5) = ' + f64Math.nearest(0.5));
    console.log('nearest(0.6) = ' + f64Math.nearest(0.6));
    console.log('nearest(0.9) = ' + f64Math.nearest(0.9));
    console.log('nearest(1.0) = ' + f64Math.nearest(1.0));
    console.log('nearest(1.1) = ' + f64Math.nearest(1.1));
    console.log('nearest(-0.1) = ' + f64Math.nearest(-0.1));
    console.log('nearest(-0.4) = ' + f64Math.nearest(-0.4));
    console.log('nearest(-0.5) = ' + f64Math.nearest(-0.5));
    console.log('nearest(-0.6) = ' + f64Math.nearest(-0.6));
    console.log('nearest(-0.9) = ' + f64Math.nearest(-0.9));
    console.log('nearest(-1.0) = ' + f64Math.nearest(-1.0));
    console.log('nearest(-1.1) = ' + f64Math.nearest(-1.1));

    // Check truncate function
    console.log('truncate(0.0) = ' + f64Math.truncate(0.0));
    console.log('truncate(0.1) = ' + f64Math.truncate(0.1));
    console.log('truncate(0.4) = ' + f64Math.truncate(0.4));
    console.log('truncate(0.5) = ' + f64Math.truncate(0.5));
    console.log('truncate(0.6) = ' + f64Math.truncate(0.6));
    console.log('truncate(0.9) = ' + f64Math.truncate(0.9));
    console.log('truncate(1.0) = ' + f64Math.truncate(1.0));
    console.log('truncate(1.1) = ' + f64Math.truncate(1.1));
    console.log('truncate(-0.1) = ' + f64Math.truncate(-0.1));
    console.log('truncate(-0.4) = ' + f64Math.truncate(-0.4));
    console.log('truncate(-0.5) = ' + f64Math.truncate(-0.5));
    console.log('truncate(-0.6) = ' + f64Math.truncate(-0.6));
    console.log('truncate(-0.9) = ' + f64Math.truncate(-0.9));
    console.log('truncate(-1.0) = ' + f64Math.truncate(-1.0));
    console.log('truncate(-1.1) = ' + f64Math.truncate(-1.1));

    // Check square root function
    console.log('squareRoot(0.0) = ' + f64Math.squareRoot(0.0));
    console.log('squareRoot(1.0) = ' + f64Math.squareRoot(1.0));
    console.log('squareRoot(16.0) = ' + f64Math.squareRoot(16.0));
    console.log('squareRoot(-1.0) = ' + f64Math.squareRoot(-1.0));
    console.log('squareRoot(-16.0) = ' + f64Math.squareRoot(-16.0));

    // Check minimum function
    console.log('minimum(0.0, 0.0) = ' + f64Math.minimum(0.0, 0.0));
    console.log('minimum(1.0, 1.0) = ' + f64Math.minimum(1.0, 1.0));
    console.log('minimum(-1.0, -1.0) = ' + f64Math.minimum(-1.0, -1.0));
    console.log('minimum(0.0, 1.0) = ' + f64Math.minimum(0.0, 1.0));
    console.log('minimum(1.0, 0.0) = ' + f64Math.minimum(0.0, 1.0));
    console.log('minimum(0.0, -1.0) = ' + f64Math.minimum(0.0, -1.0));
    console.log('minimum(-1.0, 0.0) = ' + f64Math.minimum(-1.0, 0.0));
    console.log('minimum(1.0, 3.0) = ' + f64Math.minimum(1.0, 3.0));
    console.log('minimum(3.0, 1.0) = ' + f64Math.minimum(3.0, 1.0));
    console.log('minimum(3.0, -3.0) = ' + f64Math.minimum(3.0, -3.0));
    console.log('minimum(-3.0, 3.0) = ' + f64Math.minimum(-3.0, 3.0));
    console.log('minimum(12.34, 12.34) = ' + f64Math.minimum(12.34, 12.34));
    console.log('minimum(12.345, 12.346) = ' + f64Math.minimum(12.345, 12.346));
    console.log('minimum(12.346, 12.345) = ' + f64Math.minimum(12.346, 12.345));

    // Check maximum function
    console.log('maximum(0.0, 0.0) = ' + f64Math.maximum(0.0, 0.0));
    console.log('maximum(1.0, 1.0) = ' + f64Math.maximum(1.0, 1.0));
    console.log('maximum(-1.0, -1.0) = ' + f64Math.maximum(-1.0, -1.0));
    console.log('maximum(0.0, 1.0) = ' + f64Math.maximum(0.0, 1.0));
    console.log('maximum(1.0, 0.0) = ' + f64Math.maximum(0.0, 1.0));
    console.log('maximum(0.0, -1.0) = ' + f64Math.maximum(0.0, -1.0));
    console.log('maximum(-1.0, 0.0) = ' + f64Math.maximum(-1.0, 0.0));
    console.log('maximum(1.0, 3.0) = ' + f64Math.maximum(1.0, 3.0));
    console.log('maximum(3.0, 1.0) = ' + f64Math.maximum(3.0, 1.0));
    console.log('maximum(3.0, -3.0) = ' + f64Math.maximum(3.0, -3.0));
    console.log('maximum(-3.0, 3.0) = ' + f64Math.maximum(-3.0, 3.0));
    console.log('maximum(12.34, 12.34) = ' + f64Math.maximum(12.34, 12.34));
    console.log('maximum(12.345, 12.346) = ' + f64Math.maximum(12.345, 12.346));
    console.log('maximum(12.346, 12.345) = ' + f64Math.maximum(12.346, 12.345));

    // Check copy sign function
    console.log('copySign(0.0, 0.0) = ' + f64Math.copySign(0.0, 0.0));
    console.log('copySign(0.0, 1.0) = ' + f64Math.copySign(0.0, 1.0));
    console.log('copySign(0.0, -1.0) = ' + f64Math.copySign(0.0, -1.0));
    console.log('copySign(12.34, 0.0) = ' + f64Math.copySign(12.34, 0.0));
    console.log('copySign(12.34.0, 1.0) = ' + f64Math.copySign(12.34, 1.0));
    console.log('copySign(12.34.0, -1.0) = ' + f64Math.copySign(12.34, -1.0));
    console.log('copySign(-12.34, 0.0) = ' + f64Math.copySign(-12.34, 0.0));
    console.log('copySign(-12.34.0, 1.0) = ' + f64Math.copySign(-12.34, 1.0));
    console.log('copySign(-12.34.0, -1.0) = ' + f64Math.copySign(-12.34, -1.0));

}();
