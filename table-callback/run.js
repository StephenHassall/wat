/**
 * Run test function for table callback in nodejs.
 */
import TableCallback from './table-callback.js';
import MemoryDump from "../memory-dump.js";

// Create and run test function
const run = async function() {
    // Create and load it
    const tableCallback = new TableCallback();
    await tableCallback.load();

    // Sort with error
    let result = tableCallback.runBubbleSortError();
    console.log('Error bubble sort result = ' + result.toString());

    // Create Uint8Array of the memory
    let uint8ArrayMemory = new Uint8Array(tableCallback.memory.buffer);
    uint8ArrayMemory[0] = 4;
    uint8ArrayMemory[1] = 2;
    uint8ArrayMemory[2] = 0;
    uint8ArrayMemory[3] = 8;
    uint8ArrayMemory[4] = 5;
    uint8ArrayMemory[5] = 3;
    uint8ArrayMemory[6] = 6;
    uint8ArrayMemory[7] = 9;
    uint8ArrayMemory[8] = 7;
    uint8ArrayMemory[9] = 1;

    // Byte bubble sort
    console.log('Before byte bubble sort:')
    MemoryDump.show(tableCallback.memory.buffer, 0, 8);
    for (let index = 0; index < 10; index++) {
        console.log('[' + index.toString() + '] = ' + uint8ArrayMemory[index].toString());
    }
    result = tableCallback.runBubbleSortForByte(0, 10);
    console.log('Byte bubble sort result = ' + result.toString());
    console.log('After byte bubble sort:')
    MemoryDump.show(tableCallback.memory.buffer, 0, 8);
    for (let index = 0; index < 10; index++) {
        console.log('[' + index.toString() + '] = ' + uint8ArrayMemory[index].toString());
    }

    // Create Uint8Array of the memory
    let float64ArrayMemory = new Float64Array(tableCallback.memory.buffer);
    float64ArrayMemory[0] = 4.23;
    float64ArrayMemory[1] = 2.34;
    float64ArrayMemory[2] = 0.45;
    float64ArrayMemory[3] = 8.56;
    float64ArrayMemory[4] = 5.67;
    float64ArrayMemory[5] = 3.78;
    float64ArrayMemory[6] = 6.89;
    float64ArrayMemory[7] = 9.90;
    float64ArrayMemory[8] = 7.01;
    float64ArrayMemory[9] = 1.12;

    // Float 64 bubble sort
    console.log('Before float bubble sort:')
    MemoryDump.show(tableCallback.memory.buffer, 0, 32);
    for (let index = 0; index < 10; index++) {
        console.log('[' + index.toString() + '] = ' + float64ArrayMemory[index].toString());
    }
    result = tableCallback.runBubbleSortForFloat64(0, 10);
    console.log('Float bubble sort result = ' + result.toString());
    console.log('After byte bubble sort:')
    MemoryDump.show(tableCallback.memory.buffer, 0, 32);
    for (let index = 0; index < 10; index++) {
        console.log('[' + index.toString() + '] = ' + float64ArrayMemory[index].toString());
    }

}();
