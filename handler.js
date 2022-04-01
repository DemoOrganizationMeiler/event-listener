const { checkRequest } = require("./rules/ruleHandler");
const serverless = require("serverless-http");
const express = require("express");
const { Webhooks } = require("@octokit/webhooks");
const helmet = require("helmet");



const app = express();

app.use(helmet());
app.use(express.json())

const webhooks = new Webhooks({
  secret: process.env.GITHUB_WEBHOOK_SECRET,
});

app.get("/health", (req, res, next) => {
  logger.debug("healthy");
  return res.status(200);
});

app.post("/github", async (req, res, next) => {
  let verifcation;
  try {
    const signature = req.headers["x-hub-signature-256"];
    verifcation = await webhooks.verify(req.body, signature);
  } catch (err) {
    console.error(err);
  }
  console.log(verifcation)
  if(!verifcation) {
    console.log("signature didn't match!")
    return res.status(401);
  } else {
    console.debug("here anyway if verification is " + verifcation);
    checkRequest(req.headers["x-github-event"], req.body);
    return res.status(200);;
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);