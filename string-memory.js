/**
 * String memory tools.
 */

export default class StringMemory  {
    /**
     * Transfer a string to memory. This converts the text into UTF8 encoded byte array and copies
     * it into the memory at the given offset. It also adds a NULL terminator on the end.
     * @param {String} text The string to set in memory.
     * @param {WebAssembly.Memory}  memory The memory to copy the string to.
     * @param {Number} memoryOffset The memory offset to copy the string to.
     */
    static transferStringToMemory(text, memory, memoryOffset) {
        // Create text encoder
        const encoder = new TextEncoder();

        //  Create the Uint8Array (UTC-8) of the text
        const uint8ArrayText = encoder.encode(text);

        // Create Uint8Array of the memory
        const uint8ArrayMemory = new Uint8Array(memory.buffer);
        
        // Copy the text to the WASM memory
        uint8ArrayMemory.set(uint8ArrayText, memoryOffset);

        // Add NULL terminator
        uint8ArrayMemory[memoryOffset + uint8ArrayText.length] = 0;
    }

    /**
     * Transfer a memory to string. This the memory area into text which is UTF8 encoded.
     * @param {WebAssembly.Memory}  memory The memory to copy the string to.
     * @param {Number} memoryOffset The memory offset to copy the string to.
     * @param {Number} textDataLength The length of the text is taking up. This is not the
     * number of characters in the string, but the amount of data it takes up (a UTF8 character can
     * 1, 2, 3 or 4 bytes long). This does not include the NULL terminator.
     * @return {String} The string transferred from memory.
     */
    static transferMemoryToString(memory, memoryOffset, textDataLength) {
        // If the text data length is zero then return empty string
        if (textDataLength === 0) return '';

        // Create Uint8Array from the WASM memory containing only the text (not the null end)
        const uint8ArrayText = new Uint8Array(memory.buffer, memoryOffset, textDataLength);

        // Create text decoder
        const textDecoder = new TextDecoder("UTF-8");

        // Decode the Uint8Array to (UTC-8) text
        const result = textDecoder.decode(uint8ArrayText);

        // Return the resulting string
        return result;
    }
}
