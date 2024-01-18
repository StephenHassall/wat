/**
 * Exception functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class ExceptionTest  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/exception.wasm');

        // Create WASM data from buffer
        const wasmData = new Uint8Array(wasmBuffer);

        // Create some WASM tag objects
        ExceptionTest._integerException = new WebAssembly.Tag({ parameters: [ 'i32' ] });
        ExceptionTest._floatException = new WebAssembly.Tag({ parameters: [ 'f64' ] });
        ExceptionTest._dataException = new WebAssembly.Tag({ parameters: [ 'i32', 'i32', 'f64', 'f64' ] });

        // Set options
        ExceptionTest._options = {
            import: {
                integerException: ExceptionTest._integerException,
                floatException: ExceptionTest._floatException,
                dataException: ExceptionTest._dataException,
            }
        }

        // Instantiate the WASM data
        const promise = WebAssembly.instantiate(wasmData, ExceptionTest._options)
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
     * Divide by zero. This will throw an exception.
     */
    divideByZero() {
        // Call the WASM divideByZero function
        this._instance.exports.divideByZero();
    }

    /**
     * Throw the integer exception.
     * @param {Number} value The value that will be passed on to the exception.
     */
    throwIntegerException(value) {
        // Call the WASM throwIntegerException function
        this._instance.exports.throwIntegerException(value);
    }

    /**
     * Throw the float exception.
     * @param {Number} value The value that will be passed on to the exception.
     */
    throwFloatException(value) {
        // Call the WASM throwFloatException function
        this._instance.exports.throwFloatException(value);
    }

    /**
     * Throw the data exception.
     * @param {Number} valueA The first value that will be passed on to the exception.
     * @param {Number} valueB The second value that will be passed on to the exception.
     * @param {Number} valueC The third value that will be passed on to the exception.
     * @param {Number} valueD The fourth value that will be passed on to the exception.
     */
    throwDataException(valueA, valueB, valueC, valueD) {
        // Call the WASM throwDataException function
        this._instance.exports.throwDataException(valueA, valueB, valueC, valueD);
    }
}
