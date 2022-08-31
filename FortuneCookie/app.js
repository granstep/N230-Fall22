class RandomPicker {
    //list of items to be randomly sleected
    items
    
    constructor(items){
        //store the set of items
        this.items = items;
    }

    //return a random entry in the array
    pickRandom(){
        return this.items[Math.floor(Math.random() * this.items.length)];
    }
}

// class MagicEight extends RandomPicker{

//     outputElement

//     constructor(element){
//         super(["It is certain", "Ask again later", "Perhaps", "Very Doubtful"]);
//         this.outputElement = element;
//     }

//     shake(){
//         let replay = this.pickRandom();
//         this.outputElement.innerHTML = replay;
//     }
// }

// let myEightball = new MagicEight(document.getElementById("magicResponse"));

class FortuneCookie extends RandomPicker{

    outputElement
    currentFortune

    constructor(element){
        super(["The fortune you seek is in another cookie.", "You have a secret admirer.",
        "All will go well with your new project.", "Believe in yourself and others will too.", 
        "Disbelief destroys the magic.", "Do not let ambitions overshadow small success.", 
        "Every flower blooms in its own sweet time.", "Failure is the chance to do better next time.", 
        "Good news will be brought to you by mail.", "Have a beautiful day."]);
        this.outputElement = element;
    }

    pickCookie(){
        this.currentFortune = this.pickRandom();
        this.outputElement.innerHTML = "Please open your cookie";
    }

    openCookie(){
        this.outputElement.innerHTML = this.currentFortune;
    }
}

let myCookie = new FortuneCookie(document.getElementById("magicResponse"));
myCookie.pickCookie();