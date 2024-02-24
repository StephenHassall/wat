;; 32bit integer (i32) compare functions
(module
    ;; Is zero function
    (func (export "isZero") (param $number i32) (result i32)
        ;; Push the i32 integer $number parameter value on to the stack
        local.get $number

        ;; This instruction pops the last item off the stack, checks if it is zero,
        ;; if it is then pushes 1 (is zero) on to the stack, otherwise it pushes 0 (not zero)
        i32.eqz

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is equal function
    (func (export "isEqual") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if they are equal,
        ;; if it is then pushes 1 (equal) on to the stack, otherwise it pushes 0 (not equal)
        i32.eq

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is not equal function
    (func (export "isNotEqual") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if they are not equal,
        ;; if it is then pushes 1 (not equal) on to the stack, otherwise it pushes 0 (are equal)
        i32.ne

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is greater than signed function
    (func (export "isGreaterThanSigned") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if the $first is greater than the $second,
        ;; if it is then pushes 1 ($first > $second) on to the stack, otherwise it pushes 0 ($first <= $second)
        ;; This is signed, therefore integer values can be negative
        i32.gt_s

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is greater than unsigned function (-1 = 0xFFFFFFFF which is larger than 0)
    (func (export "isGreaterThanUnsigned") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if the $first is greater than the $second,
        ;; if it is then pushes 1 ($first > $second) on to the stack, otherwise it pushes 0 ($first <= $second)
        ;; This is unsigned, therefore integer values cannot be negative. -1 is seen as 0xFFFFFFFF which is larger than 0
        i32.gt_u

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is greater than or equal signed function
    (func (export "isGreaterThanOrEqualSigned") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if the $first is greater than or equal to the $second,
        ;; if it is then pushes 1 ($first >= $second) on to the stack, otherwise it pushes 0 ($first < $second)
        ;; This is signed, therefore integer values can be negative
        i32.ge_s

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is greater than or equal unsigned function (-1 = 0xFFFFFFFF which is larger than 0)
    (func (export "isGreaterThanOrEqualUnsigned") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if the $first is greater than or equal to the $second,
        ;; if it is then pushes 1 ($first >= $second) on to the stack, otherwise it pushes 0 ($first < $second)
        ;; This is unsigned, therefore integer values cannot be negative. -1 is seen as 0xFFFFFFFF which is larger than 0
        i32.ge_u

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is less than signed function
    (func (export "isLessThanSigned") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if the $first is less than the $second,
        ;; if it is then pushes 1 ($first < $second) on to the stack, otherwise it pushes 0 ($first >= $second)
        ;; This is signed, therefore integer values can be negative
        i32.lt_s

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is less than unsigned function (-1 = 0xFFFFFFFF which is larger than 0)
    (func (export "isLessThanUnsigned") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if the &first is less than the &second,
        ;; if it is then pushes 1 (&first < &second) on to the stack, otherwise it pushes 0 (&first >= &second)
        ;; This is unsigned, therefore integer values cannot be negative. -1 is seen as 0xFFFFFFFF which is larger than 0
        i32.lt_u

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is less than or equal signed function
    (func (export "isLessThanOrEqualSigned") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if the &first is less than or equal to the &second,
        ;; if it is then pushes 1 (&first <= &second) on to the stack, otherwise it pushes 0 (&first > &second)
        ;; This is signed, therefore integer values can be negative
        i32.le_s

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Is less than or equal unsigned function (-1 = 0xFFFFFFFF which is larger than 0)
    (func (export "isLessThanOrEqualUnsigned") (param $first i32) (param $second i32) (result i32)
        ;; Push the i32 integer $first parameter value on to the stack
        local.get $first

        ;; Push the i32 integer $second parameter value on to the stack
        local.get $second

        ;; This instruction pops the last two items off the stack, compares them, checks if the $first is less than or equal to the $second,
        ;; if it is then pushes 1 ($first <= $second) on to the stack, otherwise it pushes 0 ($first > $second)
        ;; This is unsigned, therefore integer values cannot be negative. -1 is seen as 0xFFFFFFFF which is larger than 0
        i32.le_u

        ;; The last item on the stack is the return value, which is the result of the last compare instruction
    )

    ;; Check age is within range #1
    (func (export "ageWithinRange1") (param $age i32) (param $min i32) (param $max i32) (result i32)
        ;; Check over min limit
        local.get $age
        local.get $min
        i32.ge_s

        ;; If over min limit
        if
            ;; Check under max limit
            local.get $age
            local.get $max
            i32.le_s

            ;; If under max limit
            if
                ;; Result is 1 (within range)
                i32.const 1
                return
            end
        end

        ;; Result 0 (not within range)
        i32.const 0
    )

    ;; Check age is within range #2
    (func (export "ageWithinRange2") (param $age i32) (param $min i32) (param $max i32) (result i32)
        ;; Check over min limit
        local.get $age
        local.get $min
        i32.ge_s

        ;; Check under max limit
        local.get $age
        local.get $max
        i32.le_s

        ;; Perform bitwise AND on both compare results
        i32.and

        ;; If $age >= $min AND $age <= $max
        if
            ;; Result is 1 (within range)
            i32.const 1
            return
        end

        ;; Result 0 (not within range)
        i32.const 0
    )
)
