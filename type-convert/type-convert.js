/**
 * Type convert functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class TypeConvert  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/type-convert.wasm');

        // Create WASM data from buffer
        const wasmData = new Uint8Array(wasmBuffer);

        // Instantiate the WASM data
        const promise = WebAssembly.instantiate(wasmData)
        .then((resultObject) => {
            // Set the module object
            this._module = resultObject.module;

            // Set the instance object
            this._instance = resultObject.instance;
        });

        // Return the promise
        return promise;
    }

    /**
     * Convert i64 to i32. This is done using the i32.wrap_i64 instruction.
     * @param {BigInt} number The i64 number to convert.
     * @return {Number} The converted i32 number.
     */
    i64toi32(number) {
        // Call and return the WASM i64_to_i32 function
        return this._instance.exports.i64_to_i32(number);
    }

    /**
     * Convert i32 to i64 keeping the sign part. This is done using the i64.extend_i32_s instruction.
     * @param {Number} number The i32 number to convert.
     * @return {BitNumber} The converted i64 number.
     */
    i32toi64Signed(number) {
        // Call and return the WASM i32_to_i64_signed function
        return this._instance.exports.i32_to_i64_signed(number);
    }

    /**
     * Convert i32 to i64 without keeping the sign part. This is done using the i64.extend_i32_u instruction.
     * @param {Number} number The i32 number to convert.
     * @return {BitNumber} The converted i64 number.
     */
    i32toi64Unsigned(number) {
        // Call and return the WASM i32_to_i64_unsigned function
        return this._instance.exports.i32_to_i64_unsigned(number);
    }

    /**
     * Convert f64 to i32 keeping the sign part. This is done using the i32.trunc_f64_s instruction.
     * @param {Number} number The f64 number to convert.
     * @return {Number} The converted i32 number.
     */
    f64toi32Signed(number) {
        // Call and return the WASM f64_to_i32_signed function
        return this._instance.exports.f64_to_i32_signed(number);
    }

    /**
     * Convert f64 to i32 without keeping the sign part. This is done using the i32.trunc_f64_u instruction.
     * @param {Number} number The f64 number to convert.
     * @return {Number} The converted i32 number.
     */
    f64toi32Unsigned(number) {
        // Call and return the WASM f64_to_i32_unsigned function
        return this._instance.exports.f64_to_i32_unsigned(number);
    }

    /**
     * Convert f64 to i32 using saturation and keeping the sign part. This is done using the i32.trunc_sat_f32_s instruction.
     * Saturation is used to add limits. If the number is outside the limits, instead of throwing a runtime error, it
     * returned value is the upper or lower limit.
     * @param {Number} number The f64 number to convert.
     * @return {Number} The converted i32 number.
     */
    f64toi32SaturateSigned(number) {
        // Call and return the WASM f64_to_i32_saturate_signed function
        return this._instance.exports.f64_to_i32_saturate_signed(number);
    }

    /**
     * Convert i32 to f64 keeping the sign part. This is done using the i32.convert_i32_s instruction.
     * @param {Number} number The i32 number to convert.
     * @return {Number} The converted f64 number.
     */
    i32tof64Signed(number) {
        // Call and return the WASM i32_to_f64_signed function
        return this._instance.exports.i32_to_f64_signed(number);
    }

    /**
     * Convert i32 to f64 not keeping the sign part. This is done using the i32.convert_i32_u instruction.
     * @param {Number} number The i32 number to convert.
     * @return {Number} The converted f64 number.
     */
    i32tof64Unsigned(number) {
        // Call and return the WASM i32_to_f64_unsigned function
        return this._instance.exports.i32_to_f64_unsigned(number);
    }

    /**
     * Reinterpret a f32 float in its binary form into an i32 integer. The binary form is trasferred, not its value. This is done using the i32.reinterpret_f32 instruction.
     * @param {Number} number The binary form of a f32 float, stored as an i32 integer.
     * @return {Number} The reinterpretted f32 number.
     */
    f32asi32(number) {
        // Call and return the WASM f32_as_i32 function
        return this._instance.exports.f32_as_i32(number);
    }

    /**
     * Reinterpret the binary form of a f32 float number, that is stored in an i32 integer, into f32 float. This is done using the f32.reinterpret_i32 instruction.
     * @param {Number} number The binary form of a f32 float, stored as an i32 integer.
     * @return {Number} The reinterpretted f32 number.
     */
    i32asf32(number) {
        // Call and return the WASM i32_as_f32 function
        return this._instance.exports.i32_as_f32(number);
    }

    /**
     * While looking at the lower end 8 bits of a i32 integer as the only part of the number, we convert it into a 32 bit number, taking
     * the 8 bit sign into account.
     * @param {Number} number The lower end 8bit of an integer.
     * @return {Number} The final i32 integer value of those 8 bits.
     */
    i32Extend8Signed(number) {
        // Call and return the WASM i32Extend8Signed function
        return this._instance.exports.i32Extend8Signed(number);
    }

}
