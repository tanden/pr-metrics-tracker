function fetchPullRequest(searchQuery) {
    const result = [];

    let hasNextPage = true;
    let endCursor = null;
    while (hasNextPage) {
        const query = `
      query($endCursor: String) {
        search(type: ISSUE, first: 100, query: "${searchQuery}", after: $endCursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            ... on PullRequest {
              title
              author {
                login
              }
              repository {
                nameWithOwner
              }
              url
              commits(first: 1) {
                nodes {
                  commit {
                    authoredDate
                  }
                }
              }
              createdAt
              firstReview: reviews(first: 1) {
                nodes {
                  createdAt
                }
              }
              lastApprovedReview: reviews(last: 1, states: APPROVED) {
                nodes {
                  createdAt
                }
              }
              mergedAt
            }
          }
        }
        rateLimit {
          limit
          cost
          remaining
          resetAt
        }
      }
    `;

        const jsonResponse = callGraphQL(query, { endCursor: endCursor })
        const rateLimitInfo = jsonResponse.data.rateLimit;
        if (rateLimitInfo.remaining <= rateLimitInfo.cost) {
            const now = new Date();
            const resetAt = new Date(rateLimitInfo.resetAt);
            const waitTime = resetAt - now;
            Logger.log(`Waiting for rate limit reset: ${waitTime / 1000}s, ${waitTime / 1000 / 60}m`);
            const maxSleepTime = 360000; // 6分 = 360,000ミリ秒
            while (waitTime > 0) {
                const sleepTime = Math.min(waitTime, maxSleepTime);
                Utilities.sleep(sleepTime);
                waitTime -= sleepTime;
            }
        }

        const queryResponse = jsonResponse.data.search;
        hasNextPage = queryResponse.pageInfo.hasNextPage;
        endCursor = queryResponse.pageInfo.endCursor;

        const pullRequests = queryResponse.nodes.map((pr) =>
            new PullRequest(
                pr.title,
                pr.author.login,
                pr.repository.nameWithOwner,
                pr.url,
                pr.commits.nodes[0].commit.authoredDate,
                pr.createdAt,
                pr.firstReview.nodes[0]?.createdAt,
                pr.lastApprovedReview.nodes[0]?.createdAt,
                pr.mergedAt,
            )
        );
        result.push(...pullRequests);
    }

    return result;
}
