const request = require('supertest');

const app = require('../main.js').app;

const data = {"hello": "world"}
const randomRoute = Math.floor(Math.random()*15)

it('if send put reqest with data to random server`s route we take we have response with that data', function (done) {
  request(app)
  .post(`/${randomRoute}`)
  .send(data)
  .expect(200)
  .end(function(err, res) {
    if (err) return done(err);
    return done();
  })
});

it('if we send get request to route from previous test we have response with that data from previous test', function (done) {
  setTimeout(() => {
  request(app)
    .get(`/${randomRoute}`)
    .expect(DataIsValid)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      return done();
    })
  }, 1000)
});

function DataIsValid(res) {
    if (!(`{"hello":"world"}` === JSON.stringify(res.body))) throw new Error(JSON.stringify(res.body));
  }


  setTimeout(() => process.exit(), 2000)