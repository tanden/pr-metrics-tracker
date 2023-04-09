function getQueriesFromSheet() {
    const sheetId = getQuerySheetId();
    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('query');
    const dataRange = sheet.getDataRange();
    const rawData = dataRange.getValues();
    rawData.shift(); // remove header
    return rawData.map(row => new QueryFromSheet(...row));
}
