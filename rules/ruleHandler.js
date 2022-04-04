const { addBranchProtection } = require("../api/github");



/*
Ruleset for GitHub Events. 

The function checks the x-github-event header to determine the behaviour.

    Case: Repository
        A repository has been created with a master branch -> Add branch protection and trigger Discord bot.
    
    Case: Pull Request
        A pull request has been openend -> trigger Discord bot.

    Case: Create
        A new branch has been created -> trigger Discord bot.
    
    Case: default
        Logging the unhandled event.

*/
module.exports.checkRequest = async (event, body, callback) => {
    let message;
    try{
        switch(event){
            case "repository":
                await addBranchProtection(body.repository.name);
                message = ":octopus: **" + body.sender.login + "** created a new repository called **" + body.repository.name + "**";
                break;
            case "pull_request":
                if(body.action === "opened" || "closed") {
                    message = ":octopus: **" + body.sender.login + "** **" + body.action + "** a PR! :octopus:";
                }
                break;
            case "create":
                if(body.ref_type === "branch") {
                    message = ":octopus: **" + body.sender.login + "** created a new branch  **" + body.ref +"** :octopus:";
                }
                break;
            case "pull_request_review":
                message = "PR review/comment for **" + body.pull_request.title + "** was submitted! :octopus:";
                break;
            default:
                console.warn("unhadnled event");
                console.log(event);
                break;
        }
        if(message && process.env.DISCORD_URL) {
            await callback(message)
        }

    } catch(err) {
        console.error(err);
        throw new Error("Request checking runs into error:" + err);
    }
}

