;; Import function instructions
(module
    ;; Declare some globals
    (global $globalI32 (mut i32) (i32.const 0))
    (global $globalF64 (mut f64) (f64.const 0))

    ;; Function with no parameters and no return
    (func $funcNoParamNoReturn
        ;; Reset the globals
        i32.const 0
        global.set $globalI32
        f64.const 0
        global.set $globalF64
    )

    ;; Function with one parameter and no return
    (func $funcOneParamNoReturn (param $p1 i32)
        ;; Get the parameter and push it on the stack
        local.get $p1

        ;; Pop the stack value and put it in the global
        global.set $globalI32
    )

    ;; Function with two different parameter and no return
    (func $funcTwoParamNoReturn (param $p1 i32) (param $p2 f64)
        ;; Get the first parameter and push it on the stack
        local.get $p1

        ;; Pop the stack value and put it in the global
        global.set $globalI32

        ;; Get the second parameter and push it on the stack
        local.get $p2

        ;; Pop the stack value and put it in the global
        global.set $globalF64
    )

    ;; Function with three parameters and one return
    (func $funcThreeParam1Return (param $p1 i32) (param $p2 i32) (param $p3 i32) (result i32)
        ;; Get the first and second parameter and push them on to the stack
        local.get $p1
        local.get $p2

        ;; Pop both values off the stack and add them to gether, pushing the result onto the stack
        i32.add

        ;; Push the third parameter on to the stack (with the result of $p1 + $p2)
        local.get $p3

        ;; Pop both value off the stack again and add them together
        i32.add

        ;; The result on the stack is all 3 parameters added together. This value is the last value on the stack
        ;; and will become the return result
    )

    ;; Import function with 4 parameters and two return (without labelling parameters)
    (func $func4Param2Return (param i32 i32 f64 f64) (result i32 f64)
        ;; Take the first two parameters and add them together
        ;; We are using parameter indexes. The first parameter is index 0
        local.get 0
        local.get 1
        i32.add

        ;; Set the global with the result
        global.set $globalI32

        ;; Take the next two parameters and add them together
        local.get 2
        local.get 3
        f64.add

        ;; Set the global with the result
        global.set $globalF64

        ;; To return the results we need to push the values in the right order
        global.get $globalI32
        global.get $globalF64
    )

    ;; Call the funcNoParamNoReturn function
    (func (export "callFuncNoParamNoReturn")
        ;; This function has no parameters, so we do not need to push any values onto the stack
        call $funcNoParamNoReturn
    )
    
    ;; Call the funcOneParamNoReturn function
    (func (export "callFuncOneParamNoReturn")
        ;; This function has one parameter, therefore we need to push a parameter value on to the stack before calling it
        i32.const 42
        call $funcOneParamNoReturn
    )

    ;; Call the funcTwoParamNoReturn function
    (func (export "callFuncTwoParamNoReturn")
        ;; This function has two parameters, therefore we need to push both parameter values on to the stack in
        ;; the right order before calling it
        i32.const 101
        f64.const 3.142
        call $funcTwoParamNoReturn
    )

    ;; Call the funcThreeParam1Return function
    (func (export "callFuncThreeParam1Return")
        ;; This function has three parameters, therefore we need to push all parameter values on to the stack in
        ;; the right order before calling it
        i32.const 42
        i32.const 101
        i32.const 911
        call $funcThreeParam1Return

        ;; The function returned a value which is now on the stack. Pop it off and set the global with its value
        global.set $globalI32
    )

    ;; Call the func4Param2Return function
    (func (export "callFunc4Param2Return")
        ;; This function has four parameters, therefore we need to push all parameter values on to the stack in
        ;; the right order before calling it
        i32.const 42
        i32.const 101
        f64.const 3.142
        f64.const 12.34
        call $func4Param2Return

        ;; The function returned two valuea which is now on the stack. You need to pop them off the stack in the correct order
        ;; The first to pop off the stack was the last one push on
        global.set $globalF64
        global.set $globalI32
    )
)
