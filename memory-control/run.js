/**
 * Run test function for memory control in nodejs.
 */
import MemoryControl from './memory-control.js';
import MemoryDump from "../memory-dump.js";

// Create and run test function
const run = async function() {
    // Create and load it
    const memoryControl = new MemoryControl();
    await memoryControl.load();

    // Show starting memory
    console.log('Starting memory');
    MemoryDump.show(memoryControl._instance.exports.memory.buffer, 0, 32);

    // Initialize memory using passive memory item #1
    console.log('Set memory using passive memory #1');
    memoryControl.initFromPassiveMemory(0);
    MemoryDump.show(memoryControl._instance.exports.memory.buffer, 0, 32);

    // Initialize memory using passive memory item #2
    console.log('Set memory using passive memory #2');
    memoryControl.initFromPassiveMemory(1);
    MemoryDump.show(memoryControl._instance.exports.memory.buffer, 0, 32);

    // Copy memory
    console.log('Copy memory');
    memoryControl.copy(0x20, 0, 4);
    MemoryDump.show(memoryControl._instance.exports.memory.buffer, 0, 32);

    // Check memory size and grow
    console.log('Current memory size = ' + memoryControl.getMemorySize());
    console.log('Grow memory by 2 pages = ' + memoryControl.growMemory(2));
    console.log('Current memory size = ' + memoryControl.getMemorySize());

    // Check fill
    console.log('Fill memory');
    memoryControl.fill(2, 0x12345678, 8);
    MemoryDump.show(memoryControl._instance.exports.memory.buffer, 0, 16);
}();
