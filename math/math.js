/**
 * Math test functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class MathTest  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/math.wasm');

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
     * Math pow. Power test function. a^n "a" (float) to the power of "n" (integer, 0+).
     * @param {Number} a The amount to be raise.
     * @param {Number} n The amount to raise by
     * @return {Number} The result of the pow.
     */
    mathPow(a, n) {
        // Call and return the WASM math_pow function
        return this._instance.exports.math_pow(a, n);
    }

    /**
     * Math sin. Sin function.
     * @param {Number} x The angle in radians.
     * @return {Number} The sin(x) result
     */
    mathSin(x) {
        // Call and return the WASM math_sin function
        return this._instance.exports.math_sin(x);
    }

    /**
     * Math cos. Cos function.
     * @param {Number} x The angle in radians.
     * @return {Number} The cos(x) result
     */
    mathCos(x) {
        // Call and return the WASM math_cos function
        return this._instance.exports.math_cos(x);
    }
}
