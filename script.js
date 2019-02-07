const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timmerRunning = false;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    if(time<=9){
        time = "0"+time;}
    return time;    
    
}

// Run a standard minute/second/hundredths timer:
function runTimer(){
    let currentTime = leadingZero(timer[0])+':'+leadingZero(timer[1])+':'+timer[2];
    theTimer.innerHTML = currentTime;
    timer[3]++;
    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100)-(timer[0]*60));
    timer[2] = Math.floor(timer[3]-(timer[1]*100)-timer[0]*100*60);
}

// Match the text entered with the provided text on the page:
function spellCheck(){
    let testEntered = testArea.value;
    let originTextMatch = originText.substring(0,testEntered.length);

    if(testEntered == originText){
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890"
        }else{
            if(testEntered == originTextMatch){testWrapper.style.borderColor = "#65CCf3"
                }else{testWrapper.style.borderColor = "#E95D0F"}
    ;}
    

}

// Start the timer:
function start(){
        let testEnterLength = testArea.value.length;
        if(testEnterLength === 0 && !timmerRunning){
            timmerRunning = true;
            interval = setInterval(runTimer,10);
        }
        console.log(testEnterLength);
}

// Reset everything:
function reset(){
    clearInterval(interval);
    interval = null;
    timer[0,0,0,0];
    timmerRunning = false;
    testArea.value ='';
    theTimer.innerHTML= '00:00:00';
    testWrapper.style.borderColor = 'grey';
    console.log('reset button has been pressed!')
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup",spellCheck,false);
resetButton.addEventListener('click',reset,false);