/**
 * Run test function for memory share in nodejs.
 */
import MemoryShare from './memory-share.js';
import MemoryDump from "../memory-dump.js";

// Create and run test function
const run = async function() {
    // Create some new memory share objects
    const ms1 = await MemoryShare.create();
    const ms2 = await MemoryShare.create();
    const ms3 = await MemoryShare.create();

    // Set fill bytes
    ms1.setFillByte(0x12);
    ms2.setFillByte(0x34);
    ms3.setFillByte(0x56);

    // Fill an area of the same shared memory
    ms1.fill(0, 8);
    ms2.fill(0x10, 8);
    ms3.fill(0x20, 8);

    // Show the single shared memory
    MemoryDump.show(MemoryShare._memory.buffer, 0, 32);
}();
