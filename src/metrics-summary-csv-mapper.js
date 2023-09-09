class MetricsSummaryCsvMapper {
    constructor(pullRequestMetricsSummary) {
        this.metricsSummary = pullRequestMetricsSummary;
    }

     // csvのヘッダーを取得する
     getCsvHeader() {
        return [
            'startDate',
            'endDate',
            'mergedPRCount',
            'uniqueAuthorCount',
            'averageLeadTime',
            'averagePRLeadTime',
            'averageFromFirstCommitToPROpen',
            'averageFromPROpenToFirstReview',
            'averageFromFirstRreviewToLastApprovedReview',
            'averageFromLastApprovedReviewToMerge',
            'medianLeadTime',
            'medianPRLeadTime',
            'medianFromFirstCommitToPROpen',
            'medianFromPROpenToFirstReview',
            'medianFromFirstRreviewToLastApprovedReview',
            'medianFromLastApprovedReviewToMerge',
            'averageAdditions',
            'averageDeletions',
            'averageModifiedLines',
            'medianAdditions',
            'medianDeletions',
            'medianModifiedLines',
            'merged / day / developer'
        ];
    }

    // csvの1行分のデータを取得する
    getCsvRowData() {
        return [
            this.metricsSummary.startDate,
            this.metricsSummary.endDate,
            this.metricsSummary.mergedPRCount,
            this.metricsSummary.getUniqueAuthorCount(),
            this.metricsSummary.getAverageLeadTime(),
            this.metricsSummary.getAveragePRLeadTime(),
            this.metricsSummary.getAverageFromFirstCommitToPROpen(),
            this.metricsSummary.getAverageFromPROpenToFirstReview(),
            this.metricsSummary.getAverageFromFirstRreviewToLastApprovedReview(),
            this.metricsSummary.getAverageFromLastApprovedReviewToMerge(),
            this.metricsSummary.getMedianLeadTime(),
            this.metricsSummary.getMedianPRLeadTime(),
            this.metricsSummary.getMedianFromFirstCommitToPROpen(),
            this.metricsSummary.getMedianFromPROpenToFirstReview(),
            this.metricsSummary.getMedianFromFirstRreviewToLastApprovedReview(),
            this.metricsSummary.getMedianFromLastApprovedReviewToMerge(),
            this.metricsSummary.getAverageAdditions(),
            this.metricsSummary.getAverageDeletions(),
            this.metricsSummary.getAverageModifiedLines(),
            this.metricsSummary.getMedianAdditions(),
            this.metricsSummary.getMedianDeletions(),
            this.metricsSummary.getMedianModifiedLines(),
            this.metricsSummary.getMergedPRCountPerDayPerDeveloper(),
        ];
    }
}
