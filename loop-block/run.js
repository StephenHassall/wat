/**
 * Run test function for loop-block in nodejs.
 */
import LoopBlock from './loop-block.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const loopBlock = new LoopBlock();
    await loopBlock.load();

    // Check double multiple times function
    console.log('doubleMultipleTimes(2, 3) = ' + loopBlock.doubleMultipleTimes(2, 3));
    console.log('doubleMultipleTimes(3, 3) = ' + loopBlock.doubleMultipleTimes(3, 3));

    // Check add multiple times function
    console.log('addMultipleTimes(2, 3) = ' + loopBlock.addMultipleTimes(2, 3));
    console.log('addMultipleTimes(3, 3) = ' + loopBlock.addMultipleTimes(3, 3));

    // Check double multiple times function
    console.log('doubleMultipleTimesWithLimit(2, 3, 500) = ' + loopBlock.doubleMultipleTimesWithLimit(2, 3, 500));
    console.log('doubleMultipleTimesWithLimit(3, 3, 10000) = ' + loopBlock.doubleMultipleTimesWithLimit(3, 3, 10000));
    console.log('doubleMultipleTimesWithLimit(3, 3, 1000) = ' + loopBlock.doubleMultipleTimesWithLimit(3, 3, 1000));

    // Check double multiple times function
    console.log('selectFrom3Default(42, 101, 500, 911, 0) = ' + loopBlock.selectFrom3Default(42, 101, 500, 911, 0));
    console.log('selectFrom3Default(42, 101, 500, 911, 1) = ' + loopBlock.selectFrom3Default(42, 101, 500, 911, 1));
    console.log('selectFrom3Default(42, 101, 500, 911, 2) = ' + loopBlock.selectFrom3Default(42, 101, 500, 911, 2));
    console.log('selectFrom3Default(42, 101, 500, 911, 100) = ' + loopBlock.selectFrom3Default(42, 101, 500, 911, 100));
}();
