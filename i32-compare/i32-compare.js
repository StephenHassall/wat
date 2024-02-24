/**
 * i32 integer compare functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class I32Compare  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/i32-compare.wasm');

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
     * Checks to see if the given number is zero or not.
     * @param {Number} number The number to check.
     * @return {Boolean} True if the given number is zero, false if it is not zero.
     */
    isZero(number) {
        // Call the WASM isZero function
        const result = this._instance.exports.isZero(number);

        // If result is 1 then the number is zero
        if (result === 1) return true;

        // Otherwise it is not zero
        return false;
    }

    /**
     * Checks to see if the given numbers are equal.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the given numbers are the same, false if they are not the same.
     */
    isEqual(first, second) {
        // Call the WASM isEqual function
        const result = this._instance.exports.isEqual(first, second);

        // If result is 1 then the numbers are equal
        if (result === 1) return true;

        // Otherwise any are not equal
        return false;
    }

    /**
     * Checks to see if the given numbers are not equal.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the given numbers are the not same, false if they are the same.
     */
    isNotEqual(first, second) {
        // Call the WASM isNotEqual function
        const result = this._instance.exports.isNotEqual(first, second);

        // If result is 1 then the numbers are not equal
        if (result === 1) return true;

        // Otherwise any are equal
        return false;
    }

    /**
     * Checks to see if the first number is greater than the second. Using signed integers, which
     * means they can be negative.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the first number is greater than the second, false if it is not.
     */
    isGreaterThanSigned(first, second) {
        // Call the WASM isGreaterThanSigned function
        const result = this._instance.exports.isGreaterThanSigned(first, second);

        // If result is 1 then the first number is greater than the second
        if (result === 1) return true;

        // Otherwise it is not
        return false;
    }

    /**
     * Checks to see if the first number is greater than the second. Using unsigned integers, which
     * means they cannot be negative. -1 is 0xFFFFFFFF which is larger than 0.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the first number is greater than the second, false if it is not.
     */
    isGreaterThanUnsigned(first, second) {
        // Call the WASM isGreaterThanUnsigned function
        const result = this._instance.exports.isGreaterThanUnsigned(first, second);

        // If result is 1 then the first number is greater than the second
        if (result === 1) return true;

        // Otherwise it is not
        return false;
    }

    /**
     * Checks to see if the first number is greater than or equal to the second. Using signed integers, which
     * means they can be negative.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the first number is greater than or equal to the second, false if it is not.
     */
    isGreaterThanOrEqualSigned(first, second) {
        // Call the WASM isGreaterThanOrEqualSigned function
        const result = this._instance.exports.isGreaterThanOrEqualSigned(first, second);

        // If result is 1 then the first number is greater than or equal to the second
        if (result === 1) return true;

        // Otherwise it is not
        return false;
    }

    /**
     * Checks to see if the first number is greater than or equal to the second. Using unsigned integers, which
     * means they cannot be negative. -1 is 0xFFFFFFFF which is larger than 0.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the first number is greater than or equal to the second, false if it is not.
     */
    isGreaterThanOrEqualUnsigned(first, second) {
        // Call the WASM isGreaterThanOrEqualUnsigned function
        const result = this._instance.exports.isGreaterThanOrEqualUnsigned(first, second);

        // If result is 1 then the first number is greater than or equal to the second
        if (result === 1) return true;

        // Otherwise it is not
        return false;
    }

    /**
     * Checks to see if the first number is less than the second. Using signed integers, which
     * means they can be negative.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the first number is less than the second, false if it is not.
     */
    isLessThanSigned(first, second) {
        // Call the WASM isLessThanSigned function
        const result = this._instance.exports.isLessThanSigned(first, second);

        // If result is 1 then the first number is less than the second
        if (result === 1) return true;

        // Otherwise it is not
        return false;
    }

    /**
     * Checks to see if the first number is less than the second. Using unsigned integers, which
     * means they cannot be negative. -1 is 0xFFFFFFFF which is larger than 0.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the first number is less than the second, false if it is not.
     */
    isLessThanUnsigned(first, second) {
        // Call the WASM isLessThanUnsigned function
        const result = this._instance.exports.isLessThanUnsigned(first, second);

        // If result is 1 then the first number is less than the second
        if (result === 1) return true;

        // Otherwise it is not
        return false;
    }

    /**
     * Checks to see if the first number is less than or equal to the second. Using signed integers, which
     * means they can be negative.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the first number is less than or equal to the second, false if it is not.
     */
    isLessThanOrEqualSigned(first, second) {
        // Call the WASM isLessThanOrEqualSigned function
        const result = this._instance.exports.isLessThanOrEqualSigned(first, second);

        // If result is 1 then the first number is less than or equal to the second
        if (result === 1) return true;

        // Otherwise it is not
        return false;
    }

    /**
     * Checks to see if the first number is less than or equal to the second. Using unsigned integers, which
     * means they cannot be negative. -1 is 0xFFFFFFFF which is larger than 0.
     * @param {Number} first The first number to check with.
     * @param {Number} second The second number to check with.
     * @return {Boolean} True if the first number is less than or equal to the second, false if it is not.
     */
    isLessThanOrEqualUnsigned(first, second) {
        // Call the WASM isLessThanOrEqualUnsigned function
        const result = this._instance.exports.isLessThanOrEqualUnsigned(first, second);

        // If result is 1 then the first number is less than or equal to the second
        if (result === 1) return true;

        // Otherwise it is not
        return false;
    }

    /**
     * Checks to see if the given age is within the given range. This is the first example using nested IF statements.
     * @param {Number} age The age of check.
     * @param {Number} min The minimum value of the range.
     * @param {Number} max The maximum value of the range.
     * @return {Boolean} True if the age is within the range, false if it is not.
     */
    ageWithinRange1(age, min, max) {
        // Call the WASM ageWithinRange1 function
        const result = this._instance.exports.ageWithinRange1(age, min, max);

        // If result is 1 then age is within range
        if (result === 1) return true;

        // Otherwise it is not
        return false;
    }

    /**
     * Checks to see if the given age is within the given range. This is the second example using a bitwise AND command
     * on the compare results.
     * @param {Number} age The age of check.
     * @param {Number} min The minimum value of the range.
     * @param {Number} max The maximum value of the range.
     * @return {Boolean} True if the age is within the range, false if it is not.
     */
    ageWithinRange2(age, min, max) {
        // Call the WASM ageWithinRange2 function
        const result = this._instance.exports.ageWithinRange2(age, min, max);

        // If result is 1 then age is within range
        if (result === 1) return true;

        // Otherwise it is not
        return false;
    }
}
