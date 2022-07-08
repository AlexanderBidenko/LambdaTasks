export class dataAnalytics {


    public alphabetSort(data: string[]): void {
        let bufArray: string[] = [];
        for (let i = 0; i < data.length; i++) {
            let elem:string = data[i];
            if (isNaN(Number(elem))) {
                bufArray.push(elem);
            }
        }
        let result = bufArray.sort(function(a,b) {
            if (a.toLowerCase() < b.toLowerCase()) {
                return -1;
            }
        
            if (a.toLowerCase() > b.toLowerCase()) {
                return 1;
            }
        
            return 0;
        });
        console.log("Words by name (from A to Z).", result)
    }


    public ascendingNumberSort(data:string[]):void {

        let bufArray: number[] = [];
        data.forEach(elem => {
            if (!isNaN(Number(elem))) {
                bufArray.push(Number(elem));
            }
        })

        let result = bufArray.sort(function (a, b) {
            if (a < b) {
                return -1;
            }
        
            if (a > b) {
                return 1;
            }
        
            return 0;
        })
        console.log("Show digits from the smallest", result)
    }


    public descendingNumbersSort(data:string[]): void {

        let bufArray: number[] = [];
        data.forEach(elem => {
            if (!isNaN(Number(elem))) {
                bufArray.push(Number(elem));
            }
        })

        let result = bufArray.sort(function (a, b) {
            if (a > b) {
                return -1;
            }
        
            if (a < b) {
                return 1;
            }
        
            return 0;
        })
        console.log("3. Show digits from the bigest.", result)
    }


    public quantityOfLetersSort(data):void {
        let bufArray: string[] = [];
        data.forEach(elem => {
            if (isNaN(Number(elem))) {
                bufArray.push(elem);
            }
        })

        let result = bufArray.sort(function (a, b) {
            if (a.length < b.length) {
                return -1;
            }
        
            if (a.length > b.length) {
                return 1;
            }
        
            return 0;
        });
        console.log("Words by quantity of leters.", result)
    }


    public findUniqueWords(data):void {
        let result: string[] = new Array()
        data.forEach(elem => {
            if (isNaN(Number(elem))) {
                result.push(elem);
            }
        })
        console.log("Only unique words", result)
    }


    public findUniqueNumbers(data):void {
        let result: number[] = new Array()
        data.forEach(elem => {
            if (!isNaN(Number(elem))) {
                result.push(elem);
            }
        })
        console.log("Only unique numbers.", result)
    }


    public findUniqueValues(data):void {
        let result: any[] = new Array(data)
        console.log("Unique values", result)
    }
}