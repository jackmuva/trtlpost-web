#!/bin/sh

echo "Syncing S3 with build"
aws s3 --region 'us-east-1' sync ./build 's3://trtlmail-cloudfront/'
echo "Successfully synced"

echo "Invalidating cloudfront cache"
aws cloudfront create-invalidation --distribution-id E2HK6Q1FA7SBK2 --paths '/*'
echo "Successfully invalidated cloudfront cache"