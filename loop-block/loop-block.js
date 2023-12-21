/**
 * Loop block functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class LoopBlock  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/loop-block.wasm');

        // Create WASM data from buffer
        const wasmData = new Uint8Array(wasmBuffer);

        // Instantiate the WASM data
        const promise = WebAssembly.instantiate(wasmData)
        .then((resultObject) => {
            // Set the module object
            this._module = resultObject.module;

            // Set the instance object
            this._instance = resultObject.instance;
        });

        // Return the promise
        return promise;
    }

    /**
     * Double the given number for the given number of times.
     * @param {Number} start The starting number to double.
     * @param {Number} times The number of times to double it.
     * @return {Number} The final total.
     */
    doubleMultipleTimes(start, times) {
        // Call and return the WASM doubleMultipleTimes function
        return this._instance.exports.doubleMultipleTimes(start, times);
    }

    /**
     * Add the given number to itself for the given number of times.
     * @param {Number} start The starting number to add.
     * @param {Number} times The number of times to add to itself.
     * @return {Number} The final total.
     */
    addMultipleTimes(start, times) {
        // Call and return the WASM addMultipleTimes function
        return this._instance.exports.addMultipleTimes(start, times);
    }

    /**
     * Double the given number for the given number of times, but with a limit.
     * @param {Number} start The starting number to double.
     * @param {Number} times The number of times to double it.
     * @param {Number} limit The upper limit the total must not be more than.
     * @return {Number} The final total.
     */
    doubleMultipleTimesWithLimit(start, times, limit) {
        // Call and return the WASM doubleMultipleTimesWithLimit function
        return this._instance.exports.doubleMultipleTimesWithLimit(start, times, limit);
    }
}
