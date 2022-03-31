const serverless = require("serverless-http");
const express = require("express");
const logger = require("loglevel");

const app = express();

app.get("/health", (req, res, next) => {
  logger.debug("healthy");
  return res.status(200);
});

app.get("/github", (req, res, next) => {
  logger.info("received webhook fro GitHub");
  logger.debug(req.headers);
  logger.debug(req.body);
  return res.status(200).json({
    message: "Hello from github!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
