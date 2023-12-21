;; 32bit integer (i32) bitwise functions
(module
    ;; AND function
    (func (export "and") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, performs a bitwise AND operation, and pushes the result
        ;; onto the stack
        i32.and

        ;; The last item on the stack is the return value, which is the result of the last bitwise instruction
    )

    ;; OR function
    (func (export "or") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, performs a bitwise OR operation, and pushes the result
        ;; onto the stack
        i32.or

        ;; The last item on the stack is the return value, which is the result of the last bitwise instruction
    )

    ;; XOR function
    (func (export "xor") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, performs a bitwise XOR operation, and pushes the result
        ;; onto the stack
        i32.xor

        ;; The last item on the stack is the return value, which is the result of the last bitwise instruction
    )

    ;; Shift left function
    (func (export "shiftLeft") (param $number i32) (param $by i32) (result i32)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; Push the i32 integer $by parameter value on to the stack
        local.get $by

        ;; This instruction pops the last two items off the stack, performs a bitwise shift left operation on the number by the
        ;; given amount, and pushes the result onto the stack.
        ;; Note: the order we pushed the values on to the stack is important.
        i32.shl

        ;; The last item on the stack is the return value, which is the result of the last bitwise instruction
    )

    ;; Shift right signed function
    (func (export "shiftRightSigned") (param $number i32) (param $by i32) (result i32)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; Push the i32 integer $by parameter value on to the stack
        local.get $by

        ;; This instruction pops the last item off the stack, performs a bitwise shift right operation, and pushes the result
        ;; onto the stack. This is signed, therefore integer values can be negative. The new bit on the left (the most significant bit)
        ;; will be a 1 if the number is negative, or 0 if the number is positive.
        ;; Note: the order we pushed the values on to the stack is important.
        i32.shr_s

        ;; The last item on the stack is the return value, which is the result of the last bitwise instruction
    )

    ;; Shift right unsigned function
    (func (export "shiftRightUnsigned") (param $number i32) (param $by i32) (result i32)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; Push the i32 integer $by parameter value on to the stack
        local.get $by

        ;; This instruction pops the last item off the stack, performs a bitwise shift right operation, and pushes the result
        ;; onto the stack. This is unsigned, therefore integer values cannot be negative. -1 is seen as 0xFFFFFFFF. Also, the new
        ;; bit on the left (the most significant bit) will always be zero.
        ;; Note: the order we pushed the values on to the stack is important.
        i32.shr_u

        ;; The last item on the stack is the return value, which is the result of the last bitwise instruction
    )

    ;; Rotate left function
    (func (export "rotateLeft") (param $number i32) (param $by i32) (result i32)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; Push the i32 integer $by parameter value on to the stack
        local.get $by

        ;; This instruction pops the last two items off the stack, performs a bitwise rotate left operation on the number by the
        ;; given amount, and pushes the result onto the stack.
        ;; Note: the order we pushed the values on to the stack is important.
        i32.rotl

        ;; The last item on the stack is the return value, which is the result of the last bitwise instruction
    )

    ;; Rotate right function
    (func (export "rotateRight") (param $number i32) (param $by i32) (result i32)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; Push the i32 integer $by parameter value on to the stack
        local.get $by

        ;; This instruction pops the last two items off the stack, performs a bitwise rotate right operation on the number by the
        ;; given amount, and pushes the result onto the stack.
        ;; Note: the order we pushed the values on to the stack is important.
        i32.rotr

        ;; The last item on the stack is the return value, which is the result of the last bitwise instruction
    )

    ;; Count leading zeros function
    (func (export "countLeadingZeros") (param $number i32) (result i32)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, performs a bitwise count leading zeros operation on the number, and
        ;; pushes the result onto the stack. This is the number of 0 bits at the higher end of the binary number (0b00000110 has 5
        ;; leading zeros)
        i32.clz

        ;; The last item on the stack is the return value, which is the result of the last bitwise instruction
    )

    ;; Count trailing zeros function
    (func (export "countTrailingZeros") (param $number i32) (result i32)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, performs a bitwise count trailing zeros operation on the number, and
        ;; pushes the result onto the stack. This is the number of 0 bits at the lower end of the binary number (0b01100100 has 2
        ;; trailing zeros)
        i32.ctz

        ;; The last item on the stack is the return value, which is the result of the last bitwise instruction
    )

    ;; Population count function
    (func (export "populationCount") (param $number i32) (result i32)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, performs a bitwise population count operation on the number, and
        ;; pushes the result onto the stack. This is the count of 1 bits in the number (0b01100100 has a 3 population count)
        i32.popcnt

        ;; The last item on the stack is the return value, which is the result of the last bitwise instruction
    )
)
