var request = require("request");

let urlList = ['type1/793',
  'type1/955',
  'type1/231',
  'type1/931',
  'type1/93',
  'type2/342',
  'type2/770',
  'type2/491',
  'type2/281',
  'type2/718',
  'type3/310',
  'type3/806',
  'type3/469',
  'type3/258',
  'type3/516',
  'type4/79',
  'type4/706',
  'type4/521',
  'type4/350',
  'type4/64'];

let resT = 0;
let resF = 0;
let resErr = 0;
let returnControl = urlList.length;

let singleReq = function singleReq(url, countError=0) {
    request({
    method: 'GET',
    uri: ('https://jsonbase.com/lambdajson_' + url),
  },
    (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let bool = body.includes('"isDone":true');
      console.log(('https://jsonbase.com/lambdajson_' + url) +
       ': isDone -', bool ? 'True' : 'False');
      bool ? resT++ : resF++;
      returnControl--;
    }
    else if (countError < 4) {
      singleReq(url, (countError = countError + 1));

    } else {
      resErr++;
      returnControl--;
      console.log(('https://jsonbase.com/lambdajson_' + url) + 
      'error:', error, '  status Code', response.statusCode);
    }}
    )};


async function allReq() {
    for await (let urlParam of urlList) {
        new Promise(resolve => singleReq(urlParam))
        }
  
        
    let control = setInterval(() => {
        if ((resT + resF + resErr) === urlList.length) {
        console.log('Значений True:', resT)
        console.log('Значений False:', resF)
        clearInterval(control)
        }
        }, 58)
    };


allReq()
