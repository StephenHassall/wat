/**
 * Run test function for global in nodejs.
 */
import Global from './global.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const global = new Global();
    await global.load();

    // Get and log globals
    console.log('Starting global values');
    console.log('importGlobalFromLiteral = ' + global.getImportGlobalFromLiteral());
    console.log('importGlobalMutableTrue = ' + global.getImportGlobalMutableTrue());
    console.log('importGlobalMutableFalse = ' + global.getImportGlobalMutableFalse());
    console.log('internalGlobalMutableTrue = ' + global.getInternalGlobalMutableTrue());
    console.log('internalGlobalMutableFalse = ' + global.getInternalGlobalMutableFalse());
    
    // Set import value from within
    console.log('Reset import global within to 123');
    global.setImportGlobalMutableTrue(123);
    console.log('importGlobalMutableTrue (from within) = ' + global.getImportGlobalMutableTrue());
    console.log('importGlobalMutableTrue (from outside) = ' + Global._globalMutableTrue.value);

    // Set import value from outside
    console.log('Reset import global outside to 456');
    Global._globalMutableTrue.value = 456;
    console.log('importGlobalMutableTrue (from within) = ' + global.getImportGlobalMutableTrue());
    console.log('importGlobalMutableTrue (from outside) = ' + Global._globalMutableTrue.value);

    // Set internal value
    console.log('Reset internal global to 234');
    global.setInternalGlobalMutableTrue(234);
    console.log('internalGlobalMutableTrue = ' + global.getInternalGlobalMutableTrue());
}();
