;; Vector 2D object.
(module
    ;; Declare and set $x and $y parts of vector
    (global $x (mut f64) (f64.const 0))
    (global $y (mut f64) (f64.const 0))

    ;; Get $x
    (func (export "get_x") (result f64)
        ;; Push global $x part on to the stack to return its value
        global.get $x
    )

    ;; Set $x
    (func (export "set_x") (param $value f64)
        ;; Copy $value into global $x
        local.get $value
        global.set $x
    )

    ;; Get $y
    (func (export "get_y") (result f64)
        ;; Push global $y part on to the stack to return its value
        global.get $y
    )

    ;; Set $y
    (func (export "set_y") (param $value f64)
        ;; Copy $value into global $y
        local.get $value
        global.set $y
    )

    ;; Rotate
    (func (export "rotate") (param $sinRadians f64) (param $cosRadians f64)
        ;; Set local variables
        (local $newX f64)
        (local $newY f64)

        ;; Workout newX = ($x * $cosRadians) - ($y * $sinRadians)
        global.get $x
        local.get $cosRadians
        f64.mul

        global.get $y
        local.get $sinRadians
        f64.mul

        f64.sub
        local.set $newX

        ;; Workout newY = ($x * $sinRadians) + ($y * $cosRadians);
        global.get $x
        local.get $sinRadians
        f64.mul

        global.get $y
        local.get $cosRadians
        f64.mul

        f64.add
        local.set $newY

        ;; Set new X/Y points
        local.get $newX
        global.set $x
        local.get $newY
        global.set $y
    )

    ;; Scale
    (func (export "scale") (param $scalar f64)
        ;; Scale the X part
        global.get $x
        local.get $scalar
        f64.mul
        global.set $x

        ;; Scale the Y part
        global.get $y
        local.get $scalar
        f64.mul
        global.set $y
    )

    ;; Translate
    (func (export "translate") (param $dx f64) (param $dy f64)
        ;; Translate the X part
        global.get $x
        local.get $dx
        f64.add
        global.set $x

        ;; Translate the Y part
        global.get $y
        local.get $dy
        f64.add
        global.set $y
    )
)
