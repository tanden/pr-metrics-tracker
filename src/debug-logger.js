function log(pullRequestMetricsSummary) {
    for (let pullRequest of pullRequestMetricsSummary.pullRequests) {
        Logger.log(pullRequest.title);
        Logger.log(pullRequest.createdAt);
        Logger.log(pullRequest.mergedAt);
        Logger.log(pullRequest.getLeadTime());
        Logger.log(pullRequest.getPRLeadTime());
        Logger.log(pullRequest.getFromFirstCommitToPROpen());
        Logger.log(pullRequest.getFromPROpentoFirstReview());
        Logger.log(pullRequest.getFromFirstReviewToLastApprovedReview());
        Logger.log(pullRequest.getFromLastApprovedReviewToMerge());
    }
    Logger.log(`issueCount: ${pullRequestMetricsSummary.issueCount}`);

    Logger.log(`averageLeadTime: ${pullRequestMetricsSummary.getAverageLeadTime()}`);
    Logger.log(`averagePRLeadTime: ${pullRequestMetricsSummary.getAveragePRLeadTime()}`);
    Logger.log(`averageFromFirstCommitToPROpen: ${pullRequestMetricsSummary.getAverageFromFirstCommitToPROpen()}`);
    Logger.log(`averageFromPROpentoFirstReview: ${pullRequestMetricsSummary.getAverageFromPROpentoFirstReview()}`);
    Logger.log(`averageFromFirstRreviewToLastApprovedReview: ${pullRequestMetricsSummary.getAverageFromFirstRreviewToLastApprovedReview()}`);
    Logger.log(`averageFromLastApprovedReviewToMerge: ${pullRequestMetricsSummary.getAverageFromLastApprovedReviewToMerge()}`);

    Logger.log(`MedianLeadTime: ${pullRequestMetricsSummary.getMedianLeadTime()}`);
    Logger.log(`MedianPRLeadTime: ${pullRequestMetricsSummary.getMedianPRLeadTime()}`);
    Logger.log(`MedianFromFirstCommitToPROpen: ${pullRequestMetricsSummary.getMedianFromFirstCommitToPROpen()}`);
    Logger.log(`MedianFromPROpentoFirstReview: ${pullRequestMetricsSummary.getMedianFromPROpentoFirstReview()}`);
    Logger.log(`MedianFromFirstRreviewToLastApprovedReview: ${pullRequestMetricsSummary.getMedianFromFirstRreviewToLastApprovedReview()}`);
    Logger.log(`MedianFromLastApprovedReviewToMerge: ${pullRequestMetricsSummary.getMedianFromLastApprovedReviewToMerge()}`);
}
