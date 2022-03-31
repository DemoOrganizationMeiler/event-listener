const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require('body-parser')
const { Webhooks } = require("@octokit/webhooks");


const app = express();

const webhooks = new Webhooks({
  secret: process.env.GITHUB_WEBHOOK_SECRET,
});


app.use(bodyParser.json())

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
  if(!verifcation) {
    console.log("signature didn't match!")
    res.send(401);
  } else {
    return res.status(200).json(req.headers);
  }
    
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
