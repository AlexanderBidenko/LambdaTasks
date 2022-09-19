/* 
Your program will take in a string and clean out all numeric characters, 
and return a string with spacing and special characters ~#$%^&!@*():;"'.,? all intact.
*/


(s) => {
    return s.replace(/[0-9]/g, '');
  }
