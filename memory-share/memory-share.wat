;; Memory share example (this can only be compiled with the "--enable-threads" switch)
(module
    ;; Create memory that is imported from JavaScript
    (import "import" "memory" (memory 1 10 shared))

    ;; Set the default global fill byte value
    (global $fillByte (mut i32) (i32.const 0))

    ;; Set $fillByte value
    (func (export "setFillByte") (param $value i32)
        ;; Copy $value into global $fillByte
        local.get $value
        global.set $fillByte
    )

    ;; Fill
    (func (export "fill") (param $memoryOffset i32) (param $length i32)
        ;; Set the offset from the start of the memory to fill
        local.get $memoryOffset

        ;; Set the 32 bit fill byte value
        global.get $fillByte

        ;; Set the length of the memory to fill
        local.get $length

        ;; Fill in the memory with the $fillByte from the $memoryOffset for the given $length (in bytes)
        memory.fill
    )
)
