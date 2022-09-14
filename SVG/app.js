//the class with the game logic
class Game{
    //class properties
    foundCircles = 0;
    totalCircles = 0;
    searchColor = "#99FF00";
    normalColor = "#7700AA";
    gameZone = document.getElementById("gameZone");
    foundBar = new FoundBar();

    constructor(){
        //make the circles
        for(var i = 0; i<25; i++){
            //create
            let newCirc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            
            //styling on the circle
            newCirc.classList.add("gameCirc");
            newCirc.setAttribute("cx", Math.random()*400);
            newCirc.setAttribute("cy", Math.random()*400);

            //random color
            if(Math.random() < .3){
                newCirc.dataset.hiddenColor = this.searchColor;
                this.totalCircles ++;
            }else{
                newCirc.dataset.hiddenColor = this.normalColor;
            }

            //mouse events
            //over to show hidden color
            newCirc.addEventListener("mouseover", (event) => {
                event.target.style.fill = event.target.dataset.hiddenColor;
            });
            //out to hide color
            newCirc.addEventListener("mouseout", (event) => {
                event.target.style.fill = "#000";
            });

            //select click
            newCirc.addEventListener("click", (event) => {
                //color match
                if(event.target.dataset.hiddenColor == this.searchColor){
                    event.target.remove();

                    //store the score
                    this.foundCircles++;

                    //update UI
                    this.foundBar.setPercent(this.foundCircles / this.totalCircles);
                }
            });

            //add to the screen
            this.gameZone.appendChild(newCirc);
        }
    }
}

class FoundBar{
    element = document.getElementById("foundBar");
    maxSize = 130;
    percent = 0;

    setPercent(percent){
        this.percent = percent;
        this.element.setAttribute("width", this.percent * this.maxSize);
    }
}

let g = new Game();