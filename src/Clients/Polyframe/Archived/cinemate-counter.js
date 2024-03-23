var animateNumber = () => {
    anime({
        targets: 'input.cn',
        value: [0, 23],
        round: 1,
        easing: 'easeInOutExpo',
        duration: 2500
      });

}