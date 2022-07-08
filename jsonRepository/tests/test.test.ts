import got from 'got';
import {strict as assert} from 'assert'

const data = {"hello": "world"}
const randomRoute: number = Math.floor(Math.random()*100500)


describe('post request test', async function () {
  it('if send post reqest with data to random server`s route we will take response with that data', async () => {
    const response = await got.post(`http://localhost:8080/${randomRoute}`,
    {
      json: data
    }).json();

    assert(JSON.stringify(data) === JSON.stringify(response), `
    server had returning: 
    "${response}"

    response data !== requst data:
    ${JSON.stringify(data)} === ${response}    
    `)

  })
})

describe('get request test', async function () {
it('if we send get request to route from previous test we will have response with data from previous test', async () => {
  setTimeout(async () => {
  const response = await got.get(`http://localhost:8080/${randomRoute}`).json();
  
  assert(JSON.stringify(data) === response, `
  data from previous test !== requst data:
  ${JSON.stringify(data)} === ${response}`)
  }, 1000)
  });
})
