(inputArrWithJSONsObj) => {

    let subAr = inputArrWithJSONsObj.sort(function(a, b) {
      if (a.user.name > b.user.name) {
        return 1;
      }

      if (a.user.name < b.user.name) {
        return -1;
      }
      
      return 0;
    });
  
    let bufSet = new Set();
    let res = new String();
    let weekendDates = new Array();
  
    for (let i = 0; i < subAr.length; i++) {
      if (bufSet.has(JSON.stringify(subAr[i].user))) {
        weekendDates.push (`{"startDate":"${subAr[i].startDate}","endDate":"${subAr[i].endDate}"}`);
  
      } else {
          res += '"weekendDates":[' + weekendDates.join() + ']},';
  
          weekendDates = new Array();
  
          bufSet.add(JSON.stringify(subAr[i].user));
          res += `{"userId":"${subAr[i].user._id}","name":"${subAr[i].user.name}", `;
  
          weekendDates.push (`{"startDate":"${subAr[i].startDate}","endDate":"${subAr[i].endDate}"}`);

      }
    }
  
    res +=  '"weekendDates":[' + weekendDates.join() + ']}';
    res = `[${new String(res.slice(19,))}]`;
    
    return JSON.parse(res);
  }
