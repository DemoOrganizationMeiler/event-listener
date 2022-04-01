const { Octokit } = require("@octokit/rest");

module.exports.addBranchProtection = async (repo) => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
      });

    try {
        console.log("Adding branch protection for branch:" + repo)
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
        console.log(err)
    }
}
