import axios from 'axios';
import "dotenv/config";

export async function createTinyLink(longLink: string) {
    let sortLink = await axios.post(`https://api.tinyurl.com/create?api_token=${process.env.tinyURLToken}`,
    {
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              "User-Agent": "Foo/1.0"
            },
            data : {
                "url": longLink,
                "domain": "tiny.one"
              }
     }).catch((e) => {
      console.log(e)
    })
    return sortLink?.data
}
