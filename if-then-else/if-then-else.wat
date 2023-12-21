;; Looking a IF THEN ELSE END instructions
(module


    ;; Example 1 function
    (func (export "example1") (param $condition i32) (param $returnTrue i32) (param $returnFalse i32) (result i32)
        ;; The return value
        (local $returnValue i32)

        ;; Push the i32 integer $condition parameter value on to the stack
        local.get $condition
        
        ;; The if instruction on its own will pop the last item off the stack and see if it is 0 (false) or something other than 0 (true)
        if
            ;; If was true therefore we push the $returnTrue value on to the stack
            local.get $returnTrue
            local.set $returnValue
        else
            ;; If was not true therefore we push the $returnFalse value on to the stack
            local.get $returnFalse
            local.set $returnValue
        end

        ;; Push the return value onto the stack
        local.get $returnValue

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Example 2 function
    (func (export "example2") (param $condition i32) (param $returnTrue i32) (param $returnFalse i32) (result i32)
        ;; The return value
        (local $returnValue i32)

        ;; Push the i32 integer $condition parameter value on to the stack
        local.get $condition
        
        ;; The if instruction on its own will pop the last item off the stack and see if it is 0 (false) or something other than 0 (true)
        ;; Here the if is placed within its own S-expression, with the then and else in theirs too
        (if
            (then
                ;; If was true therefore we push the $returnTrue value on to the stack
                local.get $returnTrue
                local.set $returnValue
            )
            (else
                ;; If was not true therefore we push the $returnFalse value on to the stack
                local.get $returnFalse
                local.set $returnValue
            )
        )

        ;; Push the return value onto the stack
        local.get $returnValue

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Example 3 function
    (func (export "example3") (param $condition i32) (param $returnTrue i32) (param $returnFalse i32) (result i32)
        ;; The return value
        (local $returnValue i32)

        ;; The if instruction contains the condition part inside the S-expression.
        (if
            (
                ;; This part is ran first before the IF instruction is checked

                ;; Push the i32 integer $condition parameter value on to the stack
                local.get $condition
            )
            (then
                ;; If was true therefore we push the $returnTrue value on to the stack
                local.get $returnTrue
                local.set $returnValue
            )
            (else
                ;; If was not true therefore we push the $returnFalse value on to the stack
                local.get $returnFalse
                local.set $returnValue
            )
        )

        ;; Push the return value onto the stack
        local.get $returnValue

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Example 4 function
    (func (export "example4") (param $condition i32) (param $returnTrue i32) (param $returnFalse i32) (result i32)
        ;; Push the i32 integer $condition parameter value on to the stack
        local.get $condition
        
        ;; The if instruction on its own will pop the last item off the stack and see if it is 0 (false) or something other than 0 (true)
        ;; Because the end result of the IF instruction is that there will be something ending up on the stack, we need
        ;; to declare what type that will be. We do that with the "(result i32)" part after the "if"
        if (result i32)
            ;; If was true therefore we push the $returnTrue value on to the stack
            local.get $returnTrue
        else
            ;; If was not true therefore we push the $returnFalse value on to the stack
            local.get $returnFalse
        end

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )

    ;; Example 5 function
    (func (export "example5") (param $condition i32) (param $returnTrue i32) (param $returnFalse i32) (result i32)
        ;; Here we are using some short hand method for doing the same thing but using less number of lines.
        (if (result i32) (local.get $condition)
            (then local.get $returnTrue)
            (else local.get $returnFalse)
        )

        ;; The last item on the stack is the return value, which is the result of the last math instruction
    )
)
