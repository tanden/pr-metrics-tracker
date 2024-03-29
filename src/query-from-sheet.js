class QueryFromSheet {
    constructor(sheetName, initialDate, interval, githubQueryString, destinationSpreadsheetId, isSkipEpic) {
        this.sheetName = sheetName;
        this.initialDate = initialDate;
        if (interval < 1) {
            throw new Error('interval must be greater than 0 but ' + interval + ' was given');
        }
        this.interval = interval;
        this.githubQueryString = githubQueryString;
        this.destinationSpreadsheetId = destinationSpreadsheetId;
        this.isSkipEpic = isSkipEpic;
    }

    getStartDates() {
        const startDate = new Date(this.initialDate);
        const today = new Date();
        const dates = [];

        for (let currentDate = startDate; currentDate <= today; currentDate.setDate(currentDate.getDate() + this.interval)) {
            dates.push(new Date(currentDate));
        }

        return dates;
    }

    getIsSkipEpic() {
        if (this.isSkipEpic === undefined) {
            return false;
        }
        if (this.isSkipEpic === true) {
            return true;
        }
        return false;
    }
}
