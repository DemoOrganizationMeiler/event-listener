const { Octokit } = require("@octokit/rest");
const logger = require('loglevel');

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  const addBranchProtection = async (repo) => {
    try {
        logger.debug("Adding branch protection for branch:" + repo)
        await octokit.rest.repos.updateBranchProtection({
            owner: process.env.GITHUB_ORGANIZATION,
            repo: repo,
            branch: process.env.DEFAULT_BRANCH_NAME,
            required_status_checks: null,
            enforce_admins: true,
            required_pull_request_reviews: {
                required_approving_review_count: 1
            },
            restrictions: {
                users: [],
                teams: []
            }
        });
    } catch (err) {
        logger.error(err)
    }
}
