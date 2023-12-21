/**
 * In range function using WASM.
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
        const wasmBuffer = await readFile(__dirname + '/in-range.wasm');

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
     * Checks to see if the given number is within the given min and max range.
     * @param {Number} number The number to check.
     * @param {Number} min The minimum amount of the range.
     * @param {Number} max The maximum amount of the range.
     * @return {Boolean} True if the number is within the range.
     */
    inRange(number, min, max) {
        // Call and return the WASM inRange function
        return this._instance.exports.inRange(number, min, max);
    }
}
