/**
 * Date time tools.
 */

export default class DateTimeTools  {
    /**
     * Log the given date time to the console.
     * @param {DateTimeTest} dateTimeTest The WASM date time test object.
     * @param {BigInt} datetime The WASM date time object.
     */
    static logDateTime(dateTimeTest, datetime) {
        // Get parts
        const year = dateTimeTest.getYear(datetime);
        const month = dateTimeTest.getMonth(datetime);
        const day = dateTimeTest.getDay(datetime);
        const hour = dateTimeTest.getHour(datetime);
        const minute = dateTimeTest.getMinute(datetime);
        const second = dateTimeTest.getSecond(datetime);
        const millisecond = dateTimeTest.getMillisecond(datetime);

        // Create date text
        const dateTimeText =
            day.toString().padStart(2, '0') +
            '/' +
            month.toString().padStart(2, '0') +
            '/' +
            year.toString().padStart(4, '0') +
            ' ' +
            hour.toString().padStart(2, '0') +
            ':' +
            minute.toString().padStart(2, '0') +
            ':' +
            second.toString().padStart(2, '0') +
            '.' +
            millisecond.toString().padStart(3, '0');

        // Log the date time text
        console.log(dateTimeText);
    }

    /**
     * Test the date to days function.
     * @param {DateTimeTest} dateTimeTest The WASM date time test object.
     */
    static testDateToDays(dateTimeTest) {
        // Set day count
        let dayCount = 0;

        // For each year (1 to 2400)
        for (let year = 1; year <= 2400; year++) {
            // For each month (1 to 12)
            for (let month = 1; month <= 12; month++) {
                // Set days in month
                const daysInMonth = dateTimeTest.getDaysInMonth(year, month);

                // For each day
                for (let day = 1; day <= daysInMonth; day++) {
                    // Increase day count
                    dayCount++;

                    // Convert date to days
                    const dateToDays = dateTimeTest.convertDateToDays(year, month, day);

                    // If they do not match
                    if (dayCount !== dateToDays) {
                        // Log error
                        console.log(`Convert date to days FAILED ${year}, ${month}, ${day}`);

                        // Stop testing
                        return;
                    }
                }
            }
        }

        // Log all passed
        console.log('Convert date to days passed');
    }

    /**
     * Test the days to date function.
     * @param {DateTimeTest} dateTimeTest The WASM date time test object.
     */
    static testDaysToDate(dateTimeTest) {
        // Set day count
        let dayCount = 0;

        // For each year (1 to 2400)
        for (let year = 1; year <= 2400; year++) {
            // For each month (1 to 12)
            for (let month = 1; month <= 12; month++) {
                // Set days in month
                const daysInMonth = dateTimeTest.getDaysInMonth(year, month);

                // For each day
                for (let day = 1; day <= daysInMonth; day++) {
                    // Increase day count
                    dayCount++;

                    // Get days to date
                    const date = dateTimeTest.convertDaysToDate(dayCount);

                    // Get parts
                    const testYear = dateTimeTest.getYear(date);
                    const testMonth = dateTimeTest.getMonth(date);
                    const testDay = dateTimeTest.getDay(date);

                    // If they do not match
                    if (testYear !== year || testMonth !== month || testDay !== day) {
                        // Log error
                        console.log(`Convert days to date FAILED ${dayCount}`);

                        // Stop here
                        return;
                    }
                }
            }
        }

        // Log passed
        console.log('Convert days to date passed');
    }

    /**
     * Test the days to week function.
     * @param {DateTimeTest} dateTimeTest The WASM date time test object.
     */
    static testDayOfWeek(dateTimeTest) {
        // Set day of week (1st Jan 1600 was a Saturday)
        let dayOfWeek = 6;

        // For each year (1600 to 2400)
        for (let year = 1600; year <= 2400; year++) {
            // For each month
            for (let month = 1; month <= 12; month++) {
                // Get the number of days in the month
                const daysInMonth = dateTimeTest.getDaysInMonth(year, month);

                // For each day
                for (let day = 1; day <= daysInMonth; day++) {
                    // Check day of week
                    if (dateTimeTest.getDayOfWeek(year, month, day) !== dayOfWeek) {
                        // Log error
                        console.log(`getDayOfWeek FAILED ${year}, ${month}, ${day}`);

                        // Stop here
                        return;
                    }

                    // Move day of week
                    dayOfWeek++;
                    if (dayOfWeek > 6) dayOfWeek = 0;
                }
            }
        }

        // Check a known date
        if (dateTimeTest.getDayOfWeek(2020, 3, 4) !== 3) {
            // Log error
            console.log('getDayOfWeek FAILED 2020, 3, 4');

            // Stop here
            return;
        }

        // Log passed
        console.log('Day of week passed');
    }

    /**
     * Test the add years function.
     * @param {DateTimeTest} dateTimeTest The WASM date time test object.
     */
    static testAddYears(dateTimeTest) {
        // Test leap year
        let datetime = dateTimeTest.convertYMDHMS(2020, 2, 29, 1, 2, 3);
        datetime = dateTimeTest.addYears(datetime, 1);
        if (dateTimeTest.getYear(datetime) !== 2021 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 28) { console.log('addYears FAILED 1'); return; }

        datetime = dateTimeTest.convertYMDHMS(2019, 2, 28, 1, 2, 3);
        datetime = dateTimeTest.addYears(datetime, 1);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 28) { console.log('addYears FAILED 2'); return; }
    
        datetime = dateTimeTest.convertYMDHMS(2020, 2, 29, 1, 2, 3);
        datetime = dateTimeTest.addYears(datetime, -1);
        if (dateTimeTest.getYear(datetime) !== 2019 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 28) { console.log('addYears FAILED 3'); return; }
    
        datetime = dateTimeTest.convertYMDHMS(2021, 2, 28, 1, 2, 3);
        datetime = dateTimeTest.addYears(datetime, -1);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 28) { console.log('addYears FAILED 4'); return; }
    
        // Test add zero
        datetime = dateTimeTest.convertYMDHMS(2020, 2, 29, 1, 2, 3);
        datetime = dateTimeTest.addYears(datetime, 0);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 29) { console.log('addYears FAILED 5'); return; }

        // Test add
        datetime = dateTimeTest.convertYMDHMS(2020, 12, 5, 1, 2, 3);
        datetime = dateTimeTest.addYears(datetime, 2);
        if (dateTimeTest.getYear(datetime) !== 2022 ||
            dateTimeTest.getMonth(datetime) !== 12 ||
            dateTimeTest.getDay(datetime) !== 5) { console.log('addYears FAILED 6'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 2, 5, 1, 2, 3);
        datetime = dateTimeTest.addYears(datetime, 3);
        if (dateTimeTest.getYear(datetime) !== 2023 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 5) { console.log('addYears FAILED 7'); return; }
    
        // Test minus
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 5, 1, 2, 3);
        datetime = dateTimeTest.addYears(datetime, -2);
        if (dateTimeTest.getYear(datetime) !== 2018 ||
            dateTimeTest.getMonth(datetime) !== 1 ||
            dateTimeTest.getDay(datetime) !== 5) { console.log('addYears FAILED 8'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 7, 5, 1, 2, 3);
        datetime = dateTimeTest.addYears(datetime, -3);
        if (dateTimeTest.getYear(datetime) !== 2017 ||
            dateTimeTest.getMonth(datetime) !== 7 ||
            dateTimeTest.getDay(datetime) !== 5) { console.log('addYears FAILED 9'); return; }
    
        // Log passed
        console.log('addYears passed');
    }

    /**
     * Test the add months function.
     * @param {DateTimeTest} dateTimeTest The WASM date time test object.
     */
    static testAddMonths(dateTimeTest) {
        // Test leap year
        let datetime = dateTimeTest.convertYMDHMS(2020, 1, 31, 1, 2, 3);
        datetime = dateTimeTest.addMonths(datetime, 1);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 29) { console.log('addMonths FAILED 1'); return; }

        datetime = dateTimeTest.convertYMDHMS(2019, 1, 31, 1, 2, 3);
        datetime = dateTimeTest.addMonths(datetime, 1);
        if (dateTimeTest.getYear(datetime) !== 2019 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 28) { console.log('addMonths FAILED 2'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 3, 31, 1, 2, 3);
        datetime = dateTimeTest.addMonths(datetime, -1);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 29) { console.log('addMonths FAILED 3'); return; }

        datetime = dateTimeTest.convertYMDHMS(2019, 3, 31, 1, 2, 3);
        datetime = dateTimeTest.addMonths(datetime, -1);
        if (dateTimeTest.getYear(datetime) !== 2019 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 28) { console.log('addMonths FAILED 4'); return; }

        // Test add zero
        datetime = dateTimeTest.convertYMDHMS(2020, 2, 29, 1, 2, 3);
        datetime = dateTimeTest.addMonths(datetime, 0);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 29) { console.log('addMonths FAILED 5'); return; }

        // Test add
        datetime = dateTimeTest.convertYMDHMS(2020, 12, 5, 1, 2, 3);
        datetime = dateTimeTest.addMonths(datetime, 2);
        if (dateTimeTest.getYear(datetime) !== 2021 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 5) { console.log('addMonths FAILED 6'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 2, 5, 1, 2, 3);
        datetime = dateTimeTest.addMonths(datetime, 2);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 4 ||
            dateTimeTest.getDay(datetime) !== 5) { console.log('addMonths FAILED 7'); return; }
    
        datetime = dateTimeTest.convertYMDHMS(2020, 12, 1, 1, 2, 3);
        datetime = dateTimeTest.addMonths(datetime, 1);
        if (dateTimeTest.getYear(datetime) !== 2021 ||
            dateTimeTest.getMonth(datetime) !== 1 ||
            dateTimeTest.getDay(datetime) !== 1) { console.log('addMonths FAILED 8'); return; }
    
        // Test minus
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 5, 1, 2, 3);
        datetime = dateTimeTest.addMonths(datetime, -2);
        if (dateTimeTest.getYear(datetime) !== 2019 ||
            dateTimeTest.getMonth(datetime) !== 11 ||
            dateTimeTest.getDay(datetime) !== 5) { console.log('addMonths FAILED 9'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 7, 5, 1, 2, 3);
        datetime = dateTimeTest.addMonths(datetime, -2);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 5 ||
            dateTimeTest.getDay(datetime) !== 5) { console.log('addMonths FAILED 10'); return; }

        datetime = dateTimeTest.convertYMDHMS(2021, 1, 1, 1, 2, 3);
        datetime = dateTimeTest.addMonths(datetime, -1);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 12 ||
            dateTimeTest.getDay(datetime) !== 1) { console.log('addMonths FAILED 11'); return; }
                
        // Test over many months (plus values)

        // Set starting date
        datetime = dateTimeTest.convertYMDHMS(1900, 1, 1, 2, 3, 4);

        // Set year and month
        let year = 1900;
        let month = 1;

        // For each add month (over 40 years)
        for (let addMonth = 1; addMonth <= 480; addMonth++) {
            // Increase month and year parts
            month++;
            if (month > 12) { month = 1; year++; }

            // Add months
            const date = dateTimeTest.addMonths(datetime, addMonth);

            // Get parts
            const testYear = dateTimeTest.getYear(date);
            const testMonth = dateTimeTest.getMonth(date);

            // Make sure the result is correct
            if (testYear !== year || testMonth !== month) {
                // Log error
                console.log(`addMonths plus test FAILED ${addMonth}`);

                // Stop here
                return;
            }
        }

        // Test over many months (minus values)

        // Set starting date
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 1, 2, 3, 4);

        // Set year and month
        year = 2020;
        month = 1;

        // For each minus month (over 40 years)
        for (let minusMonth = 1; minusMonth <= 480; minusMonth++) {
            // Decrease month and year parts
            month--;
            if (month <= 0) { month = 12; year--; }

            // Add months
            const date = dateTimeTest.addMonths(datetime, -minusMonth);

            // Get parts
            const testYear = dateTimeTest.getYear(date);
            const testMonth = dateTimeTest.getMonth(date);

            // Make sure the result is correct
            if (testYear !== year || testMonth !== month) {
                // Log error
                console.log(`addMonths minus test FAILED ${minusMonth}`);

                // Stop here
                return;
            }
        }

        // Log passed
        console.log('addMonths passed');        
    }

    /**
     * Test the add days function.
     * @param {DateTimeTest} dateTimeTest The WASM date time test object.
     */
    static testAddDays(dateTimeTest) {
        // Test leap year
        let datetime = dateTimeTest.convertYMDHMS(2020, 2, 29, 1, 2, 3);
        datetime = dateTimeTest.addDays(datetime, 1);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 3 ||
            dateTimeTest.getDay(datetime) !== 1) { console.log('addDays FAILED 1'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 2, 28, 1, 2, 3);
        datetime = dateTimeTest.addDays(datetime, 1);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 29) { console.log('addDays FAILED 2'); return; }

        datetime = dateTimeTest.convertYMDHMS(2019, 2, 28, 1, 2, 3);
        datetime = dateTimeTest.addDays(datetime, 1);
        if (dateTimeTest.getYear(datetime) !== 2019 ||
            dateTimeTest.getMonth(datetime) !== 3 ||
            dateTimeTest.getDay(datetime) !== 1) { console.log('addDays FAILED 3'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 3, 1, 1, 2, 3);
        datetime = dateTimeTest.addDays(datetime, -1);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 29) { console.log('addDays FAILED 4'); return; }

        datetime = dateTimeTest.convertYMDHMS(2019, 3, 1, 1, 2, 3);
        datetime = dateTimeTest.addDays(datetime, -1);
        if (dateTimeTest.getYear(datetime) !== 2019 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 28) { console.log('addDays FAILED 5'); return; }

        // Test add zero
        datetime = dateTimeTest.convertYMDHMS(2020, 2, 29, 1, 2, 3);
        datetime = dateTimeTest.addDays(datetime, 0);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 29) { console.log('addDays FAILED 6'); return; }

        // Test add
        datetime = dateTimeTest.convertYMDHMS(2020, 2, 1, 1, 2, 3);
        datetime = dateTimeTest.addDays(datetime, 10);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 11) { console.log('addDays FAILED 7'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 2, 1, 1, 2, 3);
        datetime = dateTimeTest.addDays(datetime, 40);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 3 ||
            dateTimeTest.getDay(datetime) !== 12) { console.log('addDays FAILED 8'); return; }
    
        // Test minus
        datetime = dateTimeTest.convertYMDHMS(2020, 2, 10, 1, 2, 3);
        datetime = dateTimeTest.addDays(datetime, -1);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 9) { console.log('addDays FAILED 9'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 1, 1, 2, 3);
        datetime = dateTimeTest.addDays(datetime, -1);
        if (dateTimeTest.getYear(datetime) !== 2019 ||
            dateTimeTest.getMonth(datetime) !== 12 ||
            dateTimeTest.getDay(datetime) !== 31) { console.log('addDays FAILED 10'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 2, 28, 1, 2, 3);
        datetime = dateTimeTest.addDays(datetime, -10);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 2 ||
            dateTimeTest.getDay(datetime) !== 18) { console.log('addDays FAILED 11'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 2, 28, 1, 2, 3);
        datetime = dateTimeTest.addDays(datetime, -40);
        if (dateTimeTest.getYear(datetime) !== 2020 ||
            dateTimeTest.getMonth(datetime) !== 1 ||
            dateTimeTest.getDay(datetime) !== 19) { console.log('addDays FAILED 12'); return; }

        // Log passed
        console.log('addDays passed');
    }

    /**
     * Test the add hours function.
     * @param {DateTimeTest} dateTimeTest The WASM date time test object.
     */
    static testAddHours(dateTimeTest) {
        // Test add zero
        let datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addHours(datetime, 0);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 1'); return; }

        // Test add (on the same day)
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 22, 34, 45);
        datetime = dateTimeTest.addHours(datetime, 1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 2'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 2, 59, 59);
        datetime = dateTimeTest.addHours(datetime, 1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 3 ||
            dateTimeTest.getMinute(datetime) !== 59 ||
            dateTimeTest.getSecond(datetime) !== 59 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 3'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 0, 0, 0);
        datetime = dateTimeTest.addHours(datetime, 1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 1 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 4'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 21, 34, 45);
        datetime = dateTimeTest.addHours(datetime, 2);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 5'); return; }
                
        // Test add (into the next day)
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addHours(datetime, 1);
        if (dateTimeTest.getDay(datetime) !== 3 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 6'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addHours(datetime, 2);
        if (dateTimeTest.getDay(datetime) !== 3 ||
            dateTimeTest.getHour(datetime) !== 1 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 7'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addHours(datetime, 24);
        if (dateTimeTest.getDay(datetime) !== 3 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 8'); return; }
        
        // Test minus (on the same day)
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addHours(datetime, -1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 22 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 9'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 0, 0);
        datetime = dateTimeTest.addHours(datetime, -1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 22 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 10'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addHours(datetime, -2);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 21 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 11'); return; }
        
        // Test minus (into the previous day)
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 0, 0, 0);
        datetime = dateTimeTest.addHours(datetime, -1);
        if (dateTimeTest.getDay(datetime) !== 1 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 12'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 1, 34, 45);
        datetime = dateTimeTest.addHours(datetime, -2);
        if (dateTimeTest.getDay(datetime) !== 1 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 13'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addHours(datetime, -24);
        if (dateTimeTest.getDay(datetime) !== 1 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 14'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addHours(datetime, -25);
        if (dateTimeTest.getDay(datetime) !== 1 ||
            dateTimeTest.getHour(datetime) !== 22 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addHours FAILED 15'); return; }

        // Log passed
        console.log('addHours passed');
    }

    /**
     * Test the add minutes function.
     * @param {DateTimeTest} dateTimeTest The WASM date time test object.
     */
    static testAddMinutes(dateTimeTest) {
        // Test add zero
        let datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addMinutes(datetime, 0);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 1'); return; }

        // Test add (on the same day)
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addMinutes(datetime, 1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 35 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 2'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 22, 59, 59);
        datetime = dateTimeTest.addMinutes(datetime, 1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 59 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 3'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 22, 12, 59);
        datetime = dateTimeTest.addMinutes(datetime, 1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 22 ||
            dateTimeTest.getMinute(datetime) !== 13 ||
            dateTimeTest.getSecond(datetime) !== 59 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 4'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 0, 0, 0);
        datetime = dateTimeTest.addMinutes(datetime, 1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 1 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 5'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 22, 34, 45);
        datetime = dateTimeTest.addMinutes(datetime, 60);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 6'); return; }
                
        // Test add (into the next day)
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 59, 45);
        datetime = dateTimeTest.addMinutes(datetime, 1);
        if (dateTimeTest.getDay(datetime) !== 3 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 7'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 59, 45);
        datetime = dateTimeTest.addMinutes(datetime, 2);
        if (dateTimeTest.getDay(datetime) !== 3 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 1 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 8'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addMinutes(datetime, 60);
        if (dateTimeTest.getDay(datetime) !== 3 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 9'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addMinutes(datetime, 24 * 60);
        if (dateTimeTest.getDay(datetime) !== 3 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 10'); return; }
                
        // Test minus (on the same day)
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addMinutes(datetime, -1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 33 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 11'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 0, 0);
        datetime = dateTimeTest.addMinutes(datetime, -1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 22 ||
            dateTimeTest.getMinute(datetime) !== 59 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 12'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 0, 1, 0);
        datetime = dateTimeTest.addMinutes(datetime, -1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 13'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addMinutes(datetime, -60);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 22 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 14'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addMinutes(datetime, -23 * 60);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 15'); return; }
                
        // Test minus (into the previous day)
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 0, 0, 0);
        datetime = dateTimeTest.addMinutes(datetime, -1);
        if (dateTimeTest.getDay(datetime) !== 1 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 59 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 16'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 0, 0, 0);
        datetime = dateTimeTest.addMinutes(datetime, -2);
        if (dateTimeTest.getDay(datetime) !== 1 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 58 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 17'); return; }
    
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 0, 0, 0);
        datetime = dateTimeTest.addMinutes(datetime, -60);
        if (dateTimeTest.getDay(datetime) !== 1 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 18'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 10, 11, 12);
        datetime = dateTimeTest.addMinutes(datetime, -24 * 60);
        if (dateTimeTest.getDay(datetime) !== 1 ||
            dateTimeTest.getHour(datetime) !== 10 ||
            dateTimeTest.getMinute(datetime) !== 11 ||
            dateTimeTest.getSecond(datetime) !== 12 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMinutes FAILED 19'); return; }

        // Log passed
        console.log('addMinutes passed');
    }

    /**
     * Test the add seconds function.
     * @param {DateTimeTest} dateTimeTest The WASM date time test object.
     */
    static testAddSeconds(dateTimeTest) {
        // Test add zero
        let datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addSeconds(datetime, 0);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 1'); return; }

        // Test add (in the same day)
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addSeconds(datetime, 1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 46 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 2'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 12, 59, 59);
        datetime = dateTimeTest.addSeconds(datetime, 1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 13 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 3'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 12, 12, 59);
        datetime = dateTimeTest.addSeconds(datetime, 1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 12 ||
            dateTimeTest.getMinute(datetime) !== 13 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 4'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 13, 34, 45);
        datetime = dateTimeTest.addSeconds(datetime, 60);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 13 ||
            dateTimeTest.getMinute(datetime) !== 35 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 5'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 13, 34, 45);
        datetime = dateTimeTest.addSeconds(datetime, 60 * 60);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 14 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 6'); return; }
                
        // Test add (into the next day)
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 59, 59);
        datetime = dateTimeTest.addSeconds(datetime, 1);
        if (dateTimeTest.getDay(datetime) !== 3 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 7'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 59, 59);
        datetime = dateTimeTest.addSeconds(datetime, 2);
        if (dateTimeTest.getDay(datetime) !== 3 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 1 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 8'); return; }
    
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 59, 0);
        datetime = dateTimeTest.addSeconds(datetime, 60);
        if (dateTimeTest.getDay(datetime) !== 3 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 9'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 0, 0);
        datetime = dateTimeTest.addSeconds(datetime, 60 * 60);
        if (dateTimeTest.getDay(datetime) !== 3 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 10'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 10, 11, 12);
        datetime = dateTimeTest.addSeconds(datetime, 24 * 60 * 60);
        if (dateTimeTest.getDay(datetime) !== 3 ||
            dateTimeTest.getHour(datetime) !== 10 ||
            dateTimeTest.getMinute(datetime) !== 11 ||
            dateTimeTest.getSecond(datetime) !== 12 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 11'); return; }

        // Test minus (on the same day)
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addSeconds(datetime, -1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 44 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 12'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 0, 0);
        datetime = dateTimeTest.addSeconds(datetime, -1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 22 ||
            dateTimeTest.getMinute(datetime) !== 59 ||
            dateTimeTest.getSecond(datetime) !== 59 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 13'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 13, 0);
        datetime = dateTimeTest.addSeconds(datetime, -1);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 12 ||
            dateTimeTest.getSecond(datetime) !== 59 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 14'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addSeconds(datetime, -60);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 33 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 15'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 23, 34, 45);
        datetime = dateTimeTest.addSeconds(datetime, -60 * 60);
        if (dateTimeTest.getDay(datetime) !== 2 ||
            dateTimeTest.getHour(datetime) !== 22 ||
            dateTimeTest.getMinute(datetime) !== 34 ||
            dateTimeTest.getSecond(datetime) !== 45 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 16'); return; }

        // Test minus (into the previous day)
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 0, 0, 0);
        datetime = dateTimeTest.addSeconds(datetime, -1);
        if (dateTimeTest.getDay(datetime) !== 1 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 59 ||
            dateTimeTest.getSecond(datetime) !== 59 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 17'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 0, 0, 0);
        datetime = dateTimeTest.addSeconds(datetime, -2);
        if (dateTimeTest.getDay(datetime) !== 1 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 59 ||
            dateTimeTest.getSecond(datetime) !== 58 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 18'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 0, 0, 0);
        datetime = dateTimeTest.addSeconds(datetime, -60);
        if (dateTimeTest.getDay(datetime) !== 1 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 59 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 19'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 0, 0, 0);
        datetime = dateTimeTest.addSeconds(datetime, -60 * 60);
        if (dateTimeTest.getDay(datetime) !== 1 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 20'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 2, 10, 11, 12);
        datetime = dateTimeTest.addSeconds(datetime, -24 * 60 * 60);
        if (dateTimeTest.getDay(datetime) !== 1 ||
            dateTimeTest.getHour(datetime) !== 10 ||
            dateTimeTest.getMinute(datetime) !== 11 ||
            dateTimeTest.getSecond(datetime) !== 12 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addSeconds FAILED 21'); return; }

        // Log passed
        console.log('addSeconds passed');
    }

    /**
     * Test the add days function.
     * @param {DateTimeTest} dateTimeTest The WASM date time test object.
     */
    static testAddMilliseconds(dateTimeTest) {
        // Test within day
        let datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, 1);
        if (dateTimeTest.getDay(datetime) !== 10 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 1) { console.log('addMilliseconds FAILED 1'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, 1000);
        if (dateTimeTest.getDay(datetime) !== 10 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 1 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMilliseconds FAILED 2'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, 60000);
        if (dateTimeTest.getDay(datetime) !== 10 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 1 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMilliseconds FAILED 3'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, 3600000);
        if (dateTimeTest.getDay(datetime) !== 10 ||
            dateTimeTest.getHour(datetime) !== 1 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMilliseconds FAILED 4'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, 3661001);
        if (dateTimeTest.getDay(datetime) !== 10 ||
            dateTimeTest.getHour(datetime) !== 1 ||
            dateTimeTest.getMinute(datetime) !== 1 ||
            dateTimeTest.getSecond(datetime) !== 1 ||
            dateTimeTest.getMillisecond(datetime) !== 1) { console.log('addMilliseconds FAILED 5'); return; }

        // Move than 1 day

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, 86400000);
        if (dateTimeTest.getDay(datetime) !== 11 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMilliseconds FAILED 6'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, 172800000);
        if (dateTimeTest.getDay(datetime) !== 12 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMilliseconds FAILED 7'); return; }

        // Negative values
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, -1);
        if (dateTimeTest.getDay(datetime) !== 9 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 59 ||
            dateTimeTest.getSecond(datetime) !== 59 ||
            dateTimeTest.getMillisecond(datetime) !== 999) { console.log('addMilliseconds FAILED 8'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, -1000);
        if (dateTimeTest.getDay(datetime) !== 9 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 59 ||
            dateTimeTest.getSecond(datetime) !== 59 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMilliseconds FAILED 9'); return; }
    
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, -60000);
        if (dateTimeTest.getDay(datetime) !== 9 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 59 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMilliseconds FAILED 10'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, -3600000);
        if (dateTimeTest.getDay(datetime) !== 9 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMilliseconds FAILED 11'); return; }

        datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, -86399999);
        if (dateTimeTest.getDay(datetime) !== 9 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 1) { console.log('addMilliseconds FAILED 12'); return; }
    
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, -86400000);
        if (dateTimeTest.getDay(datetime) !== 9 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMilliseconds FAILED 13'); return; }
   
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, -86400001);
        if (dateTimeTest.getDay(datetime) !== 8 ||
            dateTimeTest.getHour(datetime) !== 23 ||
            dateTimeTest.getMinute(datetime) !== 59 ||
            dateTimeTest.getSecond(datetime) !== 59 ||
            dateTimeTest.getMillisecond(datetime) !== 999) { console.log('addMilliseconds FAILED 14'); return; }
                
        datetime = dateTimeTest.convertYMDHMS(2020, 1, 10, 0, 0, 0);
        datetime = dateTimeTest.addMilliseconds(datetime, -172800000);
        if (dateTimeTest.getDay(datetime) !== 8 ||
            dateTimeTest.getHour(datetime) !== 0 ||
            dateTimeTest.getMinute(datetime) !== 0 ||
            dateTimeTest.getSecond(datetime) !== 0 ||
            dateTimeTest.getMillisecond(datetime) !== 0) { console.log('addMilliseconds FAILED 15'); return; }
        
        // Log passed
        console.log('addMilliseconds passed');
    }

    /**
     * Test the compare function.
     * @param {DateTimeTest} dateTimeTest The WASM date time test object.
     */
    static testCompare(dateTimeTest) {
        // Test the same
        let datetime1 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 45, 56);
        let datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 45, 56);
        let result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 0) { console.log('compare FAILED 1'); return; }

        // Test almost same
        datetime2 = dateTimeTest.convertYMDHMS(2021, 2, 3, 34, 45, 56);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 2'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2019, 2, 3, 34, 45, 56);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 3'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 3, 3, 34, 45, 56);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 4'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 1, 3, 34, 45, 56);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 5'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 4, 34, 45, 56);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 6'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 2, 34, 45, 56);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 7'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 35, 45, 56);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 8'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 33, 45, 56);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 9'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 46, 56);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 10'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 44, 56);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 11'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 45, 57);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 12'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 45, 55);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 13'); return; }

        // Test higher but different
        datetime2 = dateTimeTest.convertYMDHMS(2021, 3, 4, 35, 46, 57);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 14'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2019, 3, 4, 35, 46, 57);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 15'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 3, 4, 35, 46, 57);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 16'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 1, 4, 35, 46, 57);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 17'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 4, 35, 46, 57);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 18'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 2, 35, 46, 57);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 19'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 35, 46, 57);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 20'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 33, 46, 57);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 21'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 46, 57);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 22'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 44, 57);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 23'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 45, 57);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 24'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 45, 55);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 25'); return; }

        // Test lower but different
        datetime2 = dateTimeTest.convertYMDHMS(2021, 1, 2, 33, 44, 55);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 26'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2019, 1, 2, 33, 44, 55);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 27'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 3, 2, 33, 44, 55);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 28'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 1, 2, 33, 44, 55);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 29'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 4, 33, 44, 55);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 30'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 2, 33, 44, 55);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 31'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 35, 44, 55);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 32'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 33, 44, 55);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 33'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 46, 55);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 34'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 44, 55);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 35'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 45, 57);
        result = dateTimeTest.compare(datetime1, datetime2);6
        if (result !== -1) { console.log('compare FAILED 36'); return; }

        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 45, 55);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 37'); return; }

        // Test milliseconds
        datetime1 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 45, 56);
        datetime2 = dateTimeTest.convertYMDHMS(2020, 2, 3, 34, 45, 56);

        datetime1 = dateTimeTest.setMillisecond(datetime1, 123);
        datetime2 = dateTimeTest.setMillisecond(datetime2, 123);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 0) { console.log('compare FAILED 38'); return; }

        datetime2 = dateTimeTest.setMillisecond(datetime2, 124);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== -1) { console.log('compare FAILED 39'); return; }

        datetime2 = dateTimeTest.setMillisecond(datetime2, 122);
        result = dateTimeTest.compare(datetime1, datetime2);
        if (result !== 1) { console.log('compare FAILED 40'); return; }

        // Log passed
        console.log('compare passed');
    }

    /**
     * Test the validate date function.
     * @param {DateTimeTest} dateTimeTest The WASM date time test object.
     */
    static testValidateDate(dateTimeTest) {
        // Test invalid year
        if (dateTimeTest.validateDate(-1, 1, 2) !== false) { console.log('validateDate FAILED 1'); return; }
        if (dateTimeTest.validateDate(4001, 1, 2) !== false) { console.log('validateDate FAILED 2'); return; }

        // Test invalid month
        if (dateTimeTest.validateDate(2024, 0, 2) !== false) { console.log('validateDate FAILED 3'); return; }
        if (dateTimeTest.validateDate(2024, 13, 2) !== false) { console.log('validateDate FAILED 4'); return; }

        // Test invalid day
        if (dateTimeTest.validateDate(2024, 1, 0) !== false) { console.log('validateDate FAILED 5'); return; }
        if (dateTimeTest.validateDate(2024, 1, 32) !== false) { console.log('validateDate FAILED 6'); return; }
        if (dateTimeTest.validateDate(2024, 4, 31) !== false) { console.log('validateDate FAILED 7'); return; }
        if (dateTimeTest.validateDate(2024, 2, 30) !== false) { console.log('validateDate FAILED 8'); return; }
        if (dateTimeTest.validateDate(2023, 2, 29) !== false) { console.log('validateDate FAILED 9'); return; }

        // Test valid date
        if (dateTimeTest.validateDate(2024, 2, 29) !== true) { console.log('validateDate FAILED 10'); return; }
        if (dateTimeTest.validateDate(2024, 2, 1) !== true) { console.log('validateDate FAILED 11'); return; }

        // Log passed
        console.log('validateDate passed');
    }

    /**
     * Test the validate time function.
     * @param {DateTimeTest} dateTimeTest The WASM date time test object.
     */
    static testValidateTime(dateTimeTest) {
        // Test invalid hour
        if (dateTimeTest.validateTime(-1, 1, 2, 3) !== false) { console.log('validateTime FAILED 1'); return; }
        if (dateTimeTest.validateTime(24, 1, 2, 3) !== false) { console.log('validateTime FAILED 2'); return; }

        // Test invalid minute
        if (dateTimeTest.validateTime(1, -1, 2, 3) !== false) { console.log('validateTime FAILED 3'); return; }
        if (dateTimeTest.validateTime(1, 60, 2, 3) !== false) { console.log('validateTime FAILED 4'); return; }

        // Test invalid second
        if (dateTimeTest.validateTime(1, 2, -1, 3) !== false) { console.log('validateTime FAILED 5'); return; }
        if (dateTimeTest.validateTime(1, 2, 60, 3) !== false) { console.log('validateTime FAILED 6'); return; }

        // Test invalid millisecond
        if (dateTimeTest.validateTime(1, 2, 3, -1) !== false) { console.log('validateTime FAILED 7'); return; }
        if (dateTimeTest.validateTime(1, 2, 3, 1000) !== false) { console.log('validateTime FAILED 8'); return; }

        // Test valid time
        if (dateTimeTest.validateTime(0, 0, 0, 0) !== true) { console.log('validateTime FAILED 9'); return; }
        if (dateTimeTest.validateTime(23, 59, 59, 999) !== true) { console.log('validateTime FAILED 10'); return; }

        // Log passed
        console.log('validateTime passed');
    }
}
