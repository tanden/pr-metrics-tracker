function callGraphQL(query, queryVariables) {
    const GITHUB_GQL_API_URL = 'https://api.github.com/graphql';
    const GITHUB_PAT = getAccessToken();
    const requestOptions = {
        method: 'post',
        contentType: 'application/json',
        headers: {
            'Authorization': `Bearer ${GITHUB_PAT}`,
        },
        payload: JSON.stringify({ query: query, variables: queryVariables }),
    };

    const response = UrlFetchApp.fetch(GITHUB_GQL_API_URL, requestOptions);
    return JSON.parse(response.getContentText());
}
