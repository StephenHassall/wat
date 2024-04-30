/**
 * Run test function for memory read write in nodejs.
 */
import MemoryReadWrite from './memory-read-write.js';
import MemoryDump from "../memory-dump.js";
import BinaryString from "../binary-string.js";

// Create and run test function
const run = async function() {
    // Create and load it
    const memoryReadWrite = new MemoryReadWrite();
    await memoryReadWrite.load();

    // Check store 32 bit integer
    console.log('store32BitInteger');
    memoryReadWrite.store32BitInteger(0b00000100_00000011_00000010_00000001, 0);
    memoryReadWrite.store32BitInteger(0b01000100_01000011_01000010_01000001, 4);
    MemoryDump.show(memoryReadWrite._instance.exports.memory.buffer, 0, 8);

    // Clear memory for next test
    memoryReadWrite.clear(0, 16);

    // Check store 32 bit integer with extra offset
    console.log('store32BitIntegerWithOffset');
    memoryReadWrite.store32BitIntegerWithOffset(0b00000100_00000011_00000010_00000001, 2);
    MemoryDump.show(memoryReadWrite._instance.exports.memory.buffer, 0, 8);

    // Clear memory for next test
    memoryReadWrite.clear(0, 16);

    // Check store 32 bit integer with align
    console.log('store32BitIntegerWithAlign2');
    memoryReadWrite.store32BitIntegerWithAlign2(0b00000100_00000011_00000010_00000001, 1);
    MemoryDump.show(memoryReadWrite._instance.exports.memory.buffer, 0, 8);

    // Clear memory for next test
    memoryReadWrite.clear(0, 16);

    // Check store 16 bit integer
    console.log('store16BitInteger');
    memoryReadWrite.store16BitInteger(0b00000100_00000011_00000010_00000001, 0);
    memoryReadWrite.store16BitInteger(0b01000100_01000011_01000010_01000001, 4);
    MemoryDump.show(memoryReadWrite._instance.exports.memory.buffer, 0, 8);

    // Clear memory for next test
    memoryReadWrite.clear(0, 16);

    // Check store 8 bit integer
    console.log('store8BitInteger');
    memoryReadWrite.store8BitInteger(0b00000100_00000011_00000010_00000001, 0);
    memoryReadWrite.store8BitInteger(0b01000100_01000011_01000010_01000001, 4);
    MemoryDump.show(memoryReadWrite._instance.exports.memory.buffer, 0, 8);

    // Clear memory for next test
    memoryReadWrite.clear(0, 16);

    // Check load 32 bit integer
    console.log('load32BitInteger');
    memoryReadWrite.store32BitInteger(0b10000000_10000000_10000000_10000000, 0);
    memoryReadWrite.store32BitInteger(0b10000001_10000001_10000001_10000001, 4);
    console.log('00000000: = ' + BinaryString.convert32Bit(memoryReadWrite.load32BitInteger(0)));
    console.log('00000004: = ' + BinaryString.convert32Bit(memoryReadWrite.load32BitInteger(4)));
    MemoryDump.show(memoryReadWrite._instance.exports.memory.buffer, 0, 8);

    // Clear memory for next test
    memoryReadWrite.clear(0, 16);

    // Check load 16 bit integer signed
    console.log('load16BitIntegerSigned');
    memoryReadWrite.store16BitInteger(0b10000100_10000011_10000010_10000001, 0);
    memoryReadWrite.store16BitInteger(0b01000100_10000011_01000010_01000001, 4);
    console.log('00000000: = ' + BinaryString.convert32Bit(memoryReadWrite.load16BitIntegerSigned(0)));
    console.log('00000004: = ' + BinaryString.convert32Bit(memoryReadWrite.load16BitIntegerSigned(4)));
    MemoryDump.show(memoryReadWrite._instance.exports.memory.buffer, 0, 8);

    // Clear memory for next test
    memoryReadWrite.clear(0, 16);

    // Check load 16 bit integer unsigned
    console.log('load16BitIntegerUnsigned');
    memoryReadWrite.store16BitInteger(0b10000100_10000011_10000010_10000001, 0);
    memoryReadWrite.store16BitInteger(0b01000100_10000011_01000010_01000001, 4);
    console.log('00000000: = ' + BinaryString.convert32Bit(memoryReadWrite.load16BitIntegerUnsigned(0)));
    console.log('00000004: = ' + BinaryString.convert32Bit(memoryReadWrite.load16BitIntegerUnsigned(4)));
    MemoryDump.show(memoryReadWrite._instance.exports.memory.buffer, 0, 8);

    // Clear memory for next test
    memoryReadWrite.clear(0, 16);

    // Check load 8 bit integer signed
    console.log('load8BitIntegerSigned');
    memoryReadWrite.store8BitInteger(0b10000100_10000011_10000010_10000001, 0);
    memoryReadWrite.store8BitInteger(0b01000100_10000011_01000010_01000001, 4);
    console.log('00000000: = ' + BinaryString.convert32Bit(memoryReadWrite.load8BitIntegerSigned(0)));
    console.log('00000004: = ' + BinaryString.convert32Bit(memoryReadWrite.load8BitIntegerSigned(4)));
    MemoryDump.show(memoryReadWrite._instance.exports.memory.buffer, 0, 8);

    // Clear memory for next test
    memoryReadWrite.clear(0, 16);

    // Check load 8 bit integer unsigned
    console.log('load8BitIntegerUnsigned');
    memoryReadWrite.store8BitInteger(0b10000100_10000011_10000010_10000001, 0);
    memoryReadWrite.store8BitInteger(0b01000100_10000011_01000010_01000001, 4);
    console.log('00000000: = ' + BinaryString.convert32Bit(memoryReadWrite.load8BitIntegerUnsigned(0)));
    console.log('00000004: = ' + BinaryString.convert32Bit(memoryReadWrite.load8BitIntegerUnsigned(4)));
    MemoryDump.show(memoryReadWrite._instance.exports.memory.buffer, 0, 8);

    // Clear memory for next test
    memoryReadWrite.clear(0, 16);

    // Check load 32 bit integer with offset
    console.log('load32BitIntegerOffset2');
    memoryReadWrite.store32BitInteger(0b00000100_00000011_00000010_00000001, 0);
    memoryReadWrite.store32BitInteger(0b00001000_00000111_00000110_00000101, 4);
    console.log('Result: = ' + BinaryString.convert32Bit(memoryReadWrite.load32BitIntegerOffset2(0)));
    MemoryDump.show(memoryReadWrite._instance.exports.memory.buffer, 0, 8);

    // Clear memory for next test
    memoryReadWrite.clear(0, 16);

    // Check store 64 bit float
    console.log('store64BitFloat');
    memoryReadWrite.store64BitFloat(12.34, 0);
    memoryReadWrite.store64BitFloat(-56.78, 8);
    console.log('00000000: = ' + memoryReadWrite.load64BitFloat(0));
    console.log('00000008: = ' + memoryReadWrite.load64BitFloat(8));
    MemoryDump.show(memoryReadWrite._instance.exports.memory.buffer, 0, 8);

}();
