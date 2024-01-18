;; Table example
(module
    ;; We need to declare the signature of the function (what it looks like) before we
    ;; can call them indirectly
    (type $functionType
        (func (param $value i32) (result i32))
    )

    ;; Create table of function references
    (table 4 funcref)

    ;; Set the table elements with the function pointers
    (elem (i32.const 0) $add2 $double)

    ;; First function with the $functionType signature
    (func $add2 (type $functionType)
        ;; Get the first parameter (which is 0). We cannot use the $value name
        local.get 0

        ;; Add 2 to the parameter and put result on stack to be returned
        i32.const 2
        i32.add
    )

    ;; Second function with the $functionType signature
    (func $double (type $functionType)
        ;; Get the first parameter (which is 0).
        local.get 0

        ;; Double it and put result on stack to be returned
        i32.const 2
        i32.mul
    )

    ;; Set function index and parameter
    (global $functionIndex (mut i32) (i32.const 0))
    (global $functionParameter (mut i32) (i32.const 0))
    (global $functionResult (mut i32) (i32.const 0))

    ;; Set the function index that will be called
    (func (export "setFunctionIndex") (param $value i32)
        ;; Set the function index value
        local.get $value
        global.set $functionIndex
    )

    ;; Set the function parameter to use when calling the function
    (func (export "setFunctionParameter") (param $value i32)
        ;; Set the function parameter value
        local.get $value
        global.set $functionParameter    
    )

    ;; Get result from function call
    (func (export "getResult") (result i32)
        ;; Get and return the function result
        global.get $functionResult
    )

    ;; Call the function required
    (func (export "callFunction")
        ;; Push the parameters of the function on the stack first
        global.get $functionParameter

        ;; Then push the index of the function we want to call
        global.get $functionIndex
        
        ;; Call the function indirectly
        call_indirect (type $functionType)

        ;; The result is on the stack, so put into $functionResult
        global.set $functionResult
    )
)
