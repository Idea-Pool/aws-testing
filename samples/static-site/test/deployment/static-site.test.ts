import { CloudFrontClient, GetDistributionCommand } from '@aws-sdk/client-cloudfront';
import { S3Client, ListObjectsV2Command, ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';
import { getStackOutput } from '../utils/stack';


describe('StaticSite Deployment Validation', () => {
  describe('S3 Bucket', () => {
    let objects: ListObjectsV2CommandOutput;

    beforeAll(async () => {
      const bucketName = await getStackOutput('BucketName');
  
      const s3Client = new S3Client({});
      objects = await s3Client.send(new ListObjectsV2Command({ Bucket: bucketName }));
    });

    test('deployed and accessible', () => {
      expect(objects.Contents).not.toHaveLength(0);
    });

    test('has index.html deployed', () => {
      expect(objects.Contents).toEqual(expect.arrayContaining([expect.objectContaining({Key: 'index.html'})]));
    });

    test('has error.html deployed', () => {
      expect(objects.Contents).toEqual(expect.arrayContaining([expect.objectContaining({Key: 'error.html'})]));
    });
  });

  test('CloudFront distribution is deployed', async () => {
    const distributionId = await getStackOutput('DistributionId');

    const cloudFrontClient = new CloudFrontClient({});
    const distribution = await cloudFrontClient.send(new GetDistributionCommand({ Id: distributionId }));

    expect(distribution.Distribution).toBeDefined();
  });
});
