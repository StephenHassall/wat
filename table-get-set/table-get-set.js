/**
 * Table get set functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class TableGetSet  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/table-get-set.wasm');

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
     * Set which function will be called.
     * @param {Number} table Which table to add to function to. 1 = table A, 2 = table B.
     * @param {Number} index The index in the table to set the function (0 to 3).
     * @param {Number} functionId Which function to add into the table.
     *   0 = $add1
     *   1 = $add2
     *   2 = $add3
     *   3 = $sub1
     *   4 = $sub2
     *   5 = $sub3
     *   6 = $mul2
     *   7 = $mul3
     */
    setFunction(table, index, functionId) {
        // Call the WASM setFunction function
        this._instance.exports.setFunction(table, index, functionId);
    }

    /**
     * Set running total that the functions will use when called.
     * @param {Number} value The running total to set.
     */
    setRunningTotal(value) {
        // Call the WASM setRunningTotal function
        this._instance.exports.setRunningTotal(value);
    }

    /**
     * Get running total that the functions have set.
     * @return {Number} The current running total value.
     */
    getRunningTotal(value) {
        // Call and return the WASM getRunningTotal function
        return this._instance.exports.getRunningTotal();
    }

    /**
     * Run a function from table A.
     * @param {Number} index The index in table A of the function to run.
     */
    runFunctionFromTableA(index) {
        // Call the WASM runFunctionFromTableA function
        this._instance.exports.runFunctionFromTableA(index);
    }

    /**
     * Run a function from table B.
     * @param {Number} index The index in table B of the function to run.
     */
    runFunctionFromTableB(index) {
        // Call the WASM runFunctionFromTableB function
        this._instance.exports.runFunctionFromTableB(index);
    }
}
