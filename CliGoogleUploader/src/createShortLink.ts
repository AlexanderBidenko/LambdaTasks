import axios from 'axios';
import "dotenv/config";

export async function createTinyLink(longLink: string): Promise<string | void> {
  let shortLink;
  const data = JSON.stringify({
    "url": longLink,
    "domain": "tiny.one"
  });
  
  const config = {
    method: 'post',
    url: `https://api.tinyurl.com/create?api_token=${process.env.tinyURLToken}`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  await axios(config)
  .then(function (response) {
    shortLink = response.data.data.tiny_url;
  })
  .catch(function (error) {
    console.log(error);
  });
    if (typeof shortLink === 'string')
    return shortLink
}
