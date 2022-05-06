let sortingSet = new Set();
let somSet = new Set();


document.querySelector('button.btn1').addEventListener('click', () => {
    let fileList = document.getElementById('file').files;
    let numFiles = fileList.length;
    function f(fileLst) {
        for (let i = 0; i < numFiles; i++) {
            const file = fileList[i];
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                for (let value of (reader.result.split('\n'))) {
                    sortingSet.add(value);
                }
            }
            }
            let somSet = new Set(sortingSet);
            sortingSet.clear();
            return somSet;
        }
    let pp = new Promise(function(resolve) {
        resolve(f(fileList));
    })
    pp.then(result => console.log(result.size))
    return somSet.clear();
})

document.querySelector('button.btn2').addEventListener('click', () => {
    let fileList = document.getElementById('file').files;
    let numFiles = fileList.length;
    for (let i = 0; i < numFiles; i++) {
        let file = fileList[i];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = function () {
            for (let value of (reader.result.split('\n'))) {
                sortingSet.add(value);
            }
        };
    }
}
)

document.querySelector('button.btn3').addEventListener('click', () => {
    let fileList = document.getElementById('file').files;
    let numFiles = fileList.length;
    let mass = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    function randomArray(array) {
    for (let i = 0; i < array.length; i++) {
    let rand = Math.floor(Math.random()*array.length);
    temp1 = mass[i];
    mass[i] = mass[rand];
    mass[rand] = temp1;
        }
        return array.slice(0,11);
    }
    let randomArr = randomArray(mass);
    function ff(fileLst) {
        const file = fileList[randomArr[0]];
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                for (let value of (reader.result.split('\n'))) {
                    somSet.add(value);
                      }
                    }
        for (let i = 1; i < 10; i++) {
            const file = fileList[randomArr[0]];
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                for (let value of (reader.result.split('\n'))) {
                    if(somSet.has(value)){
                        sortingSet.add(value);
                        }
                      }
                      if (i != 9){
                      sortingSet = new Set(somSet);
                      somSet = new Set();
                      }
                      }
            }
            let somSet = new Set(sortingSet);
            sortingSet.clear();
            return somSet;
        }
    let pp = new Promise(function(resolve) {
        resolve(ff(fileList));
    })
    pp.then(result => console.log(result.size))
    return sortingSet.clear
})
