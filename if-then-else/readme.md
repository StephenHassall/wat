### if then else end

Looks at how the if...then...else...end instructions work.

#### Notes

```
(func $abs (param $value i32) (result i32)
    ;; Add $value to the stack (the default result value)
    local.get $value

    ;; Check if $value is zero or greater
    local.get $value
    i32.const 0
    i32.ge_s
    if
        ;; The default value on the stack is returned
        return
    end

    ;; Negate the default value off and then back on the stack
    i32.const -1
    i32.mul
)
```

This code looks like it should work. At the start we add the default return result on to the stack, which should be the only stack item remaining when `return` command it called. However, the wat2wasm process creates the following error.

```
error: type mismatch in return, expected [i32] but got []
```

It seems to make no logically sence, but this is not a normal programming language, this is a "S Expression" format of a program. You need to look at the whole `if...end` block on its own, with its own stack input requirements and the outputs that will be put on the stack at the end, irrespective or any `return` commands.
