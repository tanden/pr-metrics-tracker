class PullRequest {
    constructor(title, author, url, firstCommittedAt, createdAt, firstReviewedAt, lastApprovedReviewedAt, mergedAt) {
        this.title = title;
        this.author = author;
        this.url = url;
        this.firstCommittedAt = firstCommittedAt;
        this.createdAt = createdAt;
        this.firstReviewedAt = firstReviewedAt;
        this.lastApprovedReviewedAt = lastApprovedReviewedAt;
        this.mergedAt = mergedAt;
    }

    milliToSeconds(durationInMilliSeconds) {
        return durationInMilliSeconds / 1000;
    }

    // 最初のコミットからマージされるまでの時間を取得する
    getLeadTime() {
        const duration = new Date(this.mergedAt) - new Date(this.firstCommittedAt);
        return this.milliToSeconds(duration);
    }

    // PRが作成されてからマージされるまでの時間を取得する
    getPRLeadTime() {
        const duration = new Date(this.mergedAt) - new Date(this.createdAt);
        return this.milliToSeconds(duration);
    }

    // 最初のコミットからPRが作成されるまでの時間を取得する
    getFromFirstCommitToPROpen() {
        const duration = new Date(this.createdAt) - new Date(this.firstCommittedAt);
        return this.milliToSeconds(duration);
    }

    // PRが作成されてから最初のレビューが行われるまでの時間を取得する
    getFromPROpentoFirstReview() {
        if (this.firstReviewedAt === undefined) {
            return null;
        }
        const duration = new Date(this.firstReviewedAt) - new Date(this.createdAt);
        return this.milliToSeconds(duration);
    }

    // 最初のレビューから最後のapproveが行われるまでの時間を取得する
    getFromFirstReviewToLastApprovedReview() {
        if (this.firstReviewedAt === undefined || this.lastApprovedReviewedAt === undefined) {
            return null;
        }
        const duration = new Date(this.lastApprovedReviewedAt) - new Date(this.firstReviewedAt);
        return this.milliToSeconds(duration);
    }

    // 最後のapproveからマージされるまでの時間を取得する
    getFromLastApprovedReviewToMerge() {
        if (this.lastApprovedReviewedAt === undefined) {
            return null;
        }
        const duration = new Date(this.mergedAt) - new Date(this.lastApprovedReviewedAt);
        return this.milliToSeconds(duration);
    }
}
