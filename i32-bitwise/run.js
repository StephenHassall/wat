/**
 * Run test function for i32-bitwise in nodejs.
 */
import I32BitWise from './i32-bitwise.js';
import BinaryString from "../binary-string.js";

// Create and run test function
const run = async function() {
    // Create and load it
    const i32BitWise = new I32BitWise();
    await i32BitWise.load();

    // Check AND function
    console.log('and(0b00000000, 0b00000000) = ' + BinaryString.convert8Bit(i32BitWise.and(0b00000000, 0b00000000)));
    console.log('and(0b00000000, 0b10101010) = ' + BinaryString.convert8Bit(i32BitWise.and(0b00000000, 0b10101010)));
    console.log('and(0b10101010, 0b00000000) = ' + BinaryString.convert8Bit(i32BitWise.and(0b10101010, 0b00000000)));
    console.log('and(0b10101010, 0b10101010) = ' + BinaryString.convert8Bit(i32BitWise.and(0b10101010, 0b10101010)));
    console.log('and(0b11111111, 0b10101010) = ' + BinaryString.convert8Bit(i32BitWise.and(0b11111111, 0b10101010)));
    console.log('and(0b10101010, 0b11111111) = ' + BinaryString.convert8Bit(i32BitWise.and(0b10101010, 0b11111111)));
    console.log('and(0b11111111, 0b11111111) = ' + BinaryString.convert8Bit(i32BitWise.and(0b11111111, 0b11111111)));

    // Check OR function
    console.log('or(0b00000000, 0b00000000) = ' + BinaryString.convert8Bit(i32BitWise.or(0b00000000, 0b00000000)));
    console.log('or(0b00000000, 0b10101010) = ' + BinaryString.convert8Bit(i32BitWise.or(0b00000000, 0b10101010)));
    console.log('or(0b10101010, 0b00000000) = ' + BinaryString.convert8Bit(i32BitWise.or(0b10101010, 0b00000000)));
    console.log('or(0b10101010, 0b10101010) = ' + BinaryString.convert8Bit(i32BitWise.or(0b10101010, 0b10101010)));
    console.log('or(0b11111111, 0b10101010) = ' + BinaryString.convert8Bit(i32BitWise.or(0b11111111, 0b10101010)));
    console.log('or(0b10101010, 0b11111111) = ' + BinaryString.convert8Bit(i32BitWise.or(0b10101010, 0b11111111)));
    console.log('or(0b11111111, 0b11111111) = ' + BinaryString.convert8Bit(i32BitWise.or(0b11111111, 0b11111111)));

    // Check XOR function
    console.log('xor(0b00000000, 0b00000000) = ' + BinaryString.convert8Bit(i32BitWise.xor(0b00000000, 0b00000000)));
    console.log('xor(0b00000000, 0b10101010) = ' + BinaryString.convert8Bit(i32BitWise.xor(0b00000000, 0b10101010)));
    console.log('xor(0b10101010, 0b00000000) = ' + BinaryString.convert8Bit(i32BitWise.xor(0b10101010, 0b00000000)));
    console.log('xor(0b10101010, 0b10101010) = ' + BinaryString.convert8Bit(i32BitWise.xor(0b10101010, 0b10101010)));
    console.log('xor(0b11111111, 0b10101010) = ' + BinaryString.convert8Bit(i32BitWise.xor(0b11111111, 0b10101010)));
    console.log('xor(0b10101010, 0b11111111) = ' + BinaryString.convert8Bit(i32BitWise.xor(0b10101010, 0b11111111)));
    console.log('xor(0b11111111, 0b11111111) = ' + BinaryString.convert8Bit(i32BitWise.xor(0b11111111, 0b11111111)));

    // Check shift left function
    console.log('shiftLeft(0b00000000, 0) = ' + BinaryString.convert8Bit(i32BitWise.shiftLeft(0b00000000, 0)));
    console.log('shiftLeft(0b00000001, 0) = ' + BinaryString.convert8Bit(i32BitWise.shiftLeft(0b00000001, 0)));
    console.log('shiftLeft(0b00000001, 1) = ' + BinaryString.convert8Bit(i32BitWise.shiftLeft(0b00000001, 1)));
    console.log('shiftLeft(0b00000001, 2) = ' + BinaryString.convert8Bit(i32BitWise.shiftLeft(0b00000001, 2)));
    console.log('shiftLeft(0b00000001, 8) = ' + BinaryString.convert32Bit(i32BitWise.shiftLeft(0b00000001, 8)));
    console.log('shiftLeft(0b10110111, 1) = ' + BinaryString.convert32Bit(i32BitWise.shiftLeft(0b10110111, 1)));
    console.log('shiftLeft(0b00000000_00000000_00000000_00000001, 9) = ' + BinaryString.convert32Bit(i32BitWise.shiftLeft(0b00000000_00000000_00000000_00000001, 9)));
    console.log('shiftLeft(0b10000000_00000000_00000000_00000000, 0) = ' + BinaryString.convert32Bit(i32BitWise.shiftLeft(0b10000000_00000000_00000000_00000000, 0)));
    console.log('shiftLeft(0b10110000_00000000_00000000_00000001, 6) = ' + BinaryString.convert32Bit(i32BitWise.shiftLeft(0b10110000_00000000_00000000_00000001, 6)));
    console.log('shiftLeft(0b00000000_00000000_00000000_00000001, 31) = ' + BinaryString.convert32Bit(i32BitWise.shiftLeft(0b00000000_00000000_00000000_00000001, 31)));
    console.log('shiftLeft(0b00000000_00000000_00000000_00000001, 33) = ' + BinaryString.convert32Bit(i32BitWise.shiftLeft(0b00000000_00000000_00000000_00000001, 33)));

    // Check shift right signed function
    console.log('shiftRightSigned(0b00000000, 0) = ' + BinaryString.convert8Bit(i32BitWise.shiftRightSigned(0b00000000, 0)));
    console.log('shiftRightSigned(0b00000000, 1) = ' + BinaryString.convert8Bit(i32BitWise.shiftRightSigned(0b00000000, 1)));
    console.log('shiftRightSigned(0b00000001, 1) = ' + BinaryString.convert8Bit(i32BitWise.shiftRightSigned(0b00000001, 1)));
    console.log('shiftRightSigned(0b00000010, 1) = ' + BinaryString.convert8Bit(i32BitWise.shiftRightSigned(0b00000010, 1)));
    console.log('shiftRightSigned(0b00001000, 2) = ' + BinaryString.convert8Bit(i32BitWise.shiftRightSigned(0b00001000, 2)));
    console.log('shiftRightSigned(0b01101000, 3) = ' + BinaryString.convert8Bit(i32BitWise.shiftRightSigned(0b01101000, 3)));
    console.log('shiftRightSigned(0b11010000, 1) = ' + BinaryString.convert8Bit(i32BitWise.shiftRightSigned(0b11010000, 1)));
    console.log('shiftRightSigned(0b10000000_00000000_00000000_00000000, 1) = ' + BinaryString.convert32Bit(i32BitWise.shiftRightSigned(0b10000000_00000000_00000000_00000000, 1)));
    console.log('shiftRightSigned(0b01000000_00000000_00000000_00000000, 1) = ' + BinaryString.convert32Bit(i32BitWise.shiftRightSigned(0b01000000_00000000_00000000_00000000, 1)));
    console.log('shiftRightSigned(0b01110110_10000000_00000000_00000000, 2) = ' + BinaryString.convert32Bit(i32BitWise.shiftRightSigned(0b01110110_10000000_00000000_00000000, 2)));
    
    // Check shift right unsigned function
    console.log('shiftRightUnsigned(0b00000000, 0) = ' + BinaryString.convert8Bit(i32BitWise.shiftRightUnsigned(0b00000000, 0)));
    console.log('shiftRightUnsigned(0b00000000, 1) = ' + BinaryString.convert8Bit(i32BitWise.shiftRightUnsigned(0b00000000, 1)));
    console.log('shiftRightUnsigned(0b00000001, 1) = ' + BinaryString.convert8Bit(i32BitWise.shiftRightUnsigned(0b00000001, 1)));
    console.log('shiftRightUnsigned(0b00000010, 1) = ' + BinaryString.convert8Bit(i32BitWise.shiftRightUnsigned(0b00000010, 1)));
    console.log('shiftRightUnsigned(0b00001000, 2) = ' + BinaryString.convert8Bit(i32BitWise.shiftRightUnsigned(0b00001000, 2)));
    console.log('shiftRightUnsigned(0b01101000, 3) = ' + BinaryString.convert8Bit(i32BitWise.shiftRightUnsigned(0b01101000, 3)));
    console.log('shiftRightUnsigned(0b11010000, 1) = ' + BinaryString.convert8Bit(i32BitWise.shiftRightUnsigned(0b11010000, 1)));
    console.log('shiftRightUnsigned(0b10000000_00000000_00000000_00000000, 1) = ' + BinaryString.convert32Bit(i32BitWise.shiftRightUnsigned(0b10000000_00000000_00000000_00000000, 1)));
    console.log('shiftRightUnsigned(0b01000000_00000000_00000000_00000000, 1) = ' + BinaryString.convert32Bit(i32BitWise.shiftRightUnsigned(0b01000000_00000000_00000000_00000000, 1)));
    console.log('shiftRightUnsigned(0b01110110_10000000_00000000_00000000, 2) = ' + BinaryString.convert32Bit(i32BitWise.shiftRightUnsigned(0b01110110_10000000_00000000_00000000, 2)));

    // Check rotate left function
    console.log('rotateLeft(0b00000000, 0) = ' + BinaryString.convert8Bit(i32BitWise.rotateLeft(0b00000000, 0)));
    console.log('rotateLeft(0b00000001, 0) = ' + BinaryString.convert8Bit(i32BitWise.rotateLeft(0b00000001, 0)));
    console.log('rotateLeft(0b00000001, 1) = ' + BinaryString.convert8Bit(i32BitWise.rotateLeft(0b00000001, 1)));
    console.log('rotateLeft(0b00001101, 2) = ' + BinaryString.convert8Bit(i32BitWise.rotateLeft(0b00001101, 2)));
    console.log('rotateLeft(0b10000000_00000000_00000000_00000000, 0) = ' + BinaryString.convert32Bit(i32BitWise.rotateLeft(0b10000000_00000000_00000000_00000000, 0)));
    console.log('rotateLeft(0b10000000_00000000_00000000_00000000, 1) = ' + BinaryString.convert32Bit(i32BitWise.rotateLeft(0b10000000_00000000_00000000_00000000, 1)));
    console.log('rotateLeft(0b10000000_00000000_00000000_00000000, 2) = ' + BinaryString.convert32Bit(i32BitWise.rotateLeft(0b10000000_00000000_00000000_00000000, 2)));
    console.log('rotateLeft(0b10110000_00000000_00000000_00000000, 3) = ' + BinaryString.convert32Bit(i32BitWise.rotateLeft(0b10110000_00000000_00000000_00000000, 3)));

    // Check count leading zeros function
    console.log('countLeadingZeros(0b00000000_00000000_00000000_00000000) = ' + i32BitWise.countLeadingZeros(0b00000000_00000000_00000000_00000000));
    console.log('countLeadingZeros(0b00000000_00000000_00000000_00000001) = ' + i32BitWise.countLeadingZeros(0b00000000_00000000_00000000_00000001));
    console.log('countLeadingZeros(0b00000000_00000000_10000000_00000001) = ' + i32BitWise.countLeadingZeros(0b00000000_00000000_10000000_00000001));
    console.log('countLeadingZeros(0b01000000_00000000_00000000_00000000) = ' + i32BitWise.countLeadingZeros(0b01000000_00000000_10000000_00000000));
    console.log('countLeadingZeros(0b10000000_00000000_00000000_00000000) = ' + i32BitWise.countLeadingZeros(0b10000000_00000000_10000000_00000000));

    // Check count trailing zeros function
    console.log('countTrailingZeros(0b00000000_00000000_00000000_00000000) = ' + i32BitWise.countTrailingZeros(0b00000000_00000000_00000000_00000000));
    console.log('countTrailingZeros(0b00000000_00000000_00000000_00000001) = ' + i32BitWise.countTrailingZeros(0b00000000_00000000_00000000_00000001));
    console.log('countTrailingZeros(0b00000000_00000000_00000000_00000010) = ' + i32BitWise.countTrailingZeros(0b00000000_00000000_00000000_00000010));
    console.log('countTrailingZeros(0b00000000_00000000_00000000_00000100) = ' + i32BitWise.countTrailingZeros(0b00000000_00000000_00000000_00000100));
    console.log('countTrailingZeros(0b10000000_00000000_00000000_00000000) = ' + i32BitWise.countTrailingZeros(0b10000000_00000000_00000000_00000000));
    console.log('countTrailingZeros(0b10000000_10000000_00000000_00000000) = ' + i32BitWise.countTrailingZeros(0b10000000_10000000_00000000_00000000));
    console.log('countTrailingZeros(0b10000000_10000000_10000000_00000000) = ' + i32BitWise.countTrailingZeros(0b10000000_10000000_10000000_00000000));
    console.log('countTrailingZeros(0b10000000_10000000_10000000_10000000) = ' + i32BitWise.countTrailingZeros(0b10000000_10000000_10000000_10000000));

    // Check pop function
    console.log('populationCount(0b00000000_00000000_00000000_00000000) = ' + i32BitWise.populationCount(0b00000000_00000000_00000000_00000000));
    console.log('populationCount(0b00000000_00000000_00000000_00000001) = ' + i32BitWise.populationCount(0b00000000_00000000_00000000_00000001));
    console.log('populationCount(0b10000000_00000000_00000000_00000000) = ' + i32BitWise.populationCount(0b10000000_00000000_00000000_00000000));
    console.log('populationCount(0b10000000_10000000_10000000_10000000) = ' + i32BitWise.populationCount(0b10000000_10000000_10000000_10000000));
    console.log('populationCount(0b11111111_11111111_11111111_11111111) = ' + i32BitWise.populationCount(0b11111111_11111111_11111111_11111111));
    console.log('populationCount(0b01111111_11111111_11111111_11111111) = ' + i32BitWise.populationCount(0b01111111_11111111_11111111_11111111));
    console.log('populationCount(0b11111111_11111111_11111111_11111110) = ' + i32BitWise.populationCount(0b11111111_11111111_11111111_11111110));

}();
