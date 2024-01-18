;; Exception handling example
;; You will need to use the "--enable-exceptions" command to compile
(module
    ;; Import the tags. These are the structures of the exceptions. There must
    ;; be the same WebAssembly.Tag objects in JavaScript

    ;; Integer exception (used with a single i32 value)
    (import "import" "integerException" (tag $integerException (param i32)))

    ;; Float exception (used with a single f64 value)
    (import "import" "floatException" (tag $floatException (param f64)))

    ;; Data exception (used with a 2 i32 and 2 f64 values) The order of the params is import
    ;; and must match how the WebAssembly.Tag object is constructed
    (import "import" "dataException" (tag $dataException (param i32) (param i32) (param f64) (param f64)))

    ;; Divide by zero
    (func (export "divideByZero") (result i32)
        ;; Create a run time exception by dividing by zero
        i32.const 1
        i32.const 0
        i32.div_s
    )

    ;; Throw integer exception
    (func (export "throwIntegerException") (param $value i32)
        ;; Push the exception parameters on to the stack
        local.get $value

        ;; Then throw the tag/exception
        throw $integerException
    )

    ;; Throw float exception
    (func (export "throwFloatException") (param $value f64)
        ;; Push the exception parameters on to the stack
        local.get $value

        ;; Then throw the tag/exception
        throw $floatException
    )

    ;; Throw data exception
    (func (export "throwDataException") (param $valueA i32) (param $valueB i32) (param $valueC f64) (param $valueD f64)
        ;; Push the exception parameters on to the stack
        local.get $valueA
        local.get $valueB
        local.get $valueC
        local.get $valueD

        ;; Then throw the tag/exception
        throw $dataException
    )
)
