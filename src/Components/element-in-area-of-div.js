var isELementInDivArea = (el, div) => {
    var elX = el.getBoundingClientRect().x
    var divX = div.getBoundingClientRect().x
    var divWidth = div.offsetWidth;
    if(elX < divWidth + divX) {
        return true;
    }
    return false;
}