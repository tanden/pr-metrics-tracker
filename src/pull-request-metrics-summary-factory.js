class PullRequestMetricsSummaryFactory {
    static create(isSkipEpic, pullRequests, searchQuery) {
        if (isSkipEpic) {
            return new PullRequestMetricsSummary(
                pullRequests.filter(pr => pr.isNotEpic()),
                pullRequests.filter(pr => pr.isEpic()),
                searchQuery.startDate,
                searchQuery.endDate,
                searchQuery.interval
            );
        } else {
            return new PullRequestMetricsSummary(
                pullRequests,
                [],
                searchQuery.startDate,
                searchQuery.endDate,
                searchQuery.interval
            );
        }
    }
}
