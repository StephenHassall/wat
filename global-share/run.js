/**
 * Run test function for global share in nodejs.
 */
import GlobalShare from './global-share.js';

// Create and run test function
const run = async function() {
    // Create some new global share objects
    const gs1 = await GlobalShare.create();
    const gs2 = await GlobalShare.create();

    // Set the global share value from outside
    GlobalShare._globalShare.value = 42;

    // Log the global share value by reading in it within each instance
    console.log('GS1 = ' + gs1.getGlobalShare());
    console.log('GS2 = ' + gs2.getGlobalShare());

    // Set the global share value from within one of the instances
    gs1.setGlobalShare(101);

    // Log the global share value
    console.log('Outside = ' + GlobalShare._globalShare.value);
    console.log('GS1 = ' + gs1.getGlobalShare());
    console.log('GS2 = ' + gs2.getGlobalShare());
}();
