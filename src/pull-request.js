class PullRequest {
    constructor(title, author, repositoryName, url, firstCommittedAt, createdAt, firstReviewedAt, lastApprovedReviewedAt, mergedAt) {
        this.title = title;
        this.author = author;
        this.repositoryName = repositoryName;
        this.url = url;
        [
            this.firstCommittedAt,
            this.createdAt,
            this.firstReviewedAt,
            this.lastApprovedReviewedAt,
        ] = this.sortFirstCommittedAt(firstCommittedAt, createdAt, firstReviewedAt, lastApprovedReviewedAt);
        this.mergedAt = mergedAt;
    }

    // 1st commitはforce pushによりPROpenや1st review、last approved review より前に行われるとは限らない
    // force commitが実施されたケースを考慮して時系列順に並べ変えることにする
    // 並び替えると各イベント名と中身が合わなくなってしまうデメリットはあるが、durationの計算結果がマイナスになるのを防ぐためこの方法をとる
    // force pushがなければ 1st commitが一番最初にくる
    // 1st commit -> PROpen -> 1st review -> last approved review -> merge
    // force pushがあれば、以下のパターンのどこかに1st commitが入る
    // PROpen -> 1st commit -> 1st review -> last approved review -> merge
    // PROpen -> 1st review -> 1st commit -> last approved review -> merge
    // PROpen -> 1st review -> last approved review -> 1st commit -> merge
    sortFirstCommittedAt(firstCommittedAt, createdAt, firstReviewedAt, lastApprovedReviewedAt) {
        const dateFirstCommittedAt = new Date(firstCommittedAt);
        const dateCreatedAt = new Date(createdAt);

        // コメントのみでmergeした場合は、last approved reviewはundefinedになる
        // コメントもapproveもなくmergeした場合は、1st reviewもlast approved reviewもundefinedになる
        // 1st reviewだけundefinedになるケースは存在しない
        const dateFirstReviewedAt = (firstReviewedAt === undefined) ? undefined : new Date(firstReviewedAt);
        const dateLastApprovedReviewedAt = (lastApprovedReviewedAt === undefined) ? undefined : new Date(lastApprovedReviewedAt);
        
        if (dateLastApprovedReviewedAt < dateFirstCommittedAt) {
            // このケースがtrueの場合、last approved reviewはundefinedではないということ
            // 1st reviewだけundefinedになるケースは存在しないので、createdAt相当でundefinedが返却されることはない
            return [createdAt, firstReviewedAt, lastApprovedReviewedAt, firstCommittedAt];
        }

        if (dateFirstReviewedAt < dateFirstCommittedAt) {
            // 1st reviewがundefinedの場合はfalseになるので、createdAt相当でundefinedが返却されることはない
            return [createdAt, firstReviewedAt, firstCommittedAt, lastApprovedReviewedAt];
        }

        if (dateCreatedAt < dateFirstCommittedAt) {
            return [createdAt, firstCommittedAt, firstReviewedAt, lastApprovedReviewedAt];
        }

        return [firstCommittedAt, createdAt, firstReviewedAt, lastApprovedReviewedAt];
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
