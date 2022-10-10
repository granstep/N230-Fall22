var gameZone = document.getElementById("gameZone");

class circleMaker {
    yValue = 0;
    xValue = 50;
    idValue = 0;
    columbValue = 0;
    g = new gameManager();
    
    constructor() {
        for(var i = 0; i < 7; i++){
            this.yValue = 0;
            this.columbValue += 1;
            this.columbs(this.xValue);
            this.xValue += 50;
        }
    }
    
    columbs(xValue) {
        for (var i = 0; i < 6; i++) {
            this.yValue += 50;
            this.idValue += 1;

            let newCirc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            newCirc.classList.add("empty");
            newCirc.classList.add("columb" + this.columbValue);
            newCirc.setAttribute("key", this.idValue);
            newCirc.setAttribute("cx", xValue);
            newCirc.setAttribute("cy", this.yValue);
            newCirc.setAttribute("r", "20");
            newCirc.style.fill = "#ffffff";

            newCirc.addEventListener("click", (event) => {
                if(event.target.classList.contains("empty")){
                    var dropArray = document.getElementsByClassName(event.target.classList);
                    var bottomCircle = dropArray[dropArray.length - 1]
                    // bottomCircle.style.fill = this.g.tokenColor;
                    // bottomCircle.classList.replace("empty", this.g.tokenClass);
                    this.g.turnChange(bottomCircle);
                }
            });

            gameZone.appendChild(newCirc);
        }
    }
}

class gameManager{
    playerTurn = true;
    opponetTurn = false;
    playerColor = "#ff1f1f";
    opponetColor = "#fff419";
    tokenColor = this.playerColor;
    playerClass = "player";
    opponetClass = "opponet";
    tokenClass = this.playerClass;
    resultZone = document.getElementById("resultZone");

    clear(){
        this.resultZone.classList.remove(this.tokenClass + "Win");
        this.resultZone.innerHTML = "Play some Connect Four";

        var boardArray = document.querySelectorAll("circle");
        
        for(var i = 0; i < boardArray.length; i++){
            boardArray[i].style.fill = "#ffffff";
            boardArray[i].classList.replace("player", "empty");
            boardArray[i].classList.replace("opponet", "empty");
        }

        this.playerTurn = true;
        this.opponetTurn = false;
        this.tokenClass = this.playerClass;
        this.tokenColor = this.playerColor;
    }

    turnChange(targetCircle){
        if (this.playerTurn == false && this.opponetTurn == false){
            return;
        }

        targetCircle.style.fill = this.tokenColor;
        targetCircle.classList.replace("empty", this.tokenClass);

        let w = new winChecker(targetCircle);

        if (w.returnValue == true){
            this.playerTurn = false;
            this.opponetTurn = false;
            this.resultZone.classList.add(this.tokenClass + "Win");
            
            if(this.tokenClass === "player"){
                this.resultZone.innerHTML = "Four in a row! Red Wins!";
            }
            if(this.tokenClass === "opponet"){
                this.resultZone.innerHTML = "Four in a row! Yellow Wins!";
            }
        } else{
            if(this.playerTurn == true){
            this.playerTurn = false;
            this.opponetTurn = true;
            this.tokenColor = this.opponetColor;
            this.tokenClass = this.opponetClass;
            }
            else if(this.opponetTurn == true){
            this.playerTurn = true;
            this.opponetTurn = false;
            this.tokenColor = this.playerColor;
            this.tokenClass = this.playerClass;
            }
        }
    }
}

class winChecker{
    returnValue;

    constructor(justPicked){
        var checkArray = document.getElementsByClassName(justPicked.classList[0]);
        var checkKeys = [];
        
        if(checkArray.length < 4){
            this.returnValue = false;
            //console.log("stop");
            return;
        }

        for(var i = 0; i < checkArray.length; i++){
            checkKeys.push(checkArray[i].attributes.key.value)
        }
        //console.log(checkKeys);
        //console.log(justPicked.attributes.key.value);

        //now check the key array for all potential 4 in a row key values
        //optimize search by only check the key values involving "justPicked"'s key
        //will return false if there are none and true if there are 4 in a row

        //console.log("run");
        this.returnValue = false;
    }
}

let c = new circleMaker();