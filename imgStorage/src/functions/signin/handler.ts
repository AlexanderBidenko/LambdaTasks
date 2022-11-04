import { middyfy } from '@libs/lambda';

import type { APIGatewayProxyResult} from '@libs/api-gateway';


const signin =  async (event): Promise<APIGatewayProxyResult> => {
  if ((event.queryStringParameters != null) && (event.queryStringParameters != undefined) && (event.queryStringParameters != 'null') && (event.queryStringParameters != 'undefined')) {
    return {
      statusCode: 200,
      body: `Hello world`
      
      ,
  
      headers: {
        ["Content-Type"]: "application/json"
    }
  }

  }
};


export const main = middyfy(signin);
