/**
 * Reverse string using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class ReverseString  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/reverse-string.wasm');

        // Create WASM data from buffer
        const wasmData = new Uint8Array(wasmBuffer);

        // Set memory page size (1 page = 64kb)
        this._memoryPageSize = 1;

        // Create memory to the starting page size
        this._memory = new WebAssembly.Memory({ initial: this._memoryPageSize });

        // Set options
        const options = {
            import: {
                memory: this._memory
            }
        }

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
     * Reverse the given text string.
     * @param {String} text The text string to reverse.
     * @return {String} The reversed text string.
     */
    reverse(text) {
        // Set the length of the string (include the null end)
        let stringLength = text.length + 1;

        // Set bytes per page amount
        const bytesPerPage = 64 * 1024;

        // Set the text page size
        const textPageSize = Math.ceil(stringLength / bytesPerPage);

        // If we need to increase the memory page size
        if (textPageSize > this._memoryPageSize) {
            // Grow the memory
            this._memory.grow(textPageSize);

            // Reset the memory page size
            this._memoryPageSize = textPageSize;
        }

        // Create text encoder and create the Uint8Array (UTF-8) of the text
        let encoder = new TextEncoder();
        let uint8ArrayText = encoder.encode(text);

        // Create Uint8Array of the memory
        let uint8ArrayMemory = new Uint8Array(this._memory.buffer);
        
        // Copy the text to the WASM memory
        uint8ArrayMemory.set(uint8ArrayText);

        // Call the WASM reverseString function
        this._instance.exports.reverseString();

        // Create Uint8Array from the WASM memory containing only the text (not the null end)
        uint8ArrayText = new Uint8Array(this._memory.buffer, 0, text.length);

        // Create text decoder and decode the Uint8Array to (UTF-8) text
        const textDecoder = new TextDecoder("UTF-8");
        const result = textDecoder.decode(uint8ArrayText);

        // Return the resulting reversed string
        return result;
    }
}
