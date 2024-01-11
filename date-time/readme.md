### Date Time

WASM does not have any date time functions that are common in other programming languages. Therefore
I have created some of them, which you can use within your own WAT code.

You can not get the current date and time. There is no time zone information.

All the below functions are prefixed with `$date_`. The current functions are available.

|Instruction|Details|
|---|---|
|`convert_ymdhms`|Convert the given year, month (1 to 12), day, hour, minute, second to a date time value.|
|`convert_from_js`|Convert the given JavaScript epoch date time (number of milliseconds from 1970) to a date time value.|
|`convert_to_js`|Convert the given date time into a JavaScript epoch date time (number of milliseconds from 1970).|
|`get_year`|Get the year part of the date and time.|
|`set_year`|Set the year part of the date and time.|
|`get_month`|Get the month part of the date and time (1 to 12).|
|`set_month`|Set the month part of the date and time (1 to 12).|
|`get_day`|Get the day part of the date and time (1 to 31).|
|`set_day`|Set the day part of the date and time (1 to 31).|
|`get_hour`|Get the hour part of the date and time (0 to 23).|
|`get_minute`|Get the minute part of the date and time (0 to 59).|
|`set_minute`|Set the minute part of the date and time (0 to 59).|
|`get_second`|Get the second part of the date and time (0 to 59).|
|`set_second`|Set the second part of the date and time (0 to 59).|
|`get_millisecond`|Get the milli-second part of the date and time (0 to 999).|
|`set_millisecond`|Set the milli-second part of the date and time (0 to 999).|
|`is_leap_year`|Is the given year a leap year?|
|`get_days_in_month`|Get days in month.|
|`get_day_of_year`|Get the day of year.|
|`get_day_of_week`|Get the day of week. 0=Sunday|
|`add_years`|Add the number of years to the given date time and returns the result. The years value can be negative. If the starting date was on feb 29 and the end year is not leap, then we move day to 28|
|`add_months`|Add the number of months to the given date time and returns the result. The month value can be negative. If the day is on the 31st of the month and the new month only has 30 or less days, then the day part will be moved to the last day of the month.|
|`add_days`|Add the number of days to the given date time and returns the result. The day value can be negative.|
|`add_hours`|Add the number of hours to the given date time and returns the result. The hours value can be negative.|
|`add_minutes`|Add the number of minutes to the given date time and returns the result. The minutes value can be negative.|
|`add_seconds`|Add the number of seconds to the given date time and returns the result. The seconds value can be negative.|
|`add_milliseconds`|Add the number of milliseconds to the given date time and returns the result. The value can be negative.|
|`compare`|Compare two date time objects.|
|`validate_date`|Validate the given date parts.|
|`validate_time`|Validate the given time parts.|

The below functions are used internally and aren't very useful on their own.

|Instruction|Details|
|---|---|
|`get_leap_year_count`|Get the number of leap years there have been since year 1 to the given year.|
|`convert_date_to_days`|Convert given date into the total number of days from year 1, month 1, day 1.|
|`convert_days_to_date`|Convert given number of days from year 1, month 1, day 1 into a date.|
