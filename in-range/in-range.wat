;; Check the given number is within the range of the given min and max numbers.
(module
    ;; In range function
    (func (export "inRange")
        (param $number i32)
        (param $min i32)
        (param $max i32)
        (result i32)

        ;; Check the min value first

        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; Push the i32 integer $min parameter value on to the stack
        local.get $min

        ;; This instruction pops the last two items off the stack, compares them, checks if the $number is less than $min,
        ;; if it is then pushes 1 ($number < $min) on to the stack, otherwise it pushes 0 ($number >= $min)
        i32.lt_s

        ;; If true
        if
            ;; Push the value false on to the stack to say that the $number is outside the min/max range
            i32.const 0
            return
        end

        ;; Check the max value second

        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; Push the i32 integer $max parameter value on to the stack
        local.get $max

        ;; This instruction pops the last two items off the stack, compares them, checks if the $number is greater than $max,
        ;; if it is then pushes 1 ($number > $max) on to the stack, otherwise it pushes 0 ($number <= $max)
        i32.gt_s

        ;; If true
        if
            ;; Push the value false on to the stack to say that the $number is outside the min/max range
            i32.const 0
            return
        end

        ;; We must therefore be within the range. Push the value true on to the stack
        i32.const 1

        ;; The last item on the stack is the return value, which is the result of the function
    )
)
