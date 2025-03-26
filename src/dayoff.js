function getDayOff(startDate, endDate) {
    const dayoffs = getWeekends(startDate, endDate) + getJapaneseHolidayCount(startDate, endDate);
    return dayoffs;
}

function getWeekends(startDate, endDate) {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates.filter(date => date.getDay() === 0 || date.getDay() === 6).length;
}


function getJapaneseHolidayCount(startDate, endDate) {
    const calendarId = 'ja.japanese.official#holiday@group.v.calendar.google.com';

    const events = Calendar.Events.list(calendarId, {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
    });

    return events.items.length;
}
