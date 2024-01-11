### i32 Math

Looks at how the i32 math instructions work. There are the following

|Instruction|Details|
|---|---|
|`i32.add`|Adds $first and $second together (result = $first + $second)|
|`i32.sub`|Subtracts the $second from the $first (result = $first - $second)|
|`i32.mul`|Multiplies $first and $second together (result = $first * $second)|
|`i32.div_s` `i32.div_u`|Divides the $first by the $second (result = $first / $second)|
|`i32.rem_s` `i32.rem_u`|Calculates the remainder of the division of the $first by the $second (result = $first % $second)|

The _s and _u parts mean signed or unsigned. Integers are 32 bits, with the most significant bit (the one with the largest value) being used to state if the value is negative or not. A signed 32bit integer has a range of values from -2147483648 to +2147483647. An unsigned number has a range of values 0 to +4294967295. This does mean that, if you pass the value -1 to an unsigned compare instruction, then it will see it as 0xFFFFFFFF, the largest unsiged integer value. Therefore becareful around signed and unsigned numbers.