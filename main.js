function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('カスタムメニュー')
        .addItem('データを取得', 'fetchData')
        .addItem('ダッシュボードを作成', 'createDashboard')
        .addToUi();
}

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
        writeToSheet(summary, query.teamName + ' メトリクスデータ', getDashboardSheetId(), 1);
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

function createMonthlyReport() {
    const queries = getMonthlyReportQueryFromSheet('query-monthly-report');
    let previousQueryTeamName = '';
    const setOfPullRequests = [];
    let pullRequests = {};
    queries.forEach((query, index) => {
        const dates = query.getDates();
        
        if (previousQueryTeamName && previousQueryTeamName !== query.teamName) {
            setOfPullRequests[previousQueryTeamName] = pullRequests;
            pullRequests = {};
        }
        dates.forEach(([startDate, interval]) => {
            const searchQuery = new SearchQuery(startDate, interval, query.githubQueryString);
            const fetchedPullRequests = fetchPullRequest(searchQuery.getQuery());

            if (pullRequests[startDate]) {
              const existing = pullRequests[startDate];
              existing.addPullRequests(fetchedPullRequests);
              pullRequests[startDate] = existing;
            } else {
              pullRequests[startDate] = new MonthlyPullRequests(fetchedPullRequests, startDate, interval);
            }
        });

        previousQueryTeamName = query.teamName;

        if (index === queries.length - 1) {
            setOfPullRequests[previousQueryTeamName] = pullRequests;
        }
    });

    for (const [teamName, pullRequests] of Object.entries(setOfPullRequests)) {
        const isSkipEpic = true;
        const summary = [];
        let latestPullRequests;
        for (const [startDate, monthlyPullRequests] of Object.entries(pullRequests)) {
            const pullRequestMetricsSummary = PullRequestMetricsSummaryFactory.create(isSkipEpic, monthlyPullRequests.pullRequests, monthlyPullRequests.startDate, monthlyPullRequests.getEndDate(), monthlyPullRequests.interval);
            const metricsSummaryCsvMapper = new MetricsSummaryCsvMapper(pullRequestMetricsSummary);
            if (summary.length === 0) {
                summary.push(getCsvHeader());
            }
            summary.push(metricsSummaryCsvMapper.getCsvRowData());
            latestPullRequests = monthlyPullRequests;
        }
        writeDashboardToSheet(latestPullRequests.pullRequests, latestPullRequests.startDate, `${teamName} マンスリーレポート`, getDashboardSheetId());
        writeToSheet(summary, `${teamName} マンスリーレポート データ`, getDashboardSheetId(), 1);
    }
}