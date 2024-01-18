/**
 * Global share example using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class GlobalShare  {
    /**
     * Static WASM module. We want to only load and compile it once.
     */
    static _module;

    /**
     * Create a new global share object.
     * @return {Promise} A promise that resolves a GlobalShare object.
     */
    static async create() {
        // If we do not have the module loaded yet
        if (!GlobalShare._module) {
            // Get current folder
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            
            // Read WASM data
            const wasmBuffer = await readFile(__dirname + '/global-share.wasm');

            // Create WASM data from buffer
            const wasmData = new Uint8Array(wasmBuffer);

            // Compile the WASM data
            GlobalShare._module = await WebAssembly.compile(wasmData);

            // Create WASM global object that will be shared with all instances
            GlobalShare._globalShare = new WebAssembly.Global({ value: 'i32', mutable: true });

            // Set options
            GlobalShare._options = {
                import: {
                    globalShare: GlobalShare._globalShare
                }
            }
        }

        // Create new GlobalShare object
        const globalShare = new GlobalShare();

        // Instantiate a new instance
        globalShare._instance = await WebAssembly.instantiate(GlobalShare._module, GlobalShare._options);

        // Return the new global share object
        return globalShare;
    }

    /**
     * Get the global share value.
     * @return {Number} The value of the global share value.
     */
    getGlobalShare() {
        // Call and return the WASM getGlobalShare function
        return this._instance.exports.getGlobalShare();
    }

    /**
     * Set the global share value within the WASM.
     * @param {Number} value The value to set the global to.
     */
    setGlobalShare(value) {
        // Call the WASM setGlobalShare function
        this._instance.exports.setGlobalShare(value);
    }
}
