const { Webhooks } = require("@octokit/webhooks");

// Initializing Webhooks API with custom GitHub Secret to authenticate webhooks.
const webhooks = new Webhooks({
    // Environment variable stored in AWS Lambda.
    secret: process.env.GITHUB_WEBHOOK_SECRET,
  });
  
// Function returns true if GitHub Request Digest matches calculated digest from GITHUB_WEBHOOK_SECRET
module.exports.verifyWebhookRequest = async (headerParam, requestBody) =>{
try {
    return await webhooks.verify(requestBody, headerParam);
} catch (err) {
    console.error(err);
    throw new Error("Unable to verify request");
    }   
}

  