## Web Assembly WAT examples and information

This is a collection of WAT code examples and some useful libraries that should help you understand how it all works and encourage you make a start in making something cool for yourself.

If you are using Visual Studio Code then I recommend using the ["WebAssembly"](https://marketplace.visualstudio.com/items?itemName=dtsvet.vscode-wasm) extension. This will highlight WAT file syntax. It can be used to convert a WAT file into WASM, but I do not recommend it.

You will need to download and build the [WABT: WebAssembly Binary Toolkit](https://github.com/WebAssembly/wabt). I did find it tricky to build the applications in Windows, so good luck.

To build WAT files you will need to use the `wat2wasm` tool. When debugging you may want to include the switch command `--debug-names`.

You can debug inside the WASM code but it is limited. You will need to put a break point before you call any WASM function, and step into the function. It is very useful, allowing you to see variable values and the stack.

So far, everything is aimed at NodeJS, but it should all work within any modern browser, with one or two adjustments fetching the WASM file.