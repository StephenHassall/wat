/**
 * Import function functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class ImportFunction  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/import-function.wasm');

        // Create WASM data from buffer
        const wasmData = new Uint8Array(wasmBuffer);

        // Set options and import functions
        const options = {
            import: {
                consoleLog: this.consoleLog,
                funcNoParamNoReturn: this.funcNoParamNoReturn,
                funcOneParamNoReturn: this.funcOneParamNoReturn,
                funcTwoParamNoReturn: this.funcTwoParamNoReturn,
                funcThreeParam1Return: this.funcThreeParam1Return,
                func4Param2Return: this.func4Param2Return
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
     * @param {Number} value1 The i32 value.
     * @param {Number} value2 The f64 value
     */
    consoleLog(value1, value2) {
        // If value 2 is not zero
        if (value2 !== 0.0) {
            // Log both values
            console.log('V1: ' + value1.toString() + ', V2: ' + value2.toString());
        } else {
            // Only log value1
            console.log('V1: ' + value1.toString());
        }
    }

    /**
     * Function that will be imported into WASM. This has no parameters and no return value.
     */
    funcNoParamNoReturn() {
        // Log event
        console.log('funcNoParamNoReturn called');
    }

    /**
     * Function that will be imported into WASM. This has 1 parameter and no return value.
     * @param {Number} p1 The $p1 i32 value from WASM.
     */
    funcOneParamNoReturn(p1) {
        // Log event
        console.log('funcOneParamNoReturn called $p1 = ' + p1.toString());
    }

    /**
     * Function that will be imported into WASM. This has 2 parameters and no return value.
     * @param {Number} p1 The $p1 i32 value from WASM.
     * @param {Number} p2 The $p2 f64 value from WASM.
     */
    funcTwoParamNoReturn(p1, p2) {
        // Log event
        console.log('funcTwoParamNoReturn called $p1 = ' + p1.toString() + ', $p2 = ' + p2.toString());
    }

    /**
     * Function that will be imported into WASM. This has 3 parameters and 1 return value.
     * @param {Number} p1 The $p1 i32 value from WASM.
     * @param {Number} p2 The $p2 i32 value from WASM.
     * @param {Number} p3 The $p3 i32 value from WASM.
     */
    funcThreeParam1Return(p1, p2, p3) {
        // Log event
        console.log(
            'funcThreeParam1Return called $p1 = ' + p1.toString() +
            ', $p2 = ' + p2.toString() +
            ', $p3 = ' + p3.toString());

        // Return result i32
        return 34;
    }

    /**
     * Function that will be imported into WASM. This has 4 parameters and 2 return value.
     * @param {Number} p1 The $p1 i32 value from WASM.
     * @param {Number} p2 The $p2 i32 value from WASM.
     * @param {Number} p3 The $p3 f64 value from WASM.
     * @param {Number} p4 The $p4 f64 value from WASM.
     */
    func4Param2Return(p1, p2, p3, p4) {
        // Log event
        console.log(
            'funcThreeParamReturn called $p1 = ' + p1.toString() +
            ', $p2 = ' + p2.toString() +
            ', $p3 = ' + p3.toString() +
            ', $p4 = ' + p4.toString());

        // Return result i32 f64
        return [97, 12.34];
    }

    /**
     * Get WASM to run the outside functions.
     */
    runOutsideFunctions() {
        // Call the WASM runOutsideFunctions function
        this._instance.exports.runOutsideFunctions();
    }
}
