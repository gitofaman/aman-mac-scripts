var nextNo = (currentIndex, maxIndex) => {
    if(currentIndex===maxIndex) {
        return 0
    } else {
        return currentIndex + 1;
    }
}

var prevNo = (currentIndex, maxIndex) => {
    if(currentIndex===0) {
        return maxIndex;
    } else {
        return currentIndex - 1;
    }
}