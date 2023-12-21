/**
 * Binary string tools.
 */

export default class BinaryString  {
    /**
     * Convert a number into a 32bit binary string in the format 0b01110110_10000000_00000000_00000000.
     * @param {Number} binaryNumber The number to be converted.
     * @return {String} The number formatted as a binary literal.
     */
    static convert32Bit(binaryNumber) {
        // If nothing
        if (binaryNumber === undefined) return 'undefined';
        if (binaryNumber === null) return 'null';

        // If the parameter is not of type number
        if (typeof binaryNumber !== 'number') return 'ERROR';
        
        // If the parameter is not an integer
        if (Number.isInteger(binaryNumber) === false) return 'ERROR';

        // Set text list
        const textList = [];

        // Add starting parts
        textList.push('0b');

        // For each bit from most to least significant bit
        for (let bit = 31; bit >= 0; bit--) {
            // Check if bit is 1
            if (1 << bit & binaryNumber) {
                // Add "1" character to text list
                textList.push('1');
            } else {
                // Add "0" character to text list
                textList.push('0');
            }

            // If 8, 16 or 24
            if (bit === 8 || bit === 16 || bit === 24) {
                // Add "_" part
                textList.push('_');
            }
        }

        // Return the text
        return textList.join('');
    }

    /**
     * Convert a number into an 8bit binary string in the format 0b01110110.
     * @param {Number} binaryNumber The number to be converted.
     * @return {String} The number formatted as a binary literal.
     */
    static convert8Bit(binaryNumber) {
        // If nothing
        if (binaryNumber === undefined) return 'undefined';
        if (binaryNumber === null) return 'null';

        // If the parameter is not of type number
        if (typeof binaryNumber !== 'number') return 'ERROR';
        
        // If the parameter is not an integer
        if (Number.isInteger(binaryNumber) === false) return 'ERROR';

        // Set text list
        const textList = [];

        // Add starting parts
        textList.push('0b');

        // For each bit from most to least significant bit
        for (let bit = 7; bit >= 0; bit--) {
            // Check if bit is 1
            if (1 << bit & binaryNumber) {
                // Add "1" character to text list
                textList.push('1');
            } else {
                // Add "0" character to text list
                textList.push('0');
            }
        }

        // Return the text
        return textList.join('');
    }
}
