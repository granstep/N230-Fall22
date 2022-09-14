let title = document.getElementById("title");
let banner = document.getElementById("banner");
let boxes1 = document.getElementsByClassName("box");
let boxes2 = document.getElementsByClassName("box2");

TweenMax.from(title, { duration: 1, x: -200, alpha: 0});
TweenMax.from(banner, { duration: 2, height: 0, alpha: 0});

for(let i=0; i<boxes1.length; i++){
    TweenMax.from(boxes1[i], { duration: 3/(i+3), x: 2000, alpha:0});
}
for(let i=0; i<boxes2.length; i++){
    TweenMax.from(boxes2[i], { duration: 3/(i+3), x: 2000, alpha:0});
}

function colorChange(hovering){
    TweenMax.to(hovering, { duration: .5, backgroundColor: "#FF0000"});
}
function colorBack(left){
    TweenMax.to(left, { duration: .5, backgroundColor: "#993399"});
}

function gallaryClick(){
    TweenMax.to(title, { duration: 1, x: -200, alpha: 0});
    TweenMax.to(banner, { duration: 1, height: 0, alpha: 0});

    for(let i=0; i<boxes1.length; i++){
        TweenMax.to(boxes1[i], { duration: 2/(i+2), x: 2000, alpha:0});
    }
    for(let i=0; i<boxes2.length; i++){
        TweenMax.to(boxes2[i], { duration: 2/(i+2), x: 2000, alpha:0});
    }
}