

function whenDeadline(workTime, dateOfBooking=undefined) {

    if (dateOfBooking === undefined) {
    dateOfBooking  = new Date().valueOf();
    }
    let date = new Date(dateOfBooking);
    let milliseconds = date.getUTCMilliseconds();
    let second = date.getUTCSeconds();
    let minutes = date.getUTCMinutes();
    let hours = date.getUTCHours() + 3;
    let dayOfTheWeek = date.getUTCDay();

    let workTimeBeforeDeadline;

    // если захотим добавить праздники и предпраздничные дни то можно разкомитить код (тестами не крыл)
    // let holidays = new Set([]);
    
    // let ShortenedDays = new Set([]);
    // let hoursOfWorkAtShortedDays = 7;

    let deadline;

    // от начала до дедлайна
    while (workTimeBeforeDeadline !== 0) {
        
        date = new Date(date);
        // рабочее время с 10 до 19
    if (hours < 10) {
        date = new Date(date.valueOf() + ((10 * 60 * 60 * 1000) - milliseconds - (second * 1000) - (minutes * 60 * 1000) - (hours * 60 * 60 * 1000)));
    } else if (hours >= 19) {
        date = new Date(date.valueOf() + (86400000 - milliseconds - (second * 1000) - (minutes * 60 * 1000) - (hours * 60 * 60 * 1000))  + (10 * 60 * 60 * 1000));
    }
        // праздники
        // if ((holidays.has((date.toISOString()).slice(0,10)) === true)) {
        // date = new Date(date.valueOf() + (86400000 - milliseconds - (second * 1000) - (minutes * 60 * 1000) - (hours * 60 * 60 * 1000))  + (7 * 60 * 60 * 1000));
        // continue
        // }

    
    // выходные
    dayOfTheWeek = date.getUTCDay();
    if (dayOfTheWeek === 6) {
        date = new Date(date.valueOf() + (2 * 86400000 - milliseconds - (second * 1000) - (hours * 60 * 60 * 1000)));
        continue
    } else if (dayOfTheWeek === 0) {
        date = new Date(date.valueOf() + (86400000 - milliseconds - (second * 1000) - (minutes * 60 * 1000) - (hours * 60 * 60 * 1000)));
        continue
    }

    // "сверим" часы
    date = new Date(date);
    milliseconds = date.getUTCMilliseconds();
    second = date.getUTCSeconds();
    minutes = date.getUTCMinutes();
    hours = date.getUTCHours() + 3;
    dayOfTheWeek = date.getUTCDay();
    
    deadline = date;

        //обычный 9 часовый
        // if (ShortenedDays.has(date.toISOString().slice(0,10)) === false) {
            if ((hours >= 10) && (hours < 19) && (19 < (hours + (minutes / 60) + (second / (60*60)) + (milliseconds / (60*60*1000)) + workTime))) {
                workTimeBeforeDeadline = 19 - hours - (minutes / 60) - (second / (60*60)) - (milliseconds / (60*60*1000));
                workTime = workTime - workTimeBeforeDeadline;
                deadline = new Date(deadline.valueOf() + workTimeBeforeDeadline * 60 * 60 * 1000);
                date = deadline.valueOf();
            } else if ((hours >= 10) && (hours < 19) && (19 >= (hours + (minutes / 60) + (second / (60*60)) + (milliseconds / (60*60*1000)) + workTime))) {
                workTimeBeforeDeadline = workTime - workTime;
                deadline = new Date(deadline.valueOf() + workTime * 60 * 60000);
                deadline = deadline.valueOf();
                return deadline
            } 

        
        // }
        // сокращенный 7 часовый
        // else if (ShortenedDays.has((date.toISOString()).slice(0,10)) === true) {
        //     if ((hours >= 10) && (hours < 17) && (17 < (hours + (minutes / 60) + (second / (60*60)) + (milliseconds / (60*60*1000)) + workTime))) {
        //         workTimeBeforeDeadline = 17 - hours - (minutes / 60) - (second / (60*60)) - (milliseconds / (60*60*1000))
        //         workTime = workTime - workTimeBeforeDeadline;
        //         deadline = deadline.valueOf() + workTimeBeforeDeadline * 60 * 60 * 1000;
        //         date = deadline.valueOf();
        //     } else if ((hours >= 10) && (hours < 17) && (17 >= (hours + (minutes / 60) + (second / (60*60)) + (milliseconds / (60*60*1000)) + workTime))) {
        //         workTimeBeforeDeadline = workTime - workTime;
        //         deadline = new Date(deadline.valueOf() + workTime * 60 * 60000);
        //         return deadline
        //     } else if ((hours + (minutes / 60) + (second / (60*60)) + (milliseconds / (60*60*1000)) >= 17)) {
        //         date = new Date(date.valueOf() + (86400000 - (second * 1000) - (minutes * 60 * 1000) - (hours * 60 * 60 * 1000))  + (10 * 60 * 60 * 1000))
        //     }
            // }
        }
}


module.exports = whenDeadline
