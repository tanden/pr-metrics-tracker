class PullRequestMetricsSummaryFactory {
    static create(isSkipEpic, pullRequests, startDate, endDate, interval) {
        if (isSkipEpic) {
            return new PullRequestMetricsSummary(
                pullRequests.filter(pr => pr.isNotEpic()),
                pullRequests.filter(pr => pr.isEpic()),
                startDate,
                endDate,
                interval
            );
        } else {
            return new PullRequestMetricsSummary(
                pullRequests,
                [],
                startDate,
                endDate,
                interval
            );
        }
    }
}
