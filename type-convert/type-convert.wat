;; Type convert functions
(;
    We are only looking at i32, i64, f32 and f64 types here.

    There are other type convertion instructions I have not made functions for. These are the following

    i32.trunc_f32_s
    i32.trunc_f32_u
    i32.trunc_sat_f32_s
    i32.trunc_sat_f32_u
    Convert f32 floats to i32 integers with and without the sign, with and without saturation limits.

    i64.trunc_f32_s
    i64.trunc_f32_u
    i64.trunc_sat_f32_s
    i64.trunc_sat_f32_u
    Convert f32 floats to i64 integers with and without the sign, with and without saturation limits.

    i64.trunc_f64_s
    i64.trunc_f64_u
    i64.trunc_sat_f64_s
    i64.trunc_sat_f64_u
    Convert f64 floats to i64 integers with and without the sign, with and without saturation limits.

    f32.convert_i32_s
    f32.convert_i32_u
    Convert i32 integers to f32 floats with and without the sign.

    f32.convert_i64_s
    f32.convert_i64_u
    Convert i64 integers to f32 floats with and without the sign.

    f32.demote_f64
    Convert a f64 float into a f32 float.

    f64.convert_i64_s
    f64.convert_i64_u
    Convert i64 integers to f64 floats with and without the sign.

    f64.promote_f32
    Convert a f32 float into a f64 float.

    i64.reinterpret_f64
    f64.reinterpret_i64
    Takes the binary form of a f32 float and stores it in a i32 integer, not its value but what it looks like in memory.

    i32.extend16_s
    i64.extend8_s
    i64.extend16_s
    i64.extend32_s
    If the lower part of the integer is seen as the whole number (first 8bits, 0b10101010), we then convert it into
    an i32 integer, taking what looks like a negative value into account (0b10101010 = 0b11111111_11111111_11111111_10101010).
;)
(module
    ;; i64 to i32 function
    (func (export "i64_to_i32") (param $number i64) (result i32)
        ;; Push the i64 integer $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, converts it into a i32 number, and pushes the result
        ;; onto the stack
        i32.wrap_i64

        ;; The last item on the stack is the return value, which is the result of the last convertion instruction
    )

    ;; i32 to i64 signed function
    (func (export "i32_to_i64_signed") (param $number i32) (result i64)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, converts it into a i64 number taking the sign into account, and pushes the result
        ;; onto the stack
        i64.extend_i32_s

        ;; The last item on the stack is the return value, which is the result of the last convertion instruction
    )

    ;; i32 to i64 unsigned function
    (func (export "i32_to_i64_unsigned") (param $number i32) (result i64)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, converts it into a i64 number without taking the sign into account, and pushes
        ;; the result onto the stack
        i64.extend_i32_u

        ;; The last item on the stack is the return value, which is the result of the last convertion instruction
    )

    ;; f64 to i32 signed function
    (func (export "f64_to_i32_signed") (param $number f64) (result i32)
        ;; Push the f64 float $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, converts it into a i32 number keeping the sign part, and pushes the result
        ;; onto the stack
        i32.trunc_f64_s

        ;; The last item on the stack is the return value, which is the result of the last convertion instruction
    )

    ;; f64 to i32 unsigned function
    (func (export "f64_to_i32_unsigned") (param $number f64) (result i32)
        ;; Push the f64 float $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, converts it into a i32 number but not keeping the sign part, and pushes the result
        ;; onto the stack
        i32.trunc_f64_u

        ;; The last item on the stack is the return value, which is the result of the last convertion instruction
    )

    ;; f64 to i32 saturate signed function
    (func (export "f64_to_i32_saturate_signed") (param $number f64) (result i32)
        ;; Push the f64 float $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, converts it into a i32 number using saturation and keeping the sign part, and pushes the result
        ;; onto the stack
        i32.trunc_sat_f64_s

        ;; The last item on the stack is the return value, which is the result of the last convertion instruction
    )

    ;; i32 to f64 signed function
    (func (export "i32_to_f64_signed") (param $number i32) (result f64)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, converts it into a f64 number keeping the sign part, and pushes the result
        ;; onto the stack
        f64.convert_i32_s

        ;; The last item on the stack is the return value, which is the result of the last convertion instruction
    )

    ;; i32 to f64 unsigned function
    (func (export "i32_to_f64_unsigned") (param $number i32) (result f64)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, converts it into a f64 number not keeping the sign part, and pushes the result
        ;; onto the stack
        f64.convert_i32_u

        ;; The last item on the stack is the return value, which is the result of the last convertion instruction
    )

    ;; f32 as i32 function (what the f32 value looks like in binary, not its value)
    (func (export "f32_as_i32") (param $number f32) (result i32)
        ;; Push the f32 float $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, keeping its binary form it stores it as a i32 integer, and pushes the result
        ;; onto the stack
        i32.reinterpret_f32

        ;; The last item on the stack is the return value, which is the result of the last convertion instruction
    )

    ;; i32 as f32 function (what the f32 value looks like in binary, not its value)
    (func (export "i32_as_f32") (param $number i32) (result f32)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, keeping its binary form it stores it as a f32 float, and pushes the result
        ;; onto the stack
        f32.reinterpret_i32

        ;; The last item on the stack is the return value, which is the result of the last convertion instruction
    )

    ;; i32 extend 8 signed (seeing the lower end 8 bits as the only number and then convert to a 32 bit number)
    (func (export "i32Extend8Signed") (param $number i32) (result i32)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, only looking at the low end 8 bits, converts it into a 32 bit number (signed), and
        ;; pushes the result onto the stack
        i32.extend8_s

        ;; The last item on the stack is the return value, which is the result of the last convertion instruction
    )
)
