;; Import function instructions
(module
    ;; Import function with no parameters and no return
    (import "import" "funcNoParamNoReturn" (func $funcNoParamNoReturn))

    ;; Import function with one parameter and no return
    (import "import" "funcOneParamNoReturn" (func $funcOneParamNoReturn (param $p1 i32)))

    ;; Import function with two different parameter and no return
    (import "import" "funcTwoParamNoReturn" (func $funcTwoParamNoReturn (param $p1 i32) (param $p2 f64)))

    ;; Import function with three parameters and one return
    (import "import" "funcThreeParam1Return" (func $funcThreeParam1Return (param $p1 i32) (param $p2 i32) (param $p3 i32) (result i32)))

    ;; Import function with 4 parameters and two return (without labelling parameters)
    (import "import" "func4Param2Return" (func $func4Param2Return (param i32 i32 f64 f64) (result i32 f64)))

    ;; Import console.log function
    (import "import" "consoleLog" (func $consoleLog (param $value1 i32) (param $value2 f64)))

    ;; Run outside functions
    (func (export "runOutsideFunctions")
        ;; Set locals
        (local $resultI32 i32)
        (local $resultF64 f64)

        ;; Call the function that has no parameters and does not return anything
        call $funcNoParamNoReturn

        ;; Call the function that has 1 parameter and does not return anything
        i32.const 42
        call $funcOneParamNoReturn

        ;; Call the function that has 2 parameters and does not return anything
        i32.const 101
        f64.const 12.32
        call $funcTwoParamNoReturn

        ;; Call the function that has 3 parameters and 1 return
        i32.const 404
        i32.const 101
        i32.const 1234
        call $funcThreeParam1Return
        local.set $resultI32

        ;; Write the return to the console
        local.get $resultI32
        f64.const 0
        call $consoleLog

        ;; Call the function that has 4 parameters and 2 return
        i32.const 911
        i32.const 9876
        f64.const 3.142
        f64.const 123.456
        call $func4Param2Return
        local.set $resultF64
        local.set $resultI32

        ;; Write the return to the console
        local.get $resultI32
        local.get $resultF64
        call $consoleLog
    )
    
)
