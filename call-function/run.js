/**
 * Run test function for call function in nodejs.
 */
import CallFunction from './call-function.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const callFunction = new CallFunction();
    await callFunction.load();

    // Call each of the functions
    callFunction.callFuncNoParamNoReturn();
    callFunction.callFuncOneParamNoReturn();
    callFunction.callFuncTwoParamNoReturn();
    callFunction.callFuncThreeParam1Return();
    callFunction.callFunc4Param2Return();

    // Log all done
    console.log('Done');
}();
