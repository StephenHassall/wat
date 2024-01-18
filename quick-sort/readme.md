### Quick Sort

WASM does not have a sort function that is common in other programming languages. Therefore
I have created a quick sort function, which you can use within your own WAT code.

All you need to do is copy the parts you need, set the list of items in memory, then call `quick_sort` to order it in whatever order you want. You need to give it a compare callback function. You are responsable for comparing the items using your own `$quickSortCompareCallbackType` compare function.