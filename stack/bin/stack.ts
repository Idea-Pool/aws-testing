#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GitHubPagesDevStack } from '../lib/pages-stack';

const app = new cdk.App();
new GitHubPagesDevStack(app, 'GitHubPagesDevStack', {
  bucketName: 'ideapool-github-pages-template',
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});