const request = require("supertest");
var app = require("../server.js").app;
 
it("should return response with json", function(done){
     
    request(app)
        .post("/")
        
        .send(JSON.stringify(`{'language': 'en', 'mimetype': 'other', 'count': 10_000}`))

        .set('Accept', 'application/x-www-form-urlencoded')
        .expect('Content-Type')
        .expect(200)
        .then(response => {
          assert(response.price, 1440)
          done();
      })
      .catch(err => done(err))
});


// app.listen(8080);

// var options = {
//     'method': 'POST',
//     'url': 'https://localhost:8080/',
//     'headers': {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     form: {
//       'language': 'en',
//       'mimetype': 'doc',
//       'count': '10_000'
//     }
//   };
//   request(options, function (error, response) {
//     console.log(response.body);
//   });