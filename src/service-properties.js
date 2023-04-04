function getQuerySheetId() {
    return PropertiesService.getScriptProperties().getProperty("PR_METRICS_TRACKER_QUERY_SHEET_ID");
}

function getAccessToken() {
    return PropertiesService.getScriptProperties().getProperty("PR_METRICS_TRACKER_PAT");
}
