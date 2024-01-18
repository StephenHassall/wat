/**
 * Table callback functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class TableCallback  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/table-callback.wasm');

        // Create WASM data from buffer
        const wasmData = new Uint8Array(wasmBuffer);

        // Create memory
        this.memory = new WebAssembly.Memory({ initial: 1, maximum: 2 });

        // Set options
        const options = {
            import: {
                memory: this.memory
            }
        }

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
     * Run the bubble sort over the byte data list in memory.
     * @param {Number} dataOffset Where in the memory does the list of bytes exist.
     * @param {Number} dataItemCount The number of byte items in the list.
     * @return {Number} The result of the sort. 0 = error, 1 = good.
     */
    runBubbleSortForByte(dataOffset, dataItemCount) {
        // Call and return the WASM runBubbleSortForByte function
        return this._instance.exports.runBubbleSortForByte(dataOffset, dataItemCount);
    }

    /**
     * Run the bubble sort over the float 64 data list in memory.
     * @param {Number} dataOffset Where in the memory does the list of floats exist.
     * @param {Number} dataItemCount The number of float items in the list.
     * @return {Number} The result of the sort. 0 = error, 1 = good.
     */
    runBubbleSortForFloat64(dataOffset, dataItemCount) {
        // Call and return the WASM runBubbleSortForFloat64 function
        return this._instance.exports.runBubbleSortForFloat64(dataOffset, dataItemCount);
    }

    /**
     * Run the bubble sort but simulate an error, by using a NULL callback function.
     * @return {Number} The result of the sort. 0 = error, 1 = good.
     */
    runBubbleSortError() {
        // Call and return the WASM runBubbleSortError function
        return this._instance.exports.runBubbleSortError();
    }
}
