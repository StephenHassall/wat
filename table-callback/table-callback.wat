;; Table callback example
(module
    ;; We need to declare the signature of the function (what it looks like) before we
    ;; can call them indirectly. This is for the compare callback function 
    (type $compareCallbackType (func (param $itemOffset1 i32) (param $itemOffset2 i32) (result i32)))

    ;; Import memory
    (import "import" "memory" (memory 1))

    ;; Create callback table
    (table $tableCallback 1 funcref)

    ;; Declare the element compare callback functions that can be used
    (elem declare func $compareByte $compareFloat64)

    (;
        Bubble sort
        $dataOffset = The starting point within memory where the list of items is stored.
        $dataItemSize = The size of each item (in bytes).
        $dataItemCount = The number of items in the list.
    ;)
    (func $bubbleSort (param $dataOffset i32) (param $dataItemSize i32) (param $dataItemCount i32) (param $compareCallback funcref) (result i32)
        ;; Set locals
        (local $countMinusOne i32)
        (local $swapped i32)
        (local $itemIndex i32)
        (local $nextItemIndex i32)
        (local $itemOffset i32)
        (local $nextItemOffset i32)
        (local $compareResult i32)

        ;; Check if compare callback function exists
        local.get $compareCallback
        ref.is_null
        if
            ;; Return with error result
            i32.const 0
            return
        end

        ;; Put the callback function reference into the table (at index 0)
        i32.const 0
        local.get $compareCallback
        table.set $tableCallback

        ;; Workout the data count - 1
        local.get $dataItemCount
        i32.const 1
        i32.sub
        local.set $countMinusOne

        loop $repeat
            ;; Set $itemIndex to 0
            i32.const 0
            local.set $itemIndex

            ;; Set not swapped yet
            i32.const 0
            local.set $swapped

            ;; Loop for each item in the list (except the last one)
            loop $forEachItem
                ;; Set next item index
                local.get $itemIndex
                i32.const 1
                i32.add
                local.set $nextItemIndex

                ;; Set memory offset for item
                local.get $itemIndex
                local.get $dataItemSize
                i32.mul
                local.get $dataOffset
                i32.add
                local.set $itemOffset

                ;; Set memory offset for next item
                local.get $nextItemIndex
                local.get $dataItemSize
                i32.mul
                local.get $dataOffset
                i32.add
                local.set $nextItemOffset

                ;; Call the compare function (in table at index 0)
                local.get $itemOffset
                local.get $nextItemOffset
                i32.const 0
                call_indirect $tableCallback (type $compareCallbackType)

                ;; Set the result
                local.set $compareResult

                ;; If item is greater than next item (result = 1)
                local.get $compareResult
                i32.const 1
                i32.eq
                if
                    ;; Swap the items
                    local.get $itemOffset
                    local.get $nextItemOffset
                    local.get $dataItemSize
                    call $swap

                    ;; Set we have performed a swap
                    i32.const 1
                    local.set $swapped
                end

                ;; Increase the $itemIndex
                local.get $itemIndex
                i32.const 1
                i32.add
                local.set $itemIndex

                ;; If still under the limit
                local.get $itemIndex
                local.get $countMinusOne
                i32.lt_s
                br_if $forEachItem
            end

            ;; If swapped something
            local.get $swapped
            i32.const 0
            i32.ne
            br_if $repeat
        end

        ;; Set return result as good
        i32.const 1
    )

    ;; Swap the two given items (size can only be 1, 2, 4, or 8)
    (func $swap (param $itemOffset1 i32) (param $itemOffset2 i32) (param $dataItemSize i32)
        ;; Set locals
        (local $item1Value i64)
        (local $item2Value i64)

        ;; If size is 1 byte
        local.get $dataItemSize
        i32.const 1
        i32.eq
        if
            ;; Get item 1 value
            local.get $itemOffset1
            i64.load8_u
            local.set $item1Value

            ;; Get item 2 value
            local.get $itemOffset2
            i64.load8_u
            local.set $item2Value

            ;; Swap
            local.get $itemOffset1
            local.get $item2Value
            i64.store8
            local.get $itemOffset2
            local.get $item1Value
            i64.store8
        end

        ;; If size is 2 byte
        local.get $dataItemSize
        i32.const 2
        i32.eq
        if
            ;; Get item 1 value
            local.get $itemOffset1
            i64.load16_u
            local.set $item1Value

            ;; Get item 2 value
            local.get $itemOffset2
            i64.load16_u
            local.set $item2Value

            ;; Swap
            local.get $itemOffset1
            local.get $item2Value
            i64.store16
            local.get $itemOffset2
            local.get $item1Value
            i64.store16
        end

        ;; If size is 4 byte
        local.get $dataItemSize
        i32.const 4
        i32.eq
        if
            ;; Get item 1 value
            local.get $itemOffset1
            i64.load32_u
            local.set $item1Value

            ;; Get item 2 value
            local.get $itemOffset2
            i64.load32_u
            local.set $item2Value

            ;; Swap
            local.get $itemOffset1
            local.get $item2Value
            i64.store32
            local.get $itemOffset2
            local.get $item1Value
            i64.store32
        end

        ;; If size is 8 byte
        local.get $dataItemSize
        i32.const 8
        i32.eq
        if
            ;; Get item 1 value
            local.get $itemOffset1
            i64.load
            local.set $item1Value

            ;; Get item 2 value
            local.get $itemOffset2
            i64.load
            local.set $item2Value

            ;; Swap
            local.get $itemOffset1
            local.get $item2Value
            i64.store
            local.get $itemOffset2
            local.get $item1Value
            i64.store
        end
    )

    ;; Run bubble sort for byte
    (func (export "runBubbleSortForByte") (param $dataOffset i32) (param $dataItemCount i32) (result i32)
        ;; Add data parameters
        local.get $dataOffset
        i32.const 1
        local.get $dataItemCount

        ;; Add callback function we want to use as a reference
        ref.func $compareByte

        ;; Call the bubble sort function
        call $bubbleSort

        ;; The return value will be on the stack, which is what this function will also return
    )

    ;; Run bubble sort for float 64
    (func (export "runBubbleSortForFloat64") (param $dataOffset i32) (param $dataItemCount i32) (result i32)
        ;; Add data parameters
        local.get $dataOffset
        i32.const 8
        local.get $dataItemCount

        ;; Add callback function we want to use as a reference
        ref.func $compareFloat64

        ;; Call the bubble sort function
        call $bubbleSort

        ;; The return value will be on the stack, which is what this function will also return
    )

    ;; Run bubble sort with error
    (func (export "runBubbleSortError") (result i32)
        ;; Add data parameters
        i32.const 0
        i32.const 1
        i32.const 4

        ;; Instead of using a function reference, use a null reference
        ref.null func

        ;; Call the bubble sort function
        call $bubbleSort

        ;; The return value will be on the stack, which is what this function will also return
    )

    ;; Compare byte
    (func $compareByte (type $compareCallbackType)
        ;; Set locals
        (local $value1 i32)
        (local $value2 i32)

        ;; Get value 1
        local.get 0
        i32.load8_u
        local.set $value1

        ;; Get value 2
        local.get 1
        i32.load8_u
        local.set $value2

        ;; If value 1 is greater than value 2
        local.get $value1
        local.get $value2
        i32.gt_u
        if
            ;; Return 1
            i32.const 1
            return
        end

        ;; If value 1 is less than value 2
        local.get $value1
        local.get $value2
        i32.lt_u
        if
            ;; Return -1
            i32.const -1
            return
        end

        ;; They are the same, so return 0
        i32.const 0
    )

    ;; Compare float 64
    (func $compareFloat64 (type $compareCallbackType)
        ;; Set locals
        (local $value1 f64)
        (local $value2 f64)

        ;; Get value 1
        local.get 0
        f64.load
        local.set $value1

        ;; Get value 2
        local.get 1
        f64.load
        local.set $value2

        ;; If value 1 is greater than value 2
        local.get $value1
        local.get $value2
        f64.gt
        if
            ;; Return 1
            i32.const 1
            return
        end

        ;; If value 1 is less than value 2
        local.get $value1
        local.get $value2
        f64.lt
        if
            ;; Return -1
            i32.const -1
            return
        end

        ;; They are the same, so return 0
        i32.const 0
    )
)
