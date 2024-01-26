/**
 * Select function using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class Select  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/select.wasm');

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
     * Select one of the given values depending on the given control.
     * @param {Number} value1 The first value to choose from.
     * @param {Number} value2 The second value to choose from.
     * @param {Number} control The control value that is used to workout if value1 or value2 is returned.
     * @return {Number} Either the value from value1 or value2.
     */
    selectInteger(value1, value2, control) {
        // Call and return the WASM selectInteger function
        return this._instance.exports.selectInteger(value1, value2, control);
    }

    /**
     * Select one of the given values depending on the given control.
     * @param {Number} value1 The first value to choose from.
     * @param {Number} value2 The second value to choose from.
     * @param {Number} control The control value that is used to workout if value1 or value2 is returned.
     * @return {Number} Either the value from value1 or value2.
     */
    selectFloat(value1, value2, control) {
        // Call and return the WASM selectFloat function
        return this._instance.exports.selectFloat(value1, value2, control);
    }
}
