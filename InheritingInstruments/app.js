currentInstrument = 0;

class Instrument{
    //properties
    loudness
    family
    playVerb
    over

    //set properties on creation
    constructor(loudness, family, playVerb){
        this.loudness = loudness;
        this.family = family;
        this.playVerb = playVerb;
    }

    //method to play the music notes and log them to the console
    play(duration){
        console.log(this.family + " " + this.playVerb + " at " + this.loudness);
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("B6", duration);
        setTimeout(this.over, 500);
    }
}

class Woodwind extends Instrument{
    constructor(loudness){
        super(loudness);
        this.family = "Woodwind";
        this.playVerb = "B6"
    }
}

class Percussion extends Instrument{
    constructor(loudness){
        super(loudness);
        this.family = "Purcussion";
        this.playVerb = "B6"
    }
}

class String extends Instrument{
    constructor(loudness){
        super(loudness);
        this.family = "String";
        this.playVerb = "B6";
    }
}

//the objects
cello = new String(5);
flute = new Woodwind(4);
drum = new Percussion(6);

//the array they are put in
band = [cello, flute, drum];

//OLD SOLUTION: Missing the Callback
// function begin(){
//      for(let i = 0; i < band.length; i++){
//         setTimeout(playNext, 1000 * i, i);
//     }
// }

// function playNext(i){
//     currentInstrument += 1;
//     band[i].play(.5);
// }

function playNext(){
    band[currentInstrument].over = playNext;
    band[currentInstrument].play();
    currentInstrument++;
}

function reset(){
    currentInstrument = 0;
    console.log("The band has been reset.")
}