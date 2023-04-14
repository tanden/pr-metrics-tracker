function getDayOff(startDate, endDate) {
    const dayoffs = getWeekends(startDate, endDate) + getJapaneseHolidayCount(startDate, endDate);
    Logger.log(dayoffs);
    return dayoffs;
}

function getWeekends(startDate, endDate) {
    const dates = [];
    const currentDate = new Date(startDate);
    const endDate = new Date(endDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates.filter(date => date.getDay() === 0 || date.getDay() === 6).length;
}


function getJapaneseHolidayCount(startDate, endDate) {
    const calendarId = 'japanese__ja@holiday.calendar.google.com';

    const events = Calendar.Events.list(calendarId, {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
    });
    Logger.log(events.items.length);

    return events.items.length;
}
