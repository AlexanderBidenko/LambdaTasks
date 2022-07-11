import {dataAnalytics} from './dataAnalytics'


export class router {


    // public async forwardInitialData(task:string, data: string[]) {
        
    // if (task.length > 1) {
    //     const tasks: string[] = task.split(" ");
    //     tasks.forEach((elem) => {
    //         return this.routes(elem, data)
    //     })
    // } else {
    //     return this.routes(task, data)
    // }

    // }

    public async routes(task:string, data:string[]) {
        switch(task) {
            case '1':
                console.log("1. Words by name (from A to Z).\n")
                return new dataAnalytics().alphabetSort(data);
                
                break;
            case '2':
                console.log("2. Show digits from the smallest.")    
                return new dataAnalytics().ascendingNumberSort(data);

                break;
            case '3':
                console.log("3. Show digits from the bigest.")
                return new dataAnalytics().descendingNumbersSort(data)

                break;
            case '4':
                console.log("4. Words by quantity of leters.")
                return new dataAnalytics().quantityOfLetersSort(data);

                break;
            case '5':
                console.log("5. Only unique words.")
                return new dataAnalytics().findUniqueWords(data);

                break;
            case '6':
                console.log("6. Only unique numbers.")
                return new dataAnalytics().findUniqueNumbers(data);

                break;
            case '7':
                console.log("7. Unique values")
                return new dataAnalytics().findUniqueValues(data);

            default: 
                break;
        }
    }
}