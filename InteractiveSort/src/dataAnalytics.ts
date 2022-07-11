export class dataAnalytics {


    public alphabetSort(data: string[]): string[] {
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
        return result;
    }


    public ascendingNumberSort(data:string[]): number[] {

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
        // console.log("Show digits from the smallest\n", result)
        return result;
    }


    public descendingNumbersSort(data:string[]): number[] {

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
        // console.log("3. Show digits from the bigest.\n", result)
        return result;
    }


    public quantityOfLetersSort(data): string[] {
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
        // console.log("Words by quantity of leters.\n", result)
        return result;
    }


    public findUniqueWords(data): Set<string> {
        let result: Set<string> = new Set()
        data.forEach(elem => {
            if (isNaN(Number(elem))) {
                result.add(elem);
            }
        })
        // console.log("Only unique words\n", result)
        return result;
    }


    public findUniqueNumbers(data): Set<string> {
        let result: Set<string> = new Set()
        data.forEach(elem => {
            if (!isNaN(Number(elem))) {
                result.add(elem);
            }
        })
        // console.log("Only unique numbers.\n", result)
        return result
    }


    public findUniqueValues(data): Set<string> {
        let result: Set<string> = new Set(data)
        return result;
    }
}

