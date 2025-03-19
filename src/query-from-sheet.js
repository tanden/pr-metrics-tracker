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

    getStartDateAsArray() {
        return [new Date(this.initialDate)];
    }

    getStartDate() {
      return new Date(this.initialDate);
    }

    getEndDate() {
        const startDate = new Date(this.initialDate);
        const endDate = new Date(startDate);
        return endDate.setDate(endDate.getDate() + (this.interval - 1));
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
