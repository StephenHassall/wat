### Reverse String

Takes some text and reverses the characters so that the string is backwards. The text "Hello World" because "dlroW olleH".

This example shows how to give your WAT code a string, process it, and give it back.

**Notes:**

1. We does not know how long the string will be, so we start off is a single page of memory (64KiB). We then check the length of the string, and grow the memory if required.

2. In memory the string is UTF-8 (1 byte per character).

3. In memory the string is also NULL terminated, so we need to make sure there is enough memory for not just the text, but also for an extra NULL byte on the end.

4. As the resulting string will be the same size, we do not need to return the length of the text.
