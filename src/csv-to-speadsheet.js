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
    const pullRequestSheetName = getFormattedDate(new Date(startDate)) + ' / ' + sheetName;
    const header = [
        'title',
        'author',
        'url',
        'firstCommittedAt',
        'PROpenedAt',
        'firstReviewedAt',
        'lastApprovedReviewedAt',
        'mergedAt',
        'leadTime',
        'PRLeadTime',
    ];
    const csvDataArray = pullRequests.map((pr) => {
        return [
            pr.title,
            pr.author,
            pr.url,
            pr.firstCommittedAt,
            pr.createdAt,
            pr.firstReviewedAt,
            pr.lastApprovedReviewedAt,
            pr.mergedAt,
            pr.getLeadTime(),
            pr.getPRLeadTime(),
        ];
    });
    // leadTimeで降順に並べ替える
    csvDataArray.sort((a, b) => b[8] - a[8]);
    csvDataArray.unshift(header);

    writeToSheet(csvDataArray, pullRequestSheetName, destinationSpreadsheetId);
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

    return [year, month, day].join('-');
}
