class SearchQuery {
    constructor(startDate, interval, queryFromSheet) {
        this.startDate = startDate;
        this.endDate = this.calcEndDate(startDate, interval);
        this.periodQuery = this.buildPeriodQuery(startDate, this.endDate);
        if (interval < 1) {
            throw new Error('interval must be greater than 0 but ' + interval + ' was given');
        }
        this.interval = interval;
        this.queryFromSheet = queryFromSheet;
    }

    calcEndDate(startDate, interval) {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + (interval - 1));
        return endDate;
    }

    buildPeriodQuery(startDate, endDate) {
        const startYear = startDate.getFullYear();
        const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
        const startDay = String(startDate.getDate()).padStart(2, '0');

        const endYear = endDate.getFullYear();
        const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
        const endDay = String(endDate.getDate()).padStart(2, '0');

        return `merged:${startYear}-${startMonth}-${startDay}..${endYear}-${endMonth}-${endDay} `;
    }

    getQuery() {
        const defaultSearchQuery = 'is:pr is:merged ';
        const searchQuery = defaultSearchQuery + this.periodQuery + this.queryFromSheet;
        Logger.log(searchQuery);
        return searchQuery;
    }
}
