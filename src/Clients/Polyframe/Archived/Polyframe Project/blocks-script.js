var scriptBlocks = document.querySelectorAll('frame-blocks')
var blockMain = document.querySelector('block-main')
var blockPoints = {
    'column' : [],
    'row' : []
}
var blockRowsNumber = parseInt(blockMain.getAttribute('rows'))
var blockColumnNumber = parseInt(blockMain.getAttribute('column'))

var blockPointUpdater = (attrName, interval, noOfIntervals) => {
    for (i=0; i<noOfIntervals; i++) {
        blockPoints[attrName] = i*interval;
    }
}

var updateBlockPoints = () => {
    var blockMainWidth = blockMain.offsetWidth; //1400
    var blockMainHeight = blockMain.offsetHeight; //1000
    var blockWidthInterval = blockMainWidth/blockColumnNumber //1400/14 = 100
    var blockHeightInterval = blockMainHeight/blockRowsNumber //1000/10 = 100
}