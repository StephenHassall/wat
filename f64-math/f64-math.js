/**
 * f64 float math functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class F64Math  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/f64-math.wasm');

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
     * Divide the first by the second number (result = first / second).
     * @param {Number} first The first number to use (numerator).
     * @param {Number} second The second number to use (denominator).
     * @return {Number} The result of dividing the two numbers.
     */
    divide(first, second) {
        // Call and return the WASM divide function
        return this._instance.exports.divide(first, second);
    }
    
    /**
     * Checks the given number is absolute. This checks if the number is negative, and if so it, will negate it so that it is always positive.
     * @param {Number} number The number to check with.
     * @return {Number} The resulting number.
     */
    absolute(number) {
        // Call and return the WASM absolute function
        return this._instance.exports.absolute(number);
    }
    
    /**
     * Negates the given number. This reverses the sign of the number. Turns a positive number negative, and turns a negative number positive.
     * @param {Number} number The number to negate.
     * @return {Number} The resulting number.
     */
    negate(number) {
        // Call and return the WASM negate function
        return this._instance.exports.negate(number);
    }

    /**
     * Converts the number into an integer amount, rounding up, and removing the decimal point parts. It is still a floating
     * point number afterwards.
     * @param {Number} number The number to round up.
     * @return {Number} The resulting number.
     */
    ceiling(number) {
        // Call and return the WASM ceiling function
        return this._instance.exports.ceiling(number);
    }

    /**
     * Converts the number into an integer amount, rounding down, and removing the decimal point parts. It is still a floating
     * point number afterwards.
     * @param {Number} number The number to round down.
     * @return {Number} The resulting number.
     */
    floor(number) {
        // Call and return the WASM floor function
        return this._instance.exports.floor(number);
    }

    /**
     * Converts the number into an integer amount, rounding to the nearest integer value, and removing the decimal point parts.
     * It is still a floating point number afterwards.
     * @param {Number} number The number to round to the nearest integer.
     * @return {Number} The resulting number.
     */
    nearest(number) {
        // Call and return the WASM nearest function
        return this._instance.exports.nearest(number);
    }

    /**
     * Converts the number into an integer amount, by removing the decimal point parts. It is still a float afterwards.
     * This is like the floor function but it does not round down with negative numbers.
     * @param {Number} number The number to truncate.
     * @return {Number} The resulting number.
     */
    truncate(number) {
        // Call and return the WASM truncate function
        return this._instance.exports.truncate(number);
    }

    /**
     * Calculates the square root of the given number
     * @param {Number} number The number to get the square root of.
     * @return {Number} The resulting number.
     */
    squareRoot(number) {
        // Call and return the WASM squareRoot function
        return this._instance.exports.squareRoot(number);
    }

    /**
     * Works out which of the two given numbers is the smallest.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Number} The smallest of the two numbers.
     */
    minimum(first, second) {
        // Call and return the WASM minimum function
        return this._instance.exports.minimum(first, second);
    }

    /**
     * Works out which of the two given numbers is the largest.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Number} The largest of the two numbers.
     */
    maximum(first, second) {
        // Call and return the WASM maximum function
        return this._instance.exports.maximum(first, second);
    }

    /**
     * Copy the +/- part of the given sign and give it to the given number.
     * @param {Number} number The number to have the sign.
     * @param {Number} sign The sign part, which is also a number.
     * @return {Number} The same number but with the same sign.
     */
    copySign(number, sign) {
        // Call and return the WASM copySign function
        return this._instance.exports.copySign(number, sign);
    }
}
