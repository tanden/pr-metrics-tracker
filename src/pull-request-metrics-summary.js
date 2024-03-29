class PullRequestMetricsSummary {
    constructor(pullRequests, skippedPullRequest, startDate, endDate, interval) {
        this.pullRequests = pullRequests;
        this.mergedPRCount = pullRequests.length;
        this.skippedPRCount = skippedPullRequest.length;
        this.startDate = startDate;
        this.endDate = endDate;
        this.inverval = interval;
    }

    // uniqueなauthorの数を取得する
    getUniqueAuthorCount() {
        const uniqueAuthors = new Set(this.pullRequests.map((pr) => pr.author));
        return uniqueAuthors.size;
    }

    // 最初のコミットからマージされるまでの平均時間を取得する
    getAverageLeadTime() {
        if (this.pullRequests.length === 0) { return 0; }
        const totalLeadTime = this.pullRequests.reduce((total, pr) => total + pr.getLeadTime(), 0);
        return totalLeadTime / this.pullRequests.length;
    }

    // PRが作成されてからマージされるまでの平均時間を取得する
    getAveragePRLeadTime() {
        if (this.pullRequests.length === 0) { return 0; }
        const totalPRLeadTime = this.pullRequests.reduce((total, pr) => total + pr.getPRLeadTime(), 0);
        return totalPRLeadTime / this.pullRequests.length;
    }

    // 最初のコミットからPRが作成されるまでの平均時間を取得する
    getAverageFromFirstCommitToPROpen() {
        if (this.pullRequests.length === 0) { return 0; }
        const totalFromFirstCommitToPROpen = this.pullRequests.reduce((total, pr) => total + pr.getFromFirstCommitToPROpen(), 0);
        return totalFromFirstCommitToPROpen / this.pullRequests.length;
    }

    // PRが作成されてから最初のレビューが行われるまでの平均時間を取得する
    // レビューのあるPRが1つもない場合は0を返す
    getAverageFromPROpenToFirstReview() {
        const filteredPullRequests = this.pullRequests.filter(pr => pr.getFromPROpentoFirstReview() !== null);
        if (filteredPullRequests.length === 0) { return 0; }

        const totalFromPROpentoFirstReview = filteredPullRequests.reduce((total, pr) => total + pr.getFromPROpentoFirstReview(), 0);
        return totalFromPROpentoFirstReview / filteredPullRequests.length;
    }

    // 最初のレビューから最後のapproveが行われるまでの平均時間を取得する
    // レビューのあるPRが1つもない場合は0を返す
    getAverageFromFirstRreviewToLastApprovedReview() {
        const filteredPullRequests = this.pullRequests.filter(pr => pr.getFromFirstReviewToLastApprovedReview() !== null);
        if (filteredPullRequests.length === 0) { return 0; }

        const totalFromFirstRreviewToLastApprovedReview = filteredPullRequests.reduce((total, pr) => total + pr.getFromFirstReviewToLastApprovedReview(), 0);
        return totalFromFirstRreviewToLastApprovedReview / filteredPullRequests.length;
    }

    // 最後のapproveからマージされるまでの平均時間を取得する
    // レビューのあるPRが1つもない場合は0を返す
    getAverageFromLastApprovedReviewToMerge() {
        const filteredPullRequests = this.pullRequests.filter(pr => pr.getFromLastApprovedReviewToMerge() !== null);
        if (filteredPullRequests.length === 0) { return 0; }

        const totalFromLastApprovedReviewToMerge = filteredPullRequests.reduce((total, pr) => total + pr.getFromLastApprovedReviewToMerge(), 0);
        return totalFromLastApprovedReviewToMerge / filteredPullRequests.length;
    }

    // 最初のコミットからマージされるまでの中央値を取得する
    getMedianLeadTime() {
        if (this.pullRequests.length === 0) { return 0; }
        const leadTimes = this.pullRequests.map(pr => pr.getLeadTime());
        return median(leadTimes);
    }

    // PRが作成されてからマージされるまでの中央値を取得する
    getMedianPRLeadTime() {
        if (this.pullRequests.length === 0) { return 0; }
        const leadTimes = this.pullRequests.map(pr => pr.getPRLeadTime());
        return median(leadTimes);
    }

    // 最初のコミットからPRが作成されるまでの中央値を取得する
    getMedianFromFirstCommitToPROpen() {
        if (this.pullRequests.length === 0) { return 0; }
        const leadTimes = this.pullRequests.map(pr => pr.getFromFirstCommitToPROpen());
        return median(leadTimes);
    }

    // PRが作成されてから最初のレビューが行われるまでの中央値を取得する
    getMedianFromPROpenToFirstReview() {
        const filteredPullRequests = this.pullRequests.filter(pr => pr.getFromPROpentoFirstReview() !== null);
        if (filteredPullRequests.length === 0) { return 0; }

        const leadTimes = filteredPullRequests.map(pr => pr.getFromPROpentoFirstReview());
        return median(leadTimes);
    }

    // 最初のレビューから最後のapproveが行われるまでの中央値を取得する
    getMedianFromFirstRreviewToLastApprovedReview() {
        const filteredPullRequests = this.pullRequests.filter(pr => pr.getFromFirstReviewToLastApprovedReview() !== null);
        if (filteredPullRequests.length === 0) { return 0; }

        const leadTimes = filteredPullRequests.map(pr => pr.getFromFirstReviewToLastApprovedReview());
        return median(leadTimes);
    }

    // 最後のapproveからマージされるまでの中央値を取得する
    getMedianFromLastApprovedReviewToMerge() {
        const filteredPullRequests = this.pullRequests.filter(pr => pr.getFromLastApprovedReviewToMerge() !== null);
        if (filteredPullRequests.length === 0) { return 0; }

        const leadTimes = filteredPullRequests.map(pr => pr.getFromLastApprovedReviewToMerge());
        return median(leadTimes);
    }

    getMergedPRCountPerDayPerDeveloper() {
        if (this.pullRequests.length === 0) { return 0; }
        const workDays = this.inverval - getDayOff(this.startDate, this.endDate);
        if (workDays === 0) { return 0; }

        return this.pullRequests.length / workDays / this.getUniqueAuthorCount();
    }

    getAverageAdditions() {
        if (this.pullRequests.length === 0) { return 0; }
        const totalAdditions = this.pullRequests.reduce((total, pr) => total + pr.getAdditions(), 0);
        return totalAdditions / this.pullRequests.length;
    }

    getAverageDeletions() {
        if (this.pullRequests.length === 0) { return 0; }
        const totalDeletions = this.pullRequests.reduce((total, pr) => total + pr.getDeletions(), 0);
        return totalDeletions / this.pullRequests.length;
    }

    getAverageModifiedLines() {
        if (this.pullRequests.length === 0) { return 0; }
        const totalModifiedLines = this.pullRequests.reduce((total, pr) => total + pr.getModifiedLines(), 0);
        return totalModifiedLines / this.pullRequests.length;
    }

    getMedianAdditions() {
        if (this.pullRequests.length === 0) { return 0; }
        const additions = this.pullRequests.map(pr => pr.getAdditions());
        return median(additions);
    }

    getMedianDeletions() {
        if (this.pullRequests.length === 0) { return 0; }
        const deletions = this.pullRequests.map(pr => pr.getDeletions());
        return median(deletions);
    }

    getMedianModifiedLines() {
        if (this.pullRequests.length === 0) { return 0; }
        const modifiedLines = this.pullRequests.map(pr => pr.getModifiedLines());
        return median(modifiedLines);
    }
}
