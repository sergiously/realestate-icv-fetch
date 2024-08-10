# Real Estate ICV fetcher

## Description

Basic AWS Lambda Function that fetches a ICV (Life Quality Index) value given a pair of coordinates (latitude and longitude) in Argentinian territory

## Technologies used

Based on Node.js with Typescript, with AWS CDK

## Deployment

Deploy to your AWS account using [AWS CDK](https://aws.amazon.com/cdk/).

```bash
npm i
cdk deploy
```

The command `cdk deploy` will first build the TypeScript project using a docker build image esbuild.
Then it will use AWS CloudFormation to deploy the resources to your account.

## Credits

Developed by Sergio N. Raggio

## License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
