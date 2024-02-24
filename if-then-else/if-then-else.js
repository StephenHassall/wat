/**
 * If then else functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class I32Math  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/if-then-else.wasm');

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
     * Example 1.
     * @param {Number} condition The condition value.
     * @param {Number} returnTrue The value to return if the condition is true.
     * @param {Number} returnFalse The value to return if the condition is false.
     * @return {Number} The return result.
     */
    example1(condition, returnTrue, returnFalse) {
        // Call and return the WASM example1 function
        return this._instance.exports.example1(condition, returnTrue, returnFalse);
    }

    /**
     * Example 2.
     * @param {Number} condition The condition value.
     * @param {Number} returnTrue The value to return if the condition is true.
     * @param {Number} returnFalse The value to return if the condition is false.
     * @return {Number} The return result.
     */
    example2(condition, returnTrue, returnFalse) {
        // Call and return the WASM example2 function
        return this._instance.exports.example2(condition, returnTrue, returnFalse);
    }

    /**
     * Example 3.
     * @param {Number} condition The condition value.
     * @param {Number} returnTrue The value to return if the condition is true.
     * @param {Number} returnFalse The value to return if the condition is false.
     * @return {Number} The return result.
     */
    example3(condition, returnTrue, returnFalse) {
        // Call and return the WASM example3 function
        return this._instance.exports.example3(condition, returnTrue, returnFalse);
    }

    /**
     * Example 4.
     * @param {Number} condition The condition value.
     * @param {Number} returnTrue The value to return if the condition is true.
     * @param {Number} returnFalse The value to return if the condition is false.
     * @return {Number} The return result.
     */
    example4(condition, returnTrue, returnFalse) {
        // Call and return the WASM example4 function
        return this._instance.exports.example4(condition, returnTrue, returnFalse);
    }

    /**
     * Example 5.
     * @param {Number} condition The condition value.
     * @param {Number} returnTrue The value to return if the condition is true.
     * @param {Number} returnFalse The value to return if the condition is false.
     * @return {Number} The return result.
     */
    example5(condition, returnTrue, returnFalse) {
        // Call and return the WASM example5 function
        return this._instance.exports.example5(condition, returnTrue, returnFalse);
    }

    /**
     * Example 6.
     * @param {Number} condition The condition value.
     * @param {Number} value The value to add 10 or 20 to.
     * @return {Number} The return result.
     */
    example6(condition, value) {
        // Call and return the WASM example6 function
        return this._instance.exports.example6(condition, value);
    }
}
