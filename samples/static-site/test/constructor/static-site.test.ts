import * as cdk from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { AdvancedMatcher, AdvancedTemplate, S3Bucket } from 'aws-cdk-assert';
import { StaticSiteStack } from '../../lib/static-site-stack';

describe('StaticSite Constructor Validation', () => {
    let template: AdvancedTemplate;
    let bucket: S3Bucket;

    beforeEach(() => {
        const app = new cdk.App();
        const stack = new StaticSiteStack(app, 'TestStack');
        template = AdvancedTemplate.fromStack(stack);
        bucket = template.s3Bucket();
    });

    test('S3 Bucket is created', () => {
        bucket
            .withRemovalPolicy(cdk.RemovalPolicy.DESTROY)
            .exists();
    });

    test('Propoer BucketPolicy is created', () => {
        template.s3BucketPolicy()
            .forBucket(bucket)
            .withProperty('PolicyDocument', {
                Statement: Match.arrayWith([
                    Match.objectLike({
                        Action: 's3:GetObject',
                        Effect: 'Allow',
                        Principal: { CanonicalUser: Match.anyValue() },
                        Resource: AdvancedMatcher.fnJoin(Match.arrayWith([
                            bucket.arn,
                        ]))
                    })
                ])
            })
            .exists();
    });

    test('CloudFront Distribution is created', () => {
        template.cloudFrontDistribution()
            .withProperty('DistributionConfig', {
                Origins: [
                    Match.objectLike({
                        DomainName: AdvancedMatcher.fnGetAtt(
                            bucket.id,
                            'RegionalDomainName',
                        )
                    }),
                ]
            })
            .exists();
    })
});
