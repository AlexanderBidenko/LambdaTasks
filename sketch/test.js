


document.querySelector('button').addEventListener('click', uniqueValues)

function uniqueValues() {
    console.time('FirstWay');
    let fileList = document.getElementById('file').files;
    const numFiles = fileList.length;
    let sortingSet = new Set();
    console.log(numFiles)
    for (let i = 0; i < numFiles; i++) {
        let count = 0;
        const file = fileList[i];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = async function() {
            let promiseArrayToSet = new Promise((resolve) => {
            for (let value of (reader.result.split('\n'))) {
                sortingSet.add(value);
            }
            resolve(count++);
        })
        }
        reader.onerror = function() {
            console.log(reader.error);
        }
    }
    console.timeEnd('FirstWay');
    return console.log(sortingSet);
}


/*
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("готово!"), 1000)
  });

  let result = await promise; // будет ждать, пока промис не выполнится (*)

  alert(result); // "готово!"
}

*/