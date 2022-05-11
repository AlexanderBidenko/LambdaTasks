let sortingSet = new Set();


document.querySelector('button').addEventListener('click', function() {
    console.time('FirstWay');
    let fileList = document.getElementById('file').files;
    const numFiles = fileList.length;
    console.log(numFiles)
    for (let i = 0; i < numFiles; i++) {
            const file = fileList[i];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            for (let value of (reader.result.split('\n'))) {
                sortingSet.add(value);
            }
        }
        reader.onerror = function() {
            console.log(reader.error);
        }
    }
    console.timeEnd('FirstWay');
    return sortingSet;
});


/*
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("готово!"), 1000)
  });

  let result = await promise; // будет ждать, пока промис не выполнится (*)

  alert(result); // "готово!"
}

*/