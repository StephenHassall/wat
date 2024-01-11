/**
 * Run test function for date time in nodejs.
 */
import DateTimeTest from './date-time.js';
import DateTimeTools from "./tools.js";

// Create and run test function
const run = async function() {
    // Create and load it
    const dateTimeTest = new DateTimeTest();
    await dateTimeTest.load();

    // Set blank date time value
    let datetime = BigInt(0);

    // Check get/set year
    datetime = dateTimeTest.setYear(datetime, 2024);
    console.log('Set year to 2024 = ' + datetime.toString(16));
    console.log('Year is = ' + dateTimeTest.getYear(datetime));

    // Check get/set month
    datetime = dateTimeTest.setMonth(datetime, 2);
    console.log('Set month to 2 (feb) = ' + datetime.toString(16));
    console.log('Month is = ' + dateTimeTest.getMonth(datetime));

    // Check get/set day
    datetime = dateTimeTest.setDay(datetime, 14);
    console.log('Set day to 14 = ' + datetime.toString(16));
    console.log('Day is = ' + dateTimeTest.getDay(datetime));

    // Check get/set hour
    datetime = dateTimeTest.setHour(datetime, 18);
    console.log('Set hour to 18 = ' + datetime.toString(16));
    console.log('Hour is = ' + dateTimeTest.getHour(datetime));

    // Check get/set minute
    datetime = dateTimeTest.setMinute(datetime, 42);
    console.log('Set minute to 42 = ' + datetime.toString(16));
    console.log('Minute is = ' + dateTimeTest.getMinute(datetime));

    // Check get/set second
    datetime = dateTimeTest.setSecond(datetime, 53);
    console.log('Set second to 53 = ' + datetime.toString(16));
    console.log('Second is = ' + dateTimeTest.getSecond(datetime));

    // Check get/set millisecond
    datetime = dateTimeTest.setMillisecond(datetime, 834);
    console.log('Set millisecond to 834 = ' + datetime.toString(16));
    console.log('Millisecond is = ' + dateTimeTest.getMillisecond(datetime));

    // Reset everything
    console.log('Reset date time to 15/03/2025 19:43:54.835');
    datetime = dateTimeTest.setYear(datetime, 2025);
    datetime = dateTimeTest.setMonth(datetime, 3);
    datetime = dateTimeTest.setDay(datetime, 15);
    datetime = dateTimeTest.setHour(datetime, 19);
    datetime = dateTimeTest.setMinute(datetime, 43);
    datetime = dateTimeTest.setSecond(datetime, 54);
    datetime = dateTimeTest.setMillisecond(datetime, 835);
    DateTimeTools.logDateTime(dateTimeTest, datetime);

    // Convert to date time object
    console.log('Convert/create 16/04/2026 20:44:55.000');
    datetime = dateTimeTest.convertYMDHMS(2026, 4, 16, 20, 44, 55);
    DateTimeTools.logDateTime(dateTimeTest, datetime);

    // Convert from JavaScript Date object
    console.log('Convert/create from JS');
    console.log('1970/01/01 02:15:35.123 = 8135123');
    datetime = dateTimeTest.convertFromJs(8135123);
    DateTimeTools.logDateTime(dateTimeTest, datetime);
    
    let jsDate = new Date(Date.UTC(2000, 0, 1, 2, 15, 35, 123));
    let epoch = jsDate.getTime();
    console.log('JS Date = ' + jsDate.toUTCString() + ' = ' + epoch);
    datetime = dateTimeTest.convertFromJs(epoch);
    DateTimeTools.logDateTime(dateTimeTest, datetime);

    let now = new Date();
    epoch = now.getTime();
    console.log('JS Date = ' + now.toUTCString() + ' = ' + epoch);
    datetime = dateTimeTest.convertFromJs(epoch);
    DateTimeTools.logDateTime(dateTimeTest, datetime);

    // Convert to JavaScript Date object
    console.log('Convert/create to JS');
    datetime = dateTimeTest.convertFromJs(8135123);
    DateTimeTools.logDateTime(dateTimeTest, datetime);
    now = dateTimeTest.convertToJs(datetime);
    console.log(now.toUTCString());
    
    now = new Date();
    epoch = now.getTime();
    datetime = dateTimeTest.convertFromJs(epoch);
    DateTimeTools.logDateTime(dateTimeTest, datetime);
    now = dateTimeTest.convertToJs(datetime);
    console.log(now.toUTCString());

    // Check leap years
    console.log('Check leap year 1900 [no] = ' + dateTimeTest.isLeapYear(1900));
    console.log('Check leap year 1996 [yes] = ' + dateTimeTest.isLeapYear(1996));
    console.log('Check leap year 1997 [no] = ' + dateTimeTest.isLeapYear(1997));
    console.log('Check leap year 1998 [no] = ' + dateTimeTest.isLeapYear(1998));
    console.log('Check leap year 1999 [no] = ' + dateTimeTest.isLeapYear(1999));
    console.log('Check leap year 2000 [yes] = ' + dateTimeTest.isLeapYear(2000));
    console.log('Check leap year 2001 [no] = ' + dateTimeTest.isLeapYear(2001));
    console.log('Check leap year 2002 [no] = ' + dateTimeTest.isLeapYear(2002));
    console.log('Check leap year 2003 [no] = ' + dateTimeTest.isLeapYear(2003));
    console.log('Check leap year 2004 [yes] = ' + dateTimeTest.isLeapYear(2004));
    console.log('Check leap year 2100 [no] = ' + dateTimeTest.isLeapYear(2100));

    // Check number of days in a month
    console.log('Days in month 1900 Feb = ' + dateTimeTest.isLeapYear(1900, 2));
    console.log('Days in month 2000 Feb = ' + dateTimeTest.isLeapYear(2000, 2));
    console.log('Days in month 2100 Feb = ' + dateTimeTest.isLeapYear(2100, 2));
    console.log('Days in month 1999 Feb = ' + dateTimeTest.isLeapYear(1999, 2));
    console.log('Days in month 2024 01 = ' + dateTimeTest.isLeapYear(2024, 1));
    console.log('Days in month 2024 02 = ' + dateTimeTest.isLeapYear(2024, 2));
    console.log('Days in month 2024 03 = ' + dateTimeTest.isLeapYear(2024, 3));
    console.log('Days in month 2024 04 = ' + dateTimeTest.isLeapYear(2024, 4));
    console.log('Days in month 2024 05 = ' + dateTimeTest.isLeapYear(2024, 5));
    console.log('Days in month 2024 06 = ' + dateTimeTest.isLeapYear(2024, 6));
    console.log('Days in month 2024 07 = ' + dateTimeTest.isLeapYear(2024, 7));
    console.log('Days in month 2024 08 = ' + dateTimeTest.isLeapYear(2024, 8));
    console.log('Days in month 2024 09 = ' + dateTimeTest.isLeapYear(2024, 9));
    console.log('Days in month 2024 10 = ' + dateTimeTest.isLeapYear(2024, 10));
    console.log('Days in month 2024 11 = ' + dateTimeTest.isLeapYear(2024, 11));
    console.log('Days in month 2024 12 = ' + dateTimeTest.isLeapYear(2024, 12));

    // Check number of leap years
    console.log('Number of leap years up to 1996 = ' + dateTimeTest.getLeapYearCount(1996));
    console.log('Number of leap years up to 1997 = ' + dateTimeTest.getLeapYearCount(1997));
    console.log('Number of leap years up to 1998 = ' + dateTimeTest.getLeapYearCount(1998));
    console.log('Number of leap years up to 1999 = ' + dateTimeTest.getLeapYearCount(1999));
    console.log('Number of leap years up to 2000 = ' + dateTimeTest.getLeapYearCount(2000));
    console.log('Number of leap years up to 2001 = ' + dateTimeTest.getLeapYearCount(2001));
    console.log('Number of leap years up to 2002 = ' + dateTimeTest.getLeapYearCount(2002));
    console.log('Number of leap years up to 2003 = ' + dateTimeTest.getLeapYearCount(2003));
    console.log('Number of leap years up to 2004 = ' + dateTimeTest.getLeapYearCount(2004));
    console.log('Number of leap years up to 2005 = ' + dateTimeTest.getLeapYearCount(2005));

    // Check day of year
    console.log('Day of year for 2000/01/01 = ' + dateTimeTest.getDayOfYear(2000, 1, 1));
    console.log('Day of year for 2000/02/27 = ' + dateTimeTest.getDayOfYear(2000, 2, 27));
    console.log('Day of year for 2000/02/28 = ' + dateTimeTest.getDayOfYear(2000, 2, 28));
    console.log('Day of year for 2000/02/29 = ' + dateTimeTest.getDayOfYear(2000, 2, 29));
    console.log('Day of year for 2000/03/01 = ' + dateTimeTest.getDayOfYear(2000, 3, 1));
    console.log('Day of year for 2000/12/31 = ' + dateTimeTest.getDayOfYear(2000, 12, 31));
    console.log('Day of year for 2001/12/31 = ' + dateTimeTest.getDayOfYear(2001, 12, 31));

    // Check convert date to days
    console.log('Days upto 0001/01/01 = ' + dateTimeTest.convertDateToDays(1, 1, 1));
    console.log('Days upto 0001/01/02 = ' + dateTimeTest.convertDateToDays(1, 1, 2));
    console.log('Days upto 0001/02/01 = ' + dateTimeTest.convertDateToDays(1, 2, 1));
    console.log('Days upto 1970/01/01 = ' + dateTimeTest.convertDateToDays(1970, 1, 1));
    console.log('Days upto 2000/01/01 = ' + dateTimeTest.convertDateToDays(2000, 1, 1));
    console.log('Days upto 2000/02/27 = ' + dateTimeTest.convertDateToDays(2000, 2, 27));
    console.log('Days upto 2000/02/28 = ' + dateTimeTest.convertDateToDays(2000, 2, 28));
    console.log('Days upto 2000/02/29 = ' + dateTimeTest.convertDateToDays(2000, 2, 29));
    console.log('Days upto 2000/03/01 = ' + dateTimeTest.convertDateToDays(2000, 3, 1));
    console.log('Days upto 2000/12/31 = ' + dateTimeTest.convertDateToDays(2000, 12, 31));

    // Check convert days to date
    console.log('Days 1 > ');
    DateTimeTools.logDateTime(dateTimeTest, dateTimeTest.convertDaysToDate(1));
    console.log('Days 2 > ');
    DateTimeTools.logDateTime(dateTimeTest, dateTimeTest.convertDaysToDate(2));
    console.log('Days 32 > ');
    DateTimeTools.logDateTime(dateTimeTest, dateTimeTest.convertDaysToDate(32));
    console.log('Days 730120 > ');
    DateTimeTools.logDateTime(dateTimeTest, dateTimeTest.convertDaysToDate(730120));
    console.log('Days 730177 > ');
    DateTimeTools.logDateTime(dateTimeTest, dateTimeTest.convertDaysToDate(730177));
    console.log('Days 730178 > ');
    DateTimeTools.logDateTime(dateTimeTest, dateTimeTest.convertDaysToDate(730178));
    console.log('Days 730179 > ');
    DateTimeTools.logDateTime(dateTimeTest, dateTimeTest.convertDaysToDate(730179));
    console.log('Days 730180 > ');
    DateTimeTools.logDateTime(dateTimeTest, dateTimeTest.convertDaysToDate(730180));
    console.log('Days 730485 > ');
    DateTimeTools.logDateTime(dateTimeTest, dateTimeTest.convertDaysToDate(730485));

    // Check add functions
    DateTimeTools.testAddYears(dateTimeTest);
    DateTimeTools.testAddMonths(dateTimeTest);
    DateTimeTools.testAddDays(dateTimeTest);
    DateTimeTools.testAddHours(dateTimeTest);
    DateTimeTools.testAddMinutes(dateTimeTest);
    DateTimeTools.testAddSeconds(dateTimeTest);
    DateTimeTools.testAddMilliseconds(dateTimeTest);
    DateTimeTools.testDayOfWeek(dateTimeTest);

    // Test the date to days
    DateTimeTools.testDateToDays(dateTimeTest);

    // Test the days to date
    DateTimeTools.testDaysToDate(dateTimeTest);

    // Test compare
    DateTimeTools.testCompare(dateTimeTest);

    // Test validate
    DateTimeTools.testValidateDate(dateTimeTest);
    DateTimeTools.testValidateTime(dateTimeTest);
}();
