import AWS from 'aws-sdk';
import { paginateListObjectsV2, S3Client } from '@aws-sdk/client-s3';
import _ from 'lodash';

export const getBuckets: any = async () => {
  const S3 = new AWS.S3();
  const { Buckets } = await S3.listBuckets().promise();
  return Buckets;
};

const listAllObjects = async (params: any) => {
  const client = new S3Client({});
  const totalFiles = [];
  for await (const data of paginateListObjectsV2({ client }, params)) {
    totalFiles.push(...(data.Contents ?? []));
  }
  return totalFiles;
};

export const analyseBucket = async (bucketName: string) => {
  const objects = await listAllObjects({
    Bucket: bucketName,
  });

  // Create a "folder" structure (based on S3 prefixes)
  const folders = objects.reduce((acc: any, curr: AWS.S3.Object) => {
    if (curr.Key && curr.Key.includes('/')) {
      for (const index of curr.Key.split('/').slice(0, -1).keys()) {
        const path =
          curr.Key.split('/')
            .slice(0, index + 1)
            .join('.') + '.Size';
        acc = _.set(acc, path, (_.get(acc, path) || 0) + curr.Size);
      }
      return acc;
    }
  }, {});

  // Add some meta-data
  const numObjects = objects.length;
  const totalSize = objects.reduce(
    (acc: number, curr: AWS.S3.Object) => acc + (curr.Size || 0),
    0,
  );

  return {
    objects,
    folders,
    numObjects,
    totalSize,
  };
};
