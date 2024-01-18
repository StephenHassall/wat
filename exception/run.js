/**
 * Run test function for exception in nodejs.
 */
import ExceptionTest from './exception.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const exceptionTest = new ExceptionTest();
    await exceptionTest.load();

    // Divide by zero exception
    console.log('Divide by zero');
    try {
        // Call the function that will throw the exception
        exceptionTest.divideByZero();
    } catch (e) {
        // Log the exception
        console.log(e);
    }

    // Integer exception
    console.log('Integer exception >');
    try {
        // Call the function that will throw the exception
        exceptionTest.throwIntegerException(42);
    } catch (e) {
        // Check it is a Web Assembly exception
        if (e instanceof WebAssembly.Exception) {
            // Check it is the right tag
            if (e.is(ExceptionTest._integerException) === true) {
                // Get the arguments
                const value = e.getArg(ExceptionTest._integerException, 0);

                // Log result
                console.log('IntegerException thrown value = ' + value);
            } else {
                // Log error
                console.log('Unknown WebAssembly.Exception');
            }
        } else {
            // Log error
            console.log('Unknown exception');
        }
    }

    // Float exception
    console.log('Float exception >');
    try {
        // Call the function that will throw the exception
        exceptionTest.throwFloatException(12.34);
    } catch (e) {
        // Check it is a Web Assembly exception
        if (e instanceof WebAssembly.Exception) {
            // Check it is the right tag
            if (e.is(ExceptionTest._floatException) === true) {
                // Get the arguments
                const value = e.getArg(ExceptionTest._floatException, 0);

                // Log result
                console.log('FloatException thrown value = ' + value);
            } else {
                // Log error
                console.log('Unknown WebAssembly.Exception');
            }
        } else {
            // Log error
            console.log('Unknown exception');
        }
    }

    // Data exception
    console.log('Data exception >');
    try {
        // Call the function that will throw the exception
        exceptionTest.throwDataException(101, 404, 3.142, 0.03);
    } catch (e) {
        // Check it is a Web Assembly exception
        if (e instanceof WebAssembly.Exception) {
            // Check it is the right tag
            if (e.is(ExceptionTest._dataException) === true) {
                // Get the arguments
                const valueA = e.getArg(ExceptionTest._dataException, 0);
                const valueB = e.getArg(ExceptionTest._dataException, 1);
                const valueC = e.getArg(ExceptionTest._dataException, 2);
                const valueD = e.getArg(ExceptionTest._dataException, 3);

                // Log result
                console.log('DataException thrown valueA = ' + valueA + ', valueB = ' + valueB + ', valueC = ' + valueC + ', valueD = ' + valueD);
            } else {
                // Log error
                console.log('Unknown WebAssembly.Exception');
            }
        } else {
            // Log error
            console.log('Unknown exception');
        }
    }
}();
