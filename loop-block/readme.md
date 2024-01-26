### Loop Block

Simple set of examples looking at the loops, blocks and branching.

The following keywords are looked at in detail.

|Instruction|Details|
|---|---|
|`loop`|Branch to the start of a section.|
|`block`|Branch to the end of a section.|
|`br_if`|Only branch if the last stack value is not zero.|
|`br_table`|Branch to a different section depending on the last stack value.|

The `br_table` sounds like it has something to do with the `(table...)` system, but it does not. It is away of branching to either the start of a `loop` or the end of a `block` depending on a value.