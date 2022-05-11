var ObjectID = require('mongodb').ObjectID


// let meetup = [
//     {
//     title: "Conference",
//     room: {
//       number: 24,
//     }
//     }
// ];



var objectId = ObjectID(idLst[1]);
// timestamp = objectId.toString().substring(0,8);
// date = new Date( parseInt( timestamp, 16 ) * 1000 );
idLst.forEach(element => {
  console.log(new Date( parseInt( element.toString().substring(0,8), 16 ) * 1000 ))
});
