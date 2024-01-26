;; Select instruction
(module
    ;; Select function
    (func (export "selectInteger") (param $value1 i32) (param $value2 i32) (param $control i32) (result i32)
        ;; Push values on to the stack
        local.get $value1
        local.get $value2

        ;; Push the control value
        local.get $control

        ;; Pop the $value1, $value2 and $control off the stack. If $control is not zero then push $value1 on to the stack
        ;; otherwise push $value2
        select

        ;; The last item on the stack is the return value, which is the result of the select instruction
    )

    ;; Select function
    (func (export "selectFloat") (param $value1 f64) (param $value2 f64) (param $control i32) (result f64)
        ;; Push values on to the stack
        local.get $value1
        local.get $value2

        ;; Push the control value
        local.get $control

        ;; Pop the $value1, $value2 and $control off the stack. If $control is not zero then push $value1 on to the stack
        ;; otherwise push $value2
        select

        ;; The last item on the stack is the return value, which is the result of the select instruction
    )
)
