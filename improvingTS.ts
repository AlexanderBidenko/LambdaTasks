
interface Array<T> {
    multiply(o?: number): number[];
}

interface emoji {
    emoji: string,
    sad: boolean
}

interface groupedEmoji {
    sad?: emoji[],
    happy?: emoji[]
}


Array.prototype.multiply = function multiply (o:number): number[] {
    if (o === undefined) {
        o = 10
    }
    let res: number[] = []
    this.forEach(element => {
        res.push(element * o)
    });
    return res;
}


function groupEmoji (emojiArr: emoji[]): groupedEmoji {
    let resSad: emoji[] = []
    let resHappy: emoji[] = []
    
    emojiArr.forEach(element => {
        if (element.sad === true) {
            resSad.push(element)
        }
        if (element.sad === false) {
            resHappy.push(element)
        }
    });
    
    return {sad: resSad, happy: resHappy}
}


function groupEmojiBy(emojiArr: emoji[], isHappy: boolean): groupedEmoji {
    if (isHappy) {
        return { happy: ((groupEmoji(emojiArr)).happy) } 
    }
    return { sad: (groupEmoji(emojiArr)).sad }
}


const arrayOfNumbers: number[] = [1, 2, 3, 4];
console.log(arrayOfNumbers.multiply(2));

const data: emoji[] = [{emoji: "😀", sad: false}, { emoji: "🥲", sad: false }]
console.log(groupEmojiBy(data, true))
