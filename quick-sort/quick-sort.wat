(; 
    WASM does not have a quick sort function that is common in other programming languages. Therefore
    I have created one, which you can use within your own WAT code. I have exported the function
    for testing and added some imported memory, but you do not need to include those parts.
;)
(module
    ;; Import memory for testing
    (import "import" "memory" (memory 1))


    ;; Declare the signature of the compare callback function (what it looks like)
    (type $quickSortCompareCallbackType (func (param $itemOffset1 i32) (param $itemOffset2 i32) (result i32)))

    ;; Create quick sort callback table
    (table $quickSortCallbackTable 1 funcref)

    (;
        Sort the data items using the quick sort algorithm. The memory should contain a list of data items.
        Each item can contain anything and be any size, but the size of each must to the same.

        $dataOffset: This is the offset within memory where the list of items is stored.
        $dataItemSize: This is the size, in bytes, of each item.
        $dataItemCount: This is the number of items in the list.
        $compareCallback: This is the call back function reference.
        $dataSwapOffset: You need to include an area in memory to allow the $quick_sort function to swap the item's data around.

        NOTES:
        1) Function does not test if the function reference is NULL or not.
        2) The size of the swap data area much be the same as $dataItemSize
    ;)
    (func $quick_sort (param $dataOffset i32) (param $dataItemSize i32) (param $dataItemCount i32) (param $compareCallback funcref) (param $dataSwapOffset i32)
        ;; Set locals
        (local $high i32)

        ;; Put the callback function reference into the table (at index 0)
        i32.const 0
        local.get $compareCallback
        table.set $quickSortCallbackTable

        ;; Set high
        local.get $dataItemCount
        i32.const 1
        i32.sub
        local.set $high

        ;; Call internal quick sort function
        local.get $dataOffset
        local.get $dataItemSize
        local.get $compareCallback
        local.get $dataSwapOffset
        i32.const 0
        local.get $high
        call $qs_quick_sort
    )

    (;
        Quick sort's main sort function.
    ;)
    (func $qs_quick_sort
        (param $dataOffset i32)
        (param $dataItemSize i32)
        (param $compareCallback funcref)
        (param $dataSwapOffset i32)
        (param $low i32)
        (param $high i32)
        ;; Set locals
        (local $p i32)
        (local $pPlus1 i32)
        (local $pMinus1 i32)

        ;; If low is greater or equal to high
        local.get $low
        local.get $high
        i32.ge_s
        if
            ;; Stop here
            return
        end

        ;; If low is less than zero
        local.get $low
        i32.const 0
        i32.lt_s
        if
            ;; Stop here
            return
        end

        ;; Call partition
        local.get $dataOffset
        local.get $dataItemSize
        local.get $compareCallback
        local.get $dataSwapOffset
        local.get $low
        local.get $high
        call $qs_partition
        local.set $p

        ;; Set p + 1
        local.get $p
        i32.const 1
        i32.add
        local.set $pPlus1

        ;; Set p - 1
        local.get $p
        i32.const 1
        i32.sub
        local.set $pMinus1

        ;; Call quick sort again using p - 1
        local.get $dataOffset
        local.get $dataItemSize
        local.get $compareCallback
        local.get $dataSwapOffset
        local.get $low
        local.get $pMinus1
        call $qs_quick_sort

        ;; Call quick sort again using p + 1
        local.get $dataOffset
        local.get $dataItemSize
        local.get $compareCallback
        local.get $dataSwapOffset
        local.get $pPlus1
        local.get $high
        call $qs_quick_sort
    )

    (;
        Quick sort's partition function.
    ;)
    (func $qs_partition
        (param $dataOffset i32)
        (param $dataItemSize i32)
        (param $compareCallback funcref)
        (param $dataSwapOffset i32)
        (param $low i32)
        (param $high i32)
        (result i32)
        ;; Set locals
        (local $pivotItemOffset i32)
        (local $i i32)
        (local $j i32)
        (local $jItemOffset i32)
        (local $iItemOffset i32)
        (local $compareResult i32)

        ;; Set pivot item offset (the high item)
        local.get $high
        local.get $dataItemSize
        i32.mul
        local.get $dataOffset
        i32.add
        local.set $pivotItemOffset

        ;; Set starting i value
        local.get $low
        i32.const 1
        i32.sub
        local.set $i

        ;; Set starting j value
        local.get $low
        local.set $j

        ;; Loop for j from low to high
        loop $loop_j
            ;; Set j item offset
            local.get $j
            local.get $dataItemSize
            i32.mul
            local.get $dataOffset
            i32.add
            local.set $jItemOffset

            ;; Compare the j item with the pivot item
            local.get $jItemOffset
            local.get $pivotItemOffset
            i32.const 0
            call_indirect $quickSortCallbackTable (type $quickSortCompareCallbackType)
            local.set $compareResult

            ;; If j was less than povit (-1)
            local.get $compareResult
            i32.const -1
            i32.eq
            if
                ;; Increase $i
                local.get $i
                i32.const 1
                i32.add
                local.set $i

                ;; Set i item offset
                local.get $i
                local.get $dataItemSize
                i32.mul
                local.get $dataOffset
                i32.add
                local.set $iItemOffset

                ;; Swap i and j items
                local.get $iItemOffset
                local.get $jItemOffset
                local.get $dataItemSize
                local.get $dataSwapOffset
                call $qs_swap
            end

            ;; Increase $j
            local.get $j
            i32.const 1
            i32.add
            local.set $j

            ;; Check $j is less than or equal to $hight
            local.get $j
            local.get $high
            i32.le_s
            br_if $loop_j
        end

        ;; Increase i by 1
        local.get $i
        i32.const 1
        i32.add
        local.set $i

        ;; Set i item offset
        local.get $i
        local.get $dataItemSize
        i32.mul
        local.get $dataOffset
        i32.add
        local.set $iItemOffset

        ;; Swap i and pivot (high) items
        local.get $iItemOffset
        local.get $pivotItemOffset
        local.get $dataItemSize
        local.get $dataSwapOffset
        call $qs_swap

        ;; Set the return result
        local.get $i
    )

    (;
        Quick sort's swap function.
    ;)
    (func $qs_swap (param $itemOffset1 i32) (param $itemOffset2 i32) (param $dataItemSize i32) (param $dataSwapOffset i32)
        ;; Copy from item 1 to swap
        local.get $dataSwapOffset
        local.get $itemOffset1
        local.get $dataItemSize
        memory.copy

        ;; Copy from item 2 to item 1
        local.get $itemOffset1
        local.get $itemOffset2
        local.get $dataItemSize
        memory.copy

        ;; Copy from swap to item 2
        local.get $itemOffset2
        local.get $dataSwapOffset
        local.get $dataItemSize
        memory.copy
    )

    (;
        The following parts are for testing. You do not need to include these parts.
    ;)

    ;; Run quick sort
    (func (export "runQuickSort") (param $dataOffset i32) (param $dataItemCount i32) (param $dataSwapOffset i32)
        ;; Add data parameters
        local.get $dataOffset
        i32.const 4
        local.get $dataItemCount
        ref.func $compareInteger
        local.get $dataSwapOffset

        ;; Call the quick sort function
        call $quick_sort
    )

    ;; Compare integer
    (func $compareInteger (type $quickSortCompareCallbackType)
        ;; Set locals
        (local $value1 i32)
        (local $value2 i32)

        ;; Get value 1
        local.get 0
        i32.load
        local.set $value1

        ;; Get value 2
        local.get 1
        i32.load
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

    ;; Declare the elemant compare callback functions that you will use.
    (elem declare func $compareInteger)
)
