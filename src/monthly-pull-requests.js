class MonthlyPullRequests {
    constructor(pullRequests, startDate, interval){
        this.pullRequests = pullRequests;
        this.startDate = startDate;
        this.interval = interval;
    }

    getEndDate() {
        const endDate = new Date(this.startDate);
        endDate.setDate(endDate.getDate() + (this.interval - 1));
        return endDate;
    }

    addPullRequests(pullRequests) {
        this.pullRequests.push(...pullRequests);
    }
}