function writeToSheet(csvDataArray, sheetName, destinationSpreadsheetId, startLine) {
    const spreadSheet = SpreadsheetApp.openById(destinationSpreadsheetId);
    let sheet = spreadSheet.getSheetByName(sheetName);
    if (!sheet) {
        sheet = spreadSheet.insertSheet(sheetName);
    }
    sheet.clear();
    sheet.getRange(startLine, 1, csvDataArray.length, csvDataArray[0].length).setValues(csvDataArray);
}

function writeDashboardToSheet(pullRequests, startDate, sheetName, destinationSpreadsheetId) {
    // leadTimeで降順に並べ替える
    pullRequests.sort((a, b) => b.getLeadTime() - a.getLeadTime());
    const csvDataArray = pullRequests.map((pr) => {
        return [
            pr.title,
            pr.repositoryName,
            pr.baseBranchName,
            pr.branchName,
            pr.url,
            secondsToHms(pr.getLeadTime()),
            pr.firstCommittedAt,
            pr.mergedAt,
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
        'firstCommittedAt',
        'mergedAt',
        'isEpic',
    ];
    csvDataArray.unshift(header);

    writeToSheet(csvDataArray, 'dashboard-' + sheetName, destinationSpreadsheetId, 30);
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
            secondsToHms(pr.getLeadTime()),
            secondsToHms(pr.getPRLeadTime()),
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

function secondsToHms(seconds) {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor(seconds % 86400 / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);

    const dDisplay = d > 0 ? d + 'd ' : '';
    const hDisplay = h > 0 ? h + 'h ' : '';
    const mDisplay = m > 0 ? m + 'm ' : '';
    const sDisplay = s > 0 ? s + 's ' : '';

    return dDisplay + hDisplay + mDisplay + sDisplay;
}

function getFormattedDate(date) {
    day = String(date.getDate());
    if (day.length < 2) {
        day = '0' + day;
    }

    month = String(date.getMonth() + 1);
    if (month.length < 2) {
        month = '0' + month;
    }

    year = date.getFullYear();

    return [year, month, day].join('/');
}
