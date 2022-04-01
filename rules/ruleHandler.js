const { addBranchProtection } = require("../api/github");
const { postMessage } = require("../api/discord");

module.exports.checkRequest = async (event, body) => {
    try{
        switch(event){
            case "repository":
                await addBranchProtection(body.repository.name);
                await postMessage("User: " + body.sender.login + " created the new repository: " + body.repository.name);
                break;
            case "pull_request":
                await postMessage("User: " + body.pull_request.user.login + " created a new PR!");
                break;
            case "create":
                if(body.ref_type === "branch") {
                    await postMessage("User: " + body.sender.login + " created a new branch: " + body.ref);
                }
                break;
            case "pull_request_review":
                await postMessage("PR review/comment for " + body.pull_request.title + " was submitted!")
                break;
            default:
                console.log("unhandled event!");
                console.log(event);
                break;
        }
    } catch(err) {
        console.log(err);
    }
}

