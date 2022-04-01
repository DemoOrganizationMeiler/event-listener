import { addBranchProtection } from "../api/github";
import { postMessage } from "../api/discord";

export async function checkRequest(body) {
    try{
        switch(body.action){
            case "created":
                await addBranchProtection(body.repository.name);
                await postMessage("User: " + body.sender.login + " created the new repository: " + body.repository.name);
                break;
            case "pull":
                break;
            default:
                break;
        }
    } catch(err) {
        console.log(err);
    }
}

