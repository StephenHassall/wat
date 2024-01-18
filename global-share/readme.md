### Global Shared

Looking at how a WebAssembly.Global object can be shared with multiple instances of the same WASM, and it the
value is changed in one instance, it is changed within them all (and in the outside WebAssembly.Global object).