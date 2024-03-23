var dynamicLinks, monkeyDynamicLinks;
monkeyDynamicLinks = document.querySelectorAll('a.is--dynamic')
dynamicLinks = document.querySelectorAll('#dynamic-link a')
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
monkeyDynamicLinks.forEach(monkeyDynamicLink => {
    var mTextArray = monkeyDynamicLink.innerText.split('');
    var biggestBet = 0;
    var usingDynamicLink;
    dynamicLinks.forEach(dynamicLink=> {
        var dTextArray = dynamicLink.innerText.split('');
        var thisBet = 0;
        dTextArray.forEach(dText=> {
            if(dText in mTextArray) {
                thisBet++;
            }
        })
        if(thisBet > biggestBet) {
            biggestBet = thisBet;
            usingDynamicLink = dynamicLink;
        }
    })
    monkeyDynamicLink.innerText = usingDynamicLink.innerText;
    monkeyDynamicLink.setAttribute('href', usingDynamicLink.getAttribute('href'))
})