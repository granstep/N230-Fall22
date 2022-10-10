class Amount{
    text;
    numberValue;

    constructor(text){
        this.text = text;
        this.numberValue = 0;
    }

    displayValue(){
        this.text.innerHTML = this.numberValue;
    }

    increaseValue(){
        this.numberValue ++;
        this.displayValue();
    }
}

run = new Amount(document.getElementById("textholder"));
run.displayValue();