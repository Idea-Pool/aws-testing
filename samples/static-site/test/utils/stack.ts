import { CloudFormationClient, DescribeStacksCommand } from '@aws-sdk/client-cloudformation';

const stackConfig = require('../../stack.config.json');

export async function getStackOutput(outputKey: string): Promise<string> {
    const client = new CloudFormationClient({});
    const describeStacks = new DescribeStacksCommand({ StackName: stackConfig.StackName });
    const stacks = await client.send(describeStacks);
    return stacks.Stacks![0].Outputs!.find(o => o.OutputKey === outputKey)!.OutputValue!;
}