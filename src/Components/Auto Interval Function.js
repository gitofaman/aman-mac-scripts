//auto function 
var playCondition;
var isPaused;
var pauseTime; //can be variable but, mostly a constant
function autoIntervalFunction(time, func) {
    //playCondition => 0 means stop, 1 means pause for a certain time, 2 means play
    var autoInterval = setInterval(()=>{
        if(!isPaused) { 
            if(playCondition === 2) {
                func()
            } else if (playCondition === 1) {
                //increases the pause time
                time = time + pauseTime;
            } else {
                clearInterval(autoInterval)
            }
        }
    }, time)
}