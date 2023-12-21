/**
 * i32 integer math functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class I32Math  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/i32-math.wasm');

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
     * Adds the two numbers together.
     * @param {Number} first The first number to add.
     * @param {Number} second The second number to add.
     * @return {Number} The result of adding the two numbers.
     */
    add(first, second) {
        // Call and return the WASM add function
        return this._instance.exports.add(first, second);
    }

    /**
     * Subtracts the second number from the first (result = first - second).
     * @param {Number} first The first number to subtract from.
     * @param {Number} second The second number to subtract from the first.
     * @return {Number} The result of subtracting the two numbers (first - second).
     */
    subtract(first, second) {
        // Call and return the WASM subtract function
        return this._instance.exports.subtract(first, second);
    }

    /**
     * Multiplies the first and second numbers together.
     * @param {Number} first The first number to use.
     * @param {Number} second The second number to use.
     * @return {Number} The result of multipling the two numbers together.
     */
    multiply(first, second) {
        // Call and return the WASM multiply function
        return this._instance.exports.multiply(first, second);
    }

    /**
     * Divide the first by the second number (result = first / second). The remainer is disgarded.
     * Using signed integers, which means they can be negative.
     * @param {Number} first The first number to use (numerator).
     * @param {Number} second The second number to use (denominator).
     * @return {Number} The result of dividing the two numbers.
     */
    divideSigned(first, second) {
        // Call and return the WASM divideSigned function
        return this._instance.exports.divideSigned(first, second);
    }
    
    /**
     * Divide the first by the second number (result = first / second). The remainer is disgarded.
     * Using unsigned integers, which means they cannot be negative. -1 is 0xFFFFFFFF.
     * @param {Number} first The first number to use (numerator).
     * @param {Number} second The second number to use (denominator).
     * @return {Number} The result of dividing the two numbers.
     */
    divideUnsigned(first, second) {
        // Call and return the WASM divideUnsigned function
        return this._instance.exports.divideUnsigned(first, second);
    }

    /**
     * Calculates the remainder of the division of the first by the second number (result = first % second).
     * Using signed integers, which means they can be negative.
     * @param {Number} first The first number to use (numerator).
     * @param {Number} second The second number to use (denominator).
     * @return {Number} The remainder from dividing the two numbers.
     */
    remainderSigned(first, second) {
        // Call and return the WASM remainderSigned function
        return this._instance.exports.remainderSigned(first, second);
    }

    /**
     * Calculates the remainder of the division of the first by the second number (result = first % second).
     * Using unsigned integers, which means they cannot be negative. -1 is 0xFFFFFFFF.
     * @param {Number} first The first number to use (numerator).
     * @param {Number} second The second number to use (denominator).
     * @return {Number} The remainder from dividing the two numbers.
     */
    remainderUnsigned(first, second) {
        // Call and return the WASM remainderUnsigned function
        return this._instance.exports.remainderUnsigned(first, second);
    }
}
