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
        this.sortFirstCommittedAt();
    }

    // 最初のcommitはforce pushによりPROpenや最初のレビュー、最後のレビューより前に行われるとは限らない
    // 最初のコミットは一番先頭から最後のapproveの後ろまで移動する可能性があるので、バブルソート的にソートして順番を入れ替える
    sortFirstCommittedAt() {
        // 最初のコミットがPR作成よりあとになっていたら入れ替える
        if (this.firstCommittedAt > this.createdAt) {
            const tmp = this.firstCommittedAt;
            this.firstCommittedAt = this.createdAt;
            this.createdAt = tmp;
        }

        // 最初のコミットが最初のレビューよりあとになっていたら入れ替える
        if (this.createdAt > this.firstReviewedAt) {
            const tmp = this.createdAt;
            this.createdAt = this.firstReviewedAt;
            this.firstReviewedAt = tmp;
        }

        // 最初のコミットが最後のapproveよりあとになっていたら入れ替える
        if (this.firstReviewedAt > this.lastApprovedReviewedAt) {
            const tmp = this.firstReviewedAt;
            this.firstReviewedAt = this.lastApprovedReviewedAt;
            this.lastApprovedReviewedAt = tmp;
        }
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
