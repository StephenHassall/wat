### Select

The `select` instruction is used to choose between two values.

```
;; Add value 1 to the stack
i32.const 42

;; Add value 2 to the stack
i32.const 101

;; Add control to the stack
i32.const 1

;; Select between the two value depending on the control value
select

;; Because control was not zero, the stack contains value 1 (42)
```

You can use any type for the two values (`i32`, `i64`, `f32` and `f64`), but they both have to be the same. The control must be an `i32`.