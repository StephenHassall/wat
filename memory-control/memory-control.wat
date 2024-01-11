;; Memory control instructions
(module
    ;; Create memory that is only 1 page long (64Kb).
    ;; Exported as "memory". There can only be one block of memory per WAT file.
    (memory (export "memory") 1)

    ;; Use HEX to set the memory at the start
    (data (i32.const 0) "\01\02\03\04\05\06\07\08")

    ;; Use text to set the memory at an offset
    (data (i32.const 8) "Hello")

    ;; Set the main (and only) memory block at the given offset (0 = main memory)
    (data 0 (i32.const 16) "World")

    ;; Create and set some passive memory, and give it a label
    (data $passiveMemory1 "This is passive memory #1")

    ;; Create and set another passive memory block, and give it a label
    (data $passiveMemory2 "This is passive memory #2")

    ;; Fill
    (func (export "fill") (param $memoryOffset i32) (param $value i32) (param $length i32)
        ;; Set the offset from the start of the memory to fill
        local.get $memoryOffset

        ;; Set the 32 bit value to set the memory to (we only look at first 8 bits)
        local.get $value

        ;; Set the length of the memory to fill
        local.get $length

        ;; Fill in the memory with the $value from the $memoryOffset for the given $length (in bytes)
        memory.fill
    )

    ;; Init from passive memory
    (func (export "initFromPassiveMemory") (param $type i32)
        ;; Get $type
        local.get $type

        ;; Check if $type is zero
        i32.eqz

        ;; If $type is zero
        if
            ;; Set main memory target offset (we will start from the beginning)
            i32.const 0

            ;; Set passive memory source offset (we will start from the beginning)
            i32.const 0

            ;; Set the length to copy over (there are 25 characters/bytes in them both)
            i32.const 25

            ;; Initialize using passive memory #1 (we are copying passive to main memory)
            memory.init $passiveMemory1
        else
            ;; Set main memory target offset (we will start from the beginning)
            i32.const 0

            ;; Set passive memory source offset (we will start from the beginning)
            i32.const 0

            ;; Set the length to copy over (there are 25 characters/bytes in them both)
            i32.const 25

            ;; Initialize using passive memory #2 (we are copying passive to main memory)
            memory.init $passiveMemory2
        end
    )

    ;; Copy
    (func (export "copy") (param $toMemoryOffset i32) (param $fromMemoryOffset i32) (param $size i32)
        ;; Set the location to copy data to
        local.get $toMemoryOffset

        ;; Set the location to copy data from
        local.get $fromMemoryOffset

        ;; Set the size of the data to copy
        local.get $size

        ;; Copy the memory
        memory.copy
    )

    ;; Get memory size
    (func (export "getMemorySize") (result i32)
        ;; Put the memory size on to the stack. This will be the returned result
        memory.size
    )

    ;; Grow memory
    (func (export "growMemory") (param $pageNumber i32) (result i32)
        ;; Get the number of pages to increase the memory by (each page is 64Kb)
        local.get $pageNumber

        ;; This instruction pops the last items off the stack and uses that as the page number to grow the memory by
        memory.grow

        ;; The last item on the stack is the return value, which is the result of the grow instruction
    )

)
