/**
 * Start functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class Start  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/start.wasm');

        // Create WASM data from buffer
        const wasmData = new Uint8Array(wasmBuffer);

        // Set options and import functions
        const options = {
            import: {
                consoleLogStart: this.consoleLogStart,
            }
        };

        // Instantiate the WASM data
        const promise = WebAssembly.instantiate(wasmData, options)
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
     * Console log function that is imported into WASM.
     */
    consoleLogStart() {
        // Log started
        console.log('Started');
    }
}
