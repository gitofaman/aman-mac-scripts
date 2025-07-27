$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);

  const resetLineSymbol = ($wrap) => {
    const $starter = $wrap.find('[line="left"]');
    const $line    = $wrap.find('[line="line"]');
    const $ender   = $wrap.find('[line="right"]');

    const isHorizontal = $line.outerWidth() > $line.outerHeight();

    gsap.set([$starter, $ender], { opacity: 0, x: 0 });
    gsap.set($line, {
      scaleX: isHorizontal ? 0 : 1,
      scaleY: isHorizontal ? 1 : 0,
      transformOrigin: "left center"
    });
  };

  const animateLineSymbol = ($wrap) => {
    const $starter = $wrap.find('[line="left"]');
    const $line    = $wrap.find('[line="line"]');
    const $ender   = $wrap.find('[line="right"]');

    const isHorizontal = $line.outerWidth() > $line.outerHeight();

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo($starter, { opacity: 0, x: isHorizontal ? -100 : 0 }, { opacity: 1, x: 0, duration: 0.5 })
      .fromTo($ender,   { opacity: 0, x: isHorizontal ?  100 : 0 }, { opacity: 1, x: 0, duration: 0.5 }, "<0.1")
      .fromTo($line,
        isHorizontal ? { scaleX: 0 } : { scaleY: 0 },
        isHorizontal ? { scaleX: 1, duration: 1.5 } : { scaleY: 1, duration: 1.5 },
        "<"
      );
  };

  $('[line="symbol"]').each(function () {
    const $el = $(this);

    resetLineSymbol($el);

    ScrollTrigger.create({
      trigger: $el[0],
      start: "top 80%",
      once: true,               // play only once
      onEnter: () => animateLineSymbol($el),
      // If you want it to play again when scrolling back up:
    //   onEnterBack: () => { resetLineSymbol($el); animateLineSymbol($el); }
    });
  });
});