/**
 * f64 float compare functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class F64Compare  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/f64-compare.wasm');

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
     * Checks to see if the given numbers are equal.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the given numbers are the same, false if they are not the same.
     */
    isEqual(first, second) {
        // Call the WASM isEqual function
        const result = this._instance.exports.isEqual(first, second);

        // If result is 1 then the numbers are equal
        if (result === 1) return true;

        // Otherwise any are not equal
        return false;
    }

    /**
     * Checks to see if the given numbers are not equal.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the given numbers are the not same, false if they are the same.
     */
    isNotEqual(first, second) {
        // Call the WASM isNotEqual function
        const result = this._instance.exports.isNotEqual(first, second);

        // If result is 1 then the numbers are not equal
        if (result === 1) return true;

        // Otherwise any are equal
        return false;
    }

    /**
     * Checks to see if the first number is greater than the second.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the first number is greater than the second, false if it is not.
     */
    isGreaterThan(first, second) {
        // Call the WASM isGreaterThan function
        const result = this._instance.exports.isGreaterThan(first, second);

        // If result is 1 then the first number is greater than the second
        if (result === 1) return true;

        // Otherwise it is not
        return false;
    }

    /**
     * Checks to see if the first number is greater than or equal to the second.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the first number is greater than or equal to the second, false if it is not.
     */
    isGreaterThanOrEqual(first, second) {
        // Call the WASM isGreaterThanOrEqual function
        const result = this._instance.exports.isGreaterThanOrEqual(first, second);

        // If result is 1 then the first number is greater than or equal to the second
        if (result === 1) return true;

        // Otherwise it is not
        return false;
    }

    /**
     * Checks to see if the first number is less than the second.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the first number is less than the second, false if it is not.
     */
    isLessThan(first, second) {
        // Call the WASM isLessThan function
        const result = this._instance.exports.isLessThan(first, second);

        // If result is 1 then the first number is less than the second
        if (result === 1) return true;

        // Otherwise it is not
        return false;
    }

    /**
     * Checks to see if the first number is less than or equal to the second.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the first number is less than or equal to the second, false if it is not.
     */
    isLessThanOrEqual(first, second) {
        // Call the WASM isLessThanOrEqual function
        const result = this._instance.exports.isLessThanOrEqual(first, second);

        // If result is 1 then the first number is less than or equal to the second
        if (result === 1) return true;

        // Otherwise it is not
        return false;
    }
}
