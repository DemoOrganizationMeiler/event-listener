import { addBranchProtection } from "../api/github";
import { postMessage } from "../api/discord";

export async function checkRequest(event, body) {
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
            default:
                console.log("unhandled event!");
                console.log(event);
                break;
        }
    } catch(err) {
        console.log(err);
    }
}

