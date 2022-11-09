import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';

import FormData from "form-data";

import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { s3Client } from "@libs/s3Client";


declare type EqualCondition = ["eq", string, string] | Record<string, string>;
declare type StartsWithCondition = ["starts-with", string, string];
declare type ContentLengthRangeCondition = ["content-length-range", number, number];
declare type Conditions = EqualCondition | StartsWithCondition | ContentLengthRangeCondition;



const Bucket = "";
const Conditions: Conditions[] = [["starts-with", "$key", ""]];
const Key = "./filename.jpg";
const Fields = {
  acl: "public-read",
};

async function Posting(buf) {
  let { url, fields } = await createPresignedPost(s3Client, {
      Bucket,
      Key,
      Conditions,
      Fields,
      Expires: 3600, //Seconds before the presigned post expires. 3600 by default.
    });

    const form = new FormData();
    Object.entries(fields).forEach(([field, value]) => {
      form.append(field, value);
    });
    // form.append('file', buf, { filename : 'document.jpg' });
    form.append('file', buf);
    await new Promise(()=>{form.submit(url, () => {})});    
 
}

const testing: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    await Posting(event.body)

    return formatJSONResponse({
      statusCode: 200,
      message: `Hi!`
    });
  }


export const main = middyfy(testing);
