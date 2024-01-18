;; Table get set example
(module
    ;; We need to declare the signature of the function (what it looks like) before we
    ;; can call them indirectly. This one has no parameter or return value
    (type $functionType (func))

    ;; Create table A for its function references
    (table $tableA 4 funcref)

    ;; Create table B for its function references
    (table $tableB 4 funcref)

    ;; Create table with all functions to pick from
    (table $tableAllFunctions 32 funcref)

    ;; Add all functions to element
    (elem $elementAllFunctions $tableAllFunctions (i32.const 0) $add1 $add2 $add3 $sub1 $sub2 $sub3 $mul2 $mul3)
    
    ;; Set global running total
    (global $runningTotal (mut i32) (i32.const 0))

    ;; Set function
    (func (export "setFunction") (param $table i32) (param $index i32) (param $functionId i32)
        ;; Set locals
        (local $functionRef funcref)

        ;; Get the function ref
        local.get $functionId
        table.get $tableAllFunctions
        local.set $functionRef

        ;; Check which table to add the function to
        local.get $table
        i32.const 1
        i32.eq
        if
            ;; Set the index into the table
            local.get $index

            ;; Set the function ref to put into it
            local.get $functionRef

            ;; Set table A with the function ref at the index
            table.set $tableA
        else
            ;; Set the index into the table
            local.get $index

            ;; Set the function ref to put into it
            local.get $functionRef

            ;; Set table B with the function ref at the index
            table.set $tableB
        end
    )

    ;; Run function from table A
    (func (export "runFunctionFromTableA") (param $index i32)
        ;; Push the index of the function to call on to the stack
        local.get $index

        ;; Call the function indirectly from $tableA
        call_indirect $tableA (type $functionType)
    )

    ;; Run function from table B
    (func (export "runFunctionFromTableB") (param $index i32)
        ;; Push the index of the function to call on to the stack
        local.get $index

        ;; Call the function indirectly from $tableB
        call_indirect $tableB (type $functionType)
    )

    ;; Get running total
    (func (export "getRunningTotal") (result i32)
        ;; Get and return the running total
        global.get $runningTotal
    )

    ;; Set running total
    (func (export "setRunningTotal") (param $value i32)
        ;; Set the running total
        local.get $value
        global.set $runningTotal
    )

    ;; Add 1 to running total
    (func $add1 (type $functionType)
        ;; Get, add 1 and set running total
        global.get $runningTotal
        i32.const 1
        i32.add
        global.set $runningTotal
    )

    ;; Add 2 to running total
    (func $add2 (type $functionType)
        ;; Get, add 2 and set running total
        global.get $runningTotal
        i32.const 2
        i32.add
        global.set $runningTotal
    )

    ;; Add 3 to running total
    (func $add3 (type $functionType)
        ;; Get, add 3 and set running total
        global.get $runningTotal
        i32.const 3
        i32.add
        global.set $runningTotal
    )

    ;; Subtract 1 to running total
    (func $sub1 (type $functionType)
        ;; Get, subtract by 1 and set running total
        global.get $runningTotal
        i32.const 1
        i32.sub
        global.set $runningTotal
    )

    ;; Subtract 2 to running total
    (func $sub2 (type $functionType)
        ;; Get, subtract by 2 and set running total
        global.get $runningTotal
        i32.const 2
        i32.sub
        global.set $runningTotal
    )

    ;; Subtract 3 to running total
    (func $sub3 (type $functionType)
        ;; Get, subtract by 3 and set running total
        global.get $runningTotal
        i32.const 3
        i32.sub
        global.set $runningTotal
    )

    ;; Mul 2 to running total
    (func $mul2 (type $functionType)
        ;; Get, multiple by 2 and set running total
        global.get $runningTotal
        i32.const 2
        i32.mul
        global.set $runningTotal
    )

    ;; Mul 3 to running total
    (func $mul3 (type $functionType)
        ;; Get, multiple by 3 and set running total
        global.get $runningTotal
        i32.const 3
        i32.mul
        global.set $runningTotal
    )
)
