/**
 * Run test function for import function in nodejs.
 */
import ImportFunction from './import-function.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const importFunction = new ImportFunction();
    await importFunction.load();

    // Run the outside functions from within WASM
    importFunction.runOutsideFunctions();
}();
