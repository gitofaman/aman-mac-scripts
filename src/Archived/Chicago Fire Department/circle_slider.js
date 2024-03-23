// formula: x2 + y2 = r2

function yValue(x, r) {
    return Math.sqrt(Math.pow(r, 2) - Math.pow(x, 2))
}

function circleRotate(element, r) {
    // var x = -r
    // var upperCurve = true;
    // var xIncrement = () => {
    //     if(upperCurve && x<r) {
    //         if(x === r-0.1) {
    //             x = x + 0.1;
    //             upperCurve = false;
    //         } else {
    //             x = x + 0.1;
    //         }
    //     } else {
            
    //     }
    // }
    var circleInterval = setInterval(()=>{
        element.style.transform = `translate(${x}px, ${yValue(x, r)}px)`
        if(x<r) {
            x = x + 0.1;
        } else {
            clearInterval(circleInterval)
        }
    }, 10)

}