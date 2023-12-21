;; Reverse the characters in a string, so that "Hello World" becomes "dlorW olleH"
(module
    ;; Import the memory from options.import.memory. It must have at least 1 pages.
    ;; This will contain the inputted string and, when done, the result
    ;; The string will be null-terminated (like a C string)
    (import "import" "memory" (memory 1))

    ;; Reverse string function
    (func (export "reverseString")
        ;; Memory index
        (local $index i32)

        ;; Start memory index
        (local $startIndex i32)

        ;; End memory index
        (local $endIndex i32)

        ;; Start character
        (local $startCharacter i32)

        ;; End character
        (local $endCharacter i32)

        ;; Set all indexes to zero
        i32.const 0
        local.set $index
        i32.const 0
        local.set $startIndex
        i32.const 0
        local.set $endIndex

        ;; The first thing we need to do is find out the length of the string

        ;; Loop for all characters (until null)
        loop $for_each_character
            ;; Set index to read from
            local.get $index
            
            ;; Get character from memory (8 byte unsigned), and add to stack
            i32.load8_u

            ;; Add zero to stack
            i32.const 0

            ;; Check not zero (stack holds the result)
            i32.ne

            ;; If it was not zero then
            if
                ;; Set add amount
                i32.const 1
                local.get $index

                ;; $index++
                i32.add
                local.set $index
                
                ;; Loop to start
                br $for_each_character
            end

            ;; Otherwise final looping
        end

        ;; The $index + 1 is the length, but all we want to do there is set the $endIndex value to $index - 1
        
        ;; Set minus amount
        local.get $index
        i32.const 1
        i32.sub
        local.set $endIndex

        ;; Now we need to swap the characters from the $startIndex with $endIndex and move them together

        loop $move_together
            ;; Read in start index character
            local.get $startIndex
            i32.load8_u
            local.set $startCharacter

            ;; Read in end index character
            local.get $endIndex
            i32.load8_u
            local.set $endCharacter

            ;; Write start index with the end character
            local.get $startIndex
            local.get $endCharacter
            i32.store8

            ;; Write end index with the start character
            local.get $endIndex
            local.get $startCharacter
            i32.store8

            ;; Increase $startIndex
            local.get $startIndex
            i32.const 1
            i32.add
            local.set $startIndex

            ;; Decrease $endIndex
            local.get $endIndex
            i32.const 1
            i32.sub
            local.set $endIndex

            ;; We need to check the $startIndex is greater than $endIndex
            local.get $endIndex
            local.get $startIndex
            i32.gt_u

            ;; If so then continue on to the next two characters
            br_if $move_together
        end
    )
)
