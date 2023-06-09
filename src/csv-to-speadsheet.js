function writeToSheet(csvDataArray, sheetName, destinationSpreadsheetId) {
    const spreadSheet = SpreadsheetApp.openById(destinationSpreadsheetId);
    let sheet = spreadSheet.getSheetByName(sheetName);
    if (!sheet) {
        sheet = spreadSheet.insertSheet(sheetName);
    }
    sheet.clear();
    sheet.getRange(1, 1, csvDataArray.length, csvDataArray[0].length).setValues(csvDataArray);
}

function writePullRequestsToSheet(pullRequests, startDate, sheetName, destinationSpreadsheetId) {
    // leadTimeで降順に並べ替える
    pullRequests.sort((a, b) => b.getLeadTime() - a.getLeadTime());
    const csvDataArray = pullRequests.map((pr) => {
        return [
            pr.title,
            pr.url,
            pr.firstCommittedAt,
            pr.createdAt,
            pr.firstReviewedAt,
            pr.lastApprovedReviewedAt,
            pr.mergedAt,
            secondsToHms(pr.getLeadTime()),
            secondsToHms(pr.getPRLeadTime()),
            pr.getLeadTime(),
            pr.getPRLeadTime(),
        ];
    });

    const header = [
        'title',
        'url',
        'firstCommittedAt',
        'PROpenedAt',
        'firstReviewedAt',
        'lastApprovedReviewedAt',
        'mergedAt',
        'leadTime:dhms',
        'PRLeadTime:dhms',
        'leadTime:seconds',
        'PRLeadTime:seconds',
    ];
    csvDataArray.unshift(header);

    const pullRequestSheetName = getFormattedDate(new Date(startDate)) + ' PRs of ' + sheetName;

    writeToSheet(csvDataArray, pullRequestSheetName, destinationSpreadsheetId);
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
