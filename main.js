function main() {
    const queries = getQueriesFromSheet();
    for (let query of queries) {
        const startDates = generateStartDates(query.initialDate, query.interval);
        const summary = [];
        const interval = query.interval;
        const queryFromSheet = query.githubQueryString;
        for (let startDate of startDates) {
            const searchQuery = new SearchQuery(startDate, interval, queryFromSheet);
            const pullRequests = fetchPullRequest(searchQuery.getQuery());
            const pullRequestMetricsSummary = new PullRequestMetricsSummary(pullRequests, searchQuery.startDate, searchQuery.endDate);
            if (summary.length === 0) {
                summary.push(pullRequestMetricsSummary.getCsvHeader());
            }
            summary.push(pullRequestMetricsSummary.getCsvRowData());
        }
        writeToSheet(summary, query.sheetName, query.destinationSpreadsheetId);
    }
}
