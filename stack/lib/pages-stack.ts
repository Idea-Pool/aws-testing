import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface GitHubPagesDevStackProps extends cdk.StackProps {
  readonly bucketName: string;
}

export class GitHubPagesDevStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GitHubPagesDevStackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'SourceBucket', {
      bucketName: props.bucketName,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      accessControl: s3.BucketAccessControl.PRIVATE,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    const accessIdentity = new cloudfront.OriginAccessIdentity(this, 'CloudFrontAccess');
    const cloudfrontUserAccessPolicy = new iam.PolicyStatement();
    cloudfrontUserAccessPolicy.addActions('s3:GetObject');
    cloudfrontUserAccessPolicy.addPrincipals(accessIdentity.grantPrincipal);
    cloudfrontUserAccessPolicy.addResources(bucket.arnForObjects('*'));
    bucket.addToResourcePolicy(cloudfrontUserAccessPolicy);

    const distro = new cloudfront.CloudFrontWebDistribution(this, 'Distribution', {
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      httpVersion: cloudfront.HttpVersion.HTTP2,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      originConfigs: [
        {
          s3OriginSource: {
            originAccessIdentity: accessIdentity,
            s3BucketSource: bucket,
            originPath: '',
          },
          behaviors: [
            {
              compress: true,
              isDefaultBehavior: true,
            }
          ]
        }
      ]
    });
  }
}
