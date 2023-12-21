### Type convert

Looks at how the i32, i64, f32 and f64 types can be converted between themselfs.

- i32.wrap_i64 = convert i64 integer into an i32 integer
- i64.extend_i32_s, i64.extend_i32_u = converts i32 integer into an i64 integer
- i32.trunc_f64_s, i32.trunc_f64_u = convert f64 float into an i32 integer (with runtime errors if outside limits)
- i32.trunc_sat_f64_s, i32.trunc_sat_f64_u = convert f64 float into an i32 integer (with saturation, if limits reached, limits returned)
- f64.convert_i32_s, f64.convert_i32_u = convert i32 integer into a f64 float
- i32.reinterpret_f32, f32.reinterpret_i32 = convert a float's binary value between a float and integer
- i32.extend8_s = views the lower end of an integer as the only part and then converts it into a full integer value.

There are other type convertion instructions I have not made functions for. These are the following

Convert f32 floats to i32 integers with and without the sign, with and without saturation limits.
- i32.trunc_f32_s
- i32.trunc_f32_u
- i32.trunc_sat_f32_s
- i32.trunc_sat_f32_u

Convert f32 floats to i64 integers with and without the sign, with and without saturation limits.
- i64.trunc_f32_s
- i64.trunc_f32_u
- i64.trunc_sat_f32_s
- i64.trunc_sat_f32_u

Convert f64 floats to i64 integers with and without the sign, with and without saturation limits.
- i64.trunc_f64_s
- i64.trunc_f64_u
- i64.trunc_sat_f64_s
- i64.trunc_sat_f64_u

Convert i32 integers to f32 floats with and without the sign.
- f32.convert_i32_s
- f32.convert_i32_u

Convert i64 integers to f32 floats with and without the sign.
- f32.convert_i64_s
- f32.convert_i64_u

Convert a f64 float into a f32 float.
- f32.demote_f64

Convert i64 integers to f64 floats with and without the sign.
- f64.convert_i64_s
- f64.convert_i64_u

Convert a f32 float into a f64 float.
- f64.promote_f32

Takes the binary form of a f32 float and stores it in a i32 integer, not its value but what it looks like in memory.
-  i64.reinterpret_f64
-  f64.reinterpret_i64

If the lower part of the integer is seen as the whole number (first 8bits, 0b10101010), we then convert it into
an i32 integer, taking what looks like a negative value into account (0b10101010 = 0b11111111_11111111_11111111_10101010).
- i32.extend16_s
- i64.extend8_s
- i64.extend16_s
- i64.extend32_s
