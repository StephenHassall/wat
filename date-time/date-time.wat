(; 
    WASM does not have any date time functions that are common in other programming languages. Therefore
    I have created some of them, which you can use within your own WAT code. I have exported the functions
    for testing, but you do not need to include those parts if they are only being used internally within WAT.

    The date and time is internally stored as a i64. The top i32 bits are for the date and the bottom i32 bits
    are for the time. They are formatted as follows.

    0b00000000_00000000_00000000_00000000
    >>...DDDDD_....MMMM_....YYYY_YYYYYYYY

    0b00000000_00000000_00000000_00000000
    >>...HHHHH_..MMMMMM_ssssssss_ssssssss

    ssss is the millisecond value

    Call functions are prefixed with "$date_"
;)
(module
    (;
        Convert the given year, month (1 to 12), day, hour, minute, second to a date time value.
    ;)
    (func $date_convert_ymdhms
        (param $year i32)
        (param $month i32)
        (param $day i32)
        (param $hour i32)
        (param $minute i32)
        (param $second i32)
        (result i64)
        ;; Set starting date time value
        i64.const 0

        ;; Set year
        local.get $year
        call $date_set_year

        ;; Set month
        local.get $month
        call $date_set_month

        ;; Set day
        local.get $day
        call $date_set_day

        ;; Set hour
        local.get $hour
        call $date_set_hour

        ;; Set minute
        local.get $minute
        call $date_set_minute

        ;; Set second
        local.get $second
        call $date_set_second

        ;; The result on the stack is the final date time value and is the value returned
    )

    (;
        Convert the given JavaScript epoch date time (number of milliseconds from 1970) to a date time value.
    ;)
    (func $date_convert_from_js (param $epoch i64) (result i64)
        ;; Set locals
        (local $days i64)
        (local $hour i32)
        (local $minute i32)
        (local $second i32)
        (local $millisecond i32)
        (local $timeEpoch i32)

        ;; Workout the number of days 24 * 60 * 60 * 1000 = 86400000
        local.get $epoch
        i64.const 86400000
        i64.div_u
        local.set $days

        ;; Remove the days from the epoch and set the i32 time epoch
        local.get $epoch
        local.get $days
        i64.const 86400000
        i64.mul
        i64.sub
        i32.wrap_i64
        local.set $timeEpoch

        ;; Add the extra 719163 days up to 1970/01/01
        local.get $days
        i64.const 719163
        i64.add
        local.set $days

        ;; Workout the number of milliseconds
        local.get $timeEpoch
        i32.const 1000
        i32.rem_u
        local.set $millisecond

        ;; Set $timeEpoch value to not include the milliseconds
        local.get $timeEpoch
        local.get $millisecond
        i32.sub
        local.set $timeEpoch

        ;; Workout the number of seconds 60 * 1000 = 60000
        local.get $timeEpoch
        i32.const 60000
        i32.rem_u
        i32.const 1000
        i32.div_u
        local.set $second

        ;; Update $timeEpoch value to not include the seconds
        local.get $timeEpoch
        local.get $second
        i32.const 1000
        i32.mul
        i32.sub
        local.set $timeEpoch

        ;; Workout the number of minutes 60 * 60 * 1000 = 3600000
        local.get $timeEpoch
        i32.const 3600000
        i32.rem_u
        i32.const 60000
        i32.div_u
        local.set $minute

        ;; Update $timeEpoch value to not include the minutes
        local.get $timeEpoch
        local.get $minute
        i32.const 60000
        i32.mul
        i32.sub
        local.set $timeEpoch

        ;; Workout the number of hours 24 * 60 * 60 * 1000 = 86400000
        local.get $timeEpoch
        i32.const 86400000
        i32.rem_u
        i32.const 3600000
        i32.div_u
        local.set $hour

        ;; Update $timeEpoch value to not include the hours
        local.get $timeEpoch
        local.get $hour
        i32.const 3600000
        i32.mul
        i32.sub
        local.set $timeEpoch

        ;; Convert the days to a date
        local.get $days
        i32.wrap_i64
        call $date_convert_days_to_date

        ;; Set hour
        local.get $hour
        call $date_set_hour

        ;; Set minute
        local.get $minute
        call $date_set_minute

        ;; Set second
        local.get $second
        call $date_set_second

        ;; Set millisecond
        local.get $millisecond
        call $date_set_millisecond

        ;; The result on the stack is the final date and time value and is the value returned
    )

    (;
        Convert the given date time into a JavaScript epoch date time (number of milliseconds from 1970).
    ;)
    (func $date_convert_to_js (param $datetime i64) (result i64)
        ;; Start result on stack
        i64.const 0

        ;; Get year
        local.get $datetime
        call $date_get_year

        ;; Get month
        local.get $datetime
        call $date_get_month

        ;; Get day
        local.get $datetime
        call $date_get_day

        ;; Get the total number of days (from year 0001)
        call $date_convert_date_to_days

        ;; Remove the days up to 1970
        i32.const 719163
        i32.sub

        ;; Convert the number of days (from 1970) in to milliseconds, and add to the result
        i64.extend_i32_u
        i64.const 86400000
        i64.mul
        i64.add

        ;; Get hours
        local.get $datetime
        call $date_get_hour

        ;; Convert the hours in to milliseconds, and add to the result
        i64.extend_i32_u
        i64.const 3600000
        i64.mul
        i64.add

        ;; Get minutes
        local.get $datetime
        call $date_get_minute

        ;; Convert the minutes in to milliseconds, and add to the result
        i64.extend_i32_u
        i64.const 60000
        i64.mul
        i64.add

        ;; Get seconds
        local.get $datetime
        call $date_get_second

        ;; Convert the seconds in to milliseconds, and add to the result
        i64.extend_i32_u
        i64.const 1000
        i64.mul
        i64.add

        ;; Get milliseconds
        local.get $datetime
        call $date_get_millisecond

        ;; Add to result
        i64.extend_i32_u
        i64.add

        ;; The result on the stack is the final JS epoch and is the value returned
    )

    (;
        Get the year part of the date and time.
    ;)
    (func $date_get_year (param $datetime i64) (result i32)
        ;; Set the date time value
        local.get $datetime

        ;; Shift right 32 bits
        i64.const 32
        i64.shr_u

        ;; Convert the i64 into a i32 value
        i32.wrap_i64

        ;; Remove the other date parts leaving only the year
        i32.const 0x00000FFF
        i32.and

        ;; The result on the stack is the year value and is the value returned
    )

    (;
        Set the year part of the date and time. The new datetime value is returned.
    ;)
    (func $date_set_year (param $datetime i64) (param $year i32) (result i64)
        ;; Clear the year parts from $datetime
        local.get $datetime
        i64.const 0xFFFFF000FFFFFFFF
        i64.and

        ;; Convert the year from i32 to i64
        local.get $year
        i64.extend_i32_u

        ;; Shift left 32 bits
        i64.const 32
        i64.shl

        ;; Put the $datetime together with the year
        i64.or

        ;; The result on the stack is the new datetime value and is the value returned
    )

    (;
        Get the month part of the date and time (1 to 12).
    ;)
    (func $date_get_month (param $datetime i64) (result i32)
        ;; Set the date time value
        local.get $datetime

        ;; Shift right 48 bits
        i64.const 48
        i64.shr_u

        ;; Convert the i64 into a i32 value
        i32.wrap_i64

        ;; Remove the other date parts leaving only the month
        i32.const 0x0000000F
        i32.and

        ;; The result on the stack is the month value and is the value returned
    )

    (;
        Set the month part of the date and time (1 to 12). The new datetime value is returned.
    ;)
    (func $date_set_month (param $datetime i64) (param $month i32) (result i64)
        ;; Clear the month parts from $datetime
        local.get $datetime
        i64.const 0xFFF0FFFFFFFFFFFF
        i64.and

        ;; Convert the month from i32 to i64
        local.get $month
        i64.extend_i32_u

        ;; Shift left 48 bits
        i64.const 48
        i64.shl

        ;; Put the $datetime together with the month
        i64.or

        ;; The result on the stack is the new datetime value and is the value returned
    )

    (;
        Get the day part of the date and time (1 to 31).
    ;)
    (func $date_get_day (param $datetime i64) (result i32)
        ;; Set the date time value
        local.get $datetime

        ;; Shift right 56 bits
        i64.const 56
        i64.shr_u

        ;; Convert the i64 into a i32 value
        i32.wrap_i64

        ;; The result on the stack is the month value and is the value returned
    )

    (;
        Set the day part of the date and time (1 to 31). The new datetime value is returned.
    ;)
    (func $date_set_day (param $datetime i64) (param $day i32) (result i64)
        ;; Clear the day parts from $datetime
        local.get $datetime
        i64.const 0xE0FFFFFFFFFFFFFF
        i64.and

        ;; Convert the day from i32 to i64
        local.get $day
        i64.extend_i32_u

        ;; Shift left 56 bits
        i64.const 56
        i64.shl

        ;; Put the $datetime together with the day
        i64.or

        ;; The result on the stack is the new datetime value and is the value returned
    )

    (;
        Get the hour part of the date and time (0 to 23).
    ;)
    (func $date_get_hour (param $datetime i64) (result i32)
        ;; Set the date time value
        local.get $datetime

        ;; Convert the i64 into a i32 value. This also removes the date parts
        i32.wrap_i64

        ;; Shift right 24 bits
        i32.const 24
        i32.shr_u

        ;; The result on the stack is the hours value and is the value returned
    )

    (;
        Set the hour part of the date and time (0 to 23). The new datetime value is returned.
    ;)
    (func $date_set_hour (param $datetime i64) (param $hour i32) (result i64)
        ;; Clear the hour parts from $datetime
        local.get $datetime
        i64.const 0xFFFFFFFFE0FFFFFF
        i64.and

        ;; Convert the hour from i32 to i64
        local.get $hour
        i64.extend_i32_u

        ;; Shift left 24 bits
        i64.const 24
        i64.shl

        ;; Put the $datetime together with the hour
        i64.or

        ;; The result on the stack is the new datetime value and is the value returned
    )

    (;
        Get the minute part of the date and time (0 to 59).
    ;)
    (func $date_get_minute (param $datetime i64) (result i32)
        ;; Set the date time value
        local.get $datetime

        ;; Convert the i64 into a i32 value. This also removes the date parts
        i32.wrap_i64

        ;; Shift right 16 bits
        i32.const 16
        i32.shr_u

        ;; Remove the other time parts leaving only the minute
        i32.const 0x0000003F
        i32.and

        ;; The result on the stack is the minute value and is the value returned
    )

    (;
        Set the minute part of the date and time (0 to 59). The new datetime value is returned.
    ;)
    (func $date_set_minute (param $datetime i64) (param $minute i32) (result i64)
        ;; Clear the minute parts from $datetime
        local.get $datetime
        i64.const 0xFFFFFFFFFFC0FFFF
        i64.and

        ;; Convert the minute from i32 to i64
        local.get $minute
        i64.extend_i32_u

        ;; Shift left 16 bits
        i64.const 16
        i64.shl

        ;; Put the $datetime together with the minute
        i64.or

        ;; The result on the stack is the new datetime value and is the value returned
    )

    (;
        Get the second part of the date and time (0 to 59).
    ;)
    (func $date_get_second (param $datetime i64) (result i32)
        ;; Set the date time value
        local.get $datetime

        ;; Convert the i64 into a i32 value. This also removes the date parts
        i32.wrap_i64

        ;; Remove the other time parts leaving only the seconds/milliseconds
        i32.const 0x0000FFFF
        i32.and

        ;; Divide the total milliseconds by 1000 to get the total seconds
        i32.const 1000
        i32.div_u

        ;; The result on the stack is the second value and is the value returned
    )

    (;
        Set the second part of the date and time (0 to 59). The new datetime value is returned.
    ;)
    (func $date_set_second (param $datetime i64) (param $second i32) (result i64)
        ;; Clear the second/millisecond parts from $datetime
        local.get $datetime
        i64.const 0xFFFFFFFFFFFF0000
        i64.and

        ;; Get the second/millisecond parts from $datetime
        local.get $datetime
        i64.const 0x000000000000FFFF
        i64.and

        ;; Get the remainder of dividing it by 1000. This get the number of milliseconds
        i64.const 1000
        i64.rem_u

        ;; Convert the second from i32 to i64
        local.get $second
        i64.extend_i32_u

        ;; Convert to milliseconds
        i64.const 1000
        i64.mul

        ;; Add milliseconds from $datetime
        i64.add

        ;; Put the $datetime together with the seconds/milliseconds
        i64.or

        ;; The result on the stack is the new datetime value and is the value returned
    )

    (;
        Get the milli-second part of the date and time (0 to 999).
    ;)
    (func $date_get_millisecond (param $datetime i64) (result i32)
        ;; Set the date time value
        local.get $datetime

        ;; Convert the i64 into a i32 value. This also removes the date parts
        i32.wrap_i64

        ;; Remove the other time parts leaving only the seconds/milliseconds
        i32.const 0x0000FFFF
        i32.and

        ;; Get the remainder of dividing the total milliseconds by 1000
        i32.const 1000
        i32.rem_u

        ;; The result on the stack is the millisecond value and is the value returned
    )

    (;
        Set the milli-second part of the date and time (0 to 999). The new datetime value is returned.
    ;)
    (func $date_set_millisecond (param $datetime i64) (param $millisecond i32) (result i64)
        ;; Clear the second/millisecond parts from $datetime
        local.get $datetime
        i64.const 0xFFFFFFFFFFFF0000
        i64.and

        ;; Get the second/millisecond parts from $datetime
        local.get $datetime
        i64.const 0x000000000000FFFF
        i64.and

        ;; Divide by 1000. This get the number of seconds
        i64.const 1000
        i64.div_u

        ;; Convert to milliseconds
        i64.const 1000
        i64.mul

        ;; Convert the millisecond from i32 to i64
        local.get $millisecond
        i64.extend_i32_u

        ;; Add seconds from $datetime
        i64.add

        ;; Put the $datetime together with the seconds/milliseconds
        i64.or

        ;; The result on the stack is the new datetime value and is the value returned
    )

    (;
        Is the given year a leap year?
    ;)
    (func $date_is_leap_year (param $year i32) (result i32)
        ;; Check not divisable by 4
        local.get $year
        i32.const 4
        i32.rem_u
        i32.const 0
        i32.ne

        ;; If not
        if
            ;; Set false
            i32.const 0
            return
        end

        ;; Check not divisable by 100
        local.get $year
        i32.const 100
        i32.rem_u
        i32.const 0
        i32.ne

        ;; If not
        if
            ;; Set true
            i32.const 1
            return
        end

        ;; Check not divisable by 400
        local.get $year
        i32.const 400
        i32.rem_u
        i32.const 0
        i32.ne

        ;; If not
        if (result i32)
            ;; Set false
            i32.const 0
        else
            ;; Set true (must be a leap year)
            i32.const 1
        end

        ;; The result on the stack is either 0 or 1 and is the value returned
    )

    (;
        Get days in month.
    ;)
    (func $date_get_days_in_month (param $year i32) (param $month i32) (result i32)
        ;; Set locals
        (local $result i32)

        ;; Check if month is 2 (feb)
        local.get $month
        i32.const 2
        i32.eq

        ;; If month is 2 (feb)
        if

            ;; Check if leap year
            local.get $year
            call $date_is_leap_year

            ;; If is a leap year
            if
                ;; Set return result to 29 days
                i32.const 29
                return
            else
                ;; Set return result to 28 days
                i32.const 28
                return
            end
        end

        ;; Set the default 31 days value
        i32.const 31
        local.set $result

        ;; If month is one that contains 30 days
        (if (i32.eq (local.get $month)(i32.const 4)) (then (i32.const 30) (local.set $result)))
        (if (i32.eq (local.get $month)(i32.const 6)) (then (i32.const 30) (local.set $result)))
        (if (i32.eq (local.get $month)(i32.const 9)) (then (i32.const 30) (local.set $result)))
        (if (i32.eq (local.get $month)(i32.const 11)) (then (i32.const 30) (local.set $result)))

        ;; Set the final result
        local.get $result

        ;; The result on the stack is the number of days in a month (30 or 31 at this point) and is the value returned
    )

    (;
        Get the number of leap years there have been since year 1 to the given year.
    ;)
    (func $date_get_leap_year_count (param $year i32) (result i32)
        ;; Set how many years are divisible by 400 (these are leap years)
        local.get $year
        i32.const 400
        i32.div_u

        ;; Set how many years are divisible by 4 (these are leap years, sort of)
        local.get $year
        i32.const 4
        i32.div_u
        ;;local.set $divisibleBy4

        ;; Set how many years are divisible by 100 (these are not leap years)
        local.get $year
        i32.const 100
        i32.div_u

        ;; Set how many leap years have there been (leap years = (divisibleBy4 - divisibleBy100) + divisibleBy400)
        i32.sub
        i32.add

        ;; The result on the stack is the number of leap years and is the value returned
    )

    (;
        Get the day of year.
    ;)
    (func $date_get_day_of_year (param $year i32) (param $month i32) (param $day i32) (result i32)
        ;; Set locals
        (local $dayOfYear i32)
        (local $monthCount i32)

        ;; Set day of year
        i32.const 0
        local.set $dayOfYear

        ;; Set month count
        i32.const 0
        local.set $monthCount

        ;; Loop for each month up to the current one give
        loop $loop_months
            ;; Increase month count
            local.get $monthCount
            i32.const 1
            i32.add
            local.set $monthCount

            ;; Check the month count is within range
            local.get $monthCount
            local.get $month
            i32.lt_u

            ;; If $monthCount is < $month
            if
                ;; Get the number of days in the month
                local.get $year
                local.get $monthCount
                call $date_get_days_in_month

                ;; Add to day of year
                local.get $dayOfYear
                i32.add
                local.set $dayOfYear

                ;; Continue to the start of the loop for the next month
                br $loop_months
            end
        end

        ;; Add the month's days to the total
        local.get $dayOfYear
        local.get $day
        i32.add

        ;; The result on the stack is the number of days in the year and is the value returned
    )

    (;
        Get the day of week. Use Carl Friedrich Gauss algorithm to calculate the day of the week.
            0 = Sunday
            1 = Monday
            2 = Tuesday
            3 = Wednesday
            4 = Thursday
            5 = Friday
            6 = Saturday        
    ;)
    (func $date_get_day_of_week (param $year i32) (param $month i32) (param $day i32) (result i32)
        ;; Set locals
        (local $part5 i32)

        ;; Adjustment year
        local.get $month
        i32.const 3
        i32.lt_u
        if
            local.get $year
            i32.const 1
            i32.sub
            local.set $year
        end

        ;; Set part 1
        local.get $year

        ;; Set part 2
        local.get $year
        i32.const 4
        i32.div_u

        ;; Set part 3
        local.get $year
        i32.const 100
        i32.div_u
        i32.const -1
        i32.mul

        ;; Set part 4
        local.get $year
        i32.const 400
        i32.div_u

        ;; Set part 5
        (if (i32.eq (local.get $month)(i32.const 1)) (then (i32.const 0) (local.set $part5)))
        (if (i32.eq (local.get $month)(i32.const 2)) (then (i32.const 3) (local.set $part5)))
        (if (i32.eq (local.get $month)(i32.const 3)) (then (i32.const 2) (local.set $part5)))
        (if (i32.eq (local.get $month)(i32.const 4)) (then (i32.const 5) (local.set $part5)))
        (if (i32.eq (local.get $month)(i32.const 5)) (then (i32.const 0) (local.set $part5)))
        (if (i32.eq (local.get $month)(i32.const 6)) (then (i32.const 3) (local.set $part5)))
        (if (i32.eq (local.get $month)(i32.const 7)) (then (i32.const 5) (local.set $part5)))
        (if (i32.eq (local.get $month)(i32.const 8)) (then (i32.const 1) (local.set $part5)))
        (if (i32.eq (local.get $month)(i32.const 9)) (then (i32.const 4) (local.set $part5)))
        (if (i32.eq (local.get $month)(i32.const 10)) (then (i32.const 6) (local.set $part5)))
        (if (i32.eq (local.get $month)(i32.const 11)) (then (i32.const 2) (local.set $part5)))
        (if (i32.eq (local.get $month)(i32.const 12)) (then (i32.const 4) (local.set $part5)))
        local.get $part5
        
        ;; Part 6 is days
        local.get $day

        ;; Put all the parts together
        i32.add
        i32.add
        i32.add
        i32.add
        i32.add

        ;; Workout the final day of week value
        i32.const 7
        i32.rem_u

        ;; The result on the stack is the day of week and is the value returned
    )

    (;
        Add the number of years to the given date time and returns the result. The years value can be negative.
        If the starting date was on feb 29 and the end year is not leap, then we move day to 28
    ;)
    (func $date_add_years (param $datetime i64) (param $years i32) (result i64)
        ;; Set locals
        (local $startYear i32)
        (local $endYear i32)
        (local $resultDateTime i64)

        ;; Get start year
        local.get $datetime
        call $date_get_year
        local.set $startYear

        ;; Workout end year
        local.get $startYear
        local.get $years
        i32.add
        local.set $endYear

        ;; Set the end year value
        local.get $datetime
        local.get $endYear
        call $date_set_year
        local.set $resultDateTime
        
        ;; Get month and see if it is not feb
        local.get $datetime
        call $date_get_month
        i32.const 2
        i32.ne
        if
            ;; Return the current result date time
            local.get $resultDateTime
            return
        end

        ;; Get day and see if it is not 29
        local.get $datetime
        call $date_get_day
        i32.const 29
        i32.ne
        if
            ;; Return the current result date time
            local.get $resultDateTime
            return
        end

        ;; Check if the end year is leap
        local.get $endYear
        call $date_is_leap_year
        if
            ;; Return the current result date time
            local.get $resultDateTime
            return
        end

        ;; Change the day from 29 to 28
        local.get $resultDateTime
        i32.const 28
        call $date_set_day

        ;; The result on the stack is the result date time and is the value returned
    )

    (;
        Add the number of months to the given date time and returns the result. The month value can be negative.
        If the day is on the 31st of the month and the new month only has 30 or less days, then the day part will
        be moved to the last day of the month.
    ;)
    (func $date_add_months (param $datetime i64) (param $months i32) (result i64)
        ;; Set locals
        (local $adjustment i32)
        (local $addYears i32)
        (local $addMonths i32)
        (local $year i32)
        (local $month i32)
        (local $day i32)
        (local $daysOfMonth i32)

        ;; Set adjustment
        local.get $months
        i32.const 0
        i32.lt_s
        if
            i32.const -1
            local.set $adjustment
        else
            i32.const 1
            local.set $adjustment
        end

        ;; Set absolute months value
        local.get $months
        i32.const 0
        i32.lt_s
        if
            local.get $months
            i32.const -1
            i32.mul
            local.set $months
        end

        ;; Workout the number of add years and months
        local.get $months
        i32.const 12
        i32.div_u
        local.set $addYears
        local.get $months
        i32.const 12
        i32.rem_u
        local.set $addMonths

        ;; Get date time year, month and day
        local.get $datetime
        call $date_get_year
        local.set $year
        local.get $datetime
        call $date_get_month
        local.set $month
        local.get $datetime
        call $date_get_day
        local.set $day

        ;; If we are adding years
        local.get $addYears
        if
            ;; Workout the new year
            local.get $addYears
            local.get $adjustment
            i32.mul
            local.get $year
            i32.add
            local.set $year
        end

        ;; Workout the new month
        local.get $addMonths
        local.get $adjustment
        i32.mul
        local.get $month
        i32.add
        local.set $month

        ;; If new month is less than or equal to zero
        local.get $month
        i32.const 0
        i32.le_s
        if
            ;; Move year back 1
            local.get $year
            i32.const 1
            i32.sub
            local.set $year

            ;; Increase month by 12 months
            local.get $month
            i32.const 12
            i32.add
            local.set $month
        else
            ;; If month is over 12 months
            local.get $month
            i32.const 12
            i32.gt_s
            if
                ;; Move year forward 1
                local.get $year
                i32.const 1
                i32.add
                local.set $year

                ;; Decrease month by 12 months
                local.get $month
                i32.const 12
                i32.sub
                local.set $month
            end
        end

        ;; Get days in new year and month
        local.get $year
        local.get $month
        call $date_get_days_in_month
        local.set $daysOfMonth

        ;; If new day is over the days in the month then move the day to the end of the month
        
        local.get $day
        local.get $daysOfMonth
        i32.gt_s
        if
            local.get $daysOfMonth
            local.set $day
        end

        ;; Update the date time
        local.get $datetime
        local.get $year
        call $date_set_year
        local.get $month
        call $date_set_month
        local.get $day
        call $date_set_day

        ;; The result on the stack is the result date time and is the value returned
    )

    (;
        Add the number of days to the given date time and returns the result. The day value can be negative.
    ;)
    (func $date_add_days (param $datetime i64) (param $days i32) (result i64)
        ;; Set locals
        (local $time i64)

        ;; Get time only part
        local.get $datetime
        i64.const 0x00000000FFFFFFFF
        i64.and
        local.set $time

        ;; Get date time year, month and day
        local.get $datetime
        call $date_get_year
        local.get $datetime
        call $date_get_month
        local.get $datetime
        call $date_get_day

        ;; Convert date to the number of days
        call $date_convert_date_to_days

        ;; Add the days to it
        local.get $days
        i32.add

        ;; Convert the new number of days to a date
        call $date_convert_days_to_date

        ;; Put time parts on the end
        local.get $time
        i64.or

        ;; The result on the stack is the result date time and is the value returned
    )

    (;
        Add the number of hours to the given date time and returns the result. The hours value can be negative.
    ;)
    (func $date_add_hours (param $datetime i64) (param $hours i32) (result i64)
        ;; Add date time to stack
        local.get $datetime

        ;; Workout the total hours in milliseconds
        local.get $hours
        i64.extend_i32_s
        i64.const 3600000
        i64.mul

        ;; Add the milliseconds
        call $date_add_milliseconds

        ;; The result on the stack is the result date time and is the value returned
    )

    (;
        Add the number of minutes to the given date time and returns the result. The minutes value can be negative.
    ;)
    (func $date_add_minutes (param $datetime i64) (param $minutes i32) (result i64)
        ;; Add date time to stack
        local.get $datetime

        ;; Workout the total minutes in milliseconds
        local.get $minutes
        i64.extend_i32_s
        i64.const 60000
        i64.mul

        ;; Add the milliseconds
        call $date_add_milliseconds

        ;; The result on the stack is the result date time and is the value returned
    )

    (;
        Add the number of seconds to the given date time and returns the result. The seconds value can be negative.
    ;)
    (func $date_add_seconds (param $datetime i64) (param $seconds i32) (result i64)
        ;; Add date time to stack
        local.get $datetime

        ;; Workout the total seconds in milliseconds
        local.get $seconds
        i64.extend_i32_s
        i64.const 1000
        i64.mul

        ;; Add the milliseconds
        call $date_add_milliseconds

        ;; The result on the stack is the result date time and is the value returned
    )

    (;
        Add the number of milliseconds to the given date time and returns the result. The value can be negative.
    ;)
    (func $date_add_milliseconds (param $datetime i64) (param $milliseconds i64) (result i64)
        ;; Set locals
        (local $timeMilliseconds i64)
        (local $days i64)
        (local $hour i64)
        (local $minute i64)
        (local $second i64)
        (local $millisecond i64)

        ;; Start off with milliseconds
        local.get $datetime
        call $date_get_millisecond
        i64.extend_i32_u
        local.set $timeMilliseconds

        ;; Add seconds
        local.get $datetime
        call $date_get_second
        i64.extend_i32_u
        i64.const 1000
        i64.mul
        local.get $timeMilliseconds
        i64.add
        local.set $timeMilliseconds

        ;; Add minutes
        local.get $datetime
        call $date_get_minute
        i64.extend_i32_u
        i64.const 60000
        i64.mul
        local.get $timeMilliseconds
        i64.add
        local.set $timeMilliseconds

        ;; Add hours
        local.get $datetime
        call $date_get_hour
        i64.extend_i32_u
        i64.const 3600000
        i64.mul
        local.get $timeMilliseconds
        i64.add
        local.set $timeMilliseconds

        ;; Add the millisecond parts
        local.get $timeMilliseconds
        local.get $milliseconds
        i64.add
        local.set $timeMilliseconds

        ;; Now we need to convert the new millisconds back into time parts

        ;; Workout the number of days 24 * 60 * 60 * 1000 = 86400000
        local.get $timeMilliseconds
        i64.const 86400000
        i64.div_s
        local.set $days

        ;; If timeMilliseconds is negative
        local.get $timeMilliseconds
        i64.const 0
        i64.lt_s
        if
            ;; If $timeMilliseconds % 86400000 is zero
            local.get $timeMilliseconds
            i64.const 86400000
            i64.rem_s
            i64.const 0
            i64.ne
            if
                ;; Reduce the days
                local.get $days
                i64.const 1
                i64.sub
                local.set $days
            end

            ;; Calculate $timeMilliseconds = ($days * -86400000) + $timeMilliseconds
            local.get $days
            i64.const -86400000
            i64.mul
            local.get $timeMilliseconds
            i64.add
            local.set $timeMilliseconds
        else
            ;; Remove the days from the time
            local.get $timeMilliseconds
            local.get $days
            i64.const 86400000
            i64.mul
            i64.sub
            local.set $timeMilliseconds
        end

        ;; Workout the number of milliseconds
        local.get $timeMilliseconds
        i64.const 1000
        i64.rem_s
        local.set $millisecond

        ;; Set $timeMilliseconds value to not include the milliseconds
        local.get $timeMilliseconds
        local.get $millisecond
        i64.sub
        local.set $timeMilliseconds

        ;; Workout the number of seconds 60 * 1000 = 60000
        local.get $timeMilliseconds
        i64.const 60000
        i64.rem_s
        i64.const 1000
        i64.div_s
        local.set $second

        ;; Update $timeMilliseconds value to not include the seconds
        local.get $timeMilliseconds
        local.get $second
        i64.const 1000
        i64.mul
        i64.sub
        local.set $timeMilliseconds

        ;; Workout the number of minutes 60 * 60 * 1000 = 3600000
        local.get $timeMilliseconds
        i64.const 3600000
        i64.rem_s
        i64.const 60000
        i64.div_s
        local.set $minute

        ;; Update $timeMilliseconds value to not include the minutes
        local.get $timeMilliseconds
        local.get $minute
        i64.const 60000
        i64.mul
        i64.sub
        local.set $timeMilliseconds

        ;; Workout the number of hours 24 * 60 * 60 * 1000 = 86400000
        local.get $timeMilliseconds
        i64.const 86400000
        i64.rem_s
        i64.const 3600000
        i64.div_s
        local.set $hour

        ;; Set time parts
        local.get $datetime
        local.get $millisecond
        i32.wrap_i64
        call $date_set_millisecond

        local.get $second
        i32.wrap_i64
        call $date_set_second

        local.get $minute
        i32.wrap_i64
        call $date_set_minute

        local.get $hour
        i32.wrap_i64
        call $date_set_hour

        ;; Add the days to it
        local.get $days
        i32.wrap_i64
        call $date_add_days

        ;; The result on the stack is the result date time and is the value returned
    )

    (;
        Convert given date into the total number of days from year 1, month 1, day 1.
    ;)
    (func $date_convert_date_to_days (param $year i32) (param $month i32) (param $day i32) (result i32)
        ;; Get day of year
        local.get $year
        local.get $month
        local.get $day
        call $date_get_day_of_year

        ;; Get leap year count for (year - 1)
        local.get $year
        i32.const 1
        i32.sub
        call $date_get_leap_year_count

        ;; Workout (year - 1) * 365
        local.get $year
        i32.const 1
        i32.sub
        i32.const 365
        i32.mul

        ;; Set final total = ((year - 1) * 365) + leapYears + dayOfYear;
        i32.add
        i32.add

        ;; The result on the stack is the total number of days for the given date and is the value returned
    )

    (;
        Convert given number of days from year 1, month 1, day 1 into a date.
    ;)
    (func $date_convert_days_to_date (param $days i32) (result i64)
        ;; Set locals
        (local $year i32)
        (local $month i32)
        (local $day i32)
        (local $daysLeft i32)
        (local $totalDaysForYear i32)
        (local $daysInYear i32)
        (local $daysInMonth i32)
        (local $monthCount i32)

        ;; Estimate the number of years = Math.floor((days - 1) / 365) + 1;
        local.get $days
        i32.const 1
        i32.sub
        i32.const 365
        i32.div_u
        i32.const 1
        i32.add
        local.set $year

        ;; Set starting days left
        local.get $days
        local.set $daysLeft

        ;; Loop until we get to the right year
        loop $loop_right_year
            ;; Get the leap year count for (year - 1)
            local.get $year
            i32.const 1
            i32.sub
            call $date_get_leap_year_count

            ;; Set total days for the year = ((year - 1) * 365) + (above leap years)
            local.get $year
            i32.const 1
            i32.sub
            i32.const 365
            i32.mul
            i32.add
            local.set $totalDaysForYear

            ;; Workout the days left
            local.get $days
            local.get $totalDaysForYear
            i32.sub
            local.set $daysLeft

            ;; Get days in year
            local.get $year
            call $date_is_leap_year
            if
                ;; Set 366 days in this leap year
                i32.const 366
                local.set $daysInYear
            else
                ;; Set 365 days in this non-leap year
                i32.const 365
                local.set $daysInYear
            end

            ;; If more days left than there are in the year
            local.get $daysLeft
            local.get $daysInYear
            i32.gt_s
            if
                ;; Increase the year by one and have another go
                local.get $year
                i32.const 1
                i32.add
                local.set $year
                br $loop_right_year
            end

            ;; If we have gone too far
            local.get $daysLeft
            i32.const 0
            i32.le_s
            if
                ;; Decrease the year by one and have another go
                local.get $year
                i32.const 1
                i32.sub
                local.set $year
                br $loop_right_year
            end

            ;; This is the year we are looking for
        end

        ;; Set month and day
        i32.const 1
        local.set $month
        i32.const 1
        local.set $day

        ;; Set starting $monthCount
        i32.const 1
        local.set $monthCount

        ;; For each month (1 to 12)
        loop $loop_months
            block $block_months
                ;; Get days in month
                local.get $year
                local.get $monthCount
                call $date_get_days_in_month
                local.set $daysInMonth

                ;; If days left are over the days in this month
                local.get $daysLeft
                local.get $daysInMonth
                i32.gt_s
                if
                    ;; Decrease the days left by days in this month
                    local.get $daysLeft
                    local.get $daysInMonth
                    i32.sub
                    local.set $daysLeft
                else
                    ;; Set month, day and stop looking
                    local.get $monthCount
                    local.set $month
                    local.get $daysLeft
                    local.set $day
                    br $block_months
                end

                ;; Increase $monthCount
                local.get $monthCount
                i32.const 1
                i32.add
                local.set $monthCount

                ;; Have we reached the end
                local.get $monthCount
                i32.const 12
                i32.le_u

                ;; If so then continue on to the next month
                br_if $loop_months
            end
        end

        ;; Set final date and set parts
        i64.const 0
        local.get $year
        call $date_set_year
        local.get $month
        call $date_set_month
        local.get $day
        call $date_set_day

        ;; The result on the stack is the final date and is the value returned
    )

    (;
        Compare two date time objects.
        if $datetime1 > $datetime2 then return 1
        if $datetime1 > $datetime2 then return -1
        if $datetime1 === $datetime2 then return 0
    ;)
    (func $date_compare (param $datetime1 i64) (param $datetime2 i64) (result i32)
        ;; Set locals
        (local $compare i32)

        ;; Get years and set compare
        local.get $datetime1
        call $date_get_year
        local.get $datetime2
        call $date_get_year
        i32.sub
        local.set $compare

        ;; Check for greater or less than zero
        (if (i32.gt_s (local.get $compare)(i32.const 0)) (then (i32.const 1) (return)))
        (if (i32.lt_s (local.get $compare)(i32.const 0)) (then (i32.const -1) (return)))

        ;; Get month and set compare
        local.get $datetime1
        call $date_get_month
        local.get $datetime2
        call $date_get_month
        i32.sub
        local.set $compare

        ;; Check for greater or less than zero
        (if (i32.gt_s (local.get $compare)(i32.const 0)) (then (i32.const 1) (return)))
        (if (i32.lt_s (local.get $compare)(i32.const 0)) (then (i32.const -1) (return)))

        ;; Get day and set compare
        local.get $datetime1
        call $date_get_day
        local.get $datetime2
        call $date_get_day
        i32.sub
        local.set $compare

        ;; Check for greater or less than zero
        (if (i32.gt_s (local.get $compare)(i32.const 0)) (then (i32.const 1) (return)))
        (if (i32.lt_s (local.get $compare)(i32.const 0)) (then (i32.const -1) (return)))

        ;; Get hour and set compare
        local.get $datetime1
        call $date_get_hour
        local.get $datetime2
        call $date_get_hour
        i32.sub
        local.set $compare

        ;; Check for greater or less than zero
        (if (i32.gt_s (local.get $compare)(i32.const 0)) (then (i32.const 1) (return)))
        (if (i32.lt_s (local.get $compare)(i32.const 0)) (then (i32.const -1) (return)))

        ;; Get minute and set compare
        local.get $datetime1
        call $date_get_minute
        local.get $datetime2
        call $date_get_minute
        i32.sub
        local.set $compare

        ;; Check for greater or less than zero
        (if (i32.gt_s (local.get $compare)(i32.const 0)) (then (i32.const 1) (return)))
        (if (i32.lt_s (local.get $compare)(i32.const 0)) (then (i32.const -1) (return)))

        ;; Get second and set compare
        local.get $datetime1
        call $date_get_second
        local.get $datetime2
        call $date_get_second
        i32.sub
        local.set $compare

        ;; Check for greater or less than zero
        (if (i32.gt_s (local.get $compare)(i32.const 0)) (then (i32.const 1) (return)))
        (if (i32.lt_s (local.get $compare)(i32.const 0)) (then (i32.const -1) (return)))

        ;; Get millisecond and set compare
        local.get $datetime1
        call $date_get_millisecond
        local.get $datetime2
        call $date_get_millisecond
        i32.sub
        local.set $compare

        ;; Check for greater or less than zero
        (if (i32.gt_s (local.get $compare)(i32.const 0)) (then (i32.const 1) (return)))
        (if (i32.lt_s (local.get $compare)(i32.const 0)) (then (i32.const -1) (return)))

        ;; Set return result to equal
        i32.const 0
    )

    (;
        Validate the given date parts.
    ;)
    (func $date_validate_date (param $year i32) (param $month i32) (param $day i32) (result i32)
        ;; Check the year range (>= 0 && <= 4000)
        (if (i32.lt_s (local.get $year)(i32.const 0)) (then (i32.const 0) (return)))
        (if (i32.gt_s (local.get $year)(i32.const 4000)) (then (i32.const 0) (return)))

        ;; Check the month range (>= 1 && <= 12)
        (if (i32.lt_s (local.get $month)(i32.const 1)) (then (i32.const 0) (return)))
        (if (i32.gt_s (local.get $month)(i32.const 12)) (then (i32.const 0) (return)))

        ;; Check the day range (>= 1 && <= 31)
        (if (i32.lt_s (local.get $day)(i32.const 1)) (then (i32.const 0) (return)))
        (if (i32.gt_s (local.get $day)(i32.const 31)) (then (i32.const 0) (return)))

        ;; Get the days in the month
        local.get $year
        local.get $month
        call $date_get_days_in_month

        ;; If days in month value is less than the day value
        local.get $day
        i32.lt_s
        if
            ;; Set not valid
            i32.const 0
            return
        end

        ;; Set return result to validate date
        i32.const 1
    )
    
    (;
        Validate the given time parts.
    ;)
    (func $date_validate_time (param $hour i32) (param $minute i32) (param $second i32) (param $millisecond i32) (result i32)
        ;; Check the hour range (>= 0 && <= 23)
        (if (i32.lt_s (local.get $hour)(i32.const 0)) (then (i32.const 0) (return)))
        (if (i32.gt_s (local.get $hour)(i32.const 23)) (then (i32.const 0) (return)))

        ;; Check the minute range (>= 0 && <= 59)
        (if (i32.lt_s (local.get $minute)(i32.const 0)) (then (i32.const 0) (return)))
        (if (i32.gt_s (local.get $minute)(i32.const 59)) (then (i32.const 0) (return)))

        ;; Check the second range (>= 0 && <= 59)
        (if (i32.lt_s (local.get $second)(i32.const 0)) (then (i32.const 0) (return)))
        (if (i32.gt_s (local.get $second)(i32.const 59)) (then (i32.const 0) (return)))

        ;; Check the millisecond range (>= 0 && <= 999)
        (if (i32.lt_s (local.get $millisecond)(i32.const 0)) (then (i32.const 0) (return)))
        (if (i32.gt_s (local.get $millisecond)(i32.const 999)) (then (i32.const 0) (return)))

        ;; Set return result to validate time
        i32.const 1
    )

    ;; Exported functions for testing. You do not need to include these parts
    (export "date_convert_ymdhms" (func $date_convert_ymdhms))
    (export "date_convert_from_js" (func $date_convert_from_js))
    (export "date_convert_to_js" (func $date_convert_to_js))
    (export "date_get_year" (func $date_get_year))
    (export "date_set_year" (func $date_set_year))
    (export "date_get_month" (func $date_get_month))
    (export "date_set_month" (func $date_set_month))
    (export "date_get_day" (func $date_get_day))
    (export "date_set_day" (func $date_set_day))
    (export "date_get_hour" (func $date_get_hour))
    (export "date_set_hour" (func $date_set_hour))
    (export "date_get_minute" (func $date_get_minute))
    (export "date_set_minute" (func $date_set_minute))
    (export "date_get_second" (func $date_get_second))
    (export "date_set_second" (func $date_set_second))
    (export "date_get_millisecond" (func $date_get_millisecond))
    (export "date_set_millisecond" (func $date_set_millisecond))
    (export "date_is_leap_year" (func $date_is_leap_year))
    (export "date_get_days_in_month" (func $date_get_days_in_month))
    (export "date_get_leap_year_count" (func $date_get_leap_year_count))
    (export "date_get_day_of_year" (func $date_get_day_of_year))
    (export "date_get_day_of_week" (func $date_get_day_of_week))
    (export "date_add_years" (func $date_add_years))
    (export "date_add_months" (func $date_add_months))
    (export "date_add_days" (func $date_add_days))
    (export "date_add_hours" (func $date_add_hours))
    (export "date_add_minutes" (func $date_add_minutes))
    (export "date_add_seconds" (func $date_add_seconds))
    (export "date_add_milliseconds" (func $date_add_milliseconds))
    (export "date_convert_date_to_days" (func $date_convert_date_to_days))
    (export "date_convert_days_to_date" (func $date_convert_days_to_date))
    (export "date_compare" (func $date_compare))
    (export "date_validate_date" (func $date_validate_date))
    (export "date_validate_time" (func $date_validate_time))
)
