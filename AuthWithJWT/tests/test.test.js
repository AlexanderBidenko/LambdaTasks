const request = require('supertest');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = require('../main.js').app;


it('if user already exist we say about it', function (done) {
  request(app)
  .post('/sing_up')
  .send({"email": "«email2»", "password": "«password»"})
  .expect('Content-Type', "text/html; charset=utf-8")
  .expect('Content-Length', '31')
  .expect(200)
  .end(function(err, res) {
    if (err) return done(err);
    return done();
  })
});

it('if we send request to /login - we will receipting response with some JWT tokens', function (done) {
  request(app)
  .post('/login?email=«email2»&password=«password»')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '433')
  .expect(receiptingAccessToken)
  .expect(receiptingRefreshToken)
  .expect(200)
  .end(function(err, res) {
    if (err) return done(err);
    return done();
  })
});



it('if we send request to /refresh - we will take response with some access token', function (done) {
  request(app)
  .post('/refresh')
  .set('Authorization', `Bearer ${fs.readFileSync(`./tests/refresh_token.txt`)}`)
  .expect('Content-Type', /json/)
  .expect('Content-Length', '217')
  .expect(receiptingAccessToken)
  .expect(200)
  .end(function(err, res) {
    if (err) return done(err);
    return done();
  })
});

it('if we send request to /me - we will be redirect to user`s page', function (done) {
  request(app)
  .get('/me')
  .set('Authorization', `Bearer ${fs.readFileSync(`./tests/access_token.txt`)}`)
  .expect(302)
  .end(function(err, res) {
    if (err) return done(err);
    return done();
  })
});

it('if we send request to /me0 - we will take response with mock data`', function (done) {
  request(app)
  .get('/me0')
  .set('Authorization', `Bearer ${fs.readFileSync(`./tests/access_token.txt`)}`)
  .expect(mockUserDataIsValid)
  .expect(200)
  .end(function(err, res) {
    if (err) return done(err);
    return done();
  })
});


it('if we send request to /me0 after 1 min - we will take response with mock data and the number of requests corresponding to this token', function (done) {
    new Promise (function(resolve) {
      setTimeout(() => resolve(),60000)
    })
      .then(function(result) {
    request(app)
    .get('/me0')
    .set('Authorization', `Bearer ${fs.readFileSync(`./tests/access_token.txt`)}`)
    .expect(tokenReqCount)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      return done();
    })
  })
  });
  


function receiptingAccessToken(res) {
  if (!('acc' in res.body)) throw new Error("missing acc token");
  if (!(207 === res.body.acc.length)) throw new Error("acc token length is incorrect");
  fs.writeFileSync(`./tests/access_token.txt`, `${res.body.acc}`, () => {});
}

function receiptingRefreshToken(res) {
  if (!('ref' in res.body)) throw new Error("missing ref token");
  if (!(207 === res.body.ref.length)) throw new Error("ref token length is incorrect");
  fs.writeFileSync(`./tests/refresh_token.txt`, `${res.body.ref}`, () => {});
}

function mockUserDataIsValid(res) {
  if (!('{"username":"«email2»"}' === JSON.stringify(res.body.data))) throw new Error("mock data not found");
}

function tokenReqCount(res) {
  if (!('2' === JSON.stringify(res.body.request_num))) throw new Error("count of requests is incorrect");
}

setTimeout(() => process.exit(), 70000)