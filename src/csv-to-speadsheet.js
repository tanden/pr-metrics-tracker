function writeToSheet(csvDataArray, sheetName, destinationSpreadsheetId) {
    const spreadSheet = SpreadsheetApp.openById(destinationSpreadsheetId);
    let sheet = spreadSheet.getSheetByName(sheetName);
    if (!sheet) {
        sheet = spreadSheet.insertSheet(sheetName);
    }
    sheet.clear();
    sheet.getRange(1, 1, csvDataArray.length, csvDataArray[0].length).setValues(csvDataArray);
}
