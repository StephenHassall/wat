/**
 * Run test function for table in nodejs.
 */
import Table from './table.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const table = new Table();
    await table.load();

    // Call the function at index 0 (which is add2)
    table.setFunctionIndex(0);
    table.setFunctionParameter(10);
    table.callFunction();
    let result = table.getResult();
    console.log('Function 0[add2](10) = ' + result);

    // Call the function at index 1 (which is double)
    table.setFunctionIndex(1);
    table.setFunctionParameter(10);
    table.callFunction();
    result = table.getResult();
    console.log('Function 1[double](10) = ' + result);
}();
