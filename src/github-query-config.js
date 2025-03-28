function getQueriesFromSheet(querySheetName) {
    const sheetId = getQuerySheetId();
    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(querySheetName);
    const dataRange = sheet.getDataRange();
    const rawData = dataRange.getValues();
    rawData.shift(); // remove header
    return rawData.map(row => new QueryFromSheet(...row));
}

function getMonthlyReportQueryFromSheet(querySheetName) {
    const sheetId = getQuerySheetId();
    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(querySheetName);
    const dataRange = sheet.getDataRange();
    const rawData = dataRange.getValues();
    rawData.shift(); // remove header
    return rawData.map(row => new MonthlyReportQueryFromSheet(...row));
}