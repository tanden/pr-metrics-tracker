# pr-metrics-tracker

## How to setup
### nodevn
https://github.com/nodenv/nodenv#installation

### clasp

```
$ npm install
$ npx clasp --version
# 2.4.2
```

Before logging in, enable the Google Apps Script API: https://script.google.com/home/usersettings

```
$ npx clasp login
```

#### create project
```
$ npx clasp create
? Create which script? standalone
Created new standalone script: https://script.google.com/d/xxxxxx/edit
```

Choose 'standalone', and then a Google App Script project will be created.

#### Push script
```
$ npx clasp push
Pushed 11 files.
```
#### Set script properties
You can use `query-template.csv` as a PR metrics tracker query sheet. Import `query-template.csv` to create a spreadsheet, and then obtain the spreadsheet ID, which can be used as PR_METRICS_TRACKER_QUERY_SHEET_ID.

After creating the query spreadsheet, set the script properties PR_METRICS_TRACKER_QUERY_SHEET_ID and PR_METRICS_TRACKER_PAT in the project configuration.

### PR metrics tracker query sheet
#### sheetName
You can specify the name of the destination sheet.

#### initialDate
You can set the starting date for data retrieval in the query.

#### interval
You can set the interval for aggregating Pull Request metrics.

#### githubQueryString
You can set the search query for the GitHub API (by default, is:pr is:merged is already specified).

#### destinationSpreadSheetId
You can specify destination spread sheet id to output PR metrics.
