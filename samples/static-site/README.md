# Sample Projects / Static Site

This is a sample project for hosting a simple static website in AWS.

## Deployment

As a prerequisite, ensure AWS CLI is installed and configured (see [AWS CLI Getting Started](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html) for instructions).

To deploy the stack, run the following command:

```commandline
npm run deploy
```

To pass any argument to the AWS CDK, use the following format:

```commandline
npm run deploy -- --profile some-profile
```

The deployment process is:
1. Running constructor tests (from `test/constructor`)
2. Deploying the stack
3. Running deployment validation tests (from `test/deployment`)
4. Running functional tests (from `test/functional`)