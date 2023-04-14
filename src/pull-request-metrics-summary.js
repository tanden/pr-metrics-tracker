class PullRequestMetricsSummary {
    constructor(pullRequests, startDate, endDate, interval) {
        this.pullRequests = pullRequests;
        this.mergedPRCount = pullRequests.length;
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
        return this.median(leadTimes);
    }

    // PRが作成されてからマージされるまでの中央値を取得する
    getMedianPRLeadTime() {
        if (this.pullRequests.length === 0) { return 0; }
        const leadTimes = this.pullRequests.map(pr => pr.getPRLeadTime());
        return this.median(leadTimes);
    }

    // 最初のコミットからPRが作成されるまでの中央値を取得する
    getMedianFromFirstCommitToPROpen() {
        if (this.pullRequests.length === 0) { return 0; }
        const leadTimes = this.pullRequests.map(pr => pr.getFromFirstCommitToPROpen());
        return this.median(leadTimes);
    }

    // PRが作成されてから最初のレビューが行われるまでの中央値を取得する
    getMedianFromPROpenToFirstReview() {
        const filteredPullRequests = this.pullRequests.filter(pr => pr.getFromPROpentoFirstReview() !== null);
        if (filteredPullRequests.length === 0) { return 0; }

        const leadTimes = filteredPullRequests.map(pr => pr.getFromPROpentoFirstReview());
        return this.median(leadTimes);
    }

    // 最初のレビューから最後のapproveが行われるまでの中央値を取得する
    getMedianFromFirstRreviewToLastApprovedReview() {
        const filteredPullRequests = this.pullRequests.filter(pr => pr.getFromFirstReviewToLastApprovedReview() !== null);
        if (filteredPullRequests.length === 0) { return 0; }

        const leadTimes = filteredPullRequests.map(pr => pr.getFromFirstReviewToLastApprovedReview());
        return this.median(leadTimes);
    }

    // 最後のapproveからマージされるまでの中央値を取得する
    getMedianFromLastApprovedReviewToMerge() {
        const filteredPullRequests = this.pullRequests.filter(pr => pr.getFromLastApprovedReviewToMerge() !== null);
        if (filteredPullRequests.length === 0) { return 0; }

        const leadTimes = filteredPullRequests.map(pr => pr.getFromLastApprovedReviewToMerge());
        return this.median(leadTimes);
    }

    getMergedPRCountPerDayPerDeveloper() {
        if (this.pullRequests.length === 0) { return 0; }
        const workDays = this.inverval - getDayOff(this.startDate, this.endDate);
        if (workDays === 0) { return 0; }

        return this.pullRequests.length / workDays / this.getUniqueAuthorCount();
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
            'merged / day / developer'
        ];
    }

    // csvの1行分のデータを取得する
    getCsvRowData() {
        return [
            this.startDate,
            this.endDate,
            this.mergedPRCount,
            this.getUniqueAuthorCount(),
            this.getAverageLeadTime(),
            this.getAveragePRLeadTime(),
            this.getAverageFromFirstCommitToPROpen(),
            this.getAverageFromPROpenToFirstReview(),
            this.getAverageFromFirstRreviewToLastApprovedReview(),
            this.getAverageFromLastApprovedReviewToMerge(),
            this.getMedianLeadTime(),
            this.getMedianPRLeadTime(),
            this.getMedianFromFirstCommitToPROpen(),
            this.getMedianFromPROpenToFirstReview(),
            this.getMedianFromFirstRreviewToLastApprovedReview(),
            this.getMedianFromLastApprovedReviewToMerge(),
            this.getMergedPRCountPerDayPerDeveloper(),
        ];
    }

    // 中央値を取得する
    median(leadTimes) {
        if (leadTimes.length === 0) { return 0; }
        leadTimes.sort((a, b) => a - b);
        const half = Math.floor(leadTimes.length / 2);

        if (leadTimes.length % 2) {
            return leadTimes[half];
        } else {
            return (leadTimes[half - 1] + leadTimes[half]) / 2;
        }
    }
}
