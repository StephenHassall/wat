/**
 * Run test function for type-convert in nodejs.
 */
import TypeConvert from './type-convert.js';
import BinaryString from "../binary-string.js";

// Create and run test function
const run = async function() {
    // Create and load it
    const typeConvert = new TypeConvert();
    await typeConvert.load();

    // Check i64 to i32 function
    console.log('i64toi32(0) = ' + typeConvert.i64toi32(BigInt(0n)));
    console.log('i64toi32(-1) = ' + typeConvert.i64toi32(BigInt(-1n)));
    console.log('i64toi32(1) = ' + typeConvert.i64toi32(BigInt(1n)));
    console.log('i64toi32(0xFFFFFF) = ' + typeConvert.i64toi32(BigInt(0xFFFFFFFFn)).toString(16));
    console.log('i64toi32(0x01234567) = ' + typeConvert.i64toi32(BigInt(0x01234567n)).toString(16));
    console.log('i64toi32(0x0123456789ABCDEF) = ' + typeConvert.i64toi32(BigInt(0x0123456789ABCDEFn)).toString(16));
    console.log('i64toi32(0x0120000000000340) = ' + typeConvert.i64toi32(BigInt(0x0120000000000340n)).toString(16));

    // Check i32 to i64 signed function
    console.log('i32toi64Signed(0) = ' + typeConvert.i32toi64Signed(0));
    console.log('i32toi64Signed(-1) = ' + typeConvert.i32toi64Signed(-1));
    console.log('i32toi64Signed(1) = ' + typeConvert.i32toi64Signed(1));
    console.log('i32toi64Signed(0xFFFFFFFF) = ' + typeConvert.i32toi64Signed(0xFFFFFFFF));
    console.log('i32toi64Signed(2147483647) = ' + typeConvert.i32toi64Signed(2147483647));
    console.log('i32toi64Signed(2147483648) = ' + typeConvert.i32toi64Signed(2147483648));

    // Check i32 to i64 unsigned function
    console.log('i32toi64Unsigned(0) = ' + typeConvert.i32toi64Unsigned(0));
    console.log('i32toi64Unsigned(-1) = ' + typeConvert.i32toi64Unsigned(-1));
    console.log('i32toi64Unsigned(1) = ' + typeConvert.i32toi64Unsigned(1));
    console.log('i32toi64Unsigned(0xFFFFFFFF) = ' + typeConvert.i32toi64Unsigned(0xFFFFFFFF));
    console.log('i32toi64Unsigned(2147483647) = ' + typeConvert.i32toi64Unsigned(2147483647));
    console.log('i32toi64Unsigned(2147483648) = ' + typeConvert.i32toi64Unsigned(2147483648));
    console.log('i32toi64Unsigned(4294967295) = ' + typeConvert.i32toi64Unsigned(4294967295));
    console.log('i32toi64Unsigned(4294967296) = ' + typeConvert.i32toi64Unsigned(4294967296));
    console.log('i32toi64Unsigned(4294967297) = ' + typeConvert.i32toi64Unsigned(4294967297));

    // Check f64 to i32 signed function
    console.log('f64toi32Signed(0.0) = ' + typeConvert.f64toi32Signed(0.0));
    console.log('f64toi32Signed(1.0) = ' + typeConvert.f64toi32Signed(1.0));
    console.log('f64toi32Signed(-1.0) = ' + typeConvert.f64toi32Signed(-1.0));
    console.log('f64toi32Signed(123.456) = ' + typeConvert.f64toi32Signed(123.456));
    console.log('f64toi32Signed(-123.456) = ' + typeConvert.f64toi32Signed(-123.456));
    console.log('f64toi32Signed(123.567) = ' + typeConvert.f64toi32Signed(123.567));
    console.log('f64toi32Signed(-123.567) = ' + typeConvert.f64toi32Signed(-123.567));
    console.log('f64toi32Signed(2147483647.1234) = ' + typeConvert.f64toi32Signed(2147483647.1234));
    console.log('f64toi32Signed(-2147483647.1234) = ' + typeConvert.f64toi32Signed(-2147483647.1234));

    // RuntimeError: float unrepresentable in integer range
    // console.log('f64toi32Signed(2147483648.1234) = ' + typeConvert.f64toi32Signed(2147483648.1234));
    // The non-decimal part is larger than (signed) integer 2^31 value

    // Check f64 to i32 unsigned function
    console.log('f64toi32Unsigned(0.0) = ' + typeConvert.f64toi32Unsigned(0.0));
    console.log('f64toi32Unsigned(1.0) = ' + typeConvert.f64toi32Unsigned(1.0));
    console.log('f64toi32Unsigned(123.456) = ' + typeConvert.f64toi32Unsigned(123.456));
    console.log('f64toi32Unsigned(123.567) = ' + typeConvert.f64toi32Unsigned(123.567));
    console.log('f64toi32Unsigned(2147483648.1234) = ' + typeConvert.f64toi32Unsigned(2147483648.1234));
    console.log('f64toi32Unsigned(4294967295.1234) = ' + typeConvert.f64toi32Unsigned(4294967295.1234));
    
    // RuntimeError: float unrepresentable in integer range
    // console.log('f64toi32Unsigned(4294967296.1234) = ' + typeConvert.f64toi32Unsigned(4294967296.1234));
    // The non-decimal part is larger than (unsigned) integer 2^32 value
    //
    // console.log('f64toi32Unsigned(-1.0) = ' + typeConvert.f64toi32Unsigned(-1.0));
    // console.log('f64toi32Unsigned(123.456) = ' + typeConvert.f64toi32Unsigned(123.456));
    // Negative numbers are outside the (unsigned) integer range
    
    // Check f64 to i32 saturate and signed function
    console.log('f64toi32SaturateSigned(0.0) = ' + typeConvert.f64toi32SaturateSigned(0.0));
    console.log('f64toi32SaturateSigned(123.456) = ' + typeConvert.f64toi32SaturateSigned(123.456));
    console.log('f64toi32SaturateSigned(123.567) = ' + typeConvert.f64toi32SaturateSigned(123.567));
    console.log('f64toi32SaturateSigned(-123.456) = ' + typeConvert.f64toi32SaturateSigned(-123.456));
    console.log('f64toi32SaturateSigned(-123.567) = ' + typeConvert.f64toi32SaturateSigned(-123.567));
    console.log('f64toi32SaturateSigned(2147483646.1234) = ' + typeConvert.f64toi32SaturateSigned(2147483646.1234));
    console.log('f64toi32SaturateSigned(2147483647.1234) = ' + typeConvert.f64toi32SaturateSigned(2147483647.1234));
    console.log('f64toi32SaturateSigned(2147483648.1234) = ' + typeConvert.f64toi32SaturateSigned(2147483648.1234));
    console.log('f64toi32SaturateSigned(4294967296.1234) = ' + typeConvert.f64toi32SaturateSigned(4294967296.1234));

    // Check i32 to f64 signed function
    console.log('i32tof64Signed(0) = ' + typeConvert.i32tof64Signed(0));
    console.log('i32tof64Signed(1) = ' + typeConvert.i32tof64Signed(1));
    console.log('i32tof64Signed(-1) = ' + typeConvert.i32tof64Signed(-1));
    console.log('i32tof64Signed(2147483647) = ' + typeConvert.i32tof64Signed(2147483647));
    console.log('i32tof64Signed(4294967295) = ' + typeConvert.i32tof64Signed(4294967295));
    console.log('i32tof64Signed(4294967296) = ' + typeConvert.i32tof64Signed(4294967296));
    
    // Check i32 to f64 unsigned function
    console.log('i32tof64Unsigned(0) = ' + typeConvert.i32tof64Unsigned(0));
    console.log('i32tof64Unsigned(1) = ' + typeConvert.i32tof64Unsigned(1));
    console.log('i32tof64Unsigned(-1) = ' + typeConvert.i32tof64Unsigned(-1));
    console.log('i32tof64Unsigned(2147483647) = ' + typeConvert.i32tof64Unsigned(2147483647));
    console.log('i32tof64Unsigned(4294967295) = ' + typeConvert.i32tof64Unsigned(4294967295));
    console.log('i32tof64Unsigned(4294967296) = ' + typeConvert.i32tof64Unsigned(4294967296));


    // Check f32 as i32 and i32 as f32 functions
    console.log('f32asi32 and i32asf32');
    const testA_f32_before = 123.456;
    const testA_i32_binary = typeConvert.f32asi32(testA_f32_before);
    const testA_f32_after = typeConvert.i32asf32(testA_i32_binary);
    console.log('A: 123.456 = ' + testA_f32_before.toString() + ', ' + BinaryString.convert32Bit(testA_i32_binary) + ', ' + testA_f32_after.toString());

    const testB_f32_before = -123.456;
    const testB_i32_binary = typeConvert.f32asi32(testB_f32_before);
    const testB_f32_after = typeConvert.i32asf32(testB_i32_binary);
    console.log('B: 123.456 = ' + testB_f32_before.toString() + ', ' + BinaryString.convert32Bit(testB_i32_binary) + ', ' + testB_f32_after.toString());
    
    // Check i32 to f64 unsigned function
    console.log('i32Extend8Signed(0b00000000_00000000_00000000_00000000) = ' + BinaryString.convert32Bit(typeConvert.i32Extend8Signed(0b00000000_00000000_00000000_00000000)));
    console.log('i32Extend8Signed(0b00000000_00000000_00000000_00000001) = ' + BinaryString.convert32Bit(typeConvert.i32Extend8Signed(0b00000000_00000000_00000000_00000001)));
    console.log('i32Extend8Signed(0b00000000_00000000_00000000_01000001) = ' + BinaryString.convert32Bit(typeConvert.i32Extend8Signed(0b00000000_00000000_00000000_01000001)));
    console.log('i32Extend8Signed(0b00000000_00000000_00000100_01000001) = ' + BinaryString.convert32Bit(typeConvert.i32Extend8Signed(0b00000000_00000000_00000100_01000001)));
    console.log('i32Extend8Signed(0b00000000_00000000_00000100_11111111) = ' + BinaryString.convert32Bit(typeConvert.i32Extend8Signed(0b00000000_00000000_00000100_11111111)));

}();
