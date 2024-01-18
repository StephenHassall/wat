/**
 * Run test function for table get set in nodejs.
 */
import TableGetSet from './table-get-set.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const tableGetSet = new TableGetSet();
    await tableGetSet.load();

    // Table A set to 2 add1 add1 add1 add1 = 6
    tableGetSet.setRunningTotal(2);
    tableGetSet.setFunction(1, 0, 0);
    tableGetSet.setFunction(1, 1, 0);
    tableGetSet.setFunction(1, 2, 0);
    tableGetSet.setFunction(1, 3, 0);
    tableGetSet.runFunctionFromTableA(0);
    tableGetSet.runFunctionFromTableA(1);
    tableGetSet.runFunctionFromTableA(2);
    tableGetSet.runFunctionFromTableA(3);
    let result = tableGetSet.getRunningTotal();
    console.log('2 add1 add1 add1 add1 = ' + result);

    // Table B set to 4 add2 mul2 sub1 add3 = 14
    tableGetSet.setRunningTotal(4);
    tableGetSet.setFunction(2, 0, 1);
    tableGetSet.setFunction(2, 1, 6);
    tableGetSet.setFunction(2, 2, 3);
    tableGetSet.setFunction(2, 3, 2);
    tableGetSet.runFunctionFromTableB(0);
    tableGetSet.runFunctionFromTableB(1);
    tableGetSet.runFunctionFromTableB(2);
    tableGetSet.runFunctionFromTableB(3);
    result = tableGetSet.getRunningTotal();
    console.log('4 add2 mul2 sub1 add3 = ' + result);
}();
