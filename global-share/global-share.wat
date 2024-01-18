;; Global shard example
(module
    ;; Import global share from a WebAssembly.Global object (with mutable = true)
    (import "import" "globalShare" (global $globalShare (mut i32)))

    ;; Get global share
    (func (export "getGlobalShare") (result i32)
        ;; Push result on to stack
        global.get $globalShare
    )

    ;; Set global share
    (func (export "setGlobalShare") (param $value i32)
        ;; Set global
        local.get $value
        global.set $globalShare
    )
)
