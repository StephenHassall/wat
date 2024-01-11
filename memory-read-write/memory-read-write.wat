;; Memory read write instructions
(module
    ;; Create memory that is only 1 page long (64Kb).
    ;; Exported as "memory". There can only be one block of memory per WAT file.
    (memory (export "memory") 1)

    ;; Clear
    (func (export "clear") (param $memoryOffset i32) (param $length i32)
        ;; Set the offset from the start of the memory to clear
        local.get $memoryOffset

        ;; Set the 32 bit value to set the memory to
        i32.const 0

        ;; Set the length of the memory to clear
        local.get $length

        ;; Fill in the memory with 0 from the $memoryOffset for the given $length (in bytes)
        memory.fill
    )

    ;; Store 32 bit integer
    (func (export "store32BitInteger") (param $value i32) (param $memoryOffset i32)
        ;; Set the offset from the start of the memory to store the 32 bit (4 byte) integer
        local.get $memoryOffset

        ;; Set the 32 bit (4 byte) integer value to store
        local.get $value

        ;; Store the 32 bit (4 byte) integer value in memory at the offset
        i32.store
    )

    ;; Store 16 bit integer
    (func (export "store16BitInteger") (param $value i32) (param $memoryOffset i32)
        ;; Set the offset from the start of the memory to store the 16 bit (2 byte) integer
        local.get $memoryOffset

        ;; Set the 32 bit (4 byte) integer value to store (we are only going to store the first 16 bits)
        local.get $value

        ;; Store the first 16 bits (2 byte) of the integer value in memory at the offset
        i32.store16
    )

    ;; Store 8 bit integer
    (func (export "store8BitInteger") (param $value i32) (param $memoryOffset i32)
        ;; Set the offset from the start of the memory to store the 8 bit (1 byte) integer
        local.get $memoryOffset

        ;; Set the 32 bit (4 byte) integer value to store (we are only going to store the first 8 bits)
        local.get $value

        ;; Store the first 8 bits (1 byte) of the integer value in memory at the offset
        i32.store8
    )

    ;; Load 32 bit integer
    (func (export "load32BitInteger") (param $memoryOffset i32) (result i32)
        ;; Set the offset within the memory to load the 32 bit (4 byte) integer from
        local.get $memoryOffset

        ;; Load the 32 bit (4 byte) integer value from memory
        i32.load

        ;; The last item on the stack is the return value, which is the value loaded from memory
    )

    ;; Load 16 bit integer signed
    (func (export "load16BitIntegerSigned") (param $memoryOffset i32) (result i32)
        ;; Set the offset within the memory to load the 16 bit (2 byte) integer from
        local.get $memoryOffset

        ;; Load the 16 bit (2 byte) integer value from memory
        ;; This is looking for the signed bit. If it is 1 then the resulting 32bit number will be negative
        i32.load16_s

        ;; The last item on the stack is the return value, which is the value loaded from memory
    )

    ;; Load 16 bit integer unsigned
    (func (export "load16BitIntegerUnsigned") (param $memoryOffset i32) (result i32)
        ;; Set the offset within the memory to load the 16 bit (2 byte) integer from
        local.get $memoryOffset

        ;; Load the 16 bit (2 byte) integer value from memory
        ;; This does not looking for the signed bit. If it is 1 then the resulting 32bit number will still be positive
        i32.load16_u

        ;; The last item on the stack is the return value, which is the value loaded from memory
    )

    ;; Load 8 bit integer signed
    (func (export "load8BitIntegerSigned") (param $memoryOffset i32) (result i32)
        ;; Set the offset within the memory to load the 8 bit (1 byte) integer from
        local.get $memoryOffset

        ;; Load the 8 bit (1 byte) integer value from memory
        ;; This is looking for the signed bit. If it is 1 then the resulting 32bit number will be negative
        i32.load8_s

        ;; The last item on the stack is the return value, which is the value loaded from memory
    )

    ;; Load 8 bit integer unsigned
    (func (export "load8BitIntegerUnsigned") (param $memoryOffset i32) (result i32)
        ;; Set the offset within the memory to load the 8 bit (1 byte) integer from
        local.get $memoryOffset

        ;; Load the 8 bit (1 byte) integer value from memory
        ;; This does not looking for the signed bit. If it is 1 then the resulting 32bit number will still be positive
        i32.load8_u

        ;; The last item on the stack is the return value, which is the value loaded from memory
    )

    ;; Load 32 bit integer Offset 2
    (func (export "load32BitIntegerOffset2") (param $memoryOffset i32) (result i32)
        ;; Set the offset within the memory to load the 32 bit (4 byte) integer from
        local.get $memoryOffset

        ;; Load the 32 bit (4 byte) integer value from memory, with a fixed offset of 2 bytes
        i32.load offset=2

        ;; The last item on the stack is the return value, which is the value loaded from memory
    )

    ;; Store 64 bit float
    (func (export "store64BitFloat") (param $value f64) (param $memoryOffset i32)
        ;; Set the offset from the start of the memory to store the 64 bit (8 byte) float
        local.get $memoryOffset

        ;; Set the 64 bit (8 byte) float value to store
        local.get $value

        ;; Store the 64 bit (8 byte) float value in memory at the offset
        f64.store
    )

    ;; Load 64 bit float
    (func (export "load64BitFloat") (param $memoryOffset i32) (result f64)
        ;; Set the offset within the memory to load the 64 bit (8 byte) float from
        local.get $memoryOffset

        ;; Load the 64 bit (8 byte) float value from memory
        f64.load

        ;; The last item on the stack is the return value, which is the value loaded from memory
    )
)
