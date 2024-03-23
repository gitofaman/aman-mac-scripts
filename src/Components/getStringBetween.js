function getStringInBetween(string, start , end) {
    // start and end will be excluded
    var indexOfStart = string.indexOf(start)
    indexOfStart = indexOfStart + start.length;
    var newString = string.slice(indexOfStart)
    var indexOfEnd = newString.indexOf(end)
    return newString.slice(0, indexOfEnd)
}
