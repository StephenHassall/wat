;; 32bit integer (i32) math functions
(module
    ;; Add function
    (func (export "add") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, adds them together, and pushes the result
        ;; onto the stack
        i32.add

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Subtract function
    (func (export "subtract") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, subtracts the second from the $first (result = $first - $second), and
        ;; pushes the result onto the stack. Note: the order we pushed the values on to the stack is important
        i32.sub

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Multiply function
    (func (export "multiply") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, multiples them together, and pushes the result
        ;; onto the stack
        i32.mul

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Divide signed function
    (func (export "divideSigned") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, divide the $first by the $second (result = $first / $second), disgarding
        ;; any remaining amount, and pushes the result onto the stack. Note: the order we pushed the values on to the stack is important.
        ;; This is signed, therefore integer values can be negative
        i32.div_s

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Divide unsigned function
    (func (export "divideUnsigned") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, divide the $first by the $second (result = $first / $second), disgarding
        ;; any remaining amount, and pushes the result onto the stack. Note: the order we pushed the values on to the stack is important.
        ;; This is unsigned, therefore integer values cannot be negative. -1 is seen as 0xFFFFFFFF
        i32.div_u

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Remainder signed function
    (func (export "remainderSigned") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, calculates the remainder of the division of the $first by the $second
        ;; (result = $first % $second), and pushes the result onto the stack. Note: the order we pushed the values on to the stack is important.
        ;; This is signed, therefore integer values can be negative
        i32.rem_s

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Remainder unsigned function
    (func (export "remainderUnsigned") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, calculates the remainder of the division of the $first by the $second
        ;; (result = $first % $second), and pushes the result onto the stack. Note: the order we pushed the values on to the stack is important.
        ;; This is unsigned, therefore integer values cannot be negative. -1 is seen as 0xFFFFFFFF
        i32.rem_u

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )
)
