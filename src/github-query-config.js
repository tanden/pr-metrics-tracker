function getQueriesFromSheet() {
    const sheetId = getQuerySheetId();
    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('query');
    const dataRange = sheet.getDataRange();
    const rawData = dataRange.getValues();
    rawData.shift();
    const headers = [
        'sheetName',
        'initialDate',
        'interval',
        'githubQueryString',
        'destinationSpreadsheetId',
    ];

    const formattedData = rawData.map(row => {
        return row.reduce((obj, value, index) => {
          obj[headers[index]] = value;
          return obj;
        }, {});
      });
    return formattedData;
}

function generateStartDates(initialDate, interval) {
    const startDate = new Date(initialDate);
    const today = new Date();
    const dates = [];

    for (let currentDate = startDate; currentDate <= today; currentDate.setDate(currentDate.getDate() + interval)) {
        dates.push(new Date(currentDate));
    }

    return dates;
}
