import { checkRequest } from "./rules/ruleHandler";
import { Webhooks } from "@octokit/webhooks";
import serverless from "serverless-http";
import { helmet } from "helmet";
import express, { json } from "express";

const app = express();

app.use(helmet);
app.use(json())

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
  if(!verifcation) {
    console.log("signature didn't match!")
    res.status(401);
  } else {
    checkRequest(req.headers["x-github-event"], req.body);
    return res.status(200);;
  }
    
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const handler = serverless(app);
