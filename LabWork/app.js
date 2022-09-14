let block = document.getElementById("block");

// function smallRed(){
// resetAnimation(block);
// block.classList.remove("bigblue");
// block.classList.add("smallred");
// }

// function bigBlue(){
// resetAnimation(block);
// block.classList.remove("smallred");
// block.classList.add("bigblue");
// }

// function resetAnimation(el){
//     el.style.animation = 'none';
//     el.offsetHeight;
//     el.style.animation = null;
// }

TweenMax.to(block, { duration:2, width: 40, height: 40, backgroundColor: "#1B54F7"});