/**
 * Memory share example using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class MemoryShare  {
    /**
     * Static WASM module. We want to only load and compile it once.
     */
    static _module;

    /**
     * Create a new memory share object.
     * @return {Promise} A promise that resolves a MemoryShare object.
     */
    static async create() {
        // If we do not have the module loaded yet
        if (!MemoryShare._module) {
            // Get current folder
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            
            // Read WASM data
            const wasmBuffer = await readFile(__dirname + '/memory-share.wasm');

            // Create WASM data from buffer
            const wasmData = new Uint8Array(wasmBuffer);

            // Compile the WASM data
            MemoryShare._module = await WebAssembly.compile(wasmData);

            // Create memory to the starting page size
            MemoryShare._memory = new WebAssembly.Memory({ initial: 1, maximum: 10, shared: true });

            // Set options
            MemoryShare._options = {
                import: {
                    memory: MemoryShare._memory
                }
            }
        }

        // Create new MemoryShare object
        const memoryShare = new MemoryShare();

        // Instantiate a new instance
        memoryShare._instance = await WebAssembly.instantiate(MemoryShare._module, MemoryShare._options);

        // Return the new memory share object
        return memoryShare;
    }

    /**
     * Set the fill byte value.
     * @param {Number} value The fill byte value to set.
     */
    setFillByte(value) {
        // Call the WASM setFillByte function
        this._instance.exports.setFillByte(value);
    }

    /**
     * Fill part of the memory with the "fillByte".
     * @param {Number} memoryOffset The location in memory to start filling.
     * @param {Number} length The number of bytes to fill.
     */
    fill(memoryOffset, length) {
        // Call the WASM fill function
        this._instance.exports.fill(memoryOffset, length);
    }
}
