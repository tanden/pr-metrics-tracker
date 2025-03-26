function getQuerySheetId() {
    return PropertiesService.getScriptProperties().getProperty("PR_METRICS_TRACKER_QUERY_SHEET_ID");
}

function getAccessToken() {
    return PropertiesService.getScriptProperties().getProperty("PR_METRICS_TRACKER_PAT");
}

function getDataSheetId() {
    return PropertiesService.getScriptProperties().getProperty("PR_METRICS_TRACKER_DATA_SHEET_ID");
}

function getDashboardSheetId() {
    return PropertiesService.getScriptProperties().getProperty("PR_METRICS_TRACKER_DASHBOARD_SHEET_ID");
}
