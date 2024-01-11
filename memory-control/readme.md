### Memory control

Looks at different memory instructions and how passive memory can be used to store constant global memory blocks.

|Instruction|Details|
|---|---|
|`memory.init`|Used to copy passive data into the main memory|
|`memory.fill`|Used to fill an area of main memory to a given value (only the first 8bits are used)|
|`memory.copy`|Used to copy a block of main memory from one location to another|
|`memory.size`|Returns the number of pages the main memory contains|
|`memory.grow`|Increases the size of the main memory by the given number of pages (each page is 64Kb in size)|

