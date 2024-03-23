var mobileViewScript = () => {
    //to reposition the element based on their view position
    function moveElement(elToMove, elBefore) {
        elBefore.parentNode.insertBefore(elToMove, elBefore);
    }


    moveElement(document.querySelector('.second-block'), document.querySelector('.third-block'))
    moveElement(document.querySelector('.forth-block'), document.querySelector('.second-block'))
    moveElement(document.querySelector('.fifth-block'), document.querySelector('.second-block'))
    //end of repositioning


    var aBlocks, closeBtn, topNav, bottomNav;
    topNav = document.querySelector('.v2-nav-content-top')
    bottomNav = document.querySelector('.v2-nav-bottom')
    closeBtn = document.querySelector('.v2-close')
    aBlocks = Array.from(document.querySelectorAll('.v3-block'))
    var arrowTimeline = null;
    var constants = {
        'easing': `easeInOutExpo`,
        'animationTime': 1.25,
        'cardClass': '.v3-card',
        'vClasses': ['v-25', 'v-50', 'v-75'],
        'stateAttr': 'el-state'
    }

    var animatedTimeLine;
    var transformingTimeout;
    var transforming = false;
    var aTime = constants.animationTime
    var activeBlockIndex = -1;
    var animationTime;

    var assignBlockActive = (blockIndex) => {
        var givenBlock = aBlocks[blockIndex]
        givenBlock.setAttribute(constants.stateAttr, 'active')
        givenBlock.querySelector(constants.cardClass).style.cursor = 'default'
        var cornerArrow = givenBlock.querySelector('.corner-arrow')
        animateEl(cornerArrow, {
            opacity: 0
        }, aTime * 1000 / 4)
    }

    var assignBlockInactive = (blockIndex) => {
        var givenBlock = aBlocks[blockIndex]
        givenBlock.setAttribute(constants.stateAttr, 'inactive')
        givenBlock.querySelector(constants.cardClass).style.cursor = 'pointer'
        var cornerArrow = givenBlock.querySelector('.corner-arrow')
        animateEl(cornerArrow, {
            opacity: 1
        }, aTime * 1000 / 4)
    }

    var assignStates = () => {
        aBlocks.forEach(aBlock => {
            var currBlockIndex = aBlocks.indexOf(aBlock)
            if (activeBlockIndex === currBlockIndex) {
                assignBlockActive(currBlockIndex)
            } else {
                assignBlockInactive(currBlockIndex)
            }
        })
    }

    var animateEl = (el, givenJson, duration) => {
        var useThis = {
            targets: el,
            duration: duration,
            easing: constants.easing
        }
        for (key in givenJson) {
            useThis[key] = givenJson[key]
        }
        anime(useThis)
    }

    var appearCloseBtn = (pos) => {
        arrowTimeline = gsap.timeline({
            defaults: {
                duration: .5,
                ease: 'bounce'
            }
        })
        arrowTimeline.fromTo(topNav, {
            width: '100%'
        }, {
            width: `${pos}%`,
            ease: 'power2.in'
        }).fromTo(bottomNav, {
            width: '100%'
        }, {
            width: `${100-pos}%`,
            duration: .5,
            ease: 'power2.in'
        }, '<').fromTo('.v2-close', {
            width: '0px',
            y: '-100%'
        }, {
            width: `${topNav.offsetHeight}px`,
            y: '0%'
        }).fromTo(topNav.querySelector('.v2-nav-content'), {
            borderRightWidth: '0px',
            borderTopRightRadius: '0em',
            borderBottomRightRadius: '0em',
            borderRightStyle: 'none'
        }, {
            borderRightWidth: '1px',
            borderTopRightRadius: '1em',
            borderBottomRightRadius: '1em',
            borderRightStyle: 'solid',
            ease: 'power2.in'
        }, '<').fromTo(bottomNav.querySelector('.v2-nav-content'), {
            borderLeftWidth: '0px',
            borderTopLeftRadius: '0em',
            borderBottomLeftRadius: '0em',
            borderLeftStyle: 'none'
        }, {
            borderLeftWidth: '1px',
            borderTopLeftRadius: '1em',
            borderBottomLeftRadius: '1em',
            borderLeftStyle: 'solid',
            ease: 'power2.in'
        }, '<')
    }

    var disappearCloseBtn = () => {
        if (arrowTimeline === null) {
            appearCloseBtn(100)
            arrowTimeline.timeScale(0)
        }
        arrowTimeline.reverse()
    }

    var reverseTimeline = () => {
        animatedTimeLine.reverse()
        disappearCloseBtn()
        activeBlockIndex = -1
    }

    var animationStarted = () => {
        gsap.fromTo('.v3-card-content', {
            opacity: 1,
            scale: 1
        }, {
            opacity: 0,
            scale: 0.98,
            duration: .5,
            ease: 'power2.out'
        })
    }

    var animationStopped = () => {
        assignStates()
        setTimeout(() => {
            gsap.fromTo('.v3-card-content', {
                opacity: 0,
                scale: 0.98
            }, {
                opacity: 1,
                scale: 1,
                duration: .5,
                ease: 'power2.out'
            })
        }, 500)
        setTimeout(() => {
            document.querySelectorAll('.v3-card-content').forEach(content => {
                content.removeAttribute('style')
            })
        }, 1000)
    }

    var disableAnimationRequestsFor = (time) => {
        clearTimeout(transformingTimeout)
        transforming = true;
        animationStarted()
        transformingTimeout = setTimeout(() => {
            transforming = false;
            animationStopped()
        }, time)
    }

    var triggerBlockAnimation = (blockIndex) => {
        animatedTimeLine = gsap.timeline({
            defaults: {
                ease: 'power4.inOut',
                duration: 1
            }
        })
        if (window.innerWidth < 991) {
            var currentBlockEndPos = 100;
            if (blockIndex === 0) {
                animatedTimeLine.to(aBlocks[3], {
                    left: '-50%',
                    duration: 1
                }).to(aBlocks[4], {
                    left: '-100%'
                }, '<0.5').to(aBlocks[2], {
                    left: '-100%'
                }, '<0.4').to(aBlocks[1], {
                    left: '100%'
                }, '<0.3').to(aBlocks[0], {
                    width: '100%',
                    height: '100%'
                }, '<0.2')
            }
            if (blockIndex === 1) {
                animatedTimeLine.to(aBlocks[0], {
                    left: '-50%',
                    duration: 1
                }).to(aBlocks[2], {
                    left: '-100%'
                }, '<0.5').to(aBlocks[3], {
                    left: '-50%'
                }, '<0.4').to(aBlocks[4], {
                    left: '-100%'
                }, '<0.3').to(aBlocks[1], {
                    width: '100%',
                    height: '100%',
                    left: '0%'
                }, '<0.2')
            }
            if (blockIndex === 2) {
                animatedTimeLine.to(aBlocks[0], {
                    left: '-50%',
                    duration: 1
                }).to(aBlocks[1], {
                    left: '-100%'
                }, '<0.5').to(aBlocks[3], {
                    left: '-50%'
                }, '<0.4').to(aBlocks[4], {
                    left: '-100%'
                }, '<0.3').to(aBlocks[2], {
                    width: '100%',
                    height: '100%',
                    left: '0%',
                    top: '0%'
                }, '<0.2')
            }
            if (blockIndex === 3) {
                animatedTimeLine.to(aBlocks[0], {
                    left: '-50%',
                    duration: 1
                }).to(aBlocks[1], {
                    left: '-100%'
                }, '<0.5').to(aBlocks[2], {
                    left: '-100%'
                }, '<0.4').to(aBlocks[4], {
                    left: '100%'
                }, '<0.3').to(aBlocks[3], {
                    width: '100%',
                    height: '100%',
                    left: '0%',
                    top: '0%'
                }, '<0.2')
            }
            if (blockIndex === 4) {
                animatedTimeLine.to(aBlocks[0], {
                    left: '-50%',
                    duration: 1
                }).to(aBlocks[2], {
                    left: '-100%'
                }, '<0.5').to(aBlocks[3], {
                    left: '-50%'
                }, '<0.4').to(aBlocks[1], {
                    left: '100%'
                }, '<0.3').to(aBlocks[4], {
                    width: '100%',
                    height: '100%',
                    left: '0%',
                    top: '0%'
                }, '<0.2')
            }
            setTimeout(() => {
                appearCloseBtn(currentBlockEndPos)
            }, aTime * 1000)
            animatedTimeLine.totalDuration(aTime)
        }
    }

    aBlocks.forEach(animateBlock => {
        var currentBlockIndex = aBlocks.indexOf(animateBlock)
        animateBlock.querySelector(constants.cardClass).addEventListener('click', () => {
            var blockState = animateBlock.getAttribute(constants.stateAttr)
            if (blockState === 'active') {
                return;
            }
            if (!transforming) {
                if (activeBlockIndex === -1) {
                    triggerBlockAnimation(currentBlockIndex)
                    disableAnimationRequestsFor(aTime * 1000)
                } else {
                    var timeScaleOnReverse = 2
                    transforming = true;
                    animatedTimeLine.totalDuration(aTime / timeScaleOnReverse)
                    reverseTimeline()
                    setTimeout(() => {
                        triggerBlockAnimation(currentBlockIndex)
                    }, aTime * 1000)
                    disableAnimationRequestsFor(aTime * 2000)
                }
                activeBlockIndex = currentBlockIndex
            }
        })
        assignStates()
    })

    closeBtn.addEventListener('click', () => {
        if (!transforming) {
            reverseTimeline()
            disableAnimationRequestsFor(aTime * 1000)
        }
    })

    disappearCloseBtn()
}