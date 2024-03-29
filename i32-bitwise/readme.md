### i32 Bitwise

Looks at how the i32 bitwise instructions work. There are the following

|Instruction|Details|
|---|---|
|`i32.and`|AND operation between $first and $second (result = $first & $second)|
|`i32.or`|OR operation between $first and $second (result = $first | $second)|
|`i32.xor`|XOR operation between $first and $second (result = $first ^ $second)|
|`i32.shl`|Bit shift left operation of the $number $by the given amount (result = $number << $by)|
|`i32.shr_s` `i32.shr_u`|Bit shift right operation of the $number $by the given amount (result = $number >> $by)|
|`i32.rotl`|Bit rotate left operation of the $number $by the given amount|
|`i32.rotr`|Bit rotate right operation of the $number $by the given amount|
|`i32.clz`|Counts the number of 0 bits at the upper end of the binary $number|
|`i32.ctz`|Counts the number of 0 bits at the lower of the binary $number|
|`i32.popcnt`|Counts the number of 1 bits in the binary $number|

When shifting bits to the right you can use signed or unsigned. For unsigned, the new bit at the upper end of the binary number
is always a 0. For signed, if the number was negative to start with, the new bit will be a 1, otherwise it will be a 0.
