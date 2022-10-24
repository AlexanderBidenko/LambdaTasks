// Create service client module using ES6 syntax.
import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
// const REGION = "us-east-1";
// Create an Amazon S3 service client object.
// const s3Client = new S3Client({ region: REGION });
const conf = {region: "eu-west-2", accessKeyId: process.env.AWS_KEY_ID, secretAccessKey: process.env.AWS_ACCESS_KEY }
const s3Client = new S3Client(conf);
// credentials

export { s3Client };