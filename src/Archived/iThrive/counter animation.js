//Counter Animation
var allStatsHead = document.querySelectorAll('[counter-text]')
var statsHead = []
allStatsHead.forEach(head => {
    statsHead.push(head)
})
finalTexts = []

var isElementInView = (el) => {
    var windowHeight = window.innerHeight;
    if(el.getBoundingClientRect().y < (windowHeight/1.3) && el.getBoundingClientRect().y > 0) {
        return true;
    } else {
        return false;
    }
}

var separateTextAndNum = (x) => {
    var textArray = x.split('')
    var text = []
    var num = []
    textArray.forEach(t=>{
        if (t>-1) {
            num.push(t)
        } else {
            text.push(t)
        }
    })
    return [text, num]
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
        window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
    }      

const statsAnimation = () => {
    statsHead.forEach(head=>{
        numbers = head.querySelectorAll('[counter-number]')
        numbers.forEach(no=>{
            finalValue = parseInt(no.innerText)
            animateValue(no, 0, finalValue, 3000)
        })
    })
}

animateStatsIfInView = () => {
    if(isElementInView(statsHead[0])) {
        statsAnimation()
        window.removeEventListener('scroll', animateStatsIfInView)
    }
}

window.addEventListener('scroll', animateStatsIfInView)