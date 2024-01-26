### String

WASM does not have a number of string functions that are common in other programming languages. Therefore
I have created some of them, which you can use within your own WAT code.

- All strings are in memory. I am using C like null terminating string structure.
- All strings are UTF8 encoded. This means a single character maybe 1, 2, 3, or 4 bytes long.
- All strings are treated as immutable (you can not change them).
- We are assuming there is enough memory for all options. We do not check for the end of the memory page.

All functions are prefixed with "string_". The functions available are as follows

|Instruction|Details|
|---|---|
|`get_length`|Gets the number of characters in the string.|
|`get_size`|Gets the size of the string in bytes. UTF-8 can encode some characters making them either 1, 2, 3 or 4 bytes in size.|
|`copy`|Copy a string to make a new string.|
|`append`|Append one string on to the end of another string, to make a new string.|
|`compare`|Compare one string to another.|
|`char_at`|Gets the UTF-8 value from the index in the string.|
|`starts_with`|Checks to see if a string starts with another string.|
|`ends_with`|Checks to see if a string ends with another string.|
|`index_of`|Search through the string for a match and return the found index.|
|`last_index_of`|Search backwards through the string for a match and return the found index.|
|`repeat`|Create a string by repeating another string a number of times.|
|`substring`|Pick a string from within another string.|
|`trim_start`|Trims all the white space and line terminator characters from the start of the string.|
|`trim_end`|Trims all the white space and line terminator characters from the end of the string.|
|`trim`|Trims all the white space and line terminator characters from both the start and end of the string.|
|`get_next`|Get the next character (code point value) from the string. This is used to move through a string character by character, decoding UTF-8 data along the way.|
|`utf8_to_utf16`|Convert a character formatted as UTF-8 into UTF-16.|
