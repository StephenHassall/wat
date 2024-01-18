/**
 * Run test function for quick sort in nodejs.
 */
import QuickSortTest from './quick-sort.js';
import MemoryDump from "../memory-dump.js";

// Create and run test function
const run = async function() {
    // Create and load it
    const quickSortTest = new QuickSortTest();
    await quickSortTest.load();

    // Create Uint32Array of the memory
    let uint32ArrayMemory = new Uint32Array(quickSortTest.memory.buffer);

    // Set list details
    const swapOffset = 0;
    const dataOffset = 4;   // After the first 32bit (4 byte integer swap area)
    let dataItemCount = 10;

    // Create random data
    for (let item = 0; item < dataItemCount; item++) {
        uint32ArrayMemory[item + 1] = Math.floor(Math.random() * 0x00FFFFFF);
    }

    // Test 1
    console.log('Test 1 quick sort:');
    console.log('Before:');
    for (let index = 0; index < dataItemCount; index++) {
        console.log('[' + index.toString() + '] = ' + uint32ArrayMemory[index + 1].toString());
    }
    quickSortTest.runQuickSort(dataOffset, dataItemCount, swapOffset);
    console.log('After:');
    for (let index = 0; index < dataItemCount; index++) {
        console.log('[' + index.toString() + '] = ' + uint32ArrayMemory[index + 1].toString());
    }


    // Reset the item count to an odd number
    dataItemCount = 13;

    // Create random data
    for (let item = 0; item < dataItemCount; item++) {
        uint32ArrayMemory[item + 1] = Math.floor(Math.random() * 0x00FFFFFF);
    }

    // Test 2
    console.log('Test 2 quick sort:');
    console.log('Before:');
    for (let index = 0; index < dataItemCount; index++) {
        console.log('[' + index.toString() + '] = ' + uint32ArrayMemory[index + 1].toString());
    }
    quickSortTest.runQuickSort(dataOffset, dataItemCount, swapOffset);
    console.log('After:');
    for (let index = 0; index < dataItemCount; index++) {
        console.log('[' + index.toString() + '] = ' + uint32ArrayMemory[index + 1].toString());
    }

    // Reset the item count and hard set the numbers
    dataItemCount = 5;
    uint32ArrayMemory[1] = 100;
    uint32ArrayMemory[2] = 101;
    uint32ArrayMemory[3] = 102;
    uint32ArrayMemory[4] = 102;
    uint32ArrayMemory[5] = 101;

    // Test 3
    console.log('Test 3 quick sort:');
    console.log('Before:');
    for (let index = 0; index < dataItemCount; index++) {
        console.log('[' + index.toString() + '] = ' + uint32ArrayMemory[index + 1].toString());
    }
    quickSortTest.runQuickSort(dataOffset, dataItemCount, swapOffset);
    console.log('After:');
    for (let index = 0; index < dataItemCount; index++) {
        console.log('[' + index.toString() + '] = ' + uint32ArrayMemory[index + 1].toString());
    }

}();
