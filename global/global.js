/**
 * Global functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class Global  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/global.wasm');

        // Create WASM data from buffer
        const wasmData = new Uint8Array(wasmBuffer);

        // Create some WASM global objects
        Global._globalMutableTrue = new WebAssembly.Global({ value: 'i32', mutable: true }, 404);
        Global._globalMutableFalse = new WebAssembly.Global({ value: 'i32', mutable: false }, 500);

        // Set options
        Global._options = {
            import: {
                globalFromLiteral: 99,
                globalMutableTrue: Global._globalMutableTrue,
                globalMutableFalse: Global._globalMutableFalse
            }
        }

        // Instantiate the WASM data
        const promise = WebAssembly.instantiate(wasmData, Global._options)
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
     * Get import global from literal.
     * @return {Number} The value of the global.
     */
    getImportGlobalFromLiteral() {
        // Call and return the WASM getImportGlobalFromLiteral function
        return this._instance.exports.getImportGlobalFromLiteral();
    }

    /**
     * Get import global with mutable set to true.
     * @return {Number} The value of the global.
     */
    getImportGlobalMutableTrue() {
        // Call and return the WASM getImportGlobalMutableTrue function
        return this._instance.exports.getImportGlobalMutableTrue();
    }

    /**
     * Set import global with mutable set to true.
     * @param {Number} value The value to set the global to.
     */
    setImportGlobalMutableTrue(value) {
        // Call the WASM setImportGlobalMutableTrue function
        this._instance.exports.setImportGlobalMutableTrue(value);
    }

    /**
     * Set import global with mutable set to false.
     * @return {Number} The value of the global.
     */
    getImportGlobalMutableFalse() {
        // Call and return the WASM getImportGlobalMutableFalse function
        return this._instance.exports.getImportGlobalMutableFalse();
    }

    /**
     * Set internal global with mutable set to false.
     * @return {Number} The value of the global.
     */
    getInternalGlobalMutableFalse() {
        // Call and return the WASM getInternalGlobalMutableFalse function
        return this._instance.exports.getInternalGlobalMutableFalse();
    }

    /**
     * Set internal global with mutable set to true.
     * @return {Number} The value of the global.
     */
    getInternalGlobalMutableTrue() {
        // Call and return the WASM getInternalGlobalMutableTrue function
        return this._instance.exports.getInternalGlobalMutableTrue();
    }

    /**
     * Set internal global with mutable set to true.
     * @param {Number} value The value to set the global to.
     */
    setInternalGlobalMutableTrue(value) {
        // Call the WASM getInternalGlobalMutableTrue function
        this._instance.exports.setInternalGlobalMutableTrue(value);
    }
}
