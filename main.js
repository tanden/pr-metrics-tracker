function main() {
    const queries = getQueriesFromSheet();
    for (let query of queries) {
        const startDates = query.getStartDates();
        const summary = [];
        const interval = query.interval;
        const queryFromSheet = query.githubQueryString;
        let iterationCounter = 0;
        for (let startDate of startDates) {
            const searchQuery = new SearchQuery(startDate, interval, queryFromSheet);
            const pullRequests = fetchPullRequest(searchQuery.getQuery());
            iterationCounter++;
            if (iterationCounter === startDates.length) {
                writePullRequestsToSheet(pullRequests, startDate, query.sheetName, query.destinationSpreadsheetId);
            }
            const pullRequestMetricsSummary = new PullRequestMetricsSummary(pullRequests, searchQuery.startDate, searchQuery.endDate, searchQuery.interval);
            if (summary.length === 0) {
                summary.push(pullRequestMetricsSummary.getCsvHeader());
            }
            summary.push(pullRequestMetricsSummary.getCsvRowData());
        }
        writeToSheet(summary, query.sheetName, query.destinationSpreadsheetId);
    }
}
