### Table Get Set

Looking at the `table.get` and `table.set` functions. In this example we have a number of functions that perform a simple math function. We then set which of the functions to put into either `tableA` or `tableB`, and then run the functions one after the other to end up with a final running total.

There is a `$tableAllFunctions` table that contains the full list of function references we can pick from. We take the function reference and put it into one of the other tables. This requires us to use `table.get` from `$tableAllFunctions` and then `table.set` into either `tableA` or `tableB`.

The following keywords are looked at in detail.

|Instruction|Details|
|---|---|
|`table.get`|Takes a function reference from the table and puts it on to the stack.|
|`table.set`|Takes a function reference off the stack and sets it in the table.|