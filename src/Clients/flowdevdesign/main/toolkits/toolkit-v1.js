$(document).ready(function() {
    // Store references and state
    var popups = {}; // { 0: { main: element, isOpen: false } }

    // Initialize popups
    $('[popup]').each(function() {
        var main = $(this);
        var popupIndex = main.attr('popup');
        var closeButton = main.find('[close]');
        var content = main.find('[popup-content]')

        popups[popupIndex] = {
            main: main,
            isOpen: false,
            content: content
        };

        // Close button click event
        closeButton.on('click', function() {
            closePopup(popupIndex);
        });

        // Initially hide all popups
        gsap.set(main, {
            opacity: 0,
            display: 'none'
        });
    });

    // Open Popup
    var openPopup = function(popupIndex) {
        var popup = popups[popupIndex];
        if (!popup) return console.error('Popup not found:', popupIndex);
        if (popup.isOpen) return; // Already open

        gsap.set(popup.main, {
            display: 'flex'
        });
        popup.main.trigger('opening')
        gsap.to(popup.main, {
            opacity: 1,
            duration: 0.3,
            onComplete: function() {
                popup.isOpen = true;
                popup.main.trigger('popup-opened');
            }
        });
    };

    // Close Popup
    var closePopup = function(popupIndex) {
        var popup = popups[popupIndex];
        if (!popup) return console.error('Popup not found:', popupIndex);
        if (!popup.isOpen) return; // Already closed
        popup.main.trigger('closing')

        gsap.to(popup.main, {
            opacity: 0,
            duration: 0.3,
            onComplete: function() {
                gsap.set(popup.main, {
                    display: 'none'
                });
                popup.isOpen = false;
                popup.main.trigger('popup-closed');
            }
        });
    };

    // Popup Trigger Buttons
    $('[popup-trigger]').each(function() {
        var trigger = $(this);
        var popupIndex = trigger.attr('popup-trigger');

        trigger.on('click', function() {
            openPopup(popupIndex);
        });
    });
    window.fddPopups = popups;

    $(document).trigger('fdd-popups-loaded')

})



const style = document.createElement("style");
style.textContent = `
.spark-container {
  position: absolute;
  width: 30px;
  height: 30px;
  pointer-events: none;
  transform: translate(-50%, -50%);
}
.spark-ray {
  position: absolute;
  width: 4px;
  height: 10px;
  background: black;
  top: 0;
  left: 50%;
  transform-origin: center bottom;
  opacity: 1;
  mix-blend-mode: difference;
  animation: sparkAnim 500ms ease-out forwards;
}
@keyframes sparkAnim {
  0% {
    transform: rotate(var(--angle)) translateY(-5px) scale(1);
  }
  100% {
    transform: rotate(var(--angle)) translateY(-30px) scale(0);
  }
}
`;
document.head.appendChild(style);

// add the click handler
document.addEventListener("click", (e) => {
  const spark = document.createElement("div");
  spark.className = "spark-container";
  spark.style.left = e.pageX + "px";
  spark.style.top = e.pageY + "px";

  // angles between 180–270 degrees
  const startAngle = 270;
  const endAngle = 405;
  const rays = 4;

  for (let i = 0; i < rays; i++) {
    const angle = startAngle + (i * (endAngle - startAngle) / (rays - 1));
    const ray = document.createElement("div");
    ray.className = "spark-ray";
    ray.style.setProperty("--angle", `${angle}deg`);
    spark.appendChild(ray);
  }

  document.body.appendChild(spark);

  // remove after animation
  setTimeout(() => spark.remove(), 800);
});