#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RealEstateICVFetchStack } from '../lib/realestate-icv-fetch-stack';

const app = new cdk.App();
new RealEstateICVFetchStack(app, 'RealEstateICVFetchStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }

  /* Uncomment the next line if you know exactly what Account and Region you want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' }
});
