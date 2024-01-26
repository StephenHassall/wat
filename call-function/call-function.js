/**
 * Call function functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class CallFunction  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/call-function.wasm');

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
     * Get WASM to call the funcNoParamNoReturn function.
     */
    callFuncNoParamNoReturn() {
        // Call the WASM callFuncNoParamNoReturn function
        this._instance.exports.callFuncNoParamNoReturn();
    }

    /**
     * Get WASM to call the funcOneParamNoReturn function.
     */
    callFuncOneParamNoReturn() {
        // Call the WASM callFuncOneParamNoReturn function
        this._instance.exports.callFuncOneParamNoReturn();
    }

    /**
     * Get WASM to call the funcTwoParamNoReturn function.
     */
    callFuncTwoParamNoReturn() {
        // Call the WASM callFuncTwoParamNoReturn function
        this._instance.exports.callFuncTwoParamNoReturn();
    }

    /**
     * Get WASM to call the funcThreeParam1Return function.
     */
    callFuncThreeParam1Return() {
        // Call the WASM callFuncThreeParam1Return function
        this._instance.exports.callFuncThreeParam1Return();
    }

    /**
     * Get WASM to call the func4Param2Return function.
     */
    callFunc4Param2Return() {
        // Call the WASM callFunc4Param2Return function
        this._instance.exports.callFunc4Param2Return();
    }
}
