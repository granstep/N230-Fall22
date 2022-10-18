//the class to create circles in the game zone area
class circleMaker {
    //values to construct circles
    gameZone = document.getElementById("gameZone");
    yValue = 0;
    xValue = 50;
    idValue = 0;
    columbValue = 0;
    g = new gameManager();
    
    //class works on create to make circles
    constructor() {
        //for loop to create 7 cloumbs of circles
        for(var i = 0; i < 7; i++){
            this.yValue = 0;
            this.columbValue += 1;
            this.columbs(this.xValue);
            this.xValue += 50;
        }
    }

    //function to call from the constructor
    columbs(xValue) {
        //for loop creates the six circles for each columb
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

            //on click function for a player to select a circle
            newCirc.addEventListener("click", (event) => {
                if(event.target.classList.contains("empty")){
                    var dropArray = document.getElementsByClassName(event.target.classList);
                    var bottomCircle = dropArray[dropArray.length - 1];
                    this.g.turnChange(bottomCircle);
                }
            });

            //adds all the circles to the game zone
            gameZone.appendChild(newCirc);
        }
    }
}

//the class to manage the game with player turns, ending the game, and reseting the game
class gameManager{
    //values to control the game
    playerTurn = true;
    opponetTurn = false;
    playerColor = "#ff1f1f";
    opponetColor = "#fff419";
    tokenColor = this.playerColor;
    playerClass = "player";
    opponetClass = "opponet";
    tokenClass = this.playerClass;
    resultZone = document.getElementById("resultZone");

    //function to call to reset the game, returns all values to default
    clear(){
        this.resultZone.classList.remove(this.tokenClass + "Win");
        this.resultZone.innerHTML = "Play some Connect Four";

        //get all circles
        var boardArray = document.querySelectorAll("circle");
      
        //return them to default
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

    //function to run on clicking a circle
    turnChange(targetCircle){
        //don't run if the game has ended
        if (this.playerTurn == false && this.opponetTurn == false){
            return;
        }

        //change the circle space to a player's token
        targetCircle.style.fill = this.tokenColor;
        targetCircle.classList.replace("empty", this.tokenClass);

        //initiate the winChecker class to check if there is 4 in a row
        let w = new winChecker(targetCircle);

        //if there is 4 in a row, end the game
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
        } //if game still on, change the player's turn
        else{
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

//the class to check if there is 4 in a row
class winChecker{
    //value to be edited on there being 4 in a row
    returnValue;

    //on creation the class will run the check
    constructor(justPicked){
        //get an array of all circles of the player token type
        var checkArray = document.getElementsByClassName(justPicked.classList[0]);
        var checkKeys = [];
        
        //end check if the array is less than 4
        if(checkArray.length < 4){
            this.returnValue = false;
            return;
        }

        //put the keys in another array for easier referencing
        for(var i = 0; i < checkArray.length; i++){
            checkKeys.push(checkArray[i].attributes.key.value)
        }

        //now check the key array for all potential 4 in a row key values
        //optimize search by only check the key values involving "justPicked"'s key
        //will return false if there are none and true if there are 4 in a row
        if(justPicked.attributes.key.value == 6){
            if(checkKeys.includes('12') && checkKeys.includes('18') && checkKeys.includes('24')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('11') && checkKeys.includes('16') && checkKeys.includes('21')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 12){
            if(checkKeys.includes('6') && checkKeys.includes('18') && checkKeys.includes('24')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('18') && checkKeys.includes('24') && checkKeys.includes('30')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('17') && checkKeys.includes('22') && checkKeys.includes('27')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 18){
            if(checkKeys.includes('6') && checkKeys.includes('12') && checkKeys.includes('24')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('12') && checkKeys.includes('24') && checkKeys.includes('30')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('24') && checkKeys.includes('30') && checkKeys.includes('36')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('23') && checkKeys.includes('28') && checkKeys.includes('33')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 24){
            if(checkKeys.includes('6') && checkKeys.includes('12') && checkKeys.includes('18')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('12') && checkKeys.includes('18') && checkKeys.includes('30')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('18') && checkKeys.includes('30') && checkKeys.includes('36')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('30') && checkKeys.includes('36') && checkKeys.includes('42')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('17') && checkKeys.includes('10') && checkKeys.includes('3')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('29') && checkKeys.includes('34') && checkKeys.includes('39')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 30){
            if(checkKeys.includes('12') && checkKeys.includes('18') && checkKeys.includes('24')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('18') && checkKeys.includes('24') && checkKeys.includes('36')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('24') && checkKeys.includes('36') && checkKeys.includes('42')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('23') && checkKeys.includes('16') && checkKeys.includes('9')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 36){
            if(checkKeys.includes('18') && checkKeys.includes('24') && checkKeys.includes('30')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('24') && checkKeys.includes('30') && checkKeys.includes('42')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('29') && checkKeys.includes('22') && checkKeys.includes('15')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 42){
            if(checkKeys.includes('24') && checkKeys.includes('30') && checkKeys.includes('36')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('35') && checkKeys.includes('28') && checkKeys.includes('21')){
                this.returnValue = true;
                return;
            }
        }

        if(justPicked.attributes.key.value == 5){
            if(checkKeys.includes('11') && checkKeys.includes('17') && checkKeys.includes('23')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('10') && checkKeys.includes('15') && checkKeys.includes('20')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 11){
            if(checkKeys.includes('5') && checkKeys.includes('17') && checkKeys.includes('23')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('17') && checkKeys.includes('23') && checkKeys.includes('29')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('6') && checkKeys.includes('16') && checkKeys.includes('21')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('16') && checkKeys.includes('21') && checkKeys.includes('26')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 17){
            if(checkKeys.includes('5') && checkKeys.includes('11') && checkKeys.includes('23')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('11') && checkKeys.includes('23') && checkKeys.includes('29')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('23') && checkKeys.includes('29') && checkKeys.includes('35')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('12') && checkKeys.includes('22') && checkKeys.includes('27')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('22') && checkKeys.includes('27') && checkKeys.includes('32')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('24') && checkKeys.includes('10') && checkKeys.includes('3')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 23){
            if(checkKeys.includes('5') && checkKeys.includes('11') && checkKeys.includes('17')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('11') && checkKeys.includes('17') && checkKeys.includes('29')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('17') && checkKeys.includes('29') && checkKeys.includes('35')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('29') && checkKeys.includes('35') && checkKeys.includes('41')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('18') && checkKeys.includes('28') && checkKeys.includes('33')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('28') && checkKeys.includes('33') && checkKeys.includes('38')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('30') && checkKeys.includes('16') && checkKeys.includes('9')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('16') && checkKeys.includes('9') && checkKeys.includes('2')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 29){
            if(checkKeys.includes('11') && checkKeys.includes('17') && checkKeys.includes('23')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('17') && checkKeys.includes('23') && checkKeys.includes('35')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('23') && checkKeys.includes('35') && checkKeys.includes('41')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('24') && checkKeys.includes('34') && checkKeys.includes('39')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('36') && checkKeys.includes('22') && checkKeys.includes('15')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('22') && checkKeys.includes('15') && checkKeys.includes('8')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 35){
            if(checkKeys.includes('17') && checkKeys.includes('23') && checkKeys.includes('29')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('23') && checkKeys.includes('29') && checkKeys.includes('41')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('42') && checkKeys.includes('28') && checkKeys.includes('21')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('28') && checkKeys.includes('21') && checkKeys.includes('14')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 41){
            if(checkKeys.includes('23') && checkKeys.includes('29') && checkKeys.includes('35')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('34') && checkKeys.includes('27') && checkKeys.includes('20')){
                this.returnValue = true;
                return;
            }
        }

        if(justPicked.attributes.key.value == 4){
            if(checkKeys.includes('10') && checkKeys.includes('16') && checkKeys.includes('22')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('9') && checkKeys.includes('14') && checkKeys.includes('19')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 10){
            if(checkKeys.includes('4') && checkKeys.includes('16') && checkKeys.includes('22')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('16') && checkKeys.includes('22') && checkKeys.includes('28')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('5') && checkKeys.includes('15') && checkKeys.includes('20')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('15') && checkKeys.includes('20') && checkKeys.includes('25')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('3') && checkKeys.includes('17') && checkKeys.includes('24')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 16){
            if(checkKeys.includes('4') && checkKeys.includes('10') && checkKeys.includes('22')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('10') && checkKeys.includes('22') && checkKeys.includes('28')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('22') && checkKeys.includes('28') && checkKeys.includes('34')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('6') && checkKeys.includes('11') && checkKeys.includes('21')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('11') && checkKeys.includes('21') && checkKeys.includes('26')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('21') && checkKeys.includes('26') && checkKeys.includes('31')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('30') && checkKeys.includes('23') && checkKeys.includes('9')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('23') && checkKeys.includes('9') && checkKeys.includes('2')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 22){
            if(checkKeys.includes('4') && checkKeys.includes('10') && checkKeys.includes('16')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('10') && checkKeys.includes('16') && checkKeys.includes('28')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('16') && checkKeys.includes('28') && checkKeys.includes('34')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('28') && checkKeys.includes('34') && checkKeys.includes('40')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('12') && checkKeys.includes('17') && checkKeys.includes('27')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('17') && checkKeys.includes('27') && checkKeys.includes('32')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('27') && checkKeys.includes('32') && checkKeys.includes('37')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('36') && checkKeys.includes('29') && checkKeys.includes('15')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('29') && checkKeys.includes('15') && checkKeys.includes('8')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('15') && checkKeys.includes('8') && checkKeys.includes('1')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 28){
            if(checkKeys.includes('10') && checkKeys.includes('16') && checkKeys.includes('22')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('16') && checkKeys.includes('22') && checkKeys.includes('34')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('22') && checkKeys.includes('34') && checkKeys.includes('40')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('18') && checkKeys.includes('23') && checkKeys.includes('33')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('23') && checkKeys.includes('33') && checkKeys.includes('38')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('42') && checkKeys.includes('35') && checkKeys.includes('21')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('35') && checkKeys.includes('21') && checkKeys.includes('14')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('21') && checkKeys.includes('14') && checkKeys.includes('7')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 34){
            if(checkKeys.includes('16') && checkKeys.includes('22') && checkKeys.includes('28')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('22') && checkKeys.includes('28') && checkKeys.includes('40')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('24') && checkKeys.includes('29') && checkKeys.includes('39')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('41') && checkKeys.includes('27') && checkKeys.includes('20')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('27') && checkKeys.includes('20') && checkKeys.includes('13')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 40){
            if(checkKeys.includes('22') && checkKeys.includes('28') && checkKeys.includes('34')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('33') && checkKeys.includes('26') && checkKeys.includes('19')){
                this.returnValue = true;
                return;
            }
        }

        if(justPicked.attributes.key.value == 3){
            if(checkKeys.includes('9') && checkKeys.includes('15') && checkKeys.includes('21')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('10') && checkKeys.includes('17') && checkKeys.includes('24')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('4') && checkKeys.includes('5') && checkKeys.includes('6')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 9){
            if(checkKeys.includes('3') && checkKeys.includes('15') && checkKeys.includes('21')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('15') && checkKeys.includes('21') && checkKeys.includes('27')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('10') && checkKeys.includes('11') && checkKeys.includes('12')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('4') && checkKeys.includes('14') && checkKeys.includes('19')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('2') && checkKeys.includes('16') && checkKeys.includes('23')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('16') && checkKeys.includes('23') && checkKeys.includes('30')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 15){
            if(checkKeys.includes('3') && checkKeys.includes('9') && checkKeys.includes('21')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('9') && checkKeys.includes('21') && checkKeys.includes('27')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('21') && checkKeys.includes('27') && checkKeys.includes('33')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('16') && checkKeys.includes('17') && checkKeys.includes('18')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('5') && checkKeys.includes('10') && checkKeys.includes('20')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('10') && checkKeys.includes('20') && checkKeys.includes('25')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('1') && checkKeys.includes('8') && checkKeys.includes('22')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('8') && checkKeys.includes('22') && checkKeys.includes('29')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('22') && checkKeys.includes('29') && checkKeys.includes('36')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 21){
            if(checkKeys.includes('3') && checkKeys.includes('9') && checkKeys.includes('15')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('9') && checkKeys.includes('15') && checkKeys.includes('27')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('15') && checkKeys.includes('27') && checkKeys.includes('33')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('27') && checkKeys.includes('33') && checkKeys.includes('39')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('22') && checkKeys.includes('23') && checkKeys.includes('24')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('6') && checkKeys.includes('11') && checkKeys.includes('16')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('11') && checkKeys.includes('16') && checkKeys.includes('26')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('16') && checkKeys.includes('26') && checkKeys.includes('31')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('7') && checkKeys.includes('14') && checkKeys.includes('28')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('14') && checkKeys.includes('28') && checkKeys.includes('35')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('28') && checkKeys.includes('35') && checkKeys.includes('42')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 27){
            if(checkKeys.includes('9') && checkKeys.includes('15') && checkKeys.includes('21')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('15') && checkKeys.includes('21') && checkKeys.includes('33')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('21') && checkKeys.includes('33') && checkKeys.includes('39')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('28') && checkKeys.includes('29') && checkKeys.includes('30')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('12') && checkKeys.includes('17') && checkKeys.includes('22')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('17') && checkKeys.includes('22') && checkKeys.includes('32')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('22') && checkKeys.includes('32') && checkKeys.includes('37')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('13') && checkKeys.includes('20') && checkKeys.includes('34')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('20') && checkKeys.includes('34') && checkKeys.includes('41')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 33){
            if(checkKeys.includes('15') && checkKeys.includes('21') && checkKeys.includes('27')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('21') && checkKeys.includes('27') && checkKeys.includes('39')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('34') && checkKeys.includes('35') && checkKeys.includes('36')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('18') && checkKeys.includes('23') && checkKeys.includes('28')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('23') && checkKeys.includes('28') && checkKeys.includes('38')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('19') && checkKeys.includes('26') && checkKeys.includes('40')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 39){
            if(checkKeys.includes('21') && checkKeys.includes('27') && checkKeys.includes('33')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('40') && checkKeys.includes('41') && checkKeys.includes('42')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('24') && checkKeys.includes('29') && checkKeys.includes('34')){
                this.returnValue = true;
                return;
            }
        }

        if(justPicked.attributes.key.value == 2){
            if(checkKeys.includes('8') && checkKeys.includes('14') && checkKeys.includes('20')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('3') && checkKeys.includes('4') && checkKeys.includes('5')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('9') && checkKeys.includes('16') && checkKeys.includes('23')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 8){
            if(checkKeys.includes('2') && checkKeys.includes('14') && checkKeys.includes('20')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('14') && checkKeys.includes('20') && checkKeys.includes('26')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('9') && checkKeys.includes('10') && checkKeys.includes('11')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('1') && checkKeys.includes('15') && checkKeys.includes('22')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('15') && checkKeys.includes('22') && checkKeys.includes('29')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 14){
            if(checkKeys.includes('2') && checkKeys.includes('8') && checkKeys.includes('20')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('8') && checkKeys.includes('20') && checkKeys.includes('26')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('20') && checkKeys.includes('26') && checkKeys.includes('32')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('15') && checkKeys.includes('16') && checkKeys.includes('17')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('4') && checkKeys.includes('9') && checkKeys.includes('19')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('7') && checkKeys.includes('21') && checkKeys.includes('28')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('21') && checkKeys.includes('28') && checkKeys.includes('35')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 20){
            if(checkKeys.includes('2') && checkKeys.includes('8') && checkKeys.includes('14')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('8') && checkKeys.includes('14') && checkKeys.includes('26')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('14') && checkKeys.includes('26') && checkKeys.includes('32')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('26') && checkKeys.includes('32') && checkKeys.includes('38')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('21') && checkKeys.includes('22') && checkKeys.includes('23')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('5') && checkKeys.includes('10') && checkKeys.includes('15')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('10') && checkKeys.includes('15') && checkKeys.includes('25')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('13') && checkKeys.includes('27') && checkKeys.includes('34')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('27') && checkKeys.includes('34') && checkKeys.includes('41')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 26){
            if(checkKeys.includes('8') && checkKeys.includes('14') && checkKeys.includes('20')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('14') && checkKeys.includes('20') && checkKeys.includes('32')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('20') && checkKeys.includes('32') && checkKeys.includes('38')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('27') && checkKeys.includes('28') && checkKeys.includes('29')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('11') && checkKeys.includes('16') && checkKeys.includes('21')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('16') && checkKeys.includes('21') && checkKeys.includes('31')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('19') && checkKeys.includes('33') && checkKeys.includes('40')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 32){
            if(checkKeys.includes('14') && checkKeys.includes('20') && checkKeys.includes('26')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('20') && checkKeys.includes('26') && checkKeys.includes('38')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('33') && checkKeys.includes('34') && checkKeys.includes('35')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('17') && checkKeys.includes('22') && checkKeys.includes('27')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('22') && checkKeys.includes('27') && checkKeys.includes('37')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 38){
            if(checkKeys.includes('20') && checkKeys.includes('26') && checkKeys.includes('32')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('39') && checkKeys.includes('40') && checkKeys.includes('41')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('23') && checkKeys.includes('28') && checkKeys.includes('33')){
                this.returnValue = true;
                return;
            }
        }

        if(justPicked.attributes.key.value == 1){
            if(checkKeys.includes('7') && checkKeys.includes('13') && checkKeys.includes('19')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('2') && checkKeys.includes('3') && checkKeys.includes('4')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('8') && checkKeys.includes('15') && checkKeys.includes('22')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 7){
            if(checkKeys.includes('1') && checkKeys.includes('13') && checkKeys.includes('19')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('13') && checkKeys.includes('19') && checkKeys.includes('25')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('8') && checkKeys.includes('9') && checkKeys.includes('10')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('14') && checkKeys.includes('21') && checkKeys.includes('28')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 13){
            if(checkKeys.includes('1') && checkKeys.includes('7') && checkKeys.includes('19')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('7') && checkKeys.includes('19') && checkKeys.includes('25')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('19') && checkKeys.includes('25') && checkKeys.includes('31')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('14') && checkKeys.includes('15') && checkKeys.includes('16')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('20') && checkKeys.includes('27') && checkKeys.includes('34')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 19){
            if(checkKeys.includes('1') && checkKeys.includes('7') && checkKeys.includes('13')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('7') && checkKeys.includes('13') && checkKeys.includes('25')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('13') && checkKeys.includes('25') && checkKeys.includes('31')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('25') && checkKeys.includes('31') && checkKeys.includes('37')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('20') && checkKeys.includes('21') && checkKeys.includes('22')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('4') && checkKeys.includes('9') && checkKeys.includes('14')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('26') && checkKeys.includes('33') && checkKeys.includes('40')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 25){
            if(checkKeys.includes('7') && checkKeys.includes('13') && checkKeys.includes('19')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('13') && checkKeys.includes('19') && checkKeys.includes('31')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('19') && checkKeys.includes('31') && checkKeys.includes('37')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('26') && checkKeys.includes('27') && checkKeys.includes('28')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('10') && checkKeys.includes('15') && checkKeys.includes('20')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 31){
            if(checkKeys.includes('13') && checkKeys.includes('19') && checkKeys.includes('25')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('19') && checkKeys.includes('25') && checkKeys.includes('37')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('32') && checkKeys.includes('33') && checkKeys.includes('34')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('16') && checkKeys.includes('21') && checkKeys.includes('26')){
                this.returnValue = true;
                return;
            }
        }
        if(justPicked.attributes.key.value == 37){
            if(checkKeys.includes('19') && checkKeys.includes('25') && checkKeys.includes('31')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('38') && checkKeys.includes('39') && checkKeys.includes('40')){
                this.returnValue = true;
                return;
            }
            if(checkKeys.includes('22') && checkKeys.includes('27') && checkKeys.includes('32')){
                this.returnValue = true;
                return;
            }
        }

        //none are four in a row
        this.returnValue = false;
    }
}

//initiate the game by drawing the circles
let c = new circleMaker();