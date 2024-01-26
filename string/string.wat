(; 
    WASM does not have a number of string functions that are common in other programming languages. Therefore
    I have created some of them, which you can use within your own WAT code. I have exported the functions
    for testing, but you do not need to include those parts if they are only being used internally within WAT.

    All strings are in memory. I am using C like null terminating string structure.
    All strings are UTF8 encoded. This means a single character maybe 1, 2, 3, or 4 bytes long.
    All strings are treated as immutable (you can not change them).

    We are assuming there is enough memory for all options. We do not check for the end of the memory page.

    All functions are prefixed with "string_".
;)
(module
    ;; Import memory for testing
    (import "import" "memory" (memory 1))


    (;
        string_get_length
        Gets the number of characters in the string. This is not the same as the
        size the string takes up in memory.
        @param {i32} $stringOffset The offset in memory where the string starts.
        @return {i32} The number of characters (not including the NULL end).
    ;)
    (func $string_get_length (param $stringOffset i32) (result i32)
        ;; Set locals
        (local $memoryOffset i32)        
        (local $length i32)
        (local $byte i32)

        ;; Set starting location
        local.get $stringOffset
        local.set $memoryOffset

        ;; For each character
        loop $for_each_character
            ;; Set memory offset
            local.get $memoryOffset

            ;; Load next 8bit byte (unsigned) from memory
            i32.load8_u

            ;; Save byte
            local.set $byte

            ;; If null
            local.get $byte
            i32.eqz
            if
                ;; Set the return string length
                local.get $length
                return
            end

            ;; If non-unicode
            local.get $byte
            i32.const 0x80
            i32.and
            i32.eqz
            if
                ;; Increase length
                local.get $length
                i32.const 1
                i32.add
                local.set $length

                ;; Increase memory offset
                local.get $memoryOffset
                i32.const 1
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $for_each_character
            end

            ;; If 2 byte unicode
            local.get $byte
            i32.const 0xE0
            i32.and
            i32.const 0xC0
            i32.eq
            if
                ;; Increase length
                local.get $length
                i32.const 1
                i32.add
                local.set $length

                ;; Increase memory offset by 2 bytes
                local.get $memoryOffset
                i32.const 2
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $for_each_character
            end

            ;; If 3 byte unicode
            local.get $byte
            i32.const 0xF0
            i32.and
            i32.const 0xE0
            i32.eq
            if
                ;; Increase length
                local.get $length
                i32.const 1
                i32.add
                local.set $length

                ;; Increase memory offset by 3 bytes
                local.get $memoryOffset
                i32.const 3
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $for_each_character
            end

            ;; If 4 byte unicode
            local.get $byte
            i32.const 0xF8
            i32.and
            i32.const 0xF0
            i32.eq
            if
                ;; Increase length
                local.get $length
                i32.const 1
                i32.add
                local.set $length

                ;; Increase memory offset by 4 bytes
                local.get $memoryOffset
                i32.const 4
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $for_each_character
            end
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_get_size
        Gets the size of the string in bytes. UTF-8 can encode some characters
        making them either 1, 2, 3 or 4 bytes in size.
        @param {i32} $stringOffset The offset in memory where the string starts.
        @return {i32} The number of bytes (not including the NULL end).
    ;)
    (func $string_get_size (param $stringOffset i32) (result i32)
        ;; Set locals
        (local $memoryOffset i32)        
        (local $size i32)

        ;; Set starting location
        local.get $stringOffset
        local.set $memoryOffset

        ;; For each byte
        loop $for_each_byte
            ;; Set memory offset
            local.get $memoryOffset

            ;; Load next 8bit byte (unsigned) from memory
            i32.load8_u

            ;; If null
            i32.eqz
            if
                ;; Set the return string size
                local.get $size
                return
            end

            ;; Increase size
            local.get $size
            i32.const 1
            i32.add
            local.set $size

            ;; Increase memory offset
            local.get $memoryOffset
            i32.const 1
            i32.add
            local.set $memoryOffset

            ;; Continue looping
            br $for_each_byte
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_copy
        Copy a string to a new memory location.
        @param {i32} $fromStringOffset The offset in memory where the "from" string starts.
        @param {i32} $toStringOffset The offset in memory where the "to" string starts.
    ;)
    (func $string_copy (param $fromStringOffset i32) (param $toStringOffset i32)
        ;; Set locals
        (local $fromMemoryOffset i32)
        (local $toMemoryOffset i32)
        (local $byte i32)

        ;; Set memory offsets
        local.get $fromStringOffset
        local.set $fromMemoryOffset
        local.get $toStringOffset
        local.set $toMemoryOffset

        ;; For each byte
        loop $for_each_byte
            ;; Set from memory offset
            local.get $fromMemoryOffset

            ;; Load next 8bit byte (unsigned) from memory
            i32.load8_u

            ;; Set byte
            local.set $byte

            ;; Copy to memory
            local.get $toMemoryOffset
            local.get $byte
            i32.store8

            ;; If null
            local.get $byte
            i32.eqz
            if
                ;; The copy has finished, so we can stop here
                return
            end

            ;; Increase from memory offset
            local.get $fromMemoryOffset
            i32.const 1
            i32.add
            local.set $fromMemoryOffset

            ;; Increase to memory offset
            local.get $toMemoryOffset
            i32.const 1
            i32.add
            local.set $toMemoryOffset

            ;; Continue looping
            br $for_each_byte
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_append
        Append one string on to the end of another string, to make a new string.
        $toString = $string + $appendString
        @param {i32} $stringOffset The offset in memory where the starting string starts.
        @param {i32} $appendOffset The offset in memory where the append string starts.
        @param {i32} $toStringOffset The offset in memory where the new string starts.
    ;)
    (func $string_append (param $stringOffset i32) (param $appendStringOffset i32) (param $toStringOffset i32)
        ;; Set locals
        (local $fromMemoryOffset i32)
        (local $toMemoryOffset i32)
        (local $byte i32)
        (local $stage i32)

        ;; Set memory offsets
        local.get $stringOffset
        local.set $fromMemoryOffset
        local.get $toStringOffset
        local.set $toMemoryOffset

        ;; For each byte
        loop $for_each_byte
            ;; Set from memory offset
            local.get $fromMemoryOffset

            ;; Load next 8bit byte (unsigned) from memory
            i32.load8_u

            ;; Set byte
            local.set $byte

            ;; Copy to memory
            local.get $toMemoryOffset
            local.get $byte
            i32.store8

            ;; If null
            local.get $byte
            i32.eqz
            if
                ;; If we are on stage 0 (copying string part)
                local.get $stage
                i32.eqz
                if
                    ;; Change the stage to 1 (copy append string part)
                    i32.const 1
                    local.set $stage

                    ;; Change the from string offset memory point over to the append string
                    local.get $appendStringOffset
                    local.set $fromMemoryOffset

                    ;; Continue copying from this new location
                    br $for_each_byte
                else
                    ;; This is stage 1 (copy append string part)
                    ;; We have finished and can now stop here
                    return
                end
            end

            ;; Increase from memory offset
            local.get $fromMemoryOffset
            i32.const 1
            i32.add
            local.set $fromMemoryOffset

            ;; Increase to memory offset
            local.get $toMemoryOffset
            i32.const 1
            i32.add
            local.set $toMemoryOffset

            ;; Continue looping
            br $for_each_byte
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_compare
        Compare one string to another.
        @param {i32} $string1Offset The offset in memory where the first string starts.
        @param {i32} $string2Offset The offset in memory where the second string starts.
        @return {i32} The compare result.
          match is 0
          $string1Offset > $string2Offset is +1
          $string1Offset < $string2Offset is -1
    ;)
    (func $string_compare (param $string1Offset i32) (param $string2Offset i32) (result i32)
        ;; Set locals
        (local $memory1Offset i32)
        (local $memory2Offset i32)
        (local $memory1Byte i32)
        (local $memory2Byte i32)

        ;; Set memory offsets
        local.get $string1Offset
        local.set $memory1Offset
        local.get $string2Offset
        local.set $memory2Offset

        ;; For each byte
        loop $for_each_byte
            ;; Get memory byte 1
            local.get $memory1Offset
            i32.load8_u
            local.set $memory1Byte

            ;; Get memory byte 2
            local.get $memory2Offset
            i32.load8_u
            local.set $memory2Byte

            ;; If memory byte 1 is less than 2
            local.get $memory1Byte
            local.get $memory2Byte
            i32.lt_u
            if
                ;; String 1 is less than string 2
                i32.const -1
                return
            end

            ;; If memory byte 1 is greater than 2
            local.get $memory1Byte
            local.get $memory2Byte
            i32.gt_u
            if
                ;; String 1 is greater than string 2
                i32.const 1
                return
            end

            ;; If end of both strings at the same time
            local.get $memory1Byte
            i32.eqz
            if
                ;; String 1 is the same as string 2
                i32.const 0
                return
            end

            ;; Both are the same so far so move on to the next characters

            ;; Increase from memory 1 offset
            local.get $memory1Offset
            i32.const 1
            i32.add
            local.set $memory1Offset

            ;; Increase from memory 2 offset
            local.get $memory2Offset
            i32.const 1
            i32.add
            local.set $memory2Offset

            ;; Continue looping
            br $for_each_byte
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_char_at
        Gets the UTF-8 value from the index in the string. You may need to use string_utf8_to_utf16 to
        use it in JavaScript. If you are processing a string character by character then use $string_get_next
        instead.
        @param {i32} $stringOffset The offset in memory where the string starts.
        @param {i32} $index The character index within the string to get (starts at 0).
        @return {i32} The UTF-8 character. This is not the code point.
    ;)
    (func $string_char_at (param $stringOffset i32) (param $index i32) (result i32)
        ;; Set locals
        (local $memoryOffset i32)
        (local $readIndex i32)
        (local $byte i32)

        ;; Set starting location
        local.get $stringOffset
        local.set $memoryOffset

        ;; For each character
        loop $for_each_character
            ;; Set memory offset
            local.get $memoryOffset

            ;; Load next 8bit byte (unsigned) from memory
            i32.load8_u

            ;; Save byte
            local.set $byte

            ;; If null
            local.get $byte
            i32.eqz
            if
                ;; The index is out of range
                i32.const 0
                return
            end

            ;; If read index is not the same
            local.get $index
            local.get $readIndex
            i32.eq
            if
                ;; If non-unicode
                local.get $byte
                i32.const 0x80
                i32.and
                i32.eqz
                if
                    ;; The byte is the character so just return that
                    local.get $byte
                    return
                end

                ;; If 2 byte unicode
                local.get $byte
                i32.const 0xE0
                i32.and
                i32.const 0xC0
                i32.eq
                if
                    ;; Read in 16 bits instead and return that
                    local.get $memoryOffset
                    i32.load16_u
                    return
                end

                ;; If 3 byte unicode
                local.get $byte
                i32.const 0xF0
                i32.and
                i32.const 0xE0
                i32.eq
                if
                    ;; Read in 32 (convert to 24) bits and return that
                    local.get $memoryOffset
                    i32.load
                    i32.const 0x00FFFFFF
                    i32.and
                    return
                end

                ;; If 4 byte unicode
                local.get $byte
                i32.const 0xF8
                i32.and
                i32.const 0xF0
                i32.eq
                if
                    ;; Read in 32 bits instead and return that
                    local.get $memoryOffset
                    i32.load
                    return
                end
            end

            ;; Read past the next character

            ;; If non-unicode
            local.get $byte
            i32.const 0x80
            i32.and
            i32.eqz
            if
                ;; Increase read index
                local.get $readIndex
                i32.const 1
                i32.add
                local.set $readIndex

                ;; Increase memory offset
                local.get $memoryOffset
                i32.const 1
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $for_each_character
            end

            ;; If 2 byte unicode
            local.get $byte
            i32.const 0xE0
            i32.and
            i32.const 0xC0
            i32.eq
            if
                ;; Increase read index
                local.get $readIndex
                i32.const 1
                i32.add
                local.set $readIndex

                ;; Increase memory offset by 2 bytes
                local.get $memoryOffset
                i32.const 2
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $for_each_character
            end

            ;; If 3 byte unicode
            local.get $byte
            i32.const 0xF0
            i32.and
            i32.const 0xE0
            i32.eq
            if
                ;; Increase read index
                local.get $readIndex
                i32.const 1
                i32.add
                local.set $readIndex

                ;; Increase memory offset by 3 bytes
                local.get $memoryOffset
                i32.const 3
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $for_each_character
            end

            ;; If 4 byte unicode
            local.get $byte
            i32.const 0xF8
            i32.and
            i32.const 0xF0
            i32.eq
            if
                ;; Increase read index
                local.get $readIndex
                i32.const 1
                i32.add
                local.set $readIndex

                ;; Increase memory offset by 4 bytes
                local.get $memoryOffset
                i32.const 4
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $for_each_character
            end
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_starts_with
        Checks to see if a string starts with another string.
        @param {i32} $stringOffset The offset in memory where the string starts.
        @param {i32} $compareStringOffset The offset in memory where the compare string starts.
        @return {i32} If the string does start with the other string then the result is 1. If not then it returns 0.
    ;)
    (func $string_starts_with (param $stringOffset i32) (param $compareStringOffset i32) (result i32)
        ;; Set locals
        (local $memoryOffset i32)
        (local $memoryCompareOffset i32)
        (local $memoryByte i32)
        (local $memoryCompareByte i32)

        ;; Set memory offsets
        local.get $stringOffset
        local.set $memoryOffset
        local.get $compareStringOffset
        local.set $memoryCompareOffset

        ;; For each byte
        loop $for_each_byte
            ;; Get memory byte
            local.get $memoryOffset
            i32.load8_u
            local.set $memoryByte

            ;; Get memory compare byte
            local.get $memoryCompareOffset
            i32.load8_u
            local.set $memoryCompareByte

            ;; If compare byte is zero
            local.get $memoryCompareByte
            i32.eqz
            if
                ;; Everything so far is the same therefore the string does start with the compare string
                i32.const 1
                return
            end

            ;; If string byte is zero (end of string)
            local.get $memoryByte
            i32.eqz
            if
                ;; We have reached the end of the string, but the compare string is longer, therefore we say it does not start with compare string
                i32.const 0
                return
            end

            ;; If both the bytes are not the same
            local.get $memoryByte
            local.get $memoryCompareByte
            i32.ne
            if
                ;; The string does not fully start with the compare string
                i32.const 0
                return
            end

            ;; Both are the same so far so move on to the next characters

            ;; Increase from memory offset
            local.get $memoryOffset
            i32.const 1
            i32.add
            local.set $memoryOffset

            ;; Increase from memory compare offset
            local.get $memoryCompareOffset
            i32.const 1
            i32.add
            local.set $memoryCompareOffset

            ;; Continue looping
            br $for_each_byte
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_ends_with
        Checks to see if a string ends with another string.
        @param {i32} $stringOffset The offset in memory where the string starts.
        @param {i32} $compareStringOffset The offset in memory where the compare string starts.
        @return {i32} If the string does end with the other string then the result is 1. If not then it returns 0.
    ;)
    (func $string_ends_with (param $stringOffset i32) (param $compareStringOffset i32) (result i32)
        ;; Set locals
        (local $memoryOffset i32)
        (local $memoryCompareOffset i32)
        (local $memoryByte i32)
        (local $memoryCompareByte i32)

        ;; Set memory offsets
        local.get $stringOffset
        local.set $memoryOffset
        local.get $compareStringOffset
        local.set $memoryCompareOffset

        ;; Move to the end of the string

        ;; Find end of string
        block $find_end_of_string_block
        loop $find_end_of_string_loop
            ;; Get memory byte
            local.get $memoryOffset
            i32.load8_u
            i32.eqz
            br_if $find_end_of_string_block

            ;; Move to next byte
            local.get $memoryOffset
            i32.const 1
            i32.add
            local.set $memoryOffset
            br $find_end_of_string_loop
        end
        end

        ;; Move to the end of the compare string

        ;; Find end of compare string
        block $find_end_of_compare_string_block
        loop $find_end_of_compare_string_loop
            ;; Get memory byte
            local.get $memoryCompareOffset
            i32.load8_u
            i32.eqz
            br_if $find_end_of_compare_string_block

            ;; Move to next byte
            local.get $memoryCompareOffset
            i32.const 1
            i32.add
            local.set $memoryCompareOffset
            br $find_end_of_compare_string_loop
        end
        end

        ;; Move backwards for both string and compare string

        ;; For each byte
        loop $for_each_byte
            ;; If the memory compare offset is less than start offset
            local.get $memoryCompareOffset
            local.get $compareStringOffset
            i32.lt_u
            if
                ;; We have reached the start of the compare string in the last loop therefore string does
                ;; end with the compare string
                i32.const 1
                return
            end

            ;; If the memory offset is less than start offset
            local.get $memoryOffset
            local.get $stringOffset
            i32.lt_u
            if
                ;; We have reached the start of the main string in the last loop therefore string does not
                ;; end with the compare string
                i32.const 0
                return
            end

            ;; Get memory byte
            local.get $memoryOffset
            i32.load8_u
            local.set $memoryByte

            ;; Get memory compare byte
            local.get $memoryCompareOffset
            i32.load8_u
            local.set $memoryCompareByte

            ;; If both the bytes are not the same
            local.get $memoryByte
            local.get $memoryCompareByte
            i32.ne
            if
                ;; The string does not fully end with the compare string
                i32.const 0
                return
            end

            ;; Both are the same so far so move backwards to the previous characters

            ;; Increase from memory offset
            local.get $memoryOffset
            i32.const 1
            i32.sub
            local.set $memoryOffset

            ;; Increase from memory compare offset
            local.get $memoryCompareOffset
            i32.const 1
            i32.sub
            local.set $memoryCompareOffset

            ;; Continue looping
            br $for_each_byte
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_index_of
        Search through the string for a match and return the found index.
        @param {i32} $stringOffset The offset in memory where the string starts.
        @param {i32} $searchStringOffset The offset in memory where the compare string starts.
        @param {i32} $startFromIndex Where within the string should the search begin.
        @return {i32} If not found then it returns -1. Otherwise it will return the index within the string where the
        match is. This is not a memory offset, nor the number of bytes from the start of the string. This is the character
        index (starting at 0).
    ;)
    (func $string_index_of (param $stringOffset i32) (param $searchStringOffset i32) (param $startFromIndex i32) (result i32)
        ;; Set locals
        (local $memoryOffset i32)
        (local $index i32)
        (local $byte i32)
        (local $foundIndex i32)
        (local $compareOffset i32)
        (local $compareByte i32)
        (local $searchOffset i32)
        (local $searchByte i32)

        ;; The first stage is to move to the start from index of the string. The index is
        ;; the character index, taking UFT-8 into account.

        ;; Set starting location
        local.get $stringOffset
        local.set $memoryOffset

        ;; For each character
        block $to_start_index_block
        loop $to_start_index_loop
            ;; If index is at the same place of the start from index
            local.get $index
            local.get $startFromIndex
            i32.eq
            if
                ;; Start searching from here
                br $to_start_index_block
            end

            ;; Set memory offset
            local.get $memoryOffset

            ;; Load next 8bit byte (unsigned) from memory
            i32.load8_u

            ;; Save byte
            local.set $byte

            ;; If null
            local.get $byte
            i32.eqz
            if
                ;; The start index is out of range
                i32.const -1
                return
            end

            ;; If non-unicode
            local.get $byte
            i32.const 0x80
            i32.and
            i32.eqz
            if
                ;; Increase index
                local.get $index
                i32.const 1
                i32.add
                local.set $index

                ;; Increase memory offset
                local.get $memoryOffset
                i32.const 1
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $to_start_index_loop
            end

            ;; If 2 byte unicode
            local.get $byte
            i32.const 0xE0
            i32.and
            i32.const 0xC0
            i32.eq
            if
                ;; Increase index
                local.get $index
                i32.const 1
                i32.add
                local.set $index

                ;; Increase memory offset by 2 bytes
                local.get $memoryOffset
                i32.const 2
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $to_start_index_loop
            end

            ;; If 3 byte unicode
            local.get $byte
            i32.const 0xF0
            i32.and
            i32.const 0xE0
            i32.eq
            if
                ;; Increase index
                local.get $index
                i32.const 1
                i32.add
                local.set $index

                ;; Increase memory offset by 3 bytes
                local.get $memoryOffset
                i32.const 3
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $to_start_index_loop
            end

            ;; If 4 byte unicode
            local.get $byte
            i32.const 0xF8
            i32.and
            i32.const 0xF0
            i32.eq
            if
                ;; Increase index
                local.get $index
                i32.const 1
                i32.add
                local.set $index

                ;; Increase memory offset by 4 bytes
                local.get $memoryOffset
                i32.const 4
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $to_start_index_loop
            end

        end
        end

        ;; The next stage is to move character by character through the string

        ;; Set found index to start index (to begin with)
        local.get $startFromIndex
        local.set $foundIndex

        ;; String loop
        loop $string_loop
            ;; For each character we need to compare it to the search string

            ;; Set search offset
            local.get $searchStringOffset
            local.set $searchOffset

            ;; Set compare offset
            local.get $memoryOffset
            local.set $compareOffset

            ;; Compare loop
            block $compare_block
            loop $compare_loop
                ;; Get compare byte
                local.get $compareOffset
                i32.load8_u
                local.set $compareByte

                ;; Get search byte
                local.get $searchOffset
                i32.load8_u
                local.set $searchByte

                ;; If the search has reached the end
                local.get $searchByte
                i32.eqz
                if
                    ;; Every character so far has matched, therefore we have found the compare string
                    local.get $foundIndex
                    return
                end

                ;; If the compare has reached the end
                local.get $compareByte
                i32.eqz
                if
                    ;; Did not compare fully and we have reached the end, so nothing found
                    i32.const -1
                    return
                end

                ;; If compare and search bytes are not the same
                local.get $compareByte
                local.get $searchByte
                i32.ne
                br_if $compare_block

                ;; Increase compare offset
                local.get $compareOffset
                i32.const 1
                i32.add
                local.set $compareOffset

                ;; Increase search offset
                local.get $searchOffset
                i32.const 1
                i32.add
                local.set $searchOffset

                ;; Continue looping
                br $compare_loop
            end
            end

            ;; The search string did not match the current string offset. Therefore move to the next character

            ;; Increase the found index
            local.get $foundIndex
            i32.const 1
            i32.add
            local.set $foundIndex

            ;; Get current byte we looked for
            local.get $memoryOffset
            i32.load8_u
            local.set $byte

            ;; If non-unicode
            local.get $byte
            i32.const 0x80
            i32.and
            i32.eqz
            if
                ;; Move by single byte
                local.get $memoryOffset
                i32.const 1
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $string_loop
            end

            ;; If 2 byte unicode
            local.get $byte
            i32.const 0xE0
            i32.and
            i32.const 0xC0
            i32.eq
            if
                ;; Move by 2 bytes
                local.get $memoryOffset
                i32.const 2
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $string_loop
            end

            ;; If 3 byte unicode
            local.get $byte
            i32.const 0xF0
            i32.and
            i32.const 0xE0
            i32.eq
            if
                ;; Move by 3 bytes
                local.get $memoryOffset
                i32.const 3
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $string_loop
            end

            ;; If 4 byte unicode
            local.get $byte
            i32.const 0xF8
            i32.and
            i32.const 0xF0
            i32.eq
            if
                ;; Move by 4 bytes
                local.get $memoryOffset
                i32.const 4
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $string_loop
            end

            ;; Should not get here
            unreachable
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_last_index_of
        Search backwards through the string for a match and return the found index.
        @param {i32} $stringOffset The offset in memory where the string starts.
        @param {i32} $searchStringOffset The offset in memory where the compare string starts.
        @param {i32} $startFromIndex Where within the string should the search begin.
        @return {i32} If not found then it returns -1. Otherwise it will return the index within the string where the
        match is. This is not a memory offset, nor the number of bytes from the start of the string. This is the character
        index (starting at 0).
    ;)
    (func $string_last_index_of (param $stringOffset i32) (param $searchStringOffset i32) (param $startFromIndex i32) (result i32)
        ;; Set locals
        (local $memoryOffset i32)
        (local $index i32)
        (local $byte i32)
        (local $foundIndex i32)
        (local $compareOffset i32)
        (local $compareByte i32)
        (local $searchOffset i32)
        (local $searchByte i32)

        ;; The first stage is to move to the start from index of the string. The index is
        ;; the character index, taking UFT-8 into account.

        ;; Set starting location
        local.get $stringOffset
        local.set $memoryOffset

        ;; For each character
        block $to_start_index_block
        loop $to_start_index_loop
            ;; If index is at the same place of the start from index
            local.get $index
            local.get $startFromIndex
            i32.eq
            if
                ;; Start searching from here
                br $to_start_index_block
            end

            ;; Set memory offset
            local.get $memoryOffset

            ;; Load next 8bit byte (unsigned) from memory
            i32.load8_u

            ;; Save byte
            local.set $byte

            ;; If null
            local.get $byte
            i32.eqz
            if
                ;; The start index is out of range
                i32.const -1
                return
            end

            ;; If non-unicode
            local.get $byte
            i32.const 0x80
            i32.and
            i32.eqz
            if
                ;; Increase index
                local.get $index
                i32.const 1
                i32.add
                local.set $index

                ;; Increase memory offset
                local.get $memoryOffset
                i32.const 1
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $to_start_index_loop
            end

            ;; If 2 byte unicode
            local.get $byte
            i32.const 0xE0
            i32.and
            i32.const 0xC0
            i32.eq
            if
                ;; Increase index
                local.get $index
                i32.const 1
                i32.add
                local.set $index

                ;; Increase memory offset by 2 bytes
                local.get $memoryOffset
                i32.const 2
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $to_start_index_loop
            end

            ;; If 3 byte unicode
            local.get $byte
            i32.const 0xF0
            i32.and
            i32.const 0xE0
            i32.eq
            if
                ;; Increase index
                local.get $index
                i32.const 1
                i32.add
                local.set $index

                ;; Increase memory offset by 3 bytes
                local.get $memoryOffset
                i32.const 3
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $to_start_index_loop
            end

            ;; If 4 byte unicode
            local.get $byte
            i32.const 0xF8
            i32.and
            i32.const 0xF0
            i32.eq
            if
                ;; Increase index
                local.get $index
                i32.const 1
                i32.add
                local.set $index

                ;; Increase memory offset by 4 bytes
                local.get $memoryOffset
                i32.const 4
                i32.add
                local.set $memoryOffset

                ;; Continue looping
                br $to_start_index_loop
            end

        end
        end

        ;; The next stage is to move backwards character by character through the string

        ;; Set found index to start index (to begin with)
        local.get $startFromIndex
        local.set $foundIndex

        ;; String loop
        loop $string_loop
            ;; For each character we need to compare it to the search string

            ;; Check the memory offset hasn't been moved before the start of the string
            local.get $memoryOffset
            local.get $stringOffset
            i32.lt_u
            if
                ;; We have moved backwards beyond the starting point, therefore nothing was found
                i32.const -1
                return
            end

            ;; Set search offset
            local.get $searchStringOffset
            local.set $searchOffset

            ;; Set compare offset
            local.get $memoryOffset
            local.set $compareOffset

            ;; Compare loop
            block $compare_block
            loop $compare_loop
                ;; Get compare byte
                local.get $compareOffset
                i32.load8_u
                local.set $compareByte

                ;; Get search byte
                local.get $searchOffset
                i32.load8_u
                local.set $searchByte

                ;; If the search has reached the end
                local.get $searchByte
                i32.eqz
                if
                    ;; Every character so far has matched, therefore we have found the compare string
                    local.get $foundIndex
                    return
                end

                ;; If the compare has reached the end
                local.get $compareByte
                i32.eqz
                if
                    ;; Did not compare fully and we have reached the end, so nothing found so far, so move on
                    ;; to the previous character
                    br $compare_block
                end

                ;; If compare and search bytes are not the same
                local.get $compareByte
                local.get $searchByte
                i32.ne
                br_if $compare_block

                ;; Increase compare offset
                local.get $compareOffset
                i32.const 1
                i32.add
                local.set $compareOffset

                ;; Increase search offset
                local.get $searchOffset
                i32.const 1
                i32.add
                local.set $searchOffset

                ;; Continue looping
                br $compare_loop
            end
            end

            ;; The search string did not match the current string offset. Therefore move to the back to the previous character

            ;; Increase the found index
            local.get $foundIndex
            i32.const 1
            i32.sub
            local.set $foundIndex

            ;; Move back a byte
            local.get $memoryOffset
            i32.const 1
            i32.sub
            local.set $memoryOffset

            ;; Get current byte we looked for
            local.get $memoryOffset
            i32.load8_u
            local.set $byte

            ;; If not part of a unicode
            local.get $byte
            i32.const 0xC0
            i32.and
            i32.const 0x80
            i32.ne
            if
                ;; Continue looping
                br $string_loop
            end

            ;; Move back one
            local.get $memoryOffset
            i32.const 1
            i32.sub
            local.set $memoryOffset

            ;; Get previous byte
            local.get $memoryOffset
            i32.load8_u
            local.set $byte

            ;; If 2 byte unicode
            local.get $byte
            i32.const 0xE0
            i32.and
            i32.const 0xC0
            i32.eqz
            if
                ;; Continue looping
                br $string_loop
            end

            ;; Move back one
            local.get $memoryOffset
            i32.const 1
            i32.sub
            local.set $memoryOffset

            ;; Get previous byte
            local.get $memoryOffset
            i32.load8_u
            local.set $byte

            ;; If 3 byte unicode
            local.get $byte
            i32.const 0xF0
            i32.and
            i32.const 0xE0
            i32.eqz
            if
                ;; Continue looping
                br $string_loop
            end

            ;; Must be a 4 byte unicode

            ;; Move by another byte
            local.get $memoryOffset
            i32.const 1
            i32.sub
            local.set $memoryOffset

            ;; Continue looping
            br $string_loop
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_repeat
        Create a string by repeating another string a number of times.
        @param {i32} $stringToRepeatOffset The offset in memory where the repeat string starts.
        @param {i32} $toStringOffset The offset in memory where the new string starts.
        @param {i32} $count The number of times the repeat string should be copied.
    ;)
    (func $string_repeat (param $stringToRepeatOffset i32) (param $toStringOffset i32) (param $count i32)
        ;; Set locals
        (local $repeatCount i32)
        (local $stringSize i32)
        (local $stringSizeWithNull i32)
        (local $toStringMemory i32)

        ;; NULL end the to string to start with in case count is 0 or something
        local.get $toStringOffset
        i32.const 0
        i32.store8

        ;; Get the size of the string to repeat
        local.get $stringToRepeatOffset
        call $string_get_size
        local.set $stringSize

        ;; Set it with a NULL end too
        local.get $stringSize
        i32.const 1
        i32.add
        local.set $stringSizeWithNull

        ;; Set starting to string memory
        local.get $toStringOffset
        local.set $toStringMemory

        ;; Repeat
        loop $repeat_loop
            ;; If limit reached
            local.get $repeatCount
            local.get $count
            i32.ge_s
            if
                ;; We have finished
                return
            end

            ;; Copy the string to repeat memory to the end of the to string memory

            ;; Set the location to copy data to
            local.get $toStringMemory

            ;; Set the location to copy data from
            local.get $stringToRepeatOffset

            ;; Set the size of the data to copy
            local.get $stringSizeWithNull

            ;; Copy the memory
            memory.copy

            ;; Move the to string memory point to the end
            local.get $toStringMemory
            local.get $stringSize
            i32.add
            local.set $toStringMemory

            ;; Increase repeat count
            local.get $repeatCount
            i32.const 1
            i32.add
            local.set $repeatCount

            ;; Loop on to the next repeat
            br $repeat_loop
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_substring
        Pick a string from within another string.
        @param {i32} $fromStringOffset The offset in memory where the "from" string starts.
        @param {i32} $toStringOffset The offset in memory where the "to" string starts.
        @param {i32} $indexFrom The character index within the string to start copying from.
        @param {i32} $indexTo The character index within the string to end copying at. The ending character is not copied.
    ;)
    (func $string_substring (param $fromStringOffset i32) (param $toStringOffset i32) (param $indexFrom i32) (param $indexTo i32)
        ;; Set locals
        (local $fromMemoryOffset i32)
        (local $toMemoryOffset i32)
        (local $index i32)
        (local $byte i32)
        (local $unicodeByte i32)

        ;; NULL end the to string to start with in case of error
        local.get $toStringOffset
        i32.const 0
        i32.store8

        ;; The first stage is to move to the $indexFrom of the from tring. The index is
        ;; the character index, taking UFT-8 into account.

        ;; Set from location
        local.get $fromStringOffset
        local.set $fromMemoryOffset

        ;; For each character
        block $to_from_index_block
        loop $to_from_index_loop
            ;; If index is at the same place as the from index
            local.get $index
            local.get $indexFrom
            i32.eq
            if
                ;; Start copying from here
                br $to_from_index_block
            end

            ;; Set from memory offset
            local.get $fromMemoryOffset

            ;; Load next 8bit byte (unsigned) from memory
            i32.load8_u

            ;; Save byte
            local.set $byte

            ;; If null
            local.get $byte
            i32.eqz
            if
                ;; The start index is out of range, so just stop
                return
            end

            ;; Increase index
            local.get $index
            i32.const 1
            i32.add
            local.set $index

            ;; If non-unicode
            local.get $byte
            i32.const 0x80
            i32.and
            i32.eqz
            if
                ;; Increase memory offset
                local.get $fromMemoryOffset
                i32.const 1
                i32.add
                local.set $fromMemoryOffset

                ;; Continue looping
                br $to_from_index_loop
            end

            ;; If 2 byte unicode
            local.get $byte
            i32.const 0xE0
            i32.and
            i32.const 0xC0
            i32.eq
            if
                ;; Increase memory offset by 2 bytes
                local.get $fromMemoryOffset
                i32.const 2
                i32.add
                local.set $fromMemoryOffset

                ;; Continue looping
                br $to_from_index_loop
            end

            ;; If 3 byte unicode
            local.get $byte
            i32.const 0xF0
            i32.and
            i32.const 0xE0
            i32.eq
            if
                ;; Increase memory offset by 3 bytes
                local.get $fromMemoryOffset
                i32.const 3
                i32.add
                local.set $fromMemoryOffset

                ;; Continue looping
                br $to_from_index_loop
            end

            ;; If 4 byte unicode
            local.get $byte
            i32.const 0xF8
            i32.and
            i32.const 0xF0
            i32.eq
            if
                ;; Increase memory offset by 4 bytes
                local.get $fromMemoryOffset
                i32.const 4
                i32.add
                local.set $fromMemoryOffset

                ;; Continue looping
                br $to_from_index_loop
            end
        end
        end

        ;; The next stage is to move character by character through the string

        ;; Set to memory offsets
        local.get $toStringOffset
        local.set $toMemoryOffset

        ;; For each index
        loop $for_each_index
            ;; Check if we have reached the end index
            local.get $index
            local.get $indexTo
            i32.ge_u
            if
                ;; We have come to the end index. Make sure it ends with a NULL
                local.get $toMemoryOffset
                i32.const 0
                i32.store8
                return
            end

            ;; Get byte from memory
            local.get $fromMemoryOffset
            i32.load8_u
            local.set $byte

            ;; Copy to memory
            local.get $toMemoryOffset
            local.get $byte
            i32.store8

            ;; If null
            local.get $byte
            i32.eqz
            if
                ;; We have reached the end of the string, so we can not copy any more                
                return
            end

            ;; Move on to the next character/index

            ;; Increase index
            local.get $index
            i32.const 1
            i32.add
            local.set $index

            ;; Increase from memory offset
            local.get $fromMemoryOffset
            i32.const 1
            i32.add
            local.set $fromMemoryOffset

            ;; Increase to memory offset
            local.get $toMemoryOffset
            i32.const 1
            i32.add
            local.set $toMemoryOffset

            ;; If non-unicode
            local.get $byte
            i32.const 0x80
            i32.and
            i32.eqz
            if
                ;; Continue looping
                br $for_each_index
            end

            ;; Copy unicode byte
            local.get $fromMemoryOffset
            i32.load8_u
            local.set $unicodeByte
            local.get $toMemoryOffset
            local.get $unicodeByte
            i32.store8

            ;; Increase from memory offset
            local.get $fromMemoryOffset
            i32.const 1
            i32.add
            local.set $fromMemoryOffset

            ;; Increase to memory offset
            local.get $toMemoryOffset
            i32.const 1
            i32.add
            local.set $toMemoryOffset

            ;; If 2 byte unicode
            local.get $byte
            i32.const 0xE0
            i32.and
            i32.const 0xC0
            i32.eq
            if
                ;; Continue looping
                br $for_each_index
            end

            ;; Copy unicode byte
            local.get $fromMemoryOffset
            i32.load8_u
            local.set $unicodeByte
            local.get $toMemoryOffset
            local.get $unicodeByte
            i32.store8

            ;; Increase from memory offset
            local.get $fromMemoryOffset
            i32.const 1
            i32.add
            local.set $fromMemoryOffset

            ;; Increase to memory offset
            local.get $toMemoryOffset
            i32.const 1
            i32.add
            local.set $toMemoryOffset

            ;; If 3 byte unicode
            local.get $byte
            i32.const 0xF0
            i32.and
            i32.const 0xE0
            i32.eq
            if
                ;; Continue looping
                br $for_each_index
            end

            ;; Copy unicode byte
            local.get $fromMemoryOffset
            i32.load8_u
            local.set $unicodeByte
            local.get $toMemoryOffset
            local.get $unicodeByte
            i32.store8

            ;; Increase from memory offset
            local.get $fromMemoryOffset
            i32.const 1
            i32.add
            local.set $fromMemoryOffset

            ;; Increase to memory offset
            local.get $toMemoryOffset
            i32.const 1
            i32.add
            local.set $toMemoryOffset

            ;; Continue looping
            br $for_each_index
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_trim_start
        Trims all the white space and line terminator characters from the start of the string.
        @param {i32} $fromStringOffset The offset in memory where the "from" string starts.
        @param {i32} $toStringOffset The offset in memory where the "to" string starts.
    ;)
    (func $string_trim_start (param $fromStringOffset i32) (param $toStringOffset i32)
        ;; Set locals
        (local $fromMemoryOffset i32)
        (local $toMemoryOffset i32)
        (local $byte i32)

        ;; NULL end the to string to start with in case of error
        local.get $toStringOffset
        i32.const 0
        i32.store8

        ;; The first stage is to move past any white space characters

        ;; Set from location
        local.get $fromStringOffset
        local.set $fromMemoryOffset

        ;; For each character
        block $past_white_space_block
        loop $past_white_space_loop
            ;; Get byte from memory
            local.get $fromMemoryOffset
            i32.load8_u
            local.set $byte

            ;; If null
            local.get $byte
            i32.eqz
            if
                ;; It is all white space or empty
                return
            end

            ;; If non-unicode
            local.get $byte
            i32.const 0x80
            i32.and
            i32.eqz
            if
                ;; Add starting check amount on to the stack
                i32.const 0

                ;; Check white space and line terminator
                (i32.add (i32.eq (local.get $byte)(i32.const 0x09)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0B)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0C)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x20)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0xA0)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0A)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0D)))

                ;; If the end check is zero then nothing was found
                i32.eqz
                br_if $past_white_space_block

                ;; Otherwise we need to continue moving through the white space

                ;; Increase memory offset by 2 bytes
                local.get $fromMemoryOffset
                i32.const 1
                i32.add
                local.set $fromMemoryOffset

                ;; Continue looping
                br $past_white_space_loop
            end

            ;; We do not look for white space in unicode, therefore we can stop looking if we find any
            br $past_white_space_block
        end
        end

        ;; The next stage is to just copy the rest of the string

        ;; Set to memory offsets
        local.get $toStringOffset
        local.set $toMemoryOffset

        ;; For each byte
        loop $for_each_byte
            ;; Set from memory offset
            local.get $fromMemoryOffset
            i32.load8_u
            local.set $byte

            ;; Copy to memory
            local.get $toMemoryOffset
            local.get $byte
            i32.store8

            ;; If null
            local.get $byte
            i32.eqz
            if
                ;; The copy has finished, so we can stop here
                return
            end

            ;; Increase from memory offset
            local.get $fromMemoryOffset
            i32.const 1
            i32.add
            local.set $fromMemoryOffset

            ;; Increase to memory offset
            local.get $toMemoryOffset
            i32.const 1
            i32.add
            local.set $toMemoryOffset

            ;; Continue looping
            br $for_each_byte
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_trim_end
        Trims all the white space and line terminator characters from the end of the string.
        @param {i32} $fromStringOffset The offset in memory where the "from" string starts.
        @param {i32} $toStringOffset The offset in memory where the "to" string starts.
    ;)
    (func $string_trim_end (param $fromStringOffset i32) (param $toStringOffset i32)
        ;; Set locals
        (local $fromStringSize i32)
        (local $toMemoryOffset i32)
        (local $byte i32)

        ;; Get from string size
        local.get $fromStringOffset
        call $string_get_size
        local.set $fromStringSize

        ;; Copy the from string to the to string (all of it including the ending white space)
        local.get $toStringOffset
        local.get $fromStringOffset
        local.get $fromStringSize
        memory.copy

        ;; Move to the end of the to memory offset
        local.get $toStringOffset
        local.get $fromStringSize
        i32.add
        local.set $toMemoryOffset

        ;; Null end the to string
        local.get $toMemoryOffset
        i32.const 0
        i32.store8

        ;; Move back one byte before the NULL end
        local.get $toMemoryOffset
        i32.const 1
        i32.sub
        local.set $toMemoryOffset

        ;; The next stage is to move backwards character by character through the string

        ;; String loop
        loop $string_loop
            ;; Check the memory offset hasn't been moved before the start of the to string
            local.get $toMemoryOffset
            local.get $toStringOffset
            i32.lt_u
            if
                ;; We have moved backwards beyond the starting point, therefore it is all white space
                return
            end

            ;; Get current byte
            local.get $toMemoryOffset
            i32.load8_u
            local.set $byte

            ;; If not part of a unicode
            local.get $byte
            i32.const 0xC0
            i32.and
            i32.const 0x80
            i32.ne
            if
                ;; Add starting check amount on to the stack
                i32.const 0

                ;; Check white space and line terminator
                (i32.add (i32.eq (local.get $byte)(i32.const 0x09)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0B)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0C)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x20)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0xA0)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0A)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0D)))

                ;; If the end check is zero then nothing was found
                i32.eqz
                if
                    ;; Not white space, so end here
                    return
                else
                    ;; Is white space

                    ;; Null end at this point
                    local.get $toMemoryOffset
                    i32.const 0
                    i32.store8

                    ;; Move backwards
                    local.get $toMemoryOffset
                    i32.const 1
                    i32.sub
                    local.set $toMemoryOffset

                    ;; Continue looping
                    br $string_loop
                end
            end

            ;; We are only looking for non-unicode white space, therefore any unicode character can not be white space and therefore
            ;; we can stop here
            return
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_trim
        Trims all the white space and line terminator characters from both the start and end of the string.
        @param {i32} $fromStringOffset The offset in memory where the "from" string starts.
        @param {i32} $toStringOffset The offset in memory where the "to" string starts.
    ;)
    (func $string_trim (param $fromStringOffset i32) (param $toStringOffset i32)
        ;; Set locals
        (local $fromMemoryOffset i32)
        (local $stringSize i32)
        (local $toMemoryOffset i32)
        (local $byte i32)

        ;; NULL end the to string to start with in case of error
        local.get $toStringOffset
        i32.const 0
        i32.store8

        ;; The first stage is to move past any white space characters

        ;; Set from location
        local.get $fromStringOffset
        local.set $fromMemoryOffset

        ;; For each character
        block $past_white_space_block
        loop $past_white_space_loop
            ;; Get byte from memory
            local.get $fromMemoryOffset
            i32.load8_u
            local.set $byte

            ;; If null
            local.get $byte
            i32.eqz
            if
                ;; It is all white space or empty
                return
            end

            ;; If non-unicode
            local.get $byte
            i32.const 0x80
            i32.and
            i32.eqz
            if
                ;; Add starting check amount on to the stack
                i32.const 0

                ;; Check white space and line terminator
                (i32.add (i32.eq (local.get $byte)(i32.const 0x09)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0B)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0C)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x20)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0xA0)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0A)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0D)))

                ;; If the end check is zero then nothing was found
                i32.eqz
                br_if $past_white_space_block

                ;; Otherwise we need to continue moving through the white space

                ;; Increase memory offset by 2 bytes
                local.get $fromMemoryOffset
                i32.const 1
                i32.add
                local.set $fromMemoryOffset

                ;; Continue looping
                br $past_white_space_loop
            end

            ;; We do not look for white space in unicode, therefore we can stop looking if we find any
            br $past_white_space_block
        end
        end

        ;; The next stage is to just copy the rest of the string

        ;; Get size of the rest of the string
        local.get $fromMemoryOffset
        call $string_get_size
        local.set $stringSize

        ;; Copy the rest of the string to the to string (all of it including the ending white space)
        local.get $toStringOffset
        local.get $fromMemoryOffset
        local.get $stringSize
        memory.copy

        ;; Move to the end of the to memory offset
        local.get $toStringOffset
        local.get $stringSize
        i32.add
        local.set $toMemoryOffset

        ;; Null end the to string
        local.get $toMemoryOffset
        i32.const 0
        i32.store8

        ;; Move back one byte before the NULL end
        local.get $toMemoryOffset
        i32.const 1
        i32.sub
        local.set $toMemoryOffset

        ;; The next stage is to move backwards character by character through the string

        ;; String loop
        loop $string_loop
            ;; Check the memory offset hasn't been moved before the start of the to string
            local.get $toMemoryOffset
            local.get $toStringOffset
            i32.lt_u
            if
                ;; We have moved backwards beyond the starting point, therefore it is all white space
                return
            end

            ;; Get current byte
            local.get $toMemoryOffset
            i32.load8_u
            local.set $byte

            ;; If not part of a unicode
            local.get $byte
            i32.const 0xC0
            i32.and
            i32.const 0x80
            i32.ne
            if
                ;; Add starting check amount on to the stack
                i32.const 0

                ;; Check white space and line terminator
                (i32.add (i32.eq (local.get $byte)(i32.const 0x09)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0B)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0C)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x20)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0xA0)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0A)))
                (i32.add (i32.eq (local.get $byte)(i32.const 0x0D)))

                ;; If the end check is zero then nothing was found
                i32.eqz
                if
                    ;; Not white space, so end here
                    return
                else
                    ;; Is white space

                    ;; Null end at this point
                    local.get $toMemoryOffset
                    i32.const 0
                    i32.store8

                    ;; Move backwards
                    local.get $toMemoryOffset
                    i32.const 1
                    i32.sub
                    local.set $toMemoryOffset

                    ;; Continue looping
                    br $string_loop
                end
            end

            ;; We are only looking for non-unicode white space, therefore any unicode character can not be white space and therefore
            ;; we can stop here
            return
        end

        ;; Should not get here
        unreachable
    )

    (;
        string_get_next
        Get the next character (code point value) from the string. This is used to move through
        a string character by character, decoding UTF-8 data along the way. It returns the next character offset
        (which can be used for the next call) and the code point value.
        @param {i32} $stringOffset The offset in memory where the next character you want to get is.
        @return {i32, i32} The first returned stack value is the code point character. The next value on the
        stack is the memory offset for the next character, which can be used when calling this function again.
    ;)
    (func $string_get_next (param $stringOffset i32) (result i32 i32)
        ;; Set locals
        (local $byte1 i32)
        (local $byte2 i32)
        (local $byte3 i32)
        (local $byte4 i32)
        (local $nextOffset i32)
        (local $codePoint i32)

        ;; Get first byte
        local.get $stringOffset
        i32.load8_u
        local.set $byte1

        ;; Set next offset
        local.get $stringOffset
        i32.const 1
        i32.add
        local.set $nextOffset

        ;; Check and read the other unicode bytes
        block $read_unicode
            ;; If non-unicode
            local.get $byte1
            i32.const 0x80
            i32.and
            i32.eqz
            if
                ;; Move past read_unicode block
                br $read_unicode
            end

            ;; Get second byte
            local.get $nextOffset
            i32.load8_u
            local.set $byte2

            ;; Increase next offset
            local.get $nextOffset
            i32.const 1
            i32.add
            local.set $nextOffset

            ;; If 2 byte unicode
            local.get $byte1
            i32.const 0xE0
            i32.and
            i32.const 0xC0
            i32.eq
            if
                ;; Move past read_unicode block
                br $read_unicode
            end

            ;; Get third byte
            local.get $nextOffset
            i32.load8_u
            local.set $byte3

            ;; Increase next offset
            local.get $nextOffset
            i32.const 1
            i32.add
            local.set $nextOffset

            ;; If 3 byte unicode
            local.get $byte1
            i32.const 0xF0
            i32.and
            i32.const 0xE0
            i32.eq
            if
                ;; Move past read_unicode block
                br $read_unicode
            end

            ;; Get third byte
            local.get $nextOffset
            i32.load8_u
            local.set $byte4

            ;; Increase next offset
            local.get $nextOffset
            i32.const 1
            i32.add
            local.set $nextOffset

            ;; If 4 byte unicode
            local.get $byte1
            i32.const 0xF8
            i32.and
            i32.const 0xF0
            i32.eq
            if
                ;; Move past read_unicode block
                br $read_unicode
            end

            ;; Should not get here
            unreachable
        end

        ;; We have the next offset and byte 1, 2, 3 and 4 (if used)

        ;; Convert the UTF-8 bytes into a code point (character)
        block $convert_code_point
            ;; If non-unicode
            local.get $byte1
            i32.const 0x80
            i32.and
            i32.eqz
            if
                ;; Convert 1 byte to code point
                local.get $byte1
                i32.const 0x7F
                i32.and
                local.set $codePoint

                ;; Move past convert block
                br $convert_code_point
            end

            ;; If 2 byte unicode
            local.get $byte1
            i32.const 0xE0
            i32.and
            i32.const 0xC0
            i32.eq
            if
                ;; Convert 2 byte to code point
                local.get $byte2
                i32.const 0x3F
                i32.and

                local.get $byte1
                i32.const 0x1F
                i32.and
                i32.const 6
                i32.shl

                i32.or
                local.set $codePoint

                ;; Move past convert block
                br $convert_code_point
            end

            ;; If 3 byte unicode
            local.get $byte1
            i32.const 0xF0
            i32.and
            i32.const 0xE0
            i32.eq
            if
                ;; Convert 3 byte to code point
                local.get $byte3
                i32.const 0x3F
                i32.and

                local.get $byte2
                i32.const 0x3F
                i32.and
                i32.const 6
                i32.shl

                local.get $byte1
                i32.const 0x0F
                i32.and
                i32.const 12
                i32.shl

                i32.or
                i32.or
                local.set $codePoint

                ;; Move past convert block
                br $convert_code_point
            end

            ;; If 4 byte unicode
            local.get $byte1
            i32.const 0xF8
            i32.and
            i32.const 0xF0
            i32.eq
            if
                ;; Convert 4 byte to code point
                local.get $byte4
                i32.const 0x3F
                i32.and

                local.get $byte3
                i32.const 0x3F
                i32.and
                i32.const 6
                i32.shl

                local.get $byte2
                i32.const 0x3F
                i32.and
                i32.const 12
                i32.shl

                local.get $byte1
                i32.const 0x07
                i32.and
                i32.const 18
                i32.shl

                i32.or
                i32.or
                i32.or
                local.set $codePoint

                ;; Move past convert block
                br $convert_code_point
            end

            ;; Should not get here
            unreachable
        end

        ;; Return the results
        local.get $nextOffset
        local.get $codePoint
    )

    (;
        string_utf8_to_utf16
        Convert a character formatted as UTF-8 into UTF-16.
        @param {i32} $uft8 The UFT-8 value.
        @return {i32, i32} If the UFT-8 was 1, 2 or 3 bytes then first stack value is the code point (with the
        next stack value being 0). If the UFT-8 was using 4 bytes then two UTF-16 values are returned, a high
        and a low value (which is used to make a code point).
    ;)
    (func $string_utf8_to_utf16 (param $uft8 i32) (result i32 i32)
        ;; Set locals
        (local $byte1 i32)
        (local $byte2 i32)
        (local $byte3 i32)
        (local $byte4 i32)
        (local $cp i32)
        (local $highSurrogate i32)
        (local $lowSurrogate i32)

        ;; Get byte 1
        local.get $uft8
        i32.const 0x000000FF
        i32.and
        local.set $byte1

        ;; Get byte 2
        local.get $uft8
        i32.const 0x0000FF00
        i32.and
        i32.const 8
        i32.shr_u
        local.set $byte2

        ;; Get byte 3
        local.get $uft8
        i32.const 0x00FF0000
        i32.and
        i32.const 16
        i32.shr_u
        local.set $byte3

        ;; Get byte 4
        local.get $uft8
        i32.const 0xFF000000
        i32.and
        i32.const 24
        i32.shr_u
        local.set $byte4

        ;; If non-unicode
        local.get $byte1
        i32.const 0x80
        i32.and
        i32.eqz
        if
            ;; No encoding used so just return the ASCII character
            local.get $uft8
            i32.const 0
            return
        end

        ;; If 2 byte unicode
        local.get $byte1
        i32.const 0xE0
        i32.and
        i32.const 0xC0
        i32.eq
        if
            ;; Convert to UTF-16
            local.get $byte1
            i32.const 0x1F
            i32.and
            i32.const 6
            i32.shl

            local.get $byte2
            i32.const 0x3F
            i32.and

            i32.or
            i32.const 0
            return
        end

        ;; If 3 byte unicode
        local.get $byte1
        i32.const 0xF0
        i32.and
        i32.const 0xE0
        i32.eq
        if
            ;; Convert to UTF-16
            local.get $byte1
            i32.const 0x0F
            i32.and
            i32.const 12
            i32.shl

            local.get $byte2
            i32.const 0x3F
            i32.and
            i32.const 6
            i32.shl

            local.get $byte3
            i32.const 0x3F
            i32.and

            i32.or
            i32.or
            i32.const 0
            return
        end

        ;; If 4 byte unicode
        local.get $byte1
        i32.const 0xF8
        i32.and
        i32.const 0xF0
        i32.eq
        if
            ;; Workout CP
            local.get $byte1
            i32.const 0x07
            i32.and
            i32.const 18
            i32.shl

            local.get $byte2
            i32.const 0x3F
            i32.and
            i32.const 12
            i32.shl

            local.get $byte3
            i32.const 0x3F
            i32.and
            i32.const 6
            i32.shl

            local.get $byte4
            i32.const 0x3F
            i32.and

            i32.or
            i32.or
            i32.or

            i32.const 0x10000
            i32.sub
            local.set $cp

            ;; Workout high surrogate
            local.get $cp
            i32.const 10
            i32.shr_u
            i32.const 0x03FF
            i32.and
            i32.const 0xD800
            i32.add
            local.set $highSurrogate

            ;; Workout low surrogate
            local.get $cp
            i32.const 0x03FF
            i32.and
            i32.const 0xDC00
            i32.add
            local.set $lowSurrogate

            ;; Return the low and high UTF-16 values
            local.get $highSurrogate
            local.get $lowSurrogate
            return
        end

        ;; Should not get here
        unreachable
    )

    ;; Exported functions for testing. You do not need to include these parts
    (export "string_get_length" (func $string_get_length))
    (export "string_get_size" (func $string_get_size))
    (export "string_copy" (func $string_copy))
    (export "string_append" (func $string_append))
    (export "string_compare" (func $string_compare))
    (export "string_char_at" (func $string_char_at))
    (export "string_starts_with" (func $string_starts_with))
    (export "string_ends_with" (func $string_ends_with))
    (export "string_index_of" (func $string_index_of))
    (export "string_last_index_of" (func $string_last_index_of))
    (export "string_repeat" (func $string_repeat))
    (export "string_substring" (func $string_substring))
    (export "string_trim_start" (func $string_trim_start))
    (export "string_trim_end" (func $string_trim_end))
    (export "string_trim" (func $string_trim))
    (export "string_get_next" (func $string_get_next))
    (export "string_utf8_to_utf16" (func $string_utf8_to_utf16))
)
