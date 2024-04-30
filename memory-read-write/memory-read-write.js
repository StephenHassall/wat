/**
 * Read and write to memory using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class MemoryReadWrite  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/memory-read-write.wasm');

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
     * Clear part of the memory (set to zero).
     * @param {Number} memoryOffset The location in memory to start clearing.
     * @param {Number} length The number of bytes to clear.
     */
    clear(memoryOffset, length) {
        // Call the WASM clear function
        this._instance.exports.clear(memoryOffset, length);
    }

    /**
     * Store a 32 bit integer in memory at the given memory offset.
     * @param {Number} value The 32 bit integer value to store.
     * @param {Number} memoryOffset The location in memory to put the integer value.
     */
    store32BitInteger(value, memoryOffset) {
        // Call the WASM store32BitInteger function
        this._instance.exports.store32BitInteger(value, memoryOffset);
    }

    /**
     * Store a 32 bit integer in memory at the given memory offset with an extra offset of 2.
     * @param {Number} value The 32 bit integer value to store.
     * @param {Number} memoryOffset The location in memory to put the integer value.
     */
    store32BitIntegerWithOffset(value, memoryOffset) {
        // Call the WASM store32BitIntegerWithOffset function
        this._instance.exports.store32BitIntegerWithOffset(value, memoryOffset);
    }

    /**
     * Store a 32 bit integer in memory at the given memory offset with an align of 16.
     * @param {Number} value The 32 bit integer value to store.
     * @param {Number} memoryOffset The location in memory to put the integer value.
     */
    store32BitIntegerWithAlign2(value, memoryOffset) {
        // Call the WASM store32BitIntegerWithAlign2 function
        this._instance.exports.store32BitIntegerWithAlign2(value, memoryOffset);
    }

    /**
     * Store the first 16 bits of an integer in memory at the given memory offset.
     * @param {Number} value The 32 bit integer value, which we take the first 16 bits, to store.
     * @param {Number} memoryOffset The location in memory to put the integer value.
     */
    store16BitInteger(value, memoryOffset) {
        // Call the WASM store16BitInteger function
        this._instance.exports.store16BitInteger(value, memoryOffset);
    }

    /**
     * Store the first 8 bits of an integer in memory at the given memory offset.
     * @param {Number} value The 32 bit integer value, which we take the first 8 bits, to store.
     * @param {Number} memoryOffset The location in memory to put the integer value.
     */
    store8BitInteger(value, memoryOffset) {
        // Call the WASM store8BitInteger function
        this._instance.exports.store8BitInteger(value, memoryOffset);
    }

    /**
     * Load the 32 bit integer from memory at the given memory offset.
     * @param {Number} memoryOffset The location in memory to get the integer value from.
     */
    load32BitInteger(memoryOffset) {
        // Call and return the WASM load32BitInteger function
        return this._instance.exports.load32BitInteger(memoryOffset);
    }

    /**
     * Load the 16 bit integer (signed) from memory at the given memory offset. If 16th bit is 1 then
     * it will treat the whole number as being negative.
     * @param {Number} memoryOffset The location in memory to get the integer value from.
     */
    load16BitIntegerSigned(memoryOffset) {
        // Call and return the WASM load16BitIntegerSigned function
        return this._instance.exports.load16BitIntegerSigned(memoryOffset);
    }

    /**
     * Load the 16 bit integer (unsigned) from memory at the given memory offset. If 16th bit is 1 then
     * it will do nothing different and just see that as part of the whole 32 bit number.
     * @param {Number} memoryOffset The location in memory to get the integer value from.
     */
    load16BitIntegerUnsigned(memoryOffset) {
        // Call and return the WASM load16BitIntegerUnsigned function
        return this._instance.exports.load16BitIntegerUnsigned(memoryOffset);
    }

    /**
     * Load the 8 bit integer (signed) from memory at the given memory offset. If 8th bit is 1 then
     * it will treat the whole number as being negative.
     * @param {Number} memoryOffset The location in memory to get the integer value from.
     */
    load8BitIntegerSigned(memoryOffset) {
        // Call and return the WASM load8BitIntegerSigned function
        return this._instance.exports.load8BitIntegerSigned(memoryOffset);
    }

    /**
     * Load the 8 bit integer (unsigned) from memory at the given memory offset. If 8th bit is 1 then
     * it will do nothing different and just see that as part of the whole 32 bit number.
     * @param {Number} memoryOffset The location in memory to get the integer value from.
     */
    load8BitIntegerUnsigned(memoryOffset) {
        // Call and return the WASM load8BitIntegerUnsigned function
        return this._instance.exports.load8BitIntegerUnsigned(memoryOffset);
    }

    /**
     * Load the 32 bit integer from memory at the given memory offset, with an extra offset of 2 bytes.
     * @param {Number} memoryOffset The location in memory to get the integer value from.
     */
    load32BitIntegerOffset2(memoryOffset) {
        // Call and return the WASM load32BitIntegerOffset2 function
        return this._instance.exports.load32BitIntegerOffset2(memoryOffset);
    }

    /**
     * Store a 64 bit float in memory at the given memory offset.
     * @param {Number} value The 64 bit float value to store.
     * @param {Number} memoryOffset The location in memory to put the float value.
     */
    store64BitFloat(value, memoryOffset) {
        // Call the WASM store64BitFloat function
        this._instance.exports.store64BitFloat(value, memoryOffset);
    }

    /**
     * Load the 64 bit float from memory at the given memory offset.
     * @param {Number} memoryOffset The location in memory to get the float value from.
     */
    load64BitFloat(memoryOffset) {
        // Call and return the WASM load64BitFloat function
        return this._instance.exports.load64BitFloat(memoryOffset);
    }
}
