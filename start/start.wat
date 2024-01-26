;; Start instructions
(module
    ;; Import console.log function
    (import "import" "consoleLogStart" (func $consoleLogStart))

    ;; This is a normal function with no parameters and no result.
    ;; It will be called after the WASM initialization has finished. Everything should
    ;; be available, globals, memory, exports, tables and so on.
    ;; Use this function to set things up before the outside JavaScript starts calling any
    ;; of its functions. Or, this could be the starting point of the whole WASM application.
    (func $someFunction
        ;; We can do anything, but for now, just call the outside export function
        call $consoleLogStart
    )

    ;; Tell WASM what function should be called at start up
    (start $someFunction)
)
