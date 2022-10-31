import { middyfy } from '@libs/lambda';


import type { APIGatewayProxyResult} from '@libs/api-gateway';

const indexpage =  async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: 
    
    `<h1>Welcome to image storage</h1>
    <p></p>
    <p><a href="https://img-storage-auth.auth.eu-west-2.amazoncognito.com/login?client_id=2qeonfv87prllqa9cn5djrncuj&response_type=code&scope=openid&redirect_uri=https://xs8k89j49b.execute-api.us-east-1.amazonaws.com/dev/signin">Sign up or login</a></p>
    `    
    ,
    // headers: {'Content-type': 'text/html'} 
    headers: {['Content-type']: 'text/html'}

  }
};


export const main = middyfy(indexpage);
