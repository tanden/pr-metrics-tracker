class MetricsSummaryCsvMapper {
    constructor(pullRequestMetricsSummary) {
        this.metricsSummary = pullRequestMetricsSummary;
    }

    // csvの1行分のデータを取得する
    getCsvRowData() {
        return [
            this.metricsSummary.startDate,
            this.metricsSummary.endDate,
            this.metricsSummary.mergedPRCount,
            this.metricsSummary.getUniqueAuthorCount(),
            this.metricsSummary.getAverageLeadTime()/60/60/24,
            this.metricsSummary.getAveragePRLeadTime()/60/60/24,
            this.metricsSummary.getAverageFromFirstCommitToPROpen()/60/60/24,
            this.metricsSummary.getAverageFromPROpenToFirstReview()/60/60/24,
            this.metricsSummary.getAverageFromFirstRreviewToLastApprovedReview()/60/60/24,
            this.metricsSummary.getAverageFromLastApprovedReviewToMerge()/60/60/24,
            this.metricsSummary.getMedianLeadTime()/60/60/24,
            this.metricsSummary.getMedianPRLeadTime()/60/60/24,
            this.metricsSummary.getMedianFromFirstCommitToPROpen()/60/60/24,
            this.metricsSummary.getMedianFromPROpenToFirstReview()/60/60/24,
            this.metricsSummary.getMedianFromFirstRreviewToLastApprovedReview()/60/60/24,
            this.metricsSummary.getMedianFromLastApprovedReviewToMerge()/60/60/24,
            this.metricsSummary.getAverageAdditions(),
            this.metricsSummary.getAverageDeletions(),
            this.metricsSummary.getAverageModifiedLines(),
            this.metricsSummary.getMedianAdditions(),
            this.metricsSummary.getMedianDeletions(),
            this.metricsSummary.getMedianModifiedLines(),
            this.metricsSummary.getMergedPRCountPerDayPerDeveloper(),
            this.metricsSummary.skippedPRCount,
        ];
    }
}
