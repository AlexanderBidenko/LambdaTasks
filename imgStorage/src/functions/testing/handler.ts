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


const Fields = {ACL: "public-read-write"};
// const Conditions: Conditions[] = [['eq', '$userid', 'test'], ["content-length-range", 0, 10 * 1024]];
const Conditions: Conditions[] = [["content-length-range", 0, 10 * 1024]];




const testing: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const Key = ``;
  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket,
    Key,
    Conditions,
    Fields
    });

    const form = new FormData(event.body);
    Object.entries(fields).forEach(([field, value]) => {
      form.append(field, value);
    });
    let result;
      result = await new Promise((resolve) => {form.submit(url, (err, res) => {
      if (res) {
        resolve(result = res);
      }
        resolve(result = err);
        });
      })
      // result = Object.entries(fields)
        return formatJSONResponse({
          message: `${result}`
        });
      }


export const main = middyfy(testing);



