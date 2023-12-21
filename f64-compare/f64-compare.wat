;; 64bit float (f64) compare functions
(module
    ;; Is equal function
    (func (export "isEqual") (param $first f64) (param $second f64) (result i32)
        ;; Push the f64 float $first parameter value on to the stack
        local.get $first

        ;; Push the f64 float $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if they are equal,
        ;; if it is then pushes 1 (equal) on to the stack, otherwise it pushes 0 (not equal)
        f64.eq

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is not equal function
    (func (export "isNotEqual") (param $first f64) (param $second f64) (result i32)
        ;; Push the f64 float $first parameter value on to the stack
        local.get $first

        ;; Push the f64 float $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if they are not equal,
        ;; if it is then pushes 1 (not equal) on to the stack, otherwise it pushes 0 (are equal)
        f64.ne

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is greater than function
    (func (export "isGreaterThan") (param $first f64) (param $second f64) (result i32)
        ;; Push the f64 float $first parameter value on to the stack
        local.get $first

        ;; Push the f64 float $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if the $first is greater than the $second,
        ;; if it is then pushes 1 ($first > $second) on to the stack, otherwise it pushes 0 ($first <= $second)
        f64.gt

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is greater than or equal function
    (func (export "isGreaterThanOrEqual") (param $first f64) (param $second f64) (result i32)
        ;; Push the f64 float $first parameter value on to the stack
        local.get $first

        ;; Push the f64 float $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if the $first is greater than or equal to the $second,
        ;; if it is then pushes 1 ($first >= $second) on to the stack, otherwise it pushes 0 ($first < $second)
        f64.ge

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is less than function
    (func (export "isLessThan") (param $first f64) (param $second f64) (result i32)
        ;; Push the f64 float $first parameter value on to the stack
        local.get $first

        ;; Push the f64 float $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if the $first is less than the $second,
        ;; if it is then pushes 1 ($first < $second) on to the stack, otherwise it pushes 0 ($first >= $second)
        f64.lt

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is less than or equal function
    (func (export "isLessThanOrEqual") (param $first f64) (param $second f64) (result i32)
        ;; Push the f64 float $first parameter value on to the stack
        local.get $first

        ;; Push the f64 float $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if the &first is less than or equal to the &second,
        ;; if it is then pushes 1 (&first <= &second) on to the stack, otherwise it pushes 0 (&first > &second)
        f64.le

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )
)
