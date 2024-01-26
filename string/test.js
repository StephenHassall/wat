/**
 * String tests.
 */
import StringTest from "./string.js";
import StringMemory from "../string-memory.js";
import MemoryDump from "../memory-dump.js";

export default class StringRunTest  {
    /**
     * Test getLength and getSize to make sure UTF-8 encoding works.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testUnicodeEncoding(stringTest) {
        // Set string memory offset
        const stringMemoryOffset = 4;

        // Test 1 (non-unicode)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        let length = stringTest.getLength(stringMemoryOffset);
        if (length !== 11) { console.log('Unicode failed 1'); return; }
        let size = stringTest.getSize(stringMemoryOffset);
        if (size !== 11) { console.log('Unicode failed 2'); return; }

        // Test 2 (2 byte unicode) § = 0xC2A7
        StringMemory.transferStringToMemory('a § b', stringTest.memory, stringMemoryOffset);
        length = stringTest.getLength(stringMemoryOffset);
        if (length !== 5) { console.log('Unicode failed 3'); return; }
        size = stringTest.getSize(stringMemoryOffset);
        if (size !== 6) { console.log('Unicode failed 4'); return; }

        // Test 3 (3 byte unicode) ॳ = 0xE0A5B3
        StringMemory.transferStringToMemory('a ॳ b', stringTest.memory, stringMemoryOffset);
        length = stringTest.getLength(stringMemoryOffset);
        if (length !== 5) { console.log('Unicode failed 5'); return; }
        size = stringTest.getSize(stringMemoryOffset);
        if (size !== 7) { console.log('Unicode failed 6'); return; }

        // Test 4 (4 byte unicode) 𒀀 = 0xF0928080
        StringMemory.transferStringToMemory('a 𒀀 b', stringTest.memory, stringMemoryOffset);
        length = stringTest.getLength(stringMemoryOffset);
        if (length !== 5) { console.log('Unicode failed 7'); return; }
        size = stringTest.getSize(stringMemoryOffset);
        if (size !== 8) { console.log('Unicode failed 8'); return; }

        // Test 5 (empty)
        StringMemory.transferStringToMemory('', stringTest.memory, stringMemoryOffset);
        length = stringTest.getLength(stringMemoryOffset);
        if (length !== 0) { console.log('Unicode failed 9'); return; }
        size = stringTest.getSize(stringMemoryOffset);
        if (size !== 0) { console.log('Unicode failed 10'); return; }

        // Log all passed
        console.log('Unicode encoding passed');
    }

    /**
     * Test copy function.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testCopy(stringTest) {
        // Set from string memory offset
        const fromStringMemoryOffset = 4;

        // Test 1 (normal text)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, fromStringMemoryOffset);
        let copyToStringOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;
        stringTest.copy(fromStringMemoryOffset, copyToStringOffset);
        let size = stringTest.getSize(copyToStringOffset);
        let resultString = StringMemory.transferMemoryToString(stringTest.memory, copyToStringOffset, size);
        if (resultString !== 'hello world') { console.log('Copy failed 1'); return; }
        
        // Test 2 (unicode text)
        StringMemory.transferStringToMemory('a § b', stringTest.memory, fromStringMemoryOffset);
        copyToStringOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;
        stringTest.copy(fromStringMemoryOffset, copyToStringOffset);
        size = stringTest.getSize(copyToStringOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, copyToStringOffset, size);
        if (resultString !== 'a § b') { console.log('Copy failed 2'); return; }

        // Test 3 (normal text null ends)
        StringMemory.transferStringToMemory('hello world hello world hello world', stringTest.memory, fromStringMemoryOffset);
        StringMemory.transferStringToMemory('hello world', stringTest.memory, fromStringMemoryOffset);
        copyToStringOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;
        stringTest.copy(fromStringMemoryOffset, copyToStringOffset);
        size = stringTest.getSize(copyToStringOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, copyToStringOffset, size);
        if (resultString !== 'hello world') { console.log('Copy failed 3'); return; }

        // Log all passed
        console.log('Copy passed');
    }

    /**
     * Test append function.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testAppend(stringTest) {
        // Set string memory offset
        let stringMemoryOffset1 = 4;
        let stringMemoryOffset2 = -1;
        let stringMemoryOffset3 = -1;

        // Test 1 (normal text)
        StringMemory.transferStringToMemory('hello', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory(' world', stringTest.memory, stringMemoryOffset2);
        stringMemoryOffset3 = stringMemoryOffset2 + stringTest.getSize(stringMemoryOffset2) + 1;

        stringTest.append(stringMemoryOffset1, stringMemoryOffset2, stringMemoryOffset3);

        let size = stringTest.getSize(stringMemoryOffset3);
        let resultString = StringMemory.transferMemoryToString(stringTest.memory, stringMemoryOffset3, size);
        if (resultString !== 'hello world') { console.log('Append failed 1'); return; }

        // Test 2 (unicode text)
        StringMemory.transferStringToMemory('a § b', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('c 𒀀 d', stringTest.memory, stringMemoryOffset2);
        stringMemoryOffset3 = stringMemoryOffset2 + stringTest.getSize(stringMemoryOffset2) + 1;

        stringTest.append(stringMemoryOffset1, stringMemoryOffset2, stringMemoryOffset3);

        size = stringTest.getSize(stringMemoryOffset3);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, stringMemoryOffset3, size);
        if (resultString !== 'a § bc 𒀀 d') { console.log('Append failed 2'); return; }

        // Test 3 (normal text null ends)
        StringMemory.transferStringToMemory('hello world hello world hello world', stringTest.memory, stringMemoryOffset1);
        StringMemory.transferStringToMemory('hello', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('world', stringTest.memory, stringMemoryOffset2);
        stringMemoryOffset3 = stringMemoryOffset2 + stringTest.getSize(stringMemoryOffset2) + 1;

        stringTest.append(stringMemoryOffset1, stringMemoryOffset2, stringMemoryOffset3);

        size = stringTest.getSize(stringMemoryOffset3);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, stringMemoryOffset3, size);
        if (resultString !== 'helloworld') { console.log('Append failed 3'); return; }
        
        // Log all passed
        console.log('Append passed');
    }

    /**
     * Test compare function.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testCompare(stringTest) {
        // Set string memory offset
        let stringMemoryOffset1 = 4;
        let stringMemoryOffset2 = -1;

        // Test 1 (normal text same)
        StringMemory.transferStringToMemory('hello', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, stringMemoryOffset2);

        let result = stringTest.compare(stringMemoryOffset1, stringMemoryOffset2);
        if (result !== 0) { console.log('Compare failed 1'); return; }

        // Test 2 (normal text same length but less than)
        StringMemory.transferStringToMemory('hello', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('hellz', stringTest.memory, stringMemoryOffset2);

        result = stringTest.compare(stringMemoryOffset1, stringMemoryOffset2);
        if (result !== -1) { console.log('Compare failed 2'); return; }

        // Test 3 (normal text same length but greater than)
        StringMemory.transferStringToMemory('hellz', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, stringMemoryOffset2);

        result = stringTest.compare(stringMemoryOffset1, stringMemoryOffset2);
        if (result !== 1) { console.log('Compare failed 3'); return; }

        // Test 4 (normal text less length)
        StringMemory.transferStringToMemory('hell', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, stringMemoryOffset2);

        result = stringTest.compare(stringMemoryOffset1, stringMemoryOffset2);
        if (result !== -1) { console.log('Compare failed 4'); return; }

        // Test 5 (normal text greater length)
        StringMemory.transferStringToMemory('helloWorld', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, stringMemoryOffset2);

        result = stringTest.compare(stringMemoryOffset1, stringMemoryOffset2);
        if (result !== 1) { console.log('Compare failed 5'); return; }

        // Test 6 (unicode, same 2 byte, less, ¤ < ¥)
        StringMemory.transferStringToMemory('¤', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('¥', stringTest.memory, stringMemoryOffset2);

        result = stringTest.compare(stringMemoryOffset1, stringMemoryOffset2);
        if (result !== -1) { console.log('Compare failed 6'); return; }

        // Test 7 (unicode, same 3 byte, less, आ < इ)
        StringMemory.transferStringToMemory('आ', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('इ', stringTest.memory, stringMemoryOffset2);

        result = stringTest.compare(stringMemoryOffset1, stringMemoryOffset2);
        if (result !== -1) { console.log('Compare failed 7'); return; }

        // Test 8 (unicode, same 4 byte, less, 𒀊 < 𒀋)
        StringMemory.transferStringToMemory('𒀊', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('𒀋', stringTest.memory, stringMemoryOffset2);

        result = stringTest.compare(stringMemoryOffset1, stringMemoryOffset2);
        if (result !== -1) { console.log('Compare failed 8'); return; }

        // Test 9 (unicode, 1 byte < 2 byte)
        StringMemory.transferStringToMemory('a', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('¤', stringTest.memory, stringMemoryOffset2);

        result = stringTest.compare(stringMemoryOffset1, stringMemoryOffset2);
        if (result !== -1) { console.log('Compare failed 9'); return; }

        // Test 10 (unicode, 1 byte < 3 byte)
        StringMemory.transferStringToMemory('a', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('आ', stringTest.memory, stringMemoryOffset2);

        result = stringTest.compare(stringMemoryOffset1, stringMemoryOffset2);
        if (result !== -1) { console.log('Compare failed 10'); return; }

        // Test 11 (unicode, 2 byte < 3 byte)
        StringMemory.transferStringToMemory('¤', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('आ', stringTest.memory, stringMemoryOffset2);

        result = stringTest.compare(stringMemoryOffset1, stringMemoryOffset2);
        if (result !== -1) { console.log('Compare failed 11'); return; }

        // Test 12 (unicode, 1 byte < 4 byte)
        StringMemory.transferStringToMemory('1', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('𒀊', stringTest.memory, stringMemoryOffset2);

        result = stringTest.compare(stringMemoryOffset1, stringMemoryOffset2);
        if (result !== -1) { console.log('Compare failed 12'); return; }

        // Test 13 (unicode, 2 byte < 4 byte)
        StringMemory.transferStringToMemory('¤', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('𒀊', stringTest.memory, stringMemoryOffset2);

        result = stringTest.compare(stringMemoryOffset1, stringMemoryOffset2);
        if (result !== -1) { console.log('Compare failed 13'); return; }
        
        // Test 14 (unicode, 3 byte < 4 byte)
        StringMemory.transferStringToMemory('आ', stringTest.memory, stringMemoryOffset1);
        stringMemoryOffset2 = stringMemoryOffset1 + stringTest.getSize(stringMemoryOffset1) + 1;
        StringMemory.transferStringToMemory('𒀊', stringTest.memory, stringMemoryOffset2);

        result = stringTest.compare(stringMemoryOffset1, stringMemoryOffset2);
        if (result !== -1) { console.log('Compare failed 14'); return; }

        // Log all passed
        console.log('Compare passed');
    }

    /**
     * Test char at function.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testCharAt(stringTest) {
        // Set string memory offset
        let stringMemoryOffset = 4;

        // Test 1 (normal text)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        let resultString = stringTest.charAt(stringMemoryOffset, 0);
        if (resultString !== 'h') { console.log('CharAt failed 1'); return; }

        // Test 2 (normal text out of range)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        resultString = stringTest.charAt(stringMemoryOffset, 100);
        if (resultString !== '') { console.log('CharAt failed 2'); return; }

        // Test 3 (normal text last character)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        resultString = stringTest.charAt(stringMemoryOffset, 10);
        if (resultString !== 'd') { console.log('CharAt failed 3'); return; }

        // Test 4 (unicode 2 byte text first character)
        StringMemory.transferStringToMemory('¤hello world', stringTest.memory, stringMemoryOffset);
        resultString = stringTest.charAt(stringMemoryOffset, 0);
        if (resultString !== '¤') { console.log('CharAt failed 4'); return; }

        // Test 5 (unicode 2 byte text last character)
        StringMemory.transferStringToMemory('hello world¤', stringTest.memory, stringMemoryOffset);
        resultString = stringTest.charAt(stringMemoryOffset, 11);
        if (resultString !== '¤') { console.log('CharAt failed 5'); return; }

        // Test 6 (unicode 3 byte text first character)
        StringMemory.transferStringToMemory('आhello world', stringTest.memory, stringMemoryOffset);
        resultString = stringTest.charAt(stringMemoryOffset, 0);
        if (resultString !== 'आ') { console.log('CharAt failed 6'); return; }

        // Test 7 (unicode 3 byte text last character)
        StringMemory.transferStringToMemory('hello worldआ', stringTest.memory, stringMemoryOffset);
        resultString = stringTest.charAt(stringMemoryOffset, 11);
        if (resultString !== 'आ') { console.log('CharAt failed 7'); return; }

        // Test 8 (unicode 4 byte text first character)
        StringMemory.transferStringToMemory('𒀊hello world', stringTest.memory, stringMemoryOffset);
        resultString = stringTest.charAt(stringMemoryOffset, 0);
        if (resultString !== '𒀊') { console.log('CharAt failed 8'); return; }

        // Test 9 (unicode 4 byte text last character)
        StringMemory.transferStringToMemory('hello world𒀊', stringTest.memory, stringMemoryOffset);
        resultString = stringTest.charAt(stringMemoryOffset, 11);
        if (resultString !== '𒀊') { console.log('CharAt failed 9'); return; }

        // Test 10 (unicode text last character)
        StringMemory.transferStringToMemory('a¤आ𒀊e', stringTest.memory, stringMemoryOffset);
        resultString = stringTest.charAt(stringMemoryOffset, 4);
        if (resultString !== 'e') { console.log('CharAt failed 10'); return; }

        // Log all passed
        console.log('CharAt passed');
    }

    /**
     * Test starts with function.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testStartsWith(stringTest) {
        // Set string memory offset
        let stringMemoryOffset = 4;
        let compareMemoryOffset = -1;

        // Test 1 (normal text same)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        compareMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, compareMemoryOffset);

        let result = stringTest.startsWith(stringMemoryOffset, compareMemoryOffset);
        if (result !== true) { console.log('StartsWith failed 1'); return; }

        // Test 2 (normal text not the same)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        compareMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('world', stringTest.memory, compareMemoryOffset);

        result = stringTest.startsWith(stringMemoryOffset, compareMemoryOffset);
        if (result !== false) { console.log('StartsWith failed 2'); return; }

        // Test 3 (normal text too long)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        compareMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hello world123', stringTest.memory, compareMemoryOffset);

        result = stringTest.startsWith(stringMemoryOffset, compareMemoryOffset);
        if (result !== false) { console.log('StartsWith failed 3'); return; }

        // Test 4 (unicode text same)
        StringMemory.transferStringToMemory('¤आ𒀊hello world', stringTest.memory, stringMemoryOffset);
        compareMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('¤आ𒀊hello', stringTest.memory, compareMemoryOffset);

        result = stringTest.startsWith(stringMemoryOffset, compareMemoryOffset);
        if (result !== true) { console.log('StartsWith failed 4'); return; }

        // Test 5 (normal text both same)
        StringMemory.transferStringToMemory('hello', stringTest.memory, stringMemoryOffset);
        compareMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, compareMemoryOffset);

        result = stringTest.startsWith(stringMemoryOffset, compareMemoryOffset);
        if (result !== true) { console.log('StartsWith failed 5'); return; }

        // Test 6 (normal text almost but not the same)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        compareMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hellx wo', stringTest.memory, compareMemoryOffset);

        result = stringTest.startsWith(stringMemoryOffset, compareMemoryOffset);
        if (result !== false) { console.log('StartsWith failed 6'); return; }

        // Test 7 (normal text empty)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        compareMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('', stringTest.memory, compareMemoryOffset);

        result = stringTest.startsWith(stringMemoryOffset, compareMemoryOffset);
        if (result !== true) { console.log('StartsWith failed 7'); return; }

        // Log all passed
        console.log('StartsWith passed');
    }

    /**
     * Test ends with function.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testEndsWith(stringTest) {
        // Set string memory offset
        let stringMemoryOffset = 4;
        let compareMemoryOffset = -1;

        // Test 1 (normal text same)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        compareMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('world', stringTest.memory, compareMemoryOffset);

        let result = stringTest.endsWith(stringMemoryOffset, compareMemoryOffset);
        if (result !== true) { console.log('EndsWith failed 1'); return; }

        // Test 2 (normal text not the same)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        compareMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, compareMemoryOffset);

        result = stringTest.endsWith(stringMemoryOffset, compareMemoryOffset);
        if (result !== false) { console.log('EndsWith failed 2'); return; }

        // Test 3 (normal text almost but not the same)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        compareMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('lo xorld', stringTest.memory, compareMemoryOffset);

        result = stringTest.endsWith(stringMemoryOffset, compareMemoryOffset);
        if (result !== false) { console.log('EndsWith failed 3'); return; }

        // Test 4 (normal text too long)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        compareMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('too long hello world', stringTest.memory, compareMemoryOffset);

        result = stringTest.endsWith(stringMemoryOffset, compareMemoryOffset);
        if (result !== false) { console.log('EndsWith failed 4'); return; }

        // Test 5 (normal text empty)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        compareMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('', stringTest.memory, compareMemoryOffset);

        result = stringTest.endsWith(stringMemoryOffset, compareMemoryOffset);
        if (result !== true) { console.log('EndsWith failed 5'); return; }

        // Test 6 (unicode text same)
        StringMemory.transferStringToMemory('hello world¤आ𒀊', stringTest.memory, stringMemoryOffset);
        compareMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('d¤आ𒀊', stringTest.memory, compareMemoryOffset);

        result = stringTest.endsWith(stringMemoryOffset, compareMemoryOffset);
        if (result !== true) { console.log('EndsWith failed 6'); return; }

        // Test 6 (unicode text not same)
        StringMemory.transferStringToMemory('hello world¤आ𒀊', stringTest.memory, stringMemoryOffset);
        compareMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('X¤आ𒀊', stringTest.memory, compareMemoryOffset);

        result = stringTest.endsWith(stringMemoryOffset, compareMemoryOffset);
        if (result !== false) { console.log('EndsWith failed 7'); return; }

        // Log all passed
        console.log('EndsWith passed');
    }

    /**
     * Test index of function.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testIndexOf(stringTest) {
        // Set string memory offset
        let stringMemoryOffset = 4;
        let searchMemoryOffset = -1;

        // Test 1 (normal text first match)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, searchMemoryOffset);

        let result = stringTest.indexOf(stringMemoryOffset, searchMemoryOffset, 0);
        if (result !== 0) { console.log('IndexOf failed 1'); return; }

        // Test 2 (normal text index 1)
        StringMemory.transferStringToMemory('+hello world', stringTest.memory, stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, searchMemoryOffset);

        result = stringTest.indexOf(stringMemoryOffset, searchMemoryOffset, 0);
        if (result !== 1) { console.log('IndexOf failed 2'); return; }

        // Test 3 (normal text index 3)
        StringMemory.transferStringToMemory('012hello world', stringTest.memory, stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, searchMemoryOffset);

        result = stringTest.indexOf(stringMemoryOffset, searchMemoryOffset, 0);
        if (result !== 3) { console.log('IndexOf failed 3'); return; }

        // Test 4 (normal text missing)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('abc', stringTest.memory, searchMemoryOffset);

        result = stringTest.indexOf(stringMemoryOffset, searchMemoryOffset, 0);
        if (result !== -1) { console.log('IndexOf failed 4'); return; }

        // Test 5 (normal text from index 1)
        StringMemory.transferStringToMemory('hello hello', stringTest.memory, stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, searchMemoryOffset);

        result = stringTest.indexOf(stringMemoryOffset, searchMemoryOffset, 1);
        if (result !== 6) { console.log('IndexOf failed 5'); return; }

        // Test 6 (normal text from index 100)
        StringMemory.transferStringToMemory('hello hello', stringTest.memory, stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, searchMemoryOffset);

        result = stringTest.indexOf(stringMemoryOffset, searchMemoryOffset, 100);
        if (result !== -1) { console.log('IndexOf failed 6'); return; }

        // Test 7 (unicode text)
        StringMemory.transferStringToMemory('abc¤आ𒀊def¤आ𒀊ghi', stringTest.memory, stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('¤आ𒀊', stringTest.memory, searchMemoryOffset);

        result = stringTest.indexOf(stringMemoryOffset, searchMemoryOffset, 4);
        if (result !== 9) { console.log('IndexOf failed 7'); return; }

        // Test 8 (normal text too large)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hello world 123', stringTest.memory, searchMemoryOffset);

        result = stringTest.indexOf(stringMemoryOffset, searchMemoryOffset, 0);
        if (result !== -1) { console.log('IndexOf failed 8'); return; }

        // Test 9 (normal text empty)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('', stringTest.memory, searchMemoryOffset);

        result = stringTest.indexOf(stringMemoryOffset, searchMemoryOffset, 0);
        if (result !== 0) { console.log('IndexOf failed 9'); return; }

        // Test 10 (normal text last word)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('world', stringTest.memory, searchMemoryOffset);

        result = stringTest.indexOf(stringMemoryOffset, searchMemoryOffset, 0);
        if (result !== 6) { console.log('IndexOf failed 10'); return; }

        // Test 11 (unicode text last word)
        StringMemory.transferStringToMemory('hello ¤आ𒀊', stringTest.memory, stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('¤आ𒀊', stringTest.memory, searchMemoryOffset);

        result = stringTest.indexOf(stringMemoryOffset, searchMemoryOffset, 0);
        if (result !== 6) { console.log('IndexOf failed 11'); return; }

        // Test 12 (normal text almost then match)
        StringMemory.transferStringToMemory('hellhello world', stringTest.memory, stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, searchMemoryOffset);

        result = stringTest.indexOf(stringMemoryOffset, searchMemoryOffset, 0);
        if (result !== 4) { console.log('IndexOf failed 12'); return; }

        // Log all passed
        console.log('IndexOf passed');
    }

    /**
     * Test last index of function.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testLastIndexOf(stringTest) {
        // Set string memory offset
        let stringMemoryOffset = 4;
        let searchMemoryOffset = -1;
        let stringLength = -1;

        // Test 1 (normal text first match)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        stringLength = stringTest.getLength(stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('world', stringTest.memory, searchMemoryOffset);

        let result = stringTest.lastIndexOf(stringMemoryOffset, searchMemoryOffset, stringLength - 1);
        if (result !== 6) { console.log('LastIndexOf failed 1'); return; }

        // Test 2 (normal text -1)
        StringMemory.transferStringToMemory('hello world+', stringTest.memory, stringMemoryOffset);
        stringLength = stringTest.getLength(stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('world', stringTest.memory, searchMemoryOffset);

        result = stringTest.lastIndexOf(stringMemoryOffset, searchMemoryOffset, stringLength - 1);
        if (result !== 6) { console.log('LastIndexOf failed 2'); return; }

        // Test 3 (normal text -3)
        StringMemory.transferStringToMemory('hello world123', stringTest.memory, stringMemoryOffset);
        stringLength = stringTest.getLength(stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('world', stringTest.memory, searchMemoryOffset);

        result = stringTest.lastIndexOf(stringMemoryOffset, searchMemoryOffset, stringLength - 1);
        if (result !== 6) { console.log('LastIndexOf failed 3'); return; }

        // Test 4 (normal text missing)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        stringLength = stringTest.getLength(stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('abc', stringTest.memory, searchMemoryOffset);

        result = stringTest.lastIndexOf(stringMemoryOffset, searchMemoryOffset, stringLength - 1);
        if (result !== -1) { console.log('LastIndexOf failed 4'); return; }

        // Test 5 (normal text index - 2)
        StringMemory.transferStringToMemory('world world', stringTest.memory, stringMemoryOffset);
        stringLength = stringTest.getLength(stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('world', stringTest.memory, searchMemoryOffset);

        result = stringTest.lastIndexOf(stringMemoryOffset, searchMemoryOffset, stringLength - 2);
        if (result !== 6) { console.log('LastIndexOf failed 5'); return; }

        // Test 6 (normal text index 100)
        StringMemory.transferStringToMemory('hello hello', stringTest.memory, stringMemoryOffset);
        stringLength = stringTest.getLength(stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, searchMemoryOffset);

        result = stringTest.lastIndexOf(stringMemoryOffset, searchMemoryOffset, 100);
        if (result !== -1) { console.log('LastIndexOf failed 6'); return; }

        // Test 7 (unicode text)
        StringMemory.transferStringToMemory('abc¤आ𒀊def¤आ𒀊ghi', stringTest.memory, stringMemoryOffset);
        stringLength = stringTest.getLength(stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('¤आ𒀊', stringTest.memory, searchMemoryOffset);

        result = stringTest.lastIndexOf(stringMemoryOffset, searchMemoryOffset, stringLength - 1);
        if (result !== 9) { console.log('LastIndexOf failed 7'); return; }

        // Test 8 (normal text too large)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        stringLength = stringTest.getLength(stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hello world 123', stringTest.memory, searchMemoryOffset);

        result = stringTest.lastIndexOf(stringMemoryOffset, searchMemoryOffset, stringLength - 1);
        if (result !== -1) { console.log('LastIndexOf failed 8'); return; }

        // Test 9 (normal text empty)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        stringLength = stringTest.getLength(stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('', stringTest.memory, searchMemoryOffset);

        result = stringTest.lastIndexOf(stringMemoryOffset, searchMemoryOffset, stringLength - 1);
        if (result !== 10) { console.log('LastIndexOf failed 9'); return; }

        // Test 10 (normal text first)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, stringMemoryOffset);
        stringLength = stringTest.getLength(stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('hello', stringTest.memory, searchMemoryOffset);

        result = stringTest.lastIndexOf(stringMemoryOffset, searchMemoryOffset, stringLength - 1);
        if (result !== 0) { console.log('LastIndexOf failed 10'); return; }

        // Test 11 (unicode text first)
        StringMemory.transferStringToMemory('¤आ𒀊 world', stringTest.memory, stringMemoryOffset);
        stringLength = stringTest.getLength(stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('¤आ𒀊', stringTest.memory, searchMemoryOffset);

        result = stringTest.lastIndexOf(stringMemoryOffset, searchMemoryOffset, stringLength - 1);
        if (result !== 0) { console.log('LastIndexOf failed 11'); return; }

        // Test 12 (normal text first)
        StringMemory.transferStringToMemory('hello worldorld', stringTest.memory, stringMemoryOffset);
        stringLength = stringTest.getLength(stringMemoryOffset);
        searchMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;
        StringMemory.transferStringToMemory('world', stringTest.memory, searchMemoryOffset);

        result = stringTest.lastIndexOf(stringMemoryOffset, searchMemoryOffset, stringLength - 1);
        if (result !== 6) { console.log('LastIndexOf failed 12'); return; }

        // Log all passed
        console.log('LastIndexOf passed');
    }

    /**
     * Test repeat function.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testRepeat(stringTest) {
        // Set string memory offset
        let stringMemoryOffset = 4;
        let repeatMemoryOffset = -1;

        // Test 1 (normal text repeat 1)
        StringMemory.transferStringToMemory('hello', stringTest.memory, stringMemoryOffset);
        repeatMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;

        stringTest.repeat(stringMemoryOffset, repeatMemoryOffset, 1);

        let size = stringTest.getSize(repeatMemoryOffset);
        let resultString = StringMemory.transferMemoryToString(stringTest.memory, repeatMemoryOffset, size);
        if (resultString !== 'hello') { console.log('Repeat failed 1'); return; }

        // Test 2 (normal text repeat 0)
        StringMemory.transferStringToMemory('hello', stringTest.memory, stringMemoryOffset);
        repeatMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;

        stringTest.repeat(stringMemoryOffset, repeatMemoryOffset, 0);

        size = stringTest.getSize(repeatMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, repeatMemoryOffset, size);
        if (resultString !== '') { console.log('Repeat failed 2'); return; }

        // Test 3 (normal text repeat 3)
        StringMemory.transferStringToMemory('hello', stringTest.memory, stringMemoryOffset);
        repeatMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;

        stringTest.repeat(stringMemoryOffset, repeatMemoryOffset, 3);

        size = stringTest.getSize(repeatMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, repeatMemoryOffset, size);
        if (resultString !== 'hellohellohello') { console.log('Repeat failed 3'); return; }

        // Test 4 (unicode text repeat 2)
        StringMemory.transferStringToMemory('¤आ𒀊', stringTest.memory, stringMemoryOffset);
        repeatMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;

        stringTest.repeat(stringMemoryOffset, repeatMemoryOffset, 2);

        size = stringTest.getSize(repeatMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, repeatMemoryOffset, size);
        if (resultString !== '¤आ𒀊¤आ𒀊') { console.log('Repeat failed 4'); return; }

        // Test 5 (normal text null ends)
        StringMemory.transferStringToMemory('hello world hello world hello world', stringTest.memory, stringMemoryOffset);
        StringMemory.transferStringToMemory('123', stringTest.memory, stringMemoryOffset);
        repeatMemoryOffset = stringMemoryOffset + stringTest.getSize(stringMemoryOffset) + 1;

        stringTest.repeat(stringMemoryOffset, repeatMemoryOffset, 3);

        size = stringTest.getSize(repeatMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, repeatMemoryOffset, size);
        if (resultString !== '123123123') { console.log('Repeat failed 5'); return; }

        // Log all passed
        console.log('Repeat passed');
    }

    /**
     * Test substring function.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testSubstring(stringTest) {
        // Set from string memory offset
        const fromStringMemoryOffset = 4;
        let substringMemoryOffset = -1;

        // Test 1 (normal text from the start)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, fromStringMemoryOffset);
        substringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.substring(fromStringMemoryOffset, substringMemoryOffset, 0, 5);

        let size = stringTest.getSize(substringMemoryOffset);
        let resultString = StringMemory.transferMemoryToString(stringTest.memory, substringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('Substring failed 1'); return; }
        
        // Test 2 (normal text from the middle)
        StringMemory.transferStringToMemory('hello world 12345', stringTest.memory, fromStringMemoryOffset);
        substringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.substring(fromStringMemoryOffset, substringMemoryOffset, 6, 11);

        size = stringTest.getSize(substringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, substringMemoryOffset, size);
        if (resultString !== 'world') { console.log('Substring failed 2'); return; }

        // Test 3 (normal text at the end)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, fromStringMemoryOffset);
        substringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.substring(fromStringMemoryOffset, substringMemoryOffset, 6, 11);

        size = stringTest.getSize(substringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, substringMemoryOffset, size);
        if (resultString !== 'world') { console.log('Substring failed 3'); return; }

        // Test 4 (normal text out of range)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, fromStringMemoryOffset);
        substringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.substring(fromStringMemoryOffset, substringMemoryOffset, 100, 102);

        size = stringTest.getSize(substringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, substringMemoryOffset, size);
        if (resultString !== '') { console.log('Substring failed 4'); return; }

        // Test 5 (normal text too long)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, fromStringMemoryOffset);
        substringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.substring(fromStringMemoryOffset, substringMemoryOffset, 2, 102);

        size = stringTest.getSize(substringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, substringMemoryOffset, size);
        if (resultString !== 'llo world') { console.log('Substring failed 5'); return; }

        // Test 6 (unicode text then normal text)
        StringMemory.transferStringToMemory('¤आ𒀊hello¤आ𒀊world', stringTest.memory, fromStringMemoryOffset);
        substringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.substring(fromStringMemoryOffset, substringMemoryOffset, 3, 8);

        size = stringTest.getSize(substringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, substringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('Substring failed 6'); return; }

        // Test 7 (unicode text in middle #1)
        StringMemory.transferStringToMemory('hello¤आ𒀊world', stringTest.memory, fromStringMemoryOffset);
        substringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.substring(fromStringMemoryOffset, substringMemoryOffset, 5, 8);

        size = stringTest.getSize(substringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, substringMemoryOffset, size);
        if (resultString !== '¤आ𒀊') { console.log('Substring failed 7'); return; }

        // Test 8 (unicode text in middle #2)
        StringMemory.transferStringToMemory('hello¤आ𒀊world', stringTest.memory, fromStringMemoryOffset);
        substringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.substring(fromStringMemoryOffset, substringMemoryOffset, 6, 7);

        size = stringTest.getSize(substringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, substringMemoryOffset, size);
        if (resultString !== 'आ') { console.log('Substring failed 8'); return; }

        // Test 9 (normal text same index)
        StringMemory.transferStringToMemory('hello world', stringTest.memory, fromStringMemoryOffset);
        substringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.substring(fromStringMemoryOffset, substringMemoryOffset, 2, 2);

        size = stringTest.getSize(substringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, substringMemoryOffset, size);
        if (resultString !== '') { console.log('Substring failed 9'); return; }

        // Test 10 (normal text null end)
        StringMemory.transferStringToMemory('hello world hello world hello world', stringTest.memory, fromStringMemoryOffset);
        StringMemory.transferStringToMemory('hello 123 world', stringTest.memory, fromStringMemoryOffset);
        substringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.substring(fromStringMemoryOffset, substringMemoryOffset, 6, 9);

        size = stringTest.getSize(substringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, substringMemoryOffset, size);
        if (resultString !== '123') { console.log('Substring failed 10'); return; }

        // Log all passed
        console.log('Substring passed');
    }

    /**
     * Test trim start function.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testTrimStart(stringTest) {
        // Set from string memory offset
        const fromStringMemoryOffset = 4;
        let trimStringMemoryOffset = -1;

        // Test 1 (normal text no trim needed)
        StringMemory.transferStringToMemory('hello', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimStart(fromStringMemoryOffset, trimStringMemoryOffset);

        let size = stringTest.getSize(trimStringMemoryOffset);
        let resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trimStart failed 1'); return; }
        
        // Test 2 (normal text single space)
        StringMemory.transferStringToMemory(' hello', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimStart(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trimStart failed 2'); return; }

        // Test 3 (normal text 2 spaces)
        StringMemory.transferStringToMemory('  hello', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimStart(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trimStart failed 3'); return; }

        // Test 4 (normal text all white space characters)
        StringMemory.transferStringToMemory('\t\v\f \n\rhello', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimStart(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trimStart failed 4'); return; }

        // Test 5 (normal text empty)
        StringMemory.transferStringToMemory('', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimStart(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== '') { console.log('trimStart failed 5'); return; }

        // Test 6 (normal text unicode)
        StringMemory.transferStringToMemory('¤आ𒀊', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimStart(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== '¤आ𒀊') { console.log('trimStart failed 6'); return; }

        // Test 7 (normal text space then unicode)
        StringMemory.transferStringToMemory(' ¤आ𒀊', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimStart(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== '¤आ𒀊') { console.log('trimStart failed 7'); return; }

        // Test 8 (normal text null end)
        StringMemory.transferStringToMemory('hello world hello world hello world', stringTest.memory, fromStringMemoryOffset);
        StringMemory.transferStringToMemory(' hello', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimStart(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trimStart failed 8'); return; }

        // Log all passed
        console.log('TrimStart passed');
    }

    /**
     * Test trim end function.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testTrimEnd(stringTest) {
        // Set from string memory offset
        const fromStringMemoryOffset = 4;
        let trimStringMemoryOffset = -1;

        // Test 1 (normal text no trim needed)
        StringMemory.transferStringToMemory('hello', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimEnd(fromStringMemoryOffset, trimStringMemoryOffset);

        let size = stringTest.getSize(trimStringMemoryOffset);
        let resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trimEnd failed 1'); return; }
        
        // Test 2 (normal text single space)
        StringMemory.transferStringToMemory('hello ', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimEnd(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trimEnd failed 2'); return; }

        // Test 3 (normal text 2 spaces)
        StringMemory.transferStringToMemory('hello  ', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimEnd(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trimEnd failed 3'); return; }

        // Test 4 (normal text all white space characters)
        StringMemory.transferStringToMemory('hello\t\v\f \n\r', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimEnd(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trimEnd failed 4'); return; }

        // Test 5 (normal text empty)
        StringMemory.transferStringToMemory('', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimEnd(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== '') { console.log('trimEnd failed 5'); return; }

        // Test 6 (unicode text with space)
        StringMemory.transferStringToMemory('¤आ𒀊 ', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimEnd(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== '¤आ𒀊') { console.log('trimEnd failed 6'); return; }

        // Test 7 (normal text null end)
        StringMemory.transferStringToMemory('hello world hello world hello world', stringTest.memory, fromStringMemoryOffset);
        StringMemory.transferStringToMemory('hello ', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trimEnd(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trimEnd failed 7'); return; }

        // Log all passed
        console.log('TrimEnd passed');
    }

    /**
     * Test trim function.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testTrim(stringTest) {
        // Set from string memory offset
        const fromStringMemoryOffset = 4;
        let trimStringMemoryOffset = -1;

        // Test 1 (normal text no trim needed)
        StringMemory.transferStringToMemory('hello', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trim(fromStringMemoryOffset, trimStringMemoryOffset);

        let size = stringTest.getSize(trimStringMemoryOffset);
        let resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trim failed 1'); return; }
        
        // Test 2 (normal text single space start)
        StringMemory.transferStringToMemory(' hello', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trim(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trim failed 2'); return; }

        // Test 3 (normal text single space end)
        StringMemory.transferStringToMemory('hello ', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trim(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trim failed 3'); return; }

        // Test 4 (normal text single space start and end)
        StringMemory.transferStringToMemory(' hello ', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trim(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trim failed 4'); return; }

        // Test 5 (normal text 2 spaces start)
        StringMemory.transferStringToMemory('  hello', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trim(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trim failed 5'); return; }

        // Test 6 (normal text 2 spaces end)
        StringMemory.transferStringToMemory('hello  ', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trim(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trim failed 6'); return; }

        // Test 7 (normal text 2 spaces start and end)
        StringMemory.transferStringToMemory('  hello  ', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trim(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trim failed 7'); return; }

        // Test 8 (normal text all white space characters)
        StringMemory.transferStringToMemory('\t\v\f \n\rhello', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trim(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trim failed 8'); return; }

        // Test 9 (normal text all white space characters)
        StringMemory.transferStringToMemory('hello\t\v\f \n\r', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trim(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trim failed 9'); return; }

        // Test 10 (normal text all white space characters)
        StringMemory.transferStringToMemory('\t\v\f \n\rhello\t\v\f \n\r', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trim(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trim failed 10'); return; }

        // Test 11 (normal text empty)
        StringMemory.transferStringToMemory('', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trim(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== '') { console.log('trim failed 11'); return; }

        // Test 10 (unicode text all white space characters)
        StringMemory.transferStringToMemory('\t\v\f \n\rhello\t\v\f \n\r', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trim(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trim failed 10'); return; }

        // Test 11 (unicode text with space)
        StringMemory.transferStringToMemory(' ¤आ𒀊 ', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trim(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== '¤आ𒀊') { console.log('trim failed 11'); return; }

        // Test 12 (normal text null end)
        StringMemory.transferStringToMemory('hello world hello world hello world', stringTest.memory, fromStringMemoryOffset);
        StringMemory.transferStringToMemory(' hello ', stringTest.memory, fromStringMemoryOffset);
        trimStringMemoryOffset = fromStringMemoryOffset + stringTest.getSize(fromStringMemoryOffset) + 1;

        stringTest.trim(fromStringMemoryOffset, trimStringMemoryOffset);

        size = stringTest.getSize(trimStringMemoryOffset);
        resultString = StringMemory.transferMemoryToString(stringTest.memory, trimStringMemoryOffset, size);
        if (resultString !== 'hello') { console.log('trim failed 12'); return; }

        // Log all passed
        console.log('Trim passed');
    }

    /**
     * Test get next function.
     * @param {StringTest} stringTest The WASM string test object.
     */
    static testGetNext(stringTest) {
        // Set from string memory offset
        const stringMemoryOffset = 4;

        // Test 1 (normal text)
        let string = 'hello';
        StringMemory.transferStringToMemory(string, stringTest.memory, stringMemoryOffset);

        let result = stringTest.getNext(stringMemoryOffset);
        let codePoint = string.codePointAt(0);
        if (result[1] !== codePoint) { console.log('getNext failed 1a'); return; }

        result = stringTest.getNext(result[0]);
        codePoint = string.codePointAt(1);
        if (result[1] !== codePoint) { console.log('getNext failed 1b'); return; }

        result = stringTest.getNext(result[0]);
        codePoint = string.codePointAt(2);
        if (result[1] !== codePoint) { console.log('getNext failed 1c'); return; }

        result = stringTest.getNext(result[0]);
        codePoint = string.codePointAt(3);
        if (result[1] !== codePoint) { console.log('getNext failed 1d'); return; }

        result = stringTest.getNext(result[0]);
        codePoint = string.codePointAt(4);
        if (result[1] !== codePoint) { console.log('getNext failed 1e'); return; }

        result = stringTest.getNext(result[0]);
        if (result[1] !== 0) { console.log('getNext failed 1f'); return; }

        // Test s (unicode text)
        string = 'a¤आ𒀊x';
        StringMemory.transferStringToMemory(string, stringTest.memory, stringMemoryOffset);

        result = stringTest.getNext(stringMemoryOffset);
        codePoint = string.codePointAt(0);
        if (result[1] !== codePoint) { console.log('getNext failed 2a'); return; }

        result = stringTest.getNext(result[0]);
        codePoint = string.codePointAt(1);
        if (result[1] !== codePoint) { console.log('getNext failed 2b'); return; }

        result = stringTest.getNext(result[0]);
        codePoint = string.codePointAt(2);
        if (result[1] !== codePoint) { console.log('getNext failed 2c'); return; }

        result = stringTest.getNext(result[0]);
        codePoint = string.codePointAt(3);
        if (result[1] !== codePoint) { console.log('getNext failed 2d'); return; }

        result = stringTest.getNext(result[0]);
        codePoint = string.codePointAt(5); // The last unicode character is encoded as 2 UTF-16 bytes
        if (result[1] !== codePoint) { console.log('getNext failed 2e'); return; }

        result = stringTest.getNext(result[0]);
        if (result[1] !== 0) { console.log('getNext failed 2f'); return; }

        // Log all passed
        console.log('GetNext passed');
    }    
}
