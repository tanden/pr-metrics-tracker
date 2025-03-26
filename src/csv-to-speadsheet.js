function writeToSheet(csvDataArray, sheetName, destinationSpreadsheetId, startLine) {
    const spreadSheet = SpreadsheetApp.openById(destinationSpreadsheetId);
    let sheet = spreadSheet.getSheetByName(sheetName);
    if (!sheet) {
        sheet = spreadSheet.insertSheet(sheetName);
    }
    sheet.clear();
    sheet.getRange(startLine, 1, csvDataArray.length, csvDataArray[0].length).setValues(csvDataArray);
    sheet.getRange(startLine, 1, 1, csvDataArray[0].length).setBackgroundColor('#ADD8E6');
}

function writeDashboardToSheet(pullRequests, startDate, sheetName, destinationSpreadsheetId) {
    // leadTimeで降順に並べ替える
    pullRequests.sort((a, b) => b.getLeadTime() - a.getLeadTime());
    const csvDataArray = pullRequests.map((pr) => {
        return [
            pr.title,
            pr.author,
            pr.repositoryName,
            `=HYPERLINK("${pr.url}", "${pr.branchName}")`,
            secondsToDhm(pr.getLeadTime()),
            pr.getLeadTimeInDays(),
            getFormattedDateTime(new Date(pr.firstCommittedAt)),
            getFormattedDateTime(new Date(pr.mergedAt)),
        ];
    });

    const header = [
        'タイトル',
        '作成者',
        'リポジトリ',
        'ブランチ',
        'リードタイム',
        'リードタイム:日数',
        '最初にコミットした日時',
        'マージされた日時',
    ];
    csvDataArray.unshift(header);

    writeToSheet(csvDataArray, sheetName + ' ダッシュボード', destinationSpreadsheetId, 40);
}

function writePullRequestsToSheet(pullRequests, startDate, sheetName, destinationSpreadsheetId) {
    // leadTimeで降順に並べ替える
    pullRequests.sort((a, b) => b.getLeadTime() - a.getLeadTime());
    const csvDataArray = pullRequests.map((pr) => {
        return [
            pr.title,
            pr.repositoryName,
            pr.baseBranchName,
            pr.branchName,
            pr.url,
            secondsToDhm(pr.getLeadTime()),
            secondsToDhm(pr.getPRLeadTime()),
            pr.getLeadTime(),
            pr.getPRLeadTime(),
            pr.firstCommittedAt,
            pr.createdAt,
            pr.firstReviewedAt,
            pr.lastApprovedReviewedAt,
            pr.mergedAt,
            pr.getAdditions(),
            pr.getDeletions(),
            pr.getModifiedLines(),
            pr.isEpic(),
        ];
    });

    const header = [
        'title',
        'repositoryName',
        'baseBranchName',
        'branchName',
        'url',
        'leadTime:dhms',
        'PRLeadTime:dhms',
        'leadTime:seconds',
        'PRLeadTime:seconds',
        'firstCommittedAt',
        'PROpenedAt',
        'firstReviewedAt',
        'lastApprovedReviewedAt',
        'mergedAt',
        'additions',
        'deletions',
        'modifiedLines',
        'isEpic',
    ];
    csvDataArray.unshift(header);

    writeToSheet(csvDataArray, sheetName, destinationSpreadsheetId, 1);
}

function secondsToDhm(seconds) {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor(seconds % 86400 / 3600);
    const m = Math.floor(seconds % 3600 / 60);

    const dDisplay = d > 0 ? d + 'd ' : '';
    const hDisplay = h > 0 ? h + 'h ' : '';
    const mDisplay = m > 0 ? m + 'm ' : '';

    return dDisplay + hDisplay + mDisplay;
}

function getFormattedDate(date) {
    let day = String(date.getDate());
    if (day.length < 2) {
        day = '0' + day;
    }

    let month = String(date.getMonth() + 1);
    if (month.length < 2) {
        month = '0' + month;
    }

    const year = date.getFullYear();

    return [year, month, day].join('/');
}

function getFormattedDateTime(date) {
    const formattedDate = getFormattedDate(date);

    let hours = String(date.getHours());
    if (hours.length < 2) {
        hours = '0' + hours;
    }

    let minutes = String(date.getMinutes());
    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }

    return formattedDate + ' ' + [hours, minutes].join(':');
}
