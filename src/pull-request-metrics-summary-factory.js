class PullRequestMetricsSummaryFactory {
    static create(isSkipEpic, pullRequests, searchQuery) {
        if (isSkipEpic) {
            return new PullRequestMetricsSummary(pullRequests, searchQuery.startDate, searchQuery.endDate, searchQuery.interval);
        } else {
            return new PullRequestMetricsSummary(pullRequests, searchQuery.startDate, searchQuery.endDate, searchQuery.interval);
        }
    }
}
