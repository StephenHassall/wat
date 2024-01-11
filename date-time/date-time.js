/**
 * Date time test functions using WASM.
 */
import { readFile } from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';

export default class DateTimeTest  {
    /**
     * Fetch and load the WASM file.
     * @return {Promise} A promise.
     */
    async load() {
        // Get current folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        // Read WASM data
        const wasmBuffer = await readFile(__dirname + '/date-time.wasm');

        // Create WASM data from buffer
        const wasmData = new Uint8Array(wasmBuffer);

        // Instantiate the WASM data
        const promise = WebAssembly.instantiate(wasmData)
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
     * Set the date time using the given date and time values.
     * @param {Number} year The year part.
     * @param {Number} month The month part (1 to 12).
     * @param {Number} day The day part.
     * @param {Number} hour The hour part.
     * @param {Number} minute The minute part.
     * @param {Number} second The second part.
     * @return {BitInt} The date time value.
     */
    convertYMDHMS(year, month, day, hour, minute, second) {
        // Call and return the WASM date_convert_ymdhms function
        return this._instance.exports.date_convert_ymdhms(year, month, day, hour, minute, second);
    }

    /**
     * Set the date time using a JavaScript Date.getTime() epoch value (milliseconds from 1970).
     * @param {Number} epoch The number of milliseconds from 1970.
     * @return {BitInt} The date time value.
     */
    convertFromJs(epoch) {
        // Create BigInt object for the epoch (we want to pass i64 value)
        const epochBigInt = BigInt(epoch);

        // Call and return the WASM date_convert_from_js function
        return this._instance.exports.date_convert_from_js(epochBigInt);
    }

    /**
     * Set a JavaScript Date object using the 
     * @param {BigInt} datetime The date time value to get the year from.
     * @return {Date} A JavaScript date object.
     */
    convertToJs(datetime) {
        // Call the WASM date_convert_to_js function
        const epoch = this._instance.exports.date_convert_to_js(datetime);

        // Create date object using the epoch
        const date = new Date(Number(epoch));

        // Return the date
        return date;
    }

    /**
     * Get year from the datetime object.
     * @param {BigInt} datetime The date time value to get the year from.
     * @return {Number} The year value.
     */
    getYear(datetime) {
        // Call and return the WASM date_get_year function
        return this._instance.exports.date_get_year(datetime);
    }

    /**
     * Set the year for the given datetime object.
     * @param {BigInt} datetime The starting date time value to set.
     * @param {Number} year The new year value to set.
     * @return {BitInt} A new datetime value contain the new year value.
     */
    setYear(datetime, year) {
        // Call and return the WASM date_set_year function
        return this._instance.exports.date_set_year(datetime, year);
    }
    
    /**
     * Get month from the datetime object.
     * @param {BigInt} datetime The date time value to get the month from.
     * @return {Number} The month value (1 to 12).
     */
    getMonth(datetime) {
        // Call and return the WASM date_get_month function
        return this._instance.exports.date_get_month(datetime);
    }

    /**
     * Set the month for the given datetime object.
     * @param {BigInt} datetime The starting date time value to set.
     * @param {Number} month The new month value to set (1 to 12).
     * @return {BitInt} A new datetime value contain the new month value.
     */
    setMonth(datetime, month) {
        // Call and return the WASM date_set_month function
        return this._instance.exports.date_set_month(datetime, month);
    }

    /**
     * Get day from the datetime object.
     * @param {BigInt} datetime The date time value to get the day from.
     * @return {Number} The day value (1 to 31).
     */
    getDay(datetime) {
        // Call and return the WASM date_get_day function
        return this._instance.exports.date_get_day(datetime);
    }

    /**
     * Set the day for the given datetime object.
     * @param {BigInt} datetime The starting date time value to set.
     * @param {Number} day The new day value to set (1 to 31).
     * @return {BitInt} A new datetime value contain the new day value.
     */
    setDay(datetime, day) {
        // Call and return the WASM date_set_day function
        return this._instance.exports.date_set_day(datetime, day);
    }

    /**
     * Get hour from the datetime object.
     * @param {BigInt} datetime The date time value to get the hour from.
     * @return {Number} The hour value (0 to 23).
     */
    getHour(datetime) {
        // Call and return the WASM date_get_hour function
        return this._instance.exports.date_get_hour(datetime);
    }

    /**
     * Set the hour for the given datetime object.
     * @param {BigInt} datetime The starting date time value to set.
     * @param {Number} hour The new hour value to set (0 to 23).
     * @return {BitInt} A new datetime value contain the new hour value.
     */
    setHour(datetime, hour) {
        // Call and return the WASM date_set_hour function
        return this._instance.exports.date_set_hour(datetime, hour);
    }

    /**
     * Get minute from the datetime object.
     * @param {BigInt} datetime The date time value to get the minute from.
     * @return {Number} The minute value (0 to 59).
     */
    getMinute(datetime) {
        // Call and return the WASM date_get_minute function
        return this._instance.exports.date_get_minute(datetime);
    }

    /**
     * Set the minute for the given datetime object.
     * @param {BigInt} datetime The starting date time value to set.
     * @param {Number} minute The new minute value to set (0 to 59).
     * @return {BitInt} A new datetime value contain the new minute value.
     */
    setMinute(datetime, minute) {
        // Call and return the WASM date_set_minute function
        return this._instance.exports.date_set_minute(datetime, minute);
    }

    /**
     * Get second from the datetime object.
     * @param {BigInt} datetime The date time value to get the second from.
     * @return {Number} The second value (0 to 59).
     */
    getSecond(datetime) {
        // Call and return the WASM date_get_second function
        return this._instance.exports.date_get_second(datetime);
    }

    /**
     * Set the second for the given datetime object.
     * @param {BigInt} datetime The starting date time value to set.
     * @param {Number} second The new second value to set (0 to 59).
     * @return {BitInt} A new datetime value contain the new second value.
     */
    setSecond(datetime, second) {
        // Call and return the WASM date_set_second function
        return this._instance.exports.date_set_second(datetime, second);
    }

    /**
     * Get milliseconds from the datetime object.
     * @param {BigInt} datetime The date time value to get the milliseconds from.
     * @return {Number} The milliseconds value (0 to 999).
     */
    getMillisecond(datetime) {
        // Call and return the WASM date_get_millisecond function
        return this._instance.exports.date_get_millisecond(datetime);
    }

    /**
     * Set the milliseconds for the given datetime object.
     * @param {BigInt} datetime The starting date time value to set.
     * @param {Number} millisecond The new millisecond value to set (0 to 999).
     * @return {BitInt} A new datetime value contain the new millisecond value.
     */
    setMillisecond(datetime, millisecond) {
        // Call and return the WASM date_set_millisecond function
        return this._instance.exports.date_set_millisecond(datetime, millisecond);
    }

    /**
     * Checks if then given year is a leap year or not.
     * @param {Number} year The year to check
     * @return {Boolean} True if the given year is a leap year, false if it not.
     */
    isLeapYear(year) {
        // Call the WASM date_is_leap_year function
        const result = this._instance.exports.date_is_leap_year(year);

        // If result is 1 then the year is a leap year
        if (result === 1) return true;

        // Otherwise it is not a leap year
        return false;
    }

    /**
     * Get the number of days in the given month (depending on the year).
     * @param {Number} year The year to check with.
     * @param {Number} month The month to check with (1 to 12).
     * @return {Number} The number of days.
     */
    getDaysInMonth(year, month) {
        // Call and return the WASM date_get_days_in_month function
        return this._instance.exports.date_get_days_in_month(year, month);
    }

    /**
     * Get the number of leap years there have been since year 1 to the given year.
     * @param {number} year The year we want the leap year count up to.
     * @return {number} The number of leap years there has been.
     */
    getLeapYearCount(year) {
        // Call and return the WASM date_get_leap_year_count function
        return this._instance.exports.date_get_leap_year_count(year);
    }

    /**
     * Get the day of the year.
     * @param {number} year The year part of the date.
     * @param {number} month The month part of the date.
     * @param {number} day The day part of the date.
     * @return {number} The day number of the year.
     */
    getDayOfYear(year, month, day) {
        // Call and return the WASM date_get_day_of_year function
        return this._instance.exports.date_get_day_of_year(year, month, day);
    }

    /**
     * Get the day of the week.
     * @param {number} year The year part of the date.
     * @param {number} month The month part of the date.
     * @param {number} day The day part of the date.
     * @return {number} The day of the week (0=sunday).
     */
    getDayOfWeek(year, month, day) {
        // Call and return the WASM date_get_day_of_week function
        return this._instance.exports.date_get_day_of_week(year, month, day);
    }

    /**
     * Add the given years to the given datetime object.
     * @param {BigInt} datetime The starting date time value to add to.
     * @param {Number} years The number of years to add (this can be negative).
     * @return {BitInt} A new datetime value with the resulting value.
     */
    addYears(datetime, years) {
        // Call and return the WASM date_add_years function
        return this._instance.exports.date_add_years(datetime, years);
    }

    /**
     * Add the given months to the given datetime object.
     * @param {BigInt} datetime The starting date time value to add to.
     * @param {Number} months The number of months to add (this can be negative and over 12).
     * @return {BitInt} A new datetime value with the resulting value.
     */
    addMonths(datetime, months) {
        // Call and return the WASM date_add_months function
        return this._instance.exports.date_add_months(datetime, months);
    }

    /**
     * Add the given days to the given datetime object.
     * @param {BigInt} datetime The starting date time value to add to.
     * @param {Number} days The number of days to add (this can be negative and over a year).
     * @return {BitInt} A new datetime value with the resulting value.
     */
    addDays(datetime, days) {
        // Call and return the WASM date_add_days function
        return this._instance.exports.date_add_days(datetime, days);
    }

    /**
     * Add the given hours to the given datetime object.
     * @param {BigInt} datetime The starting date time value to add to.
     * @param {Number} hours The number of hours to add (this can be negative and over a day).
     * @return {BitInt} A new datetime value with the resulting value.
     */
    addHours(datetime, hours) {
        // Call and return the WASM date_add_hours function
        return this._instance.exports.date_add_hours(datetime, hours);
    }

    /**
     * Add the given minutes to the given datetime object.
     * @param {BigInt} datetime The starting date time value to add to.
     * @param {Number} minutes The number of minutes to add (this can be negative and over an hour).
     * @return {BitInt} A new datetime value with the resulting value.
     */
    addMinutes(datetime, minutes) {
        // Call and return the WASM date_add_minutes function
        return this._instance.exports.date_add_minutes(datetime, minutes);
    }

    /**
     * Add the given seconds to the given datetime object.
     * @param {BigInt} datetime The starting date time value to add to.
     * @param {Number} seconds The number of seconds to add (this can be negative and over a minute).
     * @return {BitInt} A new datetime value with the resulting value.
     */
    addSeconds(datetime, seconds) {
        // Call and return the WASM date_add_seconds function
        return this._instance.exports.date_add_seconds(datetime, seconds);
    }

    /**
     * Add the given milliseconds to the given datetime object.
     * @param {BigInt} datetime The starting date time value to add to.
     * @param {Number} milliseconds The number of milliseconds to add (this can be negative and over a second).
     * @return {BitInt} A new datetime value with the resulting value.
     */
    addMilliseconds(datetime, milliseconds) {
        // Create BigInt for milliseconds
        const millisecondBigInt = BigInt(milliseconds);

        // Call and return the WASM date_add_milliseconds function
        return this._instance.exports.date_add_milliseconds(datetime, millisecondBigInt);
    }

    /**
     * Convert given date into the total number of days from year 1, month 1, day 1.
     * @param {number} year The year part of the date.
     * @param {number} month The month part of the date.
     * @param {number} day The day part of the date.
     * @return {number} The total days.
     */
    convertDateToDays(year, month, day) {
        // Call and return the WASM date_convert_date_to_days function
        return this._instance.exports.date_convert_date_to_days(year, month, day);
    }

    /**
     * Convert given total number of days from year 1, month 1, day 1, into a date object.
     * @param {number} days The number of days from 0001/01/01.
     * @return {BigInt} The date time object.
     */
    convertDaysToDate(days) {
        // Call and return the WASM date_convert_days_to_date function
        return this._instance.exports.date_convert_days_to_date(days);
    }

    /**
     * Compare the two given datetime objects.
     * @param {BigInt} datetime1 The first date time value to check with.
     * @param {BigInt} datetime2 The second date time value to check against.
     * @return {Number} The compare result.
     *   +1 = datetime1 > datetime2
     *   -1 = datetime1 < datetime2
     *    0 = datetime1 = datetime2
     */
    compare(datetime1, datetime2) {
        // Call and return the WASM date_compare function
        return this._instance.exports.date_compare(datetime1, datetime2);
    }

    /**
     * Validate the given date parts.
     * @param {number} year The year part of the date.
     * @param {number} month The month part of the date.
     * @param {number} day The day part of the date.
     * @return {Boolean} True if the date is valid, false otherwise.
     */
    validateDate(year, month, day) {
        // Call the WASM date_validate_date function
        const result = this._instance.exports.date_validate_date(year, month, day);

        // If date is valid
        if (result === 1) return true;

        // Otherwise it is not valid
        return false;
    }

    /**
     * Validate the given time parts.
     * @param {number} hour The hour part of the time.
     * @param {number} minute The minute part of the time.
     * @param {number} second The second part of the time.
     * @param {number} millisecond The millisecond part of the time.
     * @return {Boolean} True if the time is valid, false otherwise.
     */
    validateTime(hour, minute, second, millisecond) {
        // Call the WASM date_validate_time function
        const result = this._instance.exports.date_validate_time(hour, minute, second, millisecond);

        // If time is valid
        if (result === 1) return true;

        // Otherwise it is not time
        return false;
    }
}
