(; 
    WASM does not have a number of math functions that are common in other programming languages. Therefore
    I have created some of them, which you can use within your own WAT code. I have exported the function
    for testing, but you do not need to include that part if they are only being used internally within WAT.
;)
(module
    (;
        POW (power) a^n that is value "a" (f64) to the power of "n" (i32 unsigned).

        This comes from Skiena's "The Algorithm Design Manual"

        function power( a, n )
            if (n = 0) 
                return(1)

            x = power(a,n/2)

            if (n is odd) 
                return(a*x*x)
            else 
                return(x*x)
    ;)
    (func $math_pow (param $a f64) (param $n i32) (result f64)
        ;; Set local variables
        (local $x f64)
        (local $n_half i32)

        ;; Check if $n is zero
        local.get $n
        i32.eqz

        ;; If $n is zero
        if
            ;; Set the return value of 1.0
            f64.const 1.0

            ;; Stop here
            return
        end

        ;; Workout n/2. The n type is integer so we can just shift n to the right by one
        local.get $n
        i32.const 1
        i32.shr_u
        local.set $n_half

        ;; Set parameters to call this function again
        local.get $a
        local.get $n_half
        call $math_pow
        local.set $x

        ;; Check if $n is odd
        local.get $n
        i32.const 1
        i32.and

        ;; If the AND operation is not zero then $n is odd
        if (result f64)
            ;; Workout $x * $x * $a
            local.get $x
            local.get $x
            f64.mul
            local.get $a
            f64.mul

            ;; The stack contains the result, so we can stop here
            return
        else
            ;; Workout $x * $x
            local.get $x
            local.get $x
            f64.mul

            ;; The stack contains the result, so we can stop here
            return
        end
    )

    (;
        Both sine and cos use a list of fractorials
            1 = 1
            2 = 2
            3 = 6
            4 = 24
            5 = 120
            6 = 720
            7 = 5040
            8 = 40320
            9 = 362880
            10 = 3628800
            11 = 39916800
            12 = 479001600
            13 = 6227020800
            14 = 87178291200
            15 = 1307674368000
            16 = 20922789888000
            17 = 355687428096000
            18 = 6402373705728000
            19 = 121645100408832000
            20 = 2432902008176640000
    ;)
    (func $get_fractorial (param $n i32) (result f64)
        ;; Set locals
        (local $result f64)

        ;; Set default $result to 1
        f64.const 1
        local.set $result

        ;; Check $n and set result
        (if (i32.eq (local.get $n)(i32.const 1)) (then (f64.const 1.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 2)) (then (f64.const 2.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 3)) (then (f64.const 6.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 4)) (then (f64.const 24.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 5)) (then (f64.const 120.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 6)) (then (f64.const 720.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 7)) (then (f64.const 5040.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 8)) (then (f64.const 40320.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 9)) (then (f64.const 362880.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 10)) (then (f64.const 3628800.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 11)) (then (f64.const 39916800.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 12)) (then (f64.const 479001600.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 13)) (then (f64.const 6227020800.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 14)) (then (f64.const 87178291200.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 15)) (then (f64.const 1307674368000.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 16)) (then (f64.const 20922789888000.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 17)) (then (f64.const 355687428096000.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 18)) (then (f64.const 6402373705728000.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 19)) (then (f64.const 121645100408832000.0) (local.set $result)))
        (if (i32.eq (local.get $n)(i32.const 20)) (then (f64.const 2432902008176640000.0) (local.set $result)))
        
        ;; Set the return $result
        local.get $result
    )

    (;
        Radian Mod. Takes the radian angle and reduces it to 0 to 360 degrees (in radians).
    ;)
    (func $get_radian_mod (param $x f64) (result f64)
        ;; Set local variables
        (local $modTotal f64)
        (local $result f64)

        ;; Check $x is zero or greater
        local.get $x
        f64.const 0.0
        f64.ge

        ;; If it is
        if
            ;; Check $x is less than or equal to 2 * PI (which is 360 degrees)
            local.get $x
            f64.const 6.28318530717958647692
            f64.le

            ;; If it is
            if
                ;; Put $x on to the stack and return it, angle does not need to modded
                local.get $x
                return
            end
        end

        ;; Workout the number of 360s in the angle
        local.get $x
        f64.const 6.28318530717958647692
        f64.div

        ;; Workout floor amount
        f64.floor

        ;; Workout mod total
        f64.const 6.28318530717958647692
        f64.mul
        local.set $modTotal

        ;; Workout $result
        local.get $x
        local.get $modTotal
        f64.sub
        local.set $result

        ;; Check if the $result is negative
        local.get $result
        f64.const 0
        f64.lt

        ;; If it is less than zero
        if
            ;; Add 2 PI to it
            local.get $result
            f64.const 6.28318530717958647692
            f64.add
            local.set $result
        end

        ;; Add $result to the stack as the return value
        local.get $result
    )

    (;
        SIN (sine) sin(x)= "x" is in radians
    ;)
    (func $math_sin (param $x f64) (result f64)
        ;; Set local variables
        (local $modRadian f64)

        ;; Mod the radian angle (0 to 360 degrees)
        local.get $x
        call $get_radian_mod
        local.set $modRadian

        ;; Check angle is less than or equal to 90 degrees
        local.get $modRadian
        f64.const 1.57079632679489661923
        f64.le

        ;; If it is
        if
            ;; Call the sin function as it is
            local.get $modRadian
            call $get_sin

            ;; The result is on the stack which is this functions return result too
            return
        end

        ;; Check angle is less than or equal to 180 degrees
        local.get $modRadian
        f64.const 3.14159265358979323846
        f64.le

        ;; If it is
        if
            ;; Set angle
            local.get $modRadian
            f64.const 1.57079632679489661923
            f64.sub

            ;; Call the cos function
            call $get_cos

            ;; The result is on the stack which is this functions return result too
            return
        end

        ;; Check angle is less than or equal to 270 degrees
        local.get $modRadian
        f64.const 4.71238898038468985769
        f64.le

        ;; If it is
        if
            ;; Set angle
            local.get $modRadian
            f64.const 3.14159265358979323846
            f64.sub

            ;; Call the sin function
            call $get_sin

            ;; Negate the result
            f64.neg

            ;; The result is on the stack which is this functions return result too
            return
        end

        ;; Otherwise the angle is less than 360 degrees

        ;; Set angle
        local.get $modRadian
        f64.const 4.71238898038468985769
        f64.sub

        ;; Call the cos function
        call $get_cos

        ;; Negate the result
        f64.neg

        ;; The result is on the stack which is this functions return result too
    )

    (;
        COS (cosine) cos(x)= "x" is in radians
    ;)
    (func $math_cos (param $x f64) (result f64)
        ;; Set local variables
        (local $modRadian f64)

        ;; Mod the radian angle (0 to 360 degrees)
        local.get $x
        call $get_radian_mod
        local.set $modRadian

        ;; Check angle is less than or equal to 90 degrees
        local.get $modRadian
        f64.const 1.57079632679489661923
        f64.le

        ;; If it is
        if
            ;; Call the cos function as it is
            local.get $modRadian
            call $get_cos

            ;; The result is on the stack which is this functions return result too
            return
        end

        ;; Check angle is less than or equal to 180 degrees
        local.get $modRadian
        f64.const 3.14159265358979323846
        f64.le

        ;; If it is
        if
            ;; Set angle
            local.get $modRadian
            f64.const 1.57079632679489661923
            f64.sub

            ;; Call the sin function
            call $get_sin

            ;; Negate the result
            f64.neg

            ;; The result is on the stack which is this functions return result too
            return
        end

        ;; Check angle is less than or equal to 270 degrees
        local.get $modRadian
        f64.const 4.71238898038468985769
        f64.le

        ;; If it is
        if
            ;; Set angle
            local.get $modRadian
            f64.const 3.14159265358979323846
            f64.sub

            ;; Call the cos function
            call $get_cos

            ;; Negate the result
            f64.neg

            ;; The result is on the stack which is this functions return result too
            return
        end

        ;; Otherwise the angle is less than 360 degrees

        ;; Set angle
        local.get $modRadian
        f64.const 4.71238898038468985769
        f64.sub

        ;; Call the sin function
        call $get_sin

        ;; The result is on the stack which is this functions return result too
    )

    (;
        SIN (sine) sin(x)= "x" is in radians

        This uses the Taylor formula method to calculate the sine of an angle

        sin(x) = x - (x^3)/3! + (x^5)/5! - (x^7)/7! ...and so on (in odd numbers)...
    ;)
    (func $get_sin (param $x f64) (result f64)
        ;; Set locals
        (local $result f64)
        (local $term i32)
        (local $termResult f64)
        (local $term2 i32)
        (local $term2p1 i32)
        (local $fractorial f64)

        ;; Set $result to the starting $x value
        local.get $x
        local.set $result

        ;; Set $term to 1
        i32.const 1
        local.set $term

        ;; Loop for each $term (1 to 9)
        loop $for_each_term
            ;; Workout $term * 2 (we can shift left to do this)
            local.get $term
            i32.const 1
            i32.shl
            local.set $term2

            ;; Workout ($term * 2) + 1
            local.get $term2
            i32.const 1
            i32.add
            local.set $term2p1

            ;; Workout pow($x, $term2p1)
            local.get $x
            local.get $term2p1
            call $math_pow
            local.set $termResult

            ;; Get the $fractorial for $term2p1
            local.get $term2p1
            call $get_fractorial
            local.set $fractorial

            ;; Workout $termResult /= $fractorial
            local.get $termResult
            local.get $fractorial
            f64.div
            local.set $termResult

            ;; Workout if $term is odd
            local.get $term
            i32.const 1
            i32.and

            ;; If odd
            if
                ;; Adjust the $result by removing the $termResult
                local.get $result
                local.get $termResult
                f64.sub
                local.set $result
            else
                ;; Adjust the $result by adding the $termResult
                local.get $result
                local.get $termResult
                f64.add
                local.set $result
            end

            ;; Increase the $term
            local.get $term
            i32.const 1
            i32.add
            local.set $term

            ;; We need to check the $term is less than or equal to 9
            local.get $term
            i32.const 9
            i32.le_u

            ;; If so then continue on with the next $term
            br_if $for_each_term
        end

        ;; Put the $result onto the stack as the result
        local.get $result
    )

    (;
        COS (cosine) cos(x)= "x" is in radians

        This uses the Taylor formula method to calculate the sine of an angle

        sin(x) = 1 - (x^2)/2! + (x^4)/4! - (x^6)/6! ...and so on (in even numbers)...
    ;)
    (func $get_cos (param $x f64) (result f64)
        ;; Set locals
        (local $result f64)
        (local $term i32)
        (local $termResult f64)
        (local $term2 i32)
        (local $fractorial f64)

        ;; Set $result to 1
        f64.const 1.0
        local.set $result

        ;; Set $term to 1
        i32.const 1
        local.set $term

        ;; Loop for each $term (1 to 9)
        loop $for_each_term
            ;; Workout $term * 2 (we can shift left to do this)
            local.get $term
            i32.const 1
            i32.shl
            local.set $term2

            ;; Workout pow($x, $term2)
            local.get $x
            local.get $term2
            call $math_pow
            local.set $termResult

            ;; Get the $fractorial for $term2
            local.get $term2
            call $get_fractorial
            local.set $fractorial

            ;; Workout $termResult /= $fractorial
            local.get $termResult
            local.get $fractorial
            f64.div
            local.set $termResult

            ;; Workout if $term is odd
            local.get $term
            i32.const 1
            i32.and

            ;; If odd
            if
                ;; Adjust the $result by removing the $termResult
                local.get $result
                local.get $termResult
                f64.sub
                local.set $result
            else
                ;; Adjust the $result by adding the $termResult
                local.get $result
                local.get $termResult
                f64.add
                local.set $result
            end

            ;; Increase the $term
            local.get $term
            i32.const 1
            i32.add
            local.set $term

            ;; We need to check the $term is less than or equal to 9
            local.get $term
            i32.const 9
            i32.le_u

            ;; If so then continue on with the next $term
            br_if $for_each_term
        end

        ;; Put the $result onto the stack as the result
        local.get $result
    )

    ;; Exported functions for testing. You do not need to include these parts
    (export "math_pow" (func $math_pow))
    (export "math_sin" (func $math_sin))
    (export "math_cos" (func $math_cos))
)
