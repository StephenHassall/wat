/**
 * Run test function for start in nodejs.
 */
import Start from './start.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const start = new Start();
    await start.load();

    // At this point the WASM would have called the start function, which
    // will call the consoleLogStart export function, that writes to the console

    // Log after loaded
    console.log('After loaded');
}();
