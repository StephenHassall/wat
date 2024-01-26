;; Loop and block instructions
(module
    ;; Double multiple times function
    (func (export "doubleMultipleTimes") (param $start i32) (param $times i32) (result i32)
        ;; Set locals
        (local $count i32)
        (local $total i32)

        (;
          We want to create the code below in WAT to show how to use the loop...end instructions
          It will take the $start value and keep doubling it $times, for example, if $start is 2 and
          $times is 3, then we have
            time 1: total = 2 * 2 = 4
            time 2: total = 4 * 4 = 16
            time 3: total = 16 * 16 = 256

          The code in JavaScript would look something like this.

            let $total = $start;
            for (let $count = 0; $count < $times; $count++) {
                $total = ($total * $total);
            }
        ;)

        ;; Set the total to the start amount
        local.get $start
        local.set $total

        ;; Set the loop count to zero. This is the "$count = 0;" part of the for...loop
        i32.const 0
        local.set $count

        ;; Start the loop section. We give it a name too
        loop $loop_times
            ;; Double the total
            local.get $total
            local.get $total
            i32.mul
            local.set $total

            ;; Increase the count. This is the "$count++" part of the for...loop
            local.get $count
            i32.const 1
            i32.add
            local.set $count

            ;; We need to check the $count is less than $times. This is the "$count < $times;" part of the for...loop
            local.get $count
            local.get $times
            i32.lt_s

            ;; If so then continue on doubling the total
            ;; This br_if instruction pops the last i32 value off the stack and if it is not zero then moves the program
            ;; to perform the next instruction at the start of the loop. The "br" is short for branch, not break.
            br_if $loop_times

            ;; If we get here then $count is the same or greater than $times. It will not loop back up, but will move on
            ;; to the below instruction
        end

        ;; Push the total on to the stack to return it
        local.get $total

        ;; The last item on the stack is the return value, which is the total amount
    )

    ;; Add multiple times function
    (func (export "addMultipleTimes") (param $start i32) (param $times i32) (result i32)
        ;; Set locals
        (local $count i32)
        (local $total i32)

        (;
          We want to create the code below in WAT to show how to use the loop...end instructions
          It will take the $start value and keep adding itself for a number of $times, for example, if $start is 2 and
          $times is 3, then we have
            time 1: total = 2 + 2 = 4
            time 2: total = 4 + 4 = 8
            time 3: total = 8 + 8 = 16

          The code in JavaScript would look something like this.

            let $total = $start;
            for (let $count = 0; $count < $times; $count++) {
                $total = ($total + $total);
            }
        ;)

        ;; Set the total to the start amount
        local.get $start
        local.set $total

        ;; Set the loop count to zero. This is the "$count = 0;" part of the for...loop
        i32.const 0
        local.set $count

        ;; Start the loop section. We give it a name too
        ;; We are using a S-expression instead of using loop...end
        (loop $loop_times
            ;; Add the total to itself
            local.get $total
            local.get $total
            i32.add
            local.set $total

            ;; Increase the count. This is the "$count++" part of the for...loop
            local.get $count
            i32.const 1
            i32.add
            local.set $count

            ;; We need to check the $count is less than $times. This is the "$count < $times;" part of the for...loop
            local.get $count
            local.get $times
            i32.lt_s

            ;; If so then continue on adding to the total
            ;; This br_if instruction pops the last i32 value off the stack and if it is not zero then moves the program
            ;; to perform the next instruction at the start of the loop. The "br" is short for branch, not break.
            br_if $loop_times

            ;; If we get here then $count is the same or greater than $times. It will not loop back up, but will move on
            ;; to the below instruction
        )

        ;; Push the total on to the stack to return it
        local.get $total

        ;; The last item on the stack is the return value, which is the total amount
    )

    ;; Double multiple times with limit function
    (func (export "doubleMultipleTimesWithLimit") (param $start i32) (param $times i32) (param $limit i32) (result i32)
        ;; Set locals
        (local $count i32)
        (local $total i32)
        (local $temp i32)

        (;
          We want to create the code below in WAT to show how to use the loop, block and end instructions
          It will take the $start value and keep doubling it $times, for example, if $start is 2 and
          $times is 3, then we have
            time 1: total = 2 * 2 = 4
            time 2: total = 4 * 4 = 16
            time 3: total = 16 * 16 = 256
          But this time we are checking a limit. If the total is going to be over the limit then we break from looping

          The code in JavaScript would look something like this.

            let $total = $start;
            for (let $count = 0; $count < $times; $count++) {
                $temp = ($total * $total);
                if ($temp > $limit) break;
                $total = $temp;
            }
        ;)

        ;; Set the total to the start amount
        local.get $start
        local.set $total

        ;; Set the loop count to zero. This is the "$count = 0;" part of the for...loop
        i32.const 0
        local.set $count

        ;; Start the loop section. We give it a name too
        loop $loop_times

            ;; Start the block section. We give it a name also
            block $block_times
                ;; Double the total, but put the result into $temp. This is the "$temp = ($total * $total);" part
                local.get $total
                local.get $total
                i32.mul
                local.set $temp

                ;; We need to check if the $temp amount is greater than the $limit. This is the "if ($temp > $limit) break;" part
                local.get $temp
                local.get $limit
                i32.gt_u

                ;; If so then branch to the end of the $block_times section.
                ;; This br_if instruction pops the last i32 value off the stack and if it is not zero then moves the program
                ;; to perform the next instruction at the end of the block. The "br" is short for branch, not break.
                br_if $block_times

                ;; Set the $total to be the same as the $temp amount. This is the "$total = $temp;" part
                local.get $temp
                local.set $total

                ;; Increase the count. This is the "$count++" part of the for...loop
                local.get $count
                i32.const 1
                i32.add
                local.set $count

                ;; We need to check the $count is less than $times. This is the "$count < $times;" part of the for...loop
                local.get $count
                local.get $times
                i32.lt_s

                ;; If so then continue on doubling the total
                ;; This br_if instruction pops the last i32 value off the stack and if it is not zero then moves the program
                ;; to perform the next instruction at the start of the loop. The "br" is short for branch, not break.
                br_if $loop_times

                ;; If we get here then $count is the same or greater than $times. It will not loop back up, but will move on
                ;; to the below instruction

            ;; This is the end of the $block_times section. Calling br or br_if will set the next problem step here
            end

        ;; This is the end of the $loop_times section. Calling br or br_if for this section will send the next product to
        ;; the start of the section, not here at the end
        end

        ;; Push the total on to the stack to return it
        local.get $total

        ;; The last item on the stack is the return value, which is the total amount
    )

    ;; Select from 3 or default function
    (func (export "selectFrom3Default")  (param $value0 i32) (param $value1 i32) (param $value2 i32) (param $default i32) (param $control i32) (result i32)
        ;; Set locals
        (local $result i32)

        ;; Example of a switch case using blocks and the br_table instruction
        block $switch
        block $option0
        block $option1
        block $option2
        block $default

        ;; The control value needs to be 0=$option0, 1=$option1, 2=$option3, or it defaults to the last one
        local.get $control
        br_table $option0 $option1 $option2 $default

        ;; default
        end
            ;; Set result to default
            local.get $default
            local.set $result

            ;; Break the switch block
            br $switch

        ;; option 2
        end
            ;; Set result to value 
            local.get $value2
            local.set $result

            ;; Break the switch block
            br $switch

        ;; option 1
        end
            ;; Set result to value 1
            local.get $value1
            local.set $result

            ;; Break the switch block
            br $switch

        ;; option 0
        end
            ;; Set result to value 0
            local.get $value0
            local.set $result

            ;; Break the switch block
            br $switch

        ;; End of switch
        end

        ;; Push the result on to the stack as the return result
        local.get $result
    )

)
