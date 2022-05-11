console.time('optima');


// let st = new Set();
// inputObj.forEach(element => {
//   st.add(inputObj.filter(item => item.user._id === element.user._id))
//     // lst.push(
//     //  [
//          element.user._id,
//          element.user.name,
//          element.startDate,
//          element.endDate
//     // ]
//     //)
// });

// console.log(st)
// console.log(st.size)


let subAr = new Array(inputObj.sort(function(a, b) {
  if (a.user.name > b.user.name) {
    return 1;
  }
  if (a.user.name < b.user.name) {
    return -1;
  }
  // a должно быть равным b
  return 0;
}))[0];


// st.forEach(elem => console.log(elem));
// let stt = JSON.stringify(st[0]);
// console.log(typeof(stt))
// console.log(stt)


// console.log(inputObj.length);

  //     // lst.push(
//     //  [
//          element.user._id,
//          element.user.name,
//          element.startDate,
//          element.endDate
//     // ]

// }



//.split('},/n{')
console.timeEnd('optima');
