<!--
title: 'GitHub Workflow Automation Tool'
description: 'This Tool provides basic GitHub workflow automation to send Discord notifications and add "master"/"main" branch protection.'
-->

# Installation Requirements

There are two alternatives to run this tool. 

1. Docker
2. Serverless

### Docker

Docker has to be installed:
https://www.docker.com/get-started/

### Serverless

Serverless has to be installed. Instructions are here: https://www.serverless.com/framework/docs/getting-started

Keys for the Cloud provider have to be added to the serverless yml file

HOWEVER!

This step can be skipped, since Serverless can be run locally. 
Attention: Environment variables have to be set. Please find instructions here: https://www.serverless.com/plugins/serverless-offline#environment-variables

## Usage

In any case the GitHub repo has to be checked out

### Note

If the Discord URL is removed, notification are not sent

### Deployment - Docker Way


The most convenient way is to use the ``docker-compose.yml``:

Open the ``docker-compose.yml`` and enter the needed environment variables:


```
      - DEFAULT_BRANCH_NAME=<MASTER BRANCH>
      - DISCORD_URL=<DISCORD URL>
      - GITHUB_ORGANIZATION=<ORANIZTATION NAME>
      - GITHUB_TOKEN=<SECRET TOKEN>
      - GITHUB_WEBHOOK_SECRET=<WEBHOOK TOKEN>
      - GIT_OWNER=<GITHUB ADMIN>

```

In the next step run 

```
docker-compose -f docker-compose.yml up -d --build
```

The service is then reachable under  ``https://localhos:3000``


### Deployment - Serverless Way


Set the following environment variables according to https://www.serverless.com/framework/docs/getting-started

```
      - DEFAULT_BRANCH_NAME=<MASTER BRANCH>
      - DISCORD_URL=<DISCORD URL>
      - GITHUB_ORGANIZATION=<ORANIZTATION NAME>
      - GITHUB_TOKEN=<SECRET TOKEN>
      - GITHUB_WEBHOOK_SECRET=<WEBHOOK TOKEN>
      - GIT_OWNER=<GITHUB ADMIN>

```

Enter Cloud provider according to Serverless instructions: https://www.serverless.com/framework/docs/providers/

To deploy serverless to AWS Lambda or Cloud Provider use:

Use provider template:
```
provider:
  name: aws
  runtime: nodejs12.x
  lambdaHashingVersion: '20201221'
  region: eu-central-1
```

Set up your provider keys and secret on your machine:

```
serverless config credentials --provider aws --key <key> --secret <secret> -o
```

and then you are good to go. Run:
```
serverless deploy
```

After running deploy, you should see output similar to:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service aws-node-express-api.zip file to S3 (711.23 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.................................
Serverless: Stack update finished...
Service Information
service: aws-node-express-api
stage: dev
region: us-east-1
stack: aws-node-express-api-dev
resources: 12
api keys:
  None
endpoints:
  ANY - https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  api: aws-node-express-api-dev-api
layers:
  None
```


### Invocation

After successful deployment, you can call the created application via HTTP:

```
curl -v https://xxxxxxx.execute-api.us-east-1.amazonaws.com/health
```

Which should result in the following response code: 20x



Calling the `/GitHub` path will trigger the workflow. However it is important to use the correct Webhook secret as authentication will fail otherwise.
