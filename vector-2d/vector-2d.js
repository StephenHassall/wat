/**
 * Vector 2D object using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class Vector2d  {
    /**
     * Static WASM file data. We want to only load it data once.
     */
    static _module;

    /**
     * Create a new Vector 2d object.
     * @return {Promise} A promise that resolves a Vector2d object.
     */
    static async create() {
        // If we do not have the module loaded yet
        if (!Vector2d._module) {
            // Get current folder
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            
            // Read WASM data
            const wasmBuffer = await readFile(__dirname + '/vector-2d.wasm');

            // Create WASM data from buffer
            const wasmData = new Uint8Array(wasmBuffer);

            // Compile the WASM data
            Vector2d._module = await WebAssembly.compile(wasmData);
        }

        // Create new Vector2d object
        const vector2d = new Vector2d();

        // Instantiate a new instance
        vector2d._instance = await WebAssembly.instantiate(Vector2d._module);

        // Return the new vector 2d object
        return vector2d;
    }

    /**
     * Get the X value.
     * @return {Number} The X amount.
     */
    get x() {
        // Call and return the WASM get_x function
        return this._instance.exports.get_x();
    }

    /**
     * Set the X value.
     * @param {Number} value The X amount to set.
     */
    set x(value) {
        // Call the WASM set_x function
        this._instance.exports.set_x(value);
    }

    /**
     * Get the Y value.
     * @return {Number} The Y amount.
     */
    get y() {
        // Call and return the WASM get_y function
        return this._instance.exports.get_y();
    }

    /**
     * Set the Y value.
     * @param {Number} value The Y amount to set.
     */
    set y(value) {
        // Call the WASM set_y function
        this._instance.exports.set_y(value);
    }

    /**
     * Rotate the vector around its origin point.
     * @param {Number} sinRadians The value of the sin(radian) function.
     * @param {Number} cosRadians The value of the cos(radian) function.
     */
    rotate(sinRadians, cosRadians) {
        // Call the WASM rotate function
        this._instance.exports.rotate(sinRadians, cosRadians);
    }

    /**
     * Scale the vector size by the given scalar amount (from the origin point).
     * @param {Number} scalar The amount to scale the vector by.
     */
    scale(scalar) {
        // Call the WASM scale function
        this._instance.exports.scale(scalar);
    }

    /**
     * Translate (move) the vector by the given dx/dy parts.
     * @param {Number} dx The amount to translate the vector by along the X axis.
     * @param {Number} dy The amount to translate the vector by along the Y axis.
     */
    translate(dx, dy) {
        // Call the WASM translate function
        this._instance.exports.translate(dx, dy);
    }
}
