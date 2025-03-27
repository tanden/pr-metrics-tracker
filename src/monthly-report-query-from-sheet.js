class MonthlyReportQueryFromSheet {
    constructor(teamName, initialDate, githubQueryString, isSkipEpic) {
        this.teamName = teamName;
        this.initialDate = initialDate;
        this.githubQueryString = githubQueryString;
        this.isSkipEpic = isSkipEpic;
    }

    getDates() {
        const startDate = new Date(this.initialDate);
        const today = new Date();
        const dates = [];

        // 月初日を取得
        const firstDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        const lastPeriod = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        for (let currentDate = firstDayOfMonth; currentDate <= lastPeriod; currentDate.setMonth(currentDate.getMonth() + 1)) {
            // 月末日を取得
            const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            const interval = Math.floor((lastDayOfMonth - firstDayOfMonth) / (1000 * 60 * 60 * 24)) + 1;
            dates.push([new Date(currentDate), interval]);
        }
        if (dates.length > 1) {
            dates.pop();
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
