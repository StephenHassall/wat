/**
 * Memory control functions using WASM.
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
        const wasmBuffer = await readFile(__dirname + '/memory-control.wasm');

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
     * Fill part of the memory with the given value (only the first 8bits are used).
     * @param {Number} memoryOffset The location in memory to start filling.
     * @param {Number} value The value to set each 32 bits of the memory.
     * @param {Number} length The number of bytes to fill.
     */
    fill(memoryOffset, value, length) {
        // Call the WASM fill function
        this._instance.exports.fill(memoryOffset, value, length);
    }

    /**
     * Initialize the memory using one of the passive memory items. We are copying data from
     * passive memory into the main memory.
     * @param {Nummber} type Which type of passive data to use (0 or 1).
     */
    initFromPassiveMemory(type) {
        // Call the WASM initFromPassiveMemory function
        this._instance.exports.initFromPassiveMemory(type);
    }

    /**
     * Copy a block of memory from one part of the main memory into another.
     * @param {Nummber} toMemoryOffset The location to copy the memory to.
     * @param {Nummber} fromMemoryOffset The location to copy the memory from.
     * @param {Nummber} size The size, in bytes, of the block of memory to copy.
     */
    copy(toMemoryOffset, fromMemoryOffset, size) {
        // Call the WASM copy function
        this._instance.exports.copy(toMemoryOffset, fromMemoryOffset, size);
    }

    /**
     * Get the current size of the main memory (in pages). Each page is 64Kb in size.
     * @return {Number} The size of the main memory.
     */
    getMemorySize() {
        // Call and return the WASM getMemorySize function
        return this._instance.exports.getMemorySize();
    }

    /**
     * Grow the main memory by the given number of pages. Each page is 64Kb in size.
     * @param {Number} pageNumber The number of pages to grow by.
     */
    growMemory(pageNumber) {
        // Call and return the WASM growMemory function
        return this._instance.exports.growMemory(pageNumber);
    }
}
