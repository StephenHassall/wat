/**
 * i32 integer bitwise functions using WASM.
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
        const wasmBuffer = await readFile(__dirname + '/i32-bitwise.wasm');

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
     * Perform a bitwise AND operation on the two numbers.
     * @param {Number} first The first number to use.
     * @param {Number} second The second number to use.
     * @return {Number} The result of the bitwise operation.
     */
    and(first, second) {
        // Call and return the WASM and function
        return this._instance.exports.and(first, second);
    }

    /**
     * Perform a bitwise OR operation on the two numbers.
     * @param {Number} first The first number to use.
     * @param {Number} second The second number to use.
     * @return {Number} The result of the bitwise operation.
     */
    or(first, second) {
        // Call and return the WASM or function
        return this._instance.exports.or(first, second);
    }

    /**
     * Perform a bitwise XOR operation on the two numbers.
     * @param {Number} first The first number to use.
     * @param {Number} second The second number to use.
     * @return {Number} The result of the bitwise operation.
     */
    xor(first, second) {
        // Call and return the WASM xor function
        return this._instance.exports.xor(first, second);
    }

    /**
     * Perform a bitwise shift left operation on the number by the given amount. The new bit on the right
     * (the least significant bit) will always be 0.
     * @param {Number} number The number to shift left.
     * @param {Number} by The amount to shift the number to the left by.
     * @return {Number} The result of the bitwise operation.
     */
    shiftLeft(number, by) {
        // Call and return the WASM shiftLeft function
        return this._instance.exports.shiftLeft(number, by);
    }

    /**
     * Perform a bitwise shift right operation on the number by the given amount. Using signed
     * integers, which means they can be negative. The new bit on the left (the most significant
     * bit) will be a 1 if the number is negative, or 0 if the number is positive.
     * @param {Number} number The number to shift right.
     * @param {Number} by The amount to shift the number to the right by.
     * @return {Number} The result of the bitwise operation.
     */
    shiftRightSigned(number, by) {
        // Call and return the WASM shiftRightSigned function
        return this._instance.exports.shiftRightSigned(number, by);
    }

    /**
     * Perform a bitwise shift right operation on the number by the given amount. Using unsigned integers, which means they cannot be
     * negative. -1 is 0xFFFFFFFF. The new bit on the left (the most significant bit) will always be a 0.
     * @param {Number} number The number to shift right.
     * @param {Number} by The amount to shift the number to the right by.
     * @return {Number} The result of the bitwise operation.
     */
    shiftRightUnsigned(number, by) {
        // Call and return the WASM shiftRightUnsigned function
        return this._instance.exports.shiftRightUnsigned(number, by);
    }

    /**
     * Perform a bitwise rotate left operation on the number by the given amount. The bits on the left
     * (the most significant bits) will rotate around to the bits on the right (the least significant bits).
     * @param {Number} number The number to rotate left.
     * @param {Number} by The amount to rotate the number to the left by.
     * @return {Number} The result of the bitwise operation.
     */
    rotateLeft(number, by) {
        // Call and return the WASM rotateLeft function
        return this._instance.exports.rotateLeft(number, by);
    }

    /**
     * Perform a bitwise rotate right operation on the number by the given amount. The bits on the right
     * (the least significant bits) will rotate around to the bits on the left (the most significant bits).
     * @param {Number} number The number to rotate right.
     * @param {Number} by The amount to rotate the number to the right by.
     * @return {Number} The result of the bitwise operation.
     */
    rotateRight(number, by) {
        // Call and return the WASM rotateRight function
        return this._instance.exports.rotateRight(number, by);
    }

    /**
     * Perform a bitwise count leading zeros operation on the number. This is the number of 0 bits at the lower
     * end of the binary number (0b01100100 has 2 trailing zeros).
     * @param {Number} number The number to count the leading zeros for.
     * @return {Number} The result of the bitwise operation.
     */
    countLeadingZeros(number) {
        // Call and return the WASM countLeadingZeros function
        return this._instance.exports.countLeadingZeros(number);
    }

    /**
     * Perform a bitwise count trailing zeros operation on the number. This is the number of 0 bits at the lower
     * end of the binary number (0b01100100 has 2 trailing zeros).
     * @param {Number} number The number to count the trailing zeros for.
     * @return {Number} The result of the bitwise operation.
     */
    countTrailingZeros(number) {
        // Call and return the WASM countTrailingZeros function
        return this._instance.exports.countTrailingZeros(number);
    }

    /**
     * Perform a bitwise population count operation on the number. This is the count of 1 bits in the
     * number (0b01100100 has a 3 population count)
     * @param {Number} number The number to count the 1 bits for.
     * @return {Number} The result of the bitwise operation.
     */
    populationCount(number) {
        // Call and return the WASM populationCount function
        return this._instance.exports.populationCount(number);
    }

}
