var animateEl = (el, animateJson, aduration) => {
    console.log(aduration)
    var jsonToAnimate = {
        targets: el,
        duration: aduration,
        easing: `easeOutSine`
    }
    for (key in animateJson) {
        jsonToAnimate[key] = animateJson[key]
    }
    anime(jsonToAnimate)
}