const moveTml = gsap.timeline({defaults:{
    duration: .5,
    ease: 'power2.inOut'
}})

var roverActive = false;


var rover = document.getElementById('rover')
rover.style.opacity = 0;


var shiftRover = (div) => { 
    var spaceCoeff = 20;
    if(div.offsetHeight > 80) {
        rover.style.fontSize = '18px'
        spaceCoeff = 20
    } else {
        rover.style.fontSize = '11px'
        spaceCoeff = 14
    }
    var divLeftX = div.getBoundingClientRect().x - spaceCoeff/2;
    var divLeftY = div.getBoundingClientRect().y + window.scrollY - spaceCoeff/2;
    var reqWidth = div.offsetWidth + spaceCoeff
    var reqHeight = div.offsetHeight + spaceCoeff
    if(!roverActive) {
        rover.style.left = divLeftX +'px';
        rover.style.right = divLeftY +'px';
        rover.style.width = reqWidth +'px';
        rover.style.height = reqHeight +'px';
        rover.style.opacity = 1;
        roverActive = true;
    }
    var skewDeg;
    if(divLeftX > parseInt(rover.style.left)) {
        skewDeg = 15
    } else if (divLeftX <  parseInt(rover.style.left)) {
        skewDeg = -15
    }
	moveTml.clear()
    moveTml.to(rover, { left: divLeftX, top: divLeftY, width: reqWidth, height: reqHeight })
    .to(rover, {scaleY: 1.2, skewX: skewDeg}, '<0').to(rover, {scaleY: 1, skewX: 0})
}

var aLinks = document.querySelectorAll('a')
aLinks.forEach(aLink => {
    aLink.addEventListener('mouseover', ()=>{
        shiftRover(aLink)
    })
})