const { checkRequest } = require("./rules/ruleHandler");
const { postMessage } = require("./api/discord") 
const { verifyWebhookRequest } = require("./util/webhookVerification");
const serverless = require("serverless-http");
const express = require("express");
const helmet = require("helmet");

const port = process.env.PORT || 3000;

const app = express();

// Use middleware for parsing security headers and json parsing.
app.use(helmet());
app.use(express.json())

// Health endpoint to verify Lambda function
app.get("/health", (req, res, next) => {
  console.log("healthy");
  return res.status(200).send();
});

//Webhooks endpoint called by Github events
app.post("/github", async (req, res, next) => {
  try{
    const verifcation = await verifyWebhookRequest(req.headers["x-hub-signature-256"], req.body);

    // Check if verification fails
    if(!verifcation) {
      return res.status(401);
    } else {
      checkRequest(req.headers["x-github-event"], req.body, postMessage);
      return res.status(200);;
    }
  }catch(err){
    console.error(err)
    return res.status(500).send(err);
  }
});

// Middleware to gracefully handle unknown endpoints
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);

module.exports.listen = () =>{
    app.listen(port, () =>{
  console.log("Listening on port " + port);
})}