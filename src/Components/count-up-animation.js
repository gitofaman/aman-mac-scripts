// Create a hidden container for measuring spans
let measurementContainer = document.createElement('div');
measurementContainer.style.position = 'absolute';
measurementContainer.style.visibility = 'hidden';
measurementContainer.style.height = '0px';
measurementContainer.style.overflow = 'hidden';
document.body.appendChild(measurementContainer);

var adjustInputWidth = (stat) => {
  // Create a hidden span inside the container
  let span = document.createElement('span');
  span.style.whiteSpace = 'nowrap';
  span.style.font = window.getComputedStyle(stat).font; // Match the input's font styles
  measurementContainer.appendChild(span);

  const updateWidth = () => {
    span.textContent = stat.value || '0'; // Ensure there is a fallback text
    stat.style.width = `${span.offsetWidth + 5}px`; // Add some padding
  };

  // Adjust width initially and whenever the value changes
  updateWidth();
  stat.addEventListener('input', updateWidth);

  // Remove the span when it's no longer needed
  stat.addEventListener('blur', () => {
    if (measurementContainer.contains(span)) {
      measurementContainer.removeChild(span);
    }
  });
};

var animateNumber = (stat) => {
  var finalValue = parseFloat(stat.value);
  var fractionIncrease = stat.getAttribute('fraction-increase') === 'true';
  var originalValue = stat.value; // Save the original value (e.g., 12B, $42.5M)

  // Adjust width initially
  adjustInputWidth(stat);

  anime({
    targets: stat,
    value: [0, finalValue],
    round: fractionIncrease ? false : 1,
    easing: 'easeInOutExpo',
    duration: 3500,
    update: function (anim) {
      let currentValue = anim.animations[0].currentValue;
      let displayValue = fractionIncrease
        ? currentValue.toFixed(1) // Fractions during animation
        : Math.round(currentValue); // Whole numbers during animation

      stat.value = displayValue;

      // Adjust width dynamically
      stat.dispatchEvent(new Event('input'));
    },
    complete: function () {
      // Restore the original value after animation completes
      stat.value = originalValue;
      stat.dispatchEvent(new Event('input')); // Final width adjustment
    },
  });
};

var statsHead = document.querySelectorAll('input.stats-head');

window.addEventListener('scroll', () => {
  statsHead.forEach((stat) => {
    var notAnimated = !stat.hasAttribute('animated');
    if (
      stat.getBoundingClientRect().top + 100 < window.innerHeight &&
      notAnimated &&
      stat.getBoundingClientRect().top > 100
    ) {
      animateNumber(stat);
      stat.setAttribute('animated', 'true');
    }
  });
});