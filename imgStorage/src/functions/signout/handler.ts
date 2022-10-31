import { middyfy } from '@libs/lambda';


import type { APIGatewayProxyResult} from '@libs/api-gateway';

const signout =  async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: 
    
    `
    <h2>You are sign out</h2>
    <p><a href="https://img-storage-auth.auth.eu-west-2.amazoncognito.com/login?client_id=2qeonfv87prllqa9cn5djrncuj&response_type=code&scope=openid&redirect_uri=https://xs8k89j49b.execute-api.us-east-1.amazonaws.com/dev/signin">Sign back</a></p>
    `
    
    ,

    headers: {['Content-type']: 'text/html'}

  }
};

export const main = middyfy(signout);
