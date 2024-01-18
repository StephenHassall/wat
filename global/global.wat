;; Global instructions
(module
    ;; Import global from a literal
    (import "import" "globalFromLiteral" (global $importGlobalFromLiteral i32))

    ;; Import global from a WebAssembly.Global object (with mutable = true)
    (import "import" "globalMutableTrue" (global $importGlobalMutableTrue (mut i32)))

    ;; Import global from a WebAssembly.Global object (with mutable = false)
    (import "import" "globalMutableFalse" (global $importGlobalMutableFalse i32))

    ;; Internal global (with mut, can be changed)
    (global $internalGlobalMutableTrue (mut i32) (i32.const 101))

    ;; Internal global (with no mut, can not be changed)
    (global $internalGlobalMutableFalse i32 (i32.const 42))

    ;; Get import global from literal
    (func (export "getImportGlobalFromLiteral") (result i32)
        ;; Push result on to stack
        global.get $importGlobalFromLiteral
    )

    ;; Get import global mutable true
    (func (export "getImportGlobalMutableTrue") (result i32)
        ;; Push result on to stack
        global.get $importGlobalMutableTrue
    )

    ;; Set import global mutable true
    (func (export "setImportGlobalMutableTrue") (param $value i32)
        ;; Set global
        local.get $value
        global.set $importGlobalMutableTrue
    )

    ;; Get import global mutable false
    (func (export "getImportGlobalMutableFalse") (result i32)
        ;; Push result on to stack
        global.get $importGlobalMutableFalse
    )

    ;; Get internal global mutable true
    (func (export "getInternalGlobalMutableTrue") (result i32)
        ;; Push result on to stack
        global.get $internalGlobalMutableTrue
    )

    ;; Set internal global mutable true
    (func (export "setInternalGlobalMutableTrue") (param $value i32)
        ;; Set global
        local.get $value
        global.set $internalGlobalMutableTrue
    )

    ;; Get internal global mutable false
    (func (export "getInternalGlobalMutableFalse") (result i32)
        ;; Push result on to stack
        global.get $internalGlobalMutableFalse
    )
)
