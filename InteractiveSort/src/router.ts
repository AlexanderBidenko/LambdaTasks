import {dataAnalytics} from './dataAnalytics'


export class router {


    public forwardInitialData(task:string, data: string[]) {
        
    if (task.length > 1) {
        const tasks: string[] = task.split(" ");
        tasks.forEach((elem) => {this.routes(elem, data)})
    } else {this.routes(task, data)}

    }

    private routes(task:string, data:string[]) {
        switch(task) {
            case '1':
                new dataAnalytics().alphabetSort(data);
                
                break;
            case '2':            
            new dataAnalytics().ascendingNumberSort(data);

                break;
            case '3':
                new dataAnalytics().descendingNumbersSort(data)

                break;
            case '4':
                new dataAnalytics().quantityOfLetersSort(data);

                break;
            case '5':
                new dataAnalytics().findUniqueWords(data);

                break;
            case '6':
                new dataAnalytics().findUniqueNumbers(data);

                break;
            case '7':
                new dataAnalytics().findUniqueValues(data);

            default: 
                break;
        }
    }
}