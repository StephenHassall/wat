/**
 * Memory dump tools.
 */

export default class MemoryDump  {
    /**
     * Show a section of memory in address/HEX/text format.
     * @param {ArrayBuffer} memory The memory to show.
     * @param {Number} offset The starting place to show the memory from.
     * @param {Number} length The number of bytes to show. We round up to nearest 16 byte.
     */
    static show(memory, offset, length) {
        // Get unsigned 8 bit integer version of the memory
        const data = new Uint8Array(memory);

        // The format of a line is like this
        // [address]: 01 02 03 04  05 06 07 08  09 10 11 12  13 14 15 16  .... .... TEXT ....

        // Set line offset
        let lineOffset = offset;

        // Set ending address
        const endingOffset = offset + length;

        // Set line byte
        let lineByte = 0;

        // For each line
        while (true) {
            // Set line array
            const line = [];

            // Add address HEX
            line.push(lineOffset.toString(16).toUpperCase().padStart(8, '0'));

            // Add ": " part
            line.push(': ');

            // For each of the next 16 bytes (add HEX value)
            for (let index = 0; index < 16; index++) {
                // Get next integer
                const value = data[lineOffset + index];

                // Add to hex list
                line.push(value.toString(16).toUpperCase().padStart(2, '0'));

                // Add space (plus extra space )
                line.push(' ');
                if (!((index + 1) % 4)) line.push(' ');
            }

            // For each of the next 16 bytes (add text value)
            for (let index = 0; index < 16; index++) {
                // Get next integer
                const value = data[lineOffset + index];

                // If outside range
                if (value < 32 || value > 126) {
                    // Add "." character
                    line.push('.');
                } else {
                    // Add the ASCII character value
                    line.push(String.fromCharCode(value));
                }

                // Add extra space if needed
                if (!((index + 1) % 4)) line.push(' ');
            }

            // Write line to console
            console.log(line.join(''));

            // Increase line offset
            lineOffset += 16;

            // Check limit
            if (lineOffset > endingOffset) break;
        }
    }
}
