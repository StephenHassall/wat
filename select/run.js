/**
 * Run test function for select in nodejs.
 */
import Select from './select.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const select = new Select();
    await select.load();

    // Check selectInteger function
    console.log('selectInteger(42, 101, 0) = ' + select.selectInteger(42, 101, 0));
    console.log('selectInteger(42, 101, 1) = ' + select.selectInteger(42, 101, 1));

    // Check selectFloat function
    console.log('selectFloat(3.142, 12.34, 0) = ' + select.selectFloat(3.142, 12.34, 0));
    console.log('selectFloat(3.142, 12.34, 1) = ' + select.selectFloat(3.142, 12.34, 1));
}();
