var rearrangedArrays = (startNumber, totalNumbers) => {
    var oldArray = Array.from(Array(totalNumbers).keys())
    var newArray = oldArray.splice(oldArray.indexOf(startNumber), totalNumbers)
    newArray.push(...oldArray)
    return newArray
}