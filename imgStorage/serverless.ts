import type { AWS } from '@serverless/typescript';

// import hello from '@functions/hello';
import { indexpage as index } from '@functions/index';
import { testing } from '@functions/index';
import { signin } from '@functions/index';
import { signout } from '@functions/index';


const serverlessConfiguration: AWS = {
  service: 'imgStorage',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    // s3: {
    //   bucketOne: {
    //     name: "my-custom-bucket-name"
    //   }
    // },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'

    },
  },
 
  functions: { index,
    testing,
    signin,
    signout
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
