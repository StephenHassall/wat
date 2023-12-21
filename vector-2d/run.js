/**
 * Run test function for vector 2d in nodejs.
 */
import Vector2d from './vector-2d.js';

// Create and run test function
const run = async function() {
    // Create some new vector 2d objects
    const v1 = await Vector2d.create();
    const v2 = await Vector2d.create();
    const v3 = await Vector2d.create();

    // Set vector parts
    v1.x = 1;
    v1.y = 2;
    v2.x = 3;
    v2.y = 4;
    v3.x = 5;
    v3.y = 6;

    // Log vector parts
    console.log('V1: ' + v1.x.toString() + ', ' + v1.y.toString());
    console.log('V2: ' + v2.x.toString() + ', ' + v2.y.toString());
    console.log('V3: ' + v3.x.toString() + ', ' + v3.y.toString());

    // Scale them
    console.log('Scale by x2...');
    v1.scale(2);
    v2.scale(2);
    v3.scale(2);

    // Log vector parts
    console.log('V1: ' + v1.x.toString() + ', ' + v1.y.toString());
    console.log('V2: ' + v2.x.toString() + ', ' + v2.y.toString());
    console.log('V3: ' + v3.x.toString() + ', ' + v3.y.toString());

    // Translate them
    console.log('Translate them...');
    v1.scale(2, 3);
    v2.scale(4, 5);
    v3.scale(6, 7);

    // Log vector parts
    console.log('V1: ' + v1.x.toString() + ', ' + v1.y.toString());
    console.log('V2: ' + v2.x.toString() + ', ' + v2.y.toString());
    console.log('V3: ' + v3.x.toString() + ', ' + v3.y.toString());

    // Rotate 30 degrees them
    console.log('Rotate then...');
    const radians = 30 * (Math.PI / 180);
    const sinRadians = Math.sin(radians);
    const cosRadians = Math.cos(radians);
    v1.rotate(sinRadians, cosRadians);
    v2.rotate(sinRadians, cosRadians);
    v3.rotate(sinRadians, cosRadians);

    // Log vector parts
    console.log('V1: ' + v1.x.toString() + ', ' + v1.y.toString());
    console.log('V2: ' + v2.x.toString() + ', ' + v2.y.toString());
    console.log('V3: ' + v3.x.toString() + ', ' + v3.y.toString());

    // Log result
    console.log('done');
}();
