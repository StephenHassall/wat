;; 64bit float (f64) math functions
(module
    ;; Add function
    (func (export "add") (param $first f64) (param $second f64) (result f64)
        ;; Push the f64 float $first parameter value on to the stack
        local.get $first

        ;; Push the f64 float $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, adds them together, and pushes the result
        ;; onto the stack
        f64.add

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Subtract function
    (func (export "subtract") (param $first f64) (param $second f64) (result f64)
        ;; Push the f64 float $first parameter value on to the stack
        local.get $first

        ;; Push the f64 float $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, subtracts the second from the $first (result = $first - $second), and
        ;; pushes the result onto the stack. Note: the order we pushed the values on to the stack is important
        f64.sub

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Multiply function
    (func (export "multiply") (param $first f64) (param $second f64) (result f64)
        ;; Push the f64 float $first parameter value on to the stack
        local.get $first

        ;; Push the f64 float $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, multiples them together, and pushes the result
        ;; onto the stack
        f64.mul

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Divide function
    (func (export "divide") (param $first f64) (param $second f64) (result f64)
        ;; Push the f64 float $first parameter value on to the stack
        local.get $first

        ;; Push the f64 float $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, divide the $first by the $second (result = $first / $second), disgarding
        ;; any remaining amount, and pushes the result onto the stack. Note: the order we pushed the values on to the stack is important.
        ;; This is signed, therefore integer values can be negative
        f64.div

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Absolute function
    (func (export "absolute") (param $number f64) (result f64)
        ;; Push the f64 float $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, performs the absolute operation, and pushes the result onto the stack.
        ;; This checks to see if the $number is negative and if so it will negate it, so that it is always positive.
        f64.abs

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Negate function
    (func (export "negate") (param $number f64) (result f64)
        ;; Push the f64 float $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, performs the negate operation, and pushes the result onto the stack.
        ;; This reverses the sign of the number. Turns a positive number negative, and turns a negative number positive.
        f64.neg

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Ceiling function
    (func (export "ceiling") (param $number f64) (result f64)
        ;; Push the f64 float $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, performs the ceiling operation, and pushes the result onto the stack.
        ;; This converts the number into an integer amount, rounding up, and removing the decimal point parts (it is still a float afterwards).
        f64.ceil

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; floor function
    (func (export "floor") (param $number f64) (result f64)
        ;; Push the f64 float $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, performs the ceiling operation, and pushes the result onto the stack.
        ;; This converts the number into an integer amount, rounding down, and removing the decimal point parts (it is still a float afterwards).
        f64.floor

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Nearest function
    (func (export "nearest") (param $number f64) (result f64)
        ;; Push the f64 float $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, performs the ceiling operation, and pushes the result onto the stack.
        ;; This converts the number into an integer amount, rounding to the nearest integer value, and removing the decimal point
        ;; parts (it is still a float afterwards).
        f64.nearest

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Truncate function
    (func (export "truncate") (param $number f64) (result f64)
        ;; Push the f64 float $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, performs the ceiling operation, and pushes the result onto the stack.
        ;; This converts the number into an integer amount, by removing the decimal point parts (it is still a float afterwards).
        ;; This is like the floor instruction but it does not round down with negative numbers.
        f64.trunc

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Square root function
    (func (export "squareRoot") (param $number f64) (result f64)
        ;; Push the f64 float $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, performs the square root operation, and pushes the result onto the stack.
        f64.sqrt

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Minimum function
    (func (export "minimum") (param $first f64) (param $second f64) (result f64)
        ;; Push the f64 float $first parameter value on to the stack
        local.get $first

        ;; Push the f64 float $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, checks which is the smallest number, and pushes the result onto the stack
        f64.min

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Maximum function
    (func (export "maximum") (param $first f64) (param $second f64) (result f64)
        ;; Push the f64 float $first parameter value on to the stack
        local.get $first

        ;; Push the f64 float $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, checks which is the largest number, and pushes the result onto the stack
        f64.max

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Copy sign function
    (func (export "copySign") (param $number f64) (param $sign f64) (result f64)
        ;; Push the f64 float $number parameter value on to the stack
        local.get $number

        ;; Push the f64 float $sign parameter value on to the stack
        local.get $sign

        ;; This instruction pops the last two items off the stack, gives the $number the same -/+ part that the $sign has
        f64.copysign

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

)
