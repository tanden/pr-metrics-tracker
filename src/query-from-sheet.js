class QueryFromSheet {
    constructor(teamName, initialDate, interval, githubQueryString, isSkipEpic) {
        this.teamName = teamName;
        this.initialDate = initialDate;
        if (interval < 1) {
            throw new Error('interval must be greater than 0 but ' + interval + ' was given');
        }
        this.interval = interval;
        this.githubQueryString = githubQueryString;
        this.isSkipEpic = isSkipEpic;
        this.startDate = new Date(initialDate);
    }

    getStartDates() {
        const startDate = new Date(this.initialDate);
        const today = new Date();
        const dates = [];

        for (let currentDate = startDate; currentDate <= today; currentDate.setDate(currentDate.getDate() + this.interval)) {
            dates.push(new Date(currentDate));
        }
        if (dates.length > 1) {
            dates.pop();
        }

        return dates;
    }

    getSecondToLastStartDate() {
        const startDate = new Date(this.initialDate);
        const today = new Date();
        const dates = [];

        for (let currentDate = startDate; currentDate <= today; currentDate.setDate(currentDate.getDate() + this.interval)) {
            dates.push(new Date(currentDate));
        }
        if (dates.length > 1) {
            return dates[dates.length - 2];
        } else {
            return dates[0];
        }
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
        endDate.setDate(endDate.getDate() + (this.interval - 1));
        return endDate;
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
