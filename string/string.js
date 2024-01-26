/**
 * String test functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class StringTest  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/string.wasm');

        // Create WASM data from buffer
        const wasmData = new Uint8Array(wasmBuffer);

        // Create memory
        this.memory = new WebAssembly.Memory({ initial: 1, maximum: 2 });

        // Set options
        const options = {
            import: {
                memory: this.memory
            }
        }

        // Instantiate the WASM data
        const promise = WebAssembly.instantiate(wasmData, options)
        .then((resultObject) => {
            // Set the module object
            this._module = resultObject.module;

            // Set the instance object
            this._instance = resultObject.instance;
        });

        // Return the promise
        return promise;
    }

    /**
     * Get the length of the null terminating string at the given memory offset.
     * @param {Number} stringOffset Where in the memory does the string start from.
     * @return {Number} The number of characters in the string (not the number of bytes it takes to store them).
     */
    getLength(stringOffset) {
        // Call and return the WASM string_get_length function
        return this._instance.exports.string_get_length(stringOffset);
    }

    /**
     * Get the size of the null terminating string at the given memory offset. Does not include the NULL terminator.
     * @param {Number} stringOffset Where in the memory does the string start from.
     * @return {Number} The number of bytes the string takes update (not the number of characters).
     */
    getSize(stringOffset) {
        // Call and return the WASM string_get_size function
        return this._instance.exports.string_get_size(stringOffset);
    }

    /**
     * Copy a string from one memory location to another.
     * @param {Number} fromStringOffset Where in the memory does the string to be copied start from.
     * @param {Number} toStringOffset Where in the memory will the string be copied to. You have to make sure there
     * is enough memory for the string.
     */
    copy(fromStringOffset, toStringOffset) {
        // Call the WASM string_copy function
        this._instance.exports.string_copy(fromStringOffset, toStringOffset);
    }

    /**
     * Append a string onto the end of another one.
     * @param {Number} stringOffset Where in the memory does the first string start from.
     * @param {Number} appendStringOffset Where in the memory does the string that will be appended on the end start from.
     * @param {Number} toStringOffset Where in the memory will the string two strings be copied/appended to. You have to make
     * sure there is enough memory for the final string.
     */
    append(stringOffset, appendStringOffset, toStringOffset) {
        // Call the WASM string_append function
        this._instance.exports.string_append(stringOffset, appendStringOffset, toStringOffset);
    }

    /**
     * Compare one string to another.
     * @param {Number} string1Offset Where in the memory does string 1 start from.
     * @param {Number} string2Offset Where in the memory does string 2 start from.
     * @return {Number} -1 if string 1 is less than string 2, +1 if string 1 is greater than string 2, otherwise 0 if equal.
     */
    compare(string1Offset, string2Offset) {
        // Call and return the WASM string_compare function
        return this._instance.exports.string_compare(string1Offset, string2Offset);
    }

    /**
     * Get the character within the string at the given index.
     * @param {Number} stringOffset Where in the memory does the string start from.
     * @param {Number} index The index (starting at 0) of the character to get.
     * @return {Number} The number of the character (unicode).
     */
    charAt(stringOffset, index) {
        // Call the WASM string_char_at function
        const utf8CharacterNumber = this._instance.exports.string_char_at(stringOffset, index);

        // If error
        if (utf8CharacterNumber === 0) return '';

        // Convert the UTF-8 into a UTF-16
        const utf16CharacterNumber = this._instance.exports.string_utf8_to_utf16(utf8CharacterNumber);

        // If low part has not value
        if (utf16CharacterNumber[1] === 0) {
            // Convert the character number into a string and return it
            return String.fromCharCode(utf16CharacterNumber[0]);
        } else {
            // Convert the low and high parts into a string and return it
            return String.fromCharCode(utf16CharacterNumber[0], utf16CharacterNumber[1]);
        }
    }

    /**
     * Does the string start with the compare string.
     * @param {Number} stringOffset Where in the memory does string start from.
     * @param {Number} stringCompareOffset Where in the memory does compare string start from.
     * @return {Boolean} True if the string starts with the compare string.
     */
    startsWith(stringOffset, stringCompareOffset) {
        // Call the WASM string_starts_with function
        const result = this._instance.exports.string_starts_with(stringOffset, stringCompareOffset);

        // If result is zero
        if (result === 0) return false;

        // Otherwise true
        return true;
    }

    /**
     * Does the string end with the compare string.
     * @param {Number} stringOffset Where in the memory does string start from.
     * @param {Number} stringCompareOffset Where in the memory does compare string start from.
     * @return {Boolean} True if the string ends with the compare string.
     */
    endsWith(stringOffset, stringCompareOffset) {
        // Call the WASM string_ends_with function
        const result = this._instance.exports.string_ends_with(stringOffset, stringCompareOffset);

        // If result is zero
        if (result === 0) return false;

        // Otherwise true
        return true;
    }

    /**
     * Find the next index that matches the given search string.
     * @param {Number} stringOffset Where in the memory does string start from.
     * @param {Number} searchStringOffset Where in the memory does the search string start from.
     * @param {Number} startFromIndex The index within the string where to start searching from.
     * @return {Number} The index of the next found location, or -1 if not found.
     */
    indexOf(stringOffset, searchStringOffset, startFromIndex) {
        // Call and return the WASM string_index_of function
        return this._instance.exports.string_index_of(stringOffset, searchStringOffset, startFromIndex);
    }

    /**
     * Find the previous index that matches the given search string.
     * @param {Number} stringOffset Where in the memory does string start from.
     * @param {Number} searchStringOffset Where in the memory does the search string start from.
     * @param {Number} startFromIndex The index within the string where to start searching from.
     * @return {Number} The index of the previous found location, or -1 if not found.
     */
    lastIndexOf(stringOffset, searchStringOffset, startFromIndex) {
        // Call and return the WASM string_last_index_of function
        return this._instance.exports.string_last_index_of(stringOffset, searchStringOffset, startFromIndex);
    }

    /**
     * Repeat a string a number of times to create another string.
     * @param {Number} stringToRepeatOffset Where in the memory does string to repeat string from.
     * @param {Number} toStringOffset Where in the memory does the string you want to create start from.
     * @param {Number} count The number of times to repeat the string.
     */
    repeat(stringToRepeatOffset, toStringOffset, count) {
        // Call the WASM string_repeat function
        this._instance.exports.string_repeat(stringToRepeatOffset, toStringOffset, count);
    }

    /**
     * Create a string from the characters within an existing string.
     * @param {Number} fromStringOffset Where in the memory does string to get the substring start from.
     * @param {Number} toStringOffset Where in the memory does the string you want to create start from.
     * @param {Number} indexFrom The index the substring starts from (first character is 0).
     * @param {Number} indexTo The index the substring ends at (not including that character).
     */
    substring(fromStringOffset, toStringOffset, indexFrom, indexTo) {
        // Call the WASM string_substring function
        this._instance.exports.string_substring(fromStringOffset, toStringOffset, indexFrom, indexTo);
    }

    /**
     * Trim any white space from the start of the string and create a new one with the result.
     * @param {Number} fromStringOffset Where in the memory does string start from.
     * @param {Number} toStringOffset Where in the memory does the trimmed string start from.
     */
    trimStart(fromStringOffset, toStringOffset) {
        // Call the WASM string_trim_start function
        this._instance.exports.string_trim_start(fromStringOffset, toStringOffset);
    }

    /**
     * Trim any white space from the end of the string and create a new one with the result.
     * @param {Number} fromStringOffset Where in the memory does string start from.
     * @param {Number} toStringOffset Where in the memory does the trimmed string start from.
     */
    trimEnd(fromStringOffset, toStringOffset) {
        // Call the WASM string_trim_end function
        this._instance.exports.string_trim_end(fromStringOffset, toStringOffset);
    }

    /**
     * Trim any white space from the start and end of the string and create a new one with the result.
     * @param {Number} fromStringOffset Where in the memory does string start from.
     * @param {Number} toStringOffset Where in the memory does the trimmed string start from.
     */
    trim(fromStringOffset, toStringOffset) {
        // Call the WASM string_trim function
        this._instance.exports.string_trim(fromStringOffset, toStringOffset);
    }

    /**
     * Get the next character in the string. This could be a unicode character.
     * @param {Number} stringOffset Where to read the next character.
     * @return {Array} [nextOffset, characterCodePoint]
     */
    getNext(stringOffset) {
        // Call and return the WASM string_get_next function
        return this._instance.exports.string_get_next(stringOffset);
    }
}
