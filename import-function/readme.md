### Import Functions

Looks at how to import functions from outside WASM (in JavaScript) that can then be called within WASM.

We look at functions that contain a different number of parameters and return values.

The following keywords are looked at in detail.

|Instruction|Details|
|---|---|
|`(import (func))`|Import a function from JavaScript into WASM.|
|`call`|Call the function so that it runs.|
