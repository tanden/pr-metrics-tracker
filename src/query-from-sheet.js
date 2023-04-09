class QueryFromSheet {
  constructor(sheetName, initialDate, interval, githubQueryString, destinationSpreadsheetId) {
    this.sheetName = sheetName;
    this.initialDate = initialDate;
    if (interval < 1) {
        throw new Error('interval must be greater than 0 but ' + interval + ' was given');
    }
    this.interval = interval;
    this.githubQueryString = githubQueryString;
    this.destinationSpreadsheetId = destinationSpreadsheetId;
  }
}
