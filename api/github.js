const { Octokit } = require("@octokit/rest");

/*
    Octokit dependency for calling GitHub API. 
    This function triggers branch protection.
*/
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

        // Creating and Issue and notifying me.
        await octokit.rest.issues.create({
            owner: process.env.GITHUB_ORGANIZATION,
            repo: repo,
            title: "Branch protection was activated for " + repo,
            body: "@" + process.env.GIT_OWNER + " new repository was created"
          });


    } catch (err) {
        console.error(err);
        throw new Error("Setting up branch protection runs into an error. Error: " + err);
    }
}