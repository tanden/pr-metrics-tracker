function fetchData() {
    const queries = getQueriesFromSheet('query-by-team');
    for (let query of queries) {
        const startDates = query.getStartDates();
        const summary = [];
        const interval = query.interval;
        const queryFromSheet = query.githubQueryString;
        const isSkipEpic = query.getIsSkipEpic();
        for (let startDate of startDates) {
            const searchQuery = new SearchQuery(startDate, interval, queryFromSheet);
            const pullRequests = fetchPullRequest(searchQuery.getQuery());
            const pullRequestMetricsSummary = PullRequestMetricsSummaryFactory.create(isSkipEpic, pullRequests, searchQuery.startDate, searchQuery.endDate, searchQuery.interval);
            const metricsSummaryCsvMapper = new MetricsSummaryCsvMapper(pullRequestMetricsSummary);
            if (summary.length === 0) {
                summary.push(getCsvHeader());
            }
            summary.push(metricsSummaryCsvMapper.getCsvRowData());
        }
        writeToSheet(summary, query.teamName + ' メトリクスデータ', getDataSheetId(), 1);
    }
}

function createDashboard() {
    const queries = getQueriesFromSheet('query-by-team');
    for (let query of queries) {
        const lastStartDate = query.getSecondToLastStartDate();
        const interval = query.interval;
        const queryFromSheet = query.githubQueryString;
        const searchQuery = new SearchQuery(lastStartDate, interval, queryFromSheet);
        const pullRequests = fetchPullRequest(searchQuery.getQuery());
        const isSkipEpic = query.getIsSkipEpic();

        if (isSkipEpic) {
            writeDashboardToSheet(pullRequests.filter(pr => pr.isNotEpic()), lastStartDate, query.teamName, getDashboardSheetId());
        } else {
            writeDashboardToSheet(pullRequests, lastStartDate, query.teamName, getDashboardSheetId());
        }
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
    writeDashboardToSheet(pullRequests, exQuery.getStartDate(), 'monthly-report' , getDashboardSheetId());
    writeToSheet(summary, 'metrics-data-monthly-report', getDataSheetId(), 1);
}
