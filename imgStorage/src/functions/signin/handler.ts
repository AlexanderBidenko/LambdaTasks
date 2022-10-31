import { middyfy } from '@libs/lambda';

import type { APIGatewayProxyResult} from '@libs/api-gateway';


const signin =  async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: 
    
    `
    <h2>You are sign in now.</h2>
    <p><a href="https://img-storage-auth.auth.eu-west-2.amazoncognito.com/logout?response_type=code&client_id=2qeonfv87prllqa9cn5djrncuj&redirect_uri=https://xs8k89j49b.execute-api.us-east-1.amazonaws.com/dev/signin&state=STATE&scope=openid">Sign out</a></p>
    `
    
    ,

    headers: {['Content-type']: 'text/html'}

  }
};


export const main = middyfy(signin);
