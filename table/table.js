/**
 * Table functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class Table  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/table.wasm');

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
     * Set which function to call, using the index.
     * @param {Number} value The index of the function.
     */
    setFunctionIndex(value) {
        // Call the WASM setFunctionIndex function
        this._instance.exports.setFunctionIndex(value);
    }

    /**
     * Set the parameter to pass to the function.
     * @param {Number} value The parameter to pass.
     */
    setFunctionParameter(value) {
        // Call the WASM setFunctionParameter function
        this._instance.exports.setFunctionParameter(value);
    }

    /**
     * Gets the result from the function that was called.
     * @return {Number} The resulting value of the function.
     */
    getResult() {
        // Call and return the WASM getResult function
        return this._instance.exports.getResult();
    }

    /**
     * Call the function, that was set using the index and parameter.
     */
    callFunction() {
        // Call the WASM callFunction function
        this._instance.exports.callFunction();
    }
}
