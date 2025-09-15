gsap.registerPlugin(ScrollTrigger, SplitText);

const stickyWrapper = $('.section-wrapped-for-sticky');
const stickySection = $('.section-rotating-sticky-item');
const allComments = stickySection.find('.padding-global.is-ts');
const totalComments = allComments.length;

/* ───────────────────────────────────────
   1. Wrapper height – make it whatever you want, e.g. 300 vh
   ─────────────────────────────────────── */
stickyWrapper.css({
    height: '300vh'
});

/* ───────────────────────────────────────
   2. Split text & stash inner-line jQuery collections
   ─────────────────────────────────────── */
allComments.each(function (i) {
    const $parent = $(this);
    const $comment = $parent.find('[ts="comment"]');

    if (i !== 0) { // stack except the first
        gsap.set($parent, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
        });
    }

    gsap.set($parent, {
        opacity: 1
    });

    const split = new SplitText($comment[0], {
        type: 'lines',
        linesClass: 'ts-line-wrapper'
    });

    split.lines.forEach(line => {
        const inner = document.createElement('div');
        inner.classList.add('ts-line-inner');
        inner.innerHTML = line.innerHTML;
        line.innerHTML = '';
        line.appendChild(inner);
    });

    const innerLines = $comment.find('.ts-line-inner');
    $parent.data('innerLines', innerLines);

    // keep them hidden initially
    gsap.set(innerLines, {
        yPercent: -100
    });
});

/* ───────────────────────────────────────
   3. Scroll logic with single, recyclable timeline
   ─────────────────────────────────────── */
let currentIndex = -1; // which card is fully visible right now
let transitionTL = null; // the one and only timeline

ScrollTrigger.create({
    trigger: stickyWrapper[0],
    start: 'top top',
    end: 'bottom bottom',
    scrub: false, // we’re doing discrete jumps
    onUpdate: self => {
        let currentIndex = -1;
        let transitionTL = null;

        ScrollTrigger.create({
            trigger: stickyWrapper[0],
            start: "top top",
            end: "bottom bottom",
            scrub: false,
            onUpdate: (self) => {
                const progress = self.progress;
                const dir = self.direction || 1; // 1 = down, -1 = up
                const activeIndex = Math.min(totalComments - 1, Math.floor(progress * totalComments));
                if (activeIndex === currentIndex) return;

                // finish and remove any running transition
                if (transitionTL) {
                    transitionTL.progress(1).kill();
                    transitionTL = null;
                }

                const $prevParent = currentIndex >= 0 ? allComments.eq(currentIndex) : null;
                const $nextParent = allComments.eq(activeIndex);

                const $prevLines = currentIndex >= 0 ? $prevParent.data('innerLines') : null;
                const $nextLines = $nextParent.data('innerLines');

                // bring the incoming card above the outgoing one (helps when overlapping)
                if ($prevParent) $prevParent.css('z-index', 1);
                $nextParent.css('z-index', 2);

                // direction-aware positions
                const enterFrom = (dir === 1) ? -100 : 100; // where the new lines start
                const exitTo = (dir === 1) ? -100 : 100; // where the old lines go

                transitionTL = gsap.timeline({
                    onComplete() {
                        currentIndex = activeIndex;
                    }
                });

                if ($prevLines) {
                    transitionTL.to($prevLines, {
                        yPercent: exitTo,
                        duration: 0.45,
                        ease: 'power3.in'
                    }, 0);
                }

                // ensure the incoming lines start on the correct side for the current direction
                transitionTL.fromTo($nextLines, {
                        yPercent: enterFrom
                    }, {
                        yPercent: 0,
                        duration: 0.75,
                        ease: 'power3.out'
                    },
                    $prevLines ? 0.05 : 0
                );
            }
        });

    }
});