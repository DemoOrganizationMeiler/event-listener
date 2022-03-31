const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

app.get("/health", (req, res, next) => {
  logger.debug("healthy");
  return res.status(200);
});

app.post("/github", (req, res, next) => {
  console.warn("A warning")
  console.log("A log")
  console.debug("A debug")
  console.log(req.body.action)
  console.log(req.header)
  return res.status(200).json(req.headers);
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
