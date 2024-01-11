### Memory read and write

Looks at reading and writing to memory. There are the following

|Instruction|Details|
|---|---|
|`i32.store`|Stores a 32 bit integer in memory|
|`i32.store16`|Stores the first 16 bits of a 32 bit integer in memory|
|`i32.store8`|Stores the first 8 bits of a 32 bit integer in memory|
|`i32.load`|Loads a 32 bit integer from memory on to the stack|
|`i32.load16_s`|Loads a 16 bit integer from memory, converts it into a 32 bit integer, checking the sign bit, and puts it on to the stack|
|`i32.load16_u`|Loads a 16 bit integer from memory, converts it into a 32 bit integer, and puts it on to the stack|
|`i32.load8_s`|Loads a 8 bit integer from memory, converts it into a 32 bit integer, checking the sign bit, and puts it on to the stack|
|`i32.load8_u`|Loads a 8 bit integer from memory, converts it into a 32 bit integer, and puts it on to the stack|
|`i32.load offset=n`|Loads a 32 bit integer from memory location given, adding a fixed offset (in bytes), and puts it on to the stack|
|`f64.store`|Stores a 64 bit float in memory|
|`f64.load`|Loads a 64 bit float from memory|
|`memory.fill`|Used to set/clear the memory between each test|

There are other type based memory instructions I have not made functions for. These are the following

#### i64
- i64.load
- i64.load8_u, i64.load8_s
- i64.load16_u, i64.load16_s
- i64.load32_u, i64.load32_s
- i64.store
- i64.store8
- i64.store16
- i64.store32

#### f32
- f32.load
- f32.store

