### i32 Compare

Looks at how the i32 compare instructions work. There are the following

|Instruction|Details|
|---|---|
|`i32.eqz`|Is $number equal to zero ($number === 0)|
|`i32.eq`|Is $first equal $second ($first === $second)|
|`i32.ne`|Is $first not equal $second ($first !== $second)|
|`i32.gt_s` `i32.gt_u`|Is $first greater than $second ($first > $second)|
|`i32.ge_s` `i32.ge_u`|Is $first greater than or equal to $second ($first >= $second)|
|`i32.lt_s` `i32.lt_u`|Is $first less than $second ($first < $second)|
|`i32.le_s` `i32.le_u`|Is $first less than or equal to $second ($first <= $second)|

The _s and _u parts mean signed or unsigned. Integers are 32 bits, with the most significant bit (the one with the largest value) being used to state if the value is negative or not. A signed 32bit integer has a range of values from -2147483648 to +2147483647. An unsigned number has a range of values 0 to +4294967295. This does mean that, if you pass the value -1 to an unsigned compare instruction, then it will see it as 0xFFFFFFFF, the largest unsiged integer value. Therefore becareful around signed and unsigned numbers.