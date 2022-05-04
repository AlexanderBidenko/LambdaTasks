let sortingSet = new Set();

document.querySelector('button').addEventListener('click', () => {
    console.time('FirstWay');
    let fileList = document.getElementById('file').files;
    const numFiles = fileList.length;
    async function f() {
    await new Promise(() => {
        for (let i = 0; i < numFiles; i++) {

            const file = fileList[i];
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = async function() {
                for (let value of (reader.result.split('\n'))) {
                    sortingSet.add(value);
                }
            }
            }
            reader.onerror = function() {
                console.log(reader.error);
            }
        });
        }
    f ();
    console.timeEnd('FirstWay');
    console.log(sortingSet);
})
