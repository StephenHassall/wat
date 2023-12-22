/**
 * Math tools.
 */

export default class MathTools  {
    /**
     * Get the list of 1 to 20 factorial
     */
    static listFactorials() {
        // For each integer from 1 to 20
        for (let n = 1; n <= 20; n++) {
            // Get fractial
            const result = MathTools.factorial(n);

            // Output the result
            console.log(n.toString() + ' = ' + result.toString());
        }
    }

    /**
     * Calculate the factorial of the given value.
     * @param {Number} n The factorial amount to calculate (integer).
     * @return {Number} The resulting factorial.
     */
    static factorial(n) {
        // If n is 1 then return 1
        if (n === 1) return 1;

        // Otherwise calculate the current factoral
        const result = n * MathTools.factorial(n - 1);

        // Return the result
        return result;
    }

    /**
     * WAT math_pow code for testing algorithms.
     * @param {Number} $a Raise this number (float).
     * @param {Number} $n By this number (integer).
     * @return {Number} The result of a^n.
     */
    static wat_math_pow($a, $n) {
        // Set local variables
        let $x;
        let $n_half;

        // Check if $n is zero
        if ($n === 0) return 1;

        // Workout n/2. The n type is integer so we can just shift n to the right by one
        $n_half = $n >> 1;

        // Call this function again
        $x = MathTools.wat_math_pow($a, $n_half);

        // Check if $n is odd
        if ($n & 0x01) {
            // Workout $x * $x * $a
            return $x * $x * $a;
        } else {
            // Workout $x * $x
            return $x * $x;
        }
    }

    /**
     * Takes the radian angle and reduces it to 0 to 360 degrees (in radians).
     * @param {Number} $x The angle in radians that needs reducing.
     * @return {Number} The angle in radians.
     */
    static wat_get_radian_mod($x) {
        // Set local variables
        let $countTotal;
        let $modTotal;
        let $result;

        // If $x is zero or greater
        if ($x >= 0) {
            // If $x is less than or equal to 2 * PI (which is 360 degrees)
            if ($x <= 6.28318530717958647692) {
                // The angle does not need to modded
                return $x;
            }
        }

        // Workout the number of 360s in the angle
        $countTotal = $x / 6.28318530717958647692;

        // Workout floor amount
        $countTotal = Math.floor($countTotal);

        // Workout mod total
        $modTotal = $countTotal * 6.28318530717958647692;

        // Workout $result
        $result = $x - $modTotal;

        // If negative
        if ($result < 0) $result += 6.28318530717958647692;

        // Return the result
        return $result;
    }

    /**
     * WAT get_fractorial code for testing algorithms.
     * @param {Number} $n The number to get the factorial for (1 to 20).
     * @return {Number} The factorial for the given number (as a float).
     */
    static wat_get_fractorial($n) {
        // Set locals
        let $result;

        // Set default
        $result = 0;

        // Check $n and set result
        if ($n === 1) $result = 1.0;
        if ($n === 2) $result = 2.0;
        if ($n === 3) $result = 6.0;
        if ($n === 4) $result = 24.0;
        if ($n === 5) $result = 120.0;
        if ($n === 6) $result = 720.0;
        if ($n === 7) $result = 5040.0;
        if ($n === 8) $result = 40320.0;
        if ($n === 9) $result = 362880.0;
        if ($n === 10) $result = 3628800.0;
        if ($n === 11) $result = 39916800.0;
        if ($n === 12) $result = 479001600.0;
        if ($n === 13) $result = 6227020800.0;
        if ($n === 14) $result = 87178291200.0;
        if ($n === 15) $result = 1307674368000.0;
        if ($n === 16) $result = 20922789888000.0;
        if ($n === 17) $result = 355687428096000.0;
        if ($n === 18) $result = 6402373705728000.0;
        if ($n === 19) $result = 121645100408832000.0;
        if ($n === 20) $result = 2432902008176640000.0;

        // Return the $result
        return $result;
    }

    /**
     * WAT math_sin code for testing algorithms.
     * @param {Number} $x The angle to get the sin for (in radians).
     * @return {Number} The sin of the given angle.
     */
    static wat_math_sin($x) {
        // Set local variables
        let $modRadian;
        let $angle;

        // Mod the radian angle (0 to 360 degrees)
        $modRadian = MathTools.wat_get_radian_mod($x);

        // If angle is less than or equal to 90 degrees
        if ($modRadian <= 1.57079632679489661923) {
            // Perform normal sin function
            return MathTools.wat_get_sin($modRadian);
        }

        // If angle is less than or equal to 180 degrees
        if ($modRadian <= 3.14159265358979323846) {
            // Set angle
            $angle = $modRadian - 1.57079632679489661923;

            // Perform normal cos function
            return MathTools.wat_get_cos($angle);
        }

        // If angle is less than or equal to 270 degrees
        if ($modRadian <= 4.71238898038468985769) {
            // Set angle
            $angle = $modRadian - 3.14159265358979323846;

            // Perform minus sin function
            return -MathTools.wat_get_sin($angle);
        }

        // Otherwise the angle is less than 360 degrees

        // Set angle
        $angle = $modRadian - 4.71238898038468985769;
        
        // Perform minus cos function
        return -MathTools.wat_get_cos($angle);

        // Return $result
        return $result;
    }

    /**
     * WAT math_cos code for testing algorithms.
     * @param {Number} $x The angle to get the cos for (in radians).
     * @return {Number} The cos of the given angle.
     */
    static wat_math_cos($x) {
        // Set local variables
        let $modRadian;
        let $angle;

        // Mod the radian angle (0 to 360 degrees)
        $modRadian = MathTools.wat_get_radian_mod($x);

        // If angle is less than or equal to 90 degrees
        if ($modRadian <= 1.57079632679489661923) {
            // Perform normal cos function
            return MathTools.wat_get_cos($modRadian);
        }

        // If angle is less than or equal to 180 degrees
        if ($modRadian <= 3.14159265358979323846) {
            // Set angle
            $angle = $modRadian - 1.57079632679489661923;

            // Perform normal minus sin function
            return -MathTools.wat_get_sin($angle);
        }

        // If angle is less than or equal to 270 degrees
        if ($modRadian <= 4.71238898038468985769) {
            // Set angle
            $angle = $modRadian - 3.14159265358979323846;

            // Perform minus cos function
            return -MathTools.wat_get_cos($angle);
        }

        // Otherwise the angle is less than 360 degrees

        // Set angle
        $angle = $modRadian - 4.71238898038468985769;
        
        // Perform sin function
        return MathTools.wat_get_sin($angle);

        // Return $result
        return $result;
    }

    /**
     * WAT get_sin code for testing algorithms.
     * @param {Number} $x The angle to get the sin for (in radians).
     * @return {Number} The sin of the given angle.
     */
    static wat_get_sin($x) {
        // Set locals
        let $result;
        let $term;
        let $termResult;
        let $term2;
        let $term2p1;
        let $fractorial;

        // Set $result to the starting $x value
        $result = $x;

        // Loop for each $term (1 to 9)
        for ($term = 1; $term <= 9; $term++) {
            // Workout $term * 2 (we can shift left to do this)
            $term2 = $term << 1;

            // Workout ($term * 2) + 1
            $term2p1 = $term2 + 1;

            // Workout pow($x, $term2p1)
            $termResult = MathTools.wat_math_pow($x, $term2p1);

            // Get the $fractorial for $term2p1
            $fractorial = MathTools.wat_get_fractorial($term2p1);

            // Workout $termResult /= $fractorial
            $termResult /= $fractorial;

            // Workout if $term is odd
            if ($term & 0x01) {
                // Adjust the $result by removing the $termResult
                $result -= $termResult
            } else {
                // Adjust the $result by adding the $termResult
                $result += $termResult
            }
        }

        // Return $result
        return $result;
    }

    /**
     * WAT get_cos code for testing algorithms.
     * @param {Number} $x The angle to get the cos for (in radians).
     * @return {Number} The cos of the given angle.
     */
    static wat_get_cos($x) {
        // Set locals
        let $result;
        let $term;
        let $termResult;
        let $term2;
        let $fractorial;

        // Set $result to 1
        $result = 1.0;

        // Loop for each $term (1 to 9)
        for ($term = 1; $term <= 9; $term++) {
            // Workout $term * 2 (we can shift left to do this)
            $term2 = $term << 1;

            // Workout pow($x, $term2)
            $termResult = MathTools.wat_math_pow($x, $term2);

            // Get the $fractorial for $term2
            $fractorial = MathTools.wat_get_fractorial($term2);

            // Workout $termResult /= $fractorial
            $termResult /= $fractorial;

            // Workout if $term is odd
            if ($term & 0x01) {
                // Adjust the $result by removing the $termResult
                $result -= $termResult
            } else {
                // Adjust the $result by adding the $termResult
                $result += $termResult
            }
        }

        // Return $result
        return $result;
    }
}
