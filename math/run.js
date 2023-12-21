/**
 * Run test function for math in nodejs.
 */
import MathTest from './math.js';
import MathTools from './tools.js';

// Create and run test function
const run = async function() {
    // Create and load it
    const mathTest = new MathTest();
    await mathTest.load();

    // Check pow function
    console.log('mathPow(2, 0) = ' + mathTest.mathPow(2, 0));
    console.log('mathPow(2, 1) = ' + mathTest.mathPow(2, 1));
    console.log('mathPow(2, 2) = ' + mathTest.mathPow(2, 2));
    console.log('mathPow(2, 3) = ' + mathTest.mathPow(2, 3));
    console.log('mathPow(2, 4) = ' + mathTest.mathPow(2, 4));
    console.log('mathPow(2, 100) = ' + mathTest.mathPow(2, 100));
    console.log('mathPow(1.23456, 16) = ' + mathTest.mathPow(1.23456, 16));


    // Check radian_mod function
    console.log('radianMod(0 * (Math.PI / 180)) = ' + (MathTools.wat_get_radian_mod(0 * (Math.PI / 180)) * (180 / Math.PI)));
    console.log('radianMod(180 * (Math.PI / 180)) = ' + (MathTools.wat_get_radian_mod(180 * (Math.PI / 180)) * (180 / Math.PI)));
    console.log('radianMod(-180 * (Math.PI / 180)) = ' + (MathTools.wat_get_radian_mod(-180 * (Math.PI / 180)) * (180 / Math.PI)));
    console.log('radianMod(-30 * (Math.PI / 180)) = ' + (MathTools.wat_get_radian_mod(-30 * (Math.PI / 180)) * (180 / Math.PI)));
    console.log('radianMod(370 * (Math.PI / 180)) = ' + (MathTools.wat_get_radian_mod(370 * (Math.PI / 180)) * (180 / Math.PI)));
    console.log('radianMod(-370 * (Math.PI / 180)) = ' + (MathTools.wat_get_radian_mod(-370 * (Math.PI / 180)) * (180 / Math.PI)));

    // Check sin function
    console.log('mathSin...');
    for (let degree = -30; degree <= 390; degree += 15) {
        // Set radians
        const radians = degree * (Math.PI / 180);

        // Workout results
        const js = MathTools.wat_math_sin(radians);
        const wat = mathTest.mathSin(radians);
        const test = Math.sin(radians);

        // Log results
        console.log(
            degree.toString() + ',' +
            radians.toFixed(8) + ': ' +
            js.toFixed(8) + ', ' +
            wat.toFixed(8) + ', ' +
            test.toFixed(8)
        );
    }

    // Check cos function
    console.log('mathCos...');
    for (let degree = -30; degree <= 390; degree += 15) {
        // Set radians
        const radians = degree * (Math.PI / 180);

        // Workout results
        const js = MathTools.wat_math_cos(radians);
        const wat = mathTest.mathCos(radians);
        const test = Math.cos(radians);

        // Log results
        console.log(
            degree.toString() + ',' +
            radians.toFixed(8) + ': ' +
            js.toFixed(8) + ', ' +
            wat.toFixed(8) + ', ' +
            test.toFixed(8)
        );
    }

    // List the factorials
    //MathTools.listFactorials();
}();
