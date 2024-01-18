### Table Callback

Looks at how it is possible to use function references as callback functions. In this example we have a bubble sort function that takes a function reference, which can be either `$compareByte` or `$compareFloat64`.

It also checks if the function reference is `NULL`.

The following keywords are looked at in detail.

|Instruction|Details|
|---|---|
|`ref.func`|Gets a reference of a function.|
|`ref.is_null`|Looks to see if the function reference on the stack is `NULL`.|
|`ref.null func`|Adds a `NULL` function reference on to the stack.|
