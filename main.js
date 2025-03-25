function main() {
    const queries = getQueriesFromSheet('query');
    for (let query of queries) {
        const startDates = query.getStartDates();
        const summary = [];
        const interval = query.interval;
        const queryFromSheet = query.githubQueryString;
        const isSkipEpic = query.getIsSkipEpic();
        let iterationCounter = 0;
        for (let startDate of startDates) {
            const searchQuery = new SearchQuery(startDate, interval, queryFromSheet);
            const pullRequests = fetchPullRequest(searchQuery.getQuery());
            iterationCounter++;
            if ( iterationCounter === (startDates.length - 1) || iterationCounter === startDates.length) {
                writePullRequestsToSheet(pullRequests, startDate, query.sheetName, query.destinationSpreadsheetId);
            }
            const pullRequestMetricsSummary = PullRequestMetricsSummaryFactory.create(isSkipEpic, pullRequests, searchQuery.startDate, searchQuery.endDate, searchQuery.interval);
            const metricsSummaryCsvMapper = new MetricsSummaryCsvMapper(pullRequestMetricsSummary);
            if (summary.length === 0) {
                summary.push(getCsvHeader());
            }
            summary.push(metricsSummaryCsvMapper.getCsvRowData());
        }
        writeToSheet(summary, query.sheetName, query.destinationSpreadsheetId);
    }
}

function getMonthlyReport() {
    const queries = getQueriesFromSheet('query-monthly-report');
    const summary = [];
    summary.push(getCsvHeader());
    const pullRequests = [];
    for (let query of queries) {
        const startDates = query.getStartDateAsArray();
        const interval = query.interval;
        const queryFromSheet = query.githubQueryString;
        for (let startDate of startDates) {
            const searchQuery = new SearchQuery(startDate, interval, queryFromSheet);
            pullRequests.push(...fetchPullRequest(searchQuery.getQuery()));
        }
    }
    const isSkipEpic = true;
    const exQuery = queries[0];
    const pullRequestMetricsSummary = PullRequestMetricsSummaryFactory.create(isSkipEpic, pullRequests, exQuery.getStartDate(), exQuery.getEndDate(), exQuery.interval);
    const metricsSummaryCsvMapper = new MetricsSummaryCsvMapper(pullRequestMetricsSummary);
    summary.push(metricsSummaryCsvMapper.getCsvRowData());
    writePullRequestsToSheet(pullRequests, exQuery.getStartDate(), 'dashboard-monthly-report', exQuery.destinationSpreadsheetId);
    writeToSheet(summary, 'metrics-data-monthly-report', exQuery.destinationSpreadsheetId);
}
