// Define an array of strings to be displayed and erased
const textArray = [
  "Spaces",
  "Homes",
  "Blocks",
  "Communities"
  // Add more strings as needed
];
let animationSpeed = 150;
// Initialize variables
let typeJsText = document.querySelector("[animated-text]");
typeJsText.innerText = ''
let stringIndex = 0; // Index of the current string in the array
let charIndex = 0; // Index of the current character in the current string
let isTyping = true; // Whether we are currently typing or erasing

function typeJs() {
  if (stringIndex < textArray.length) {
    // Check if there are more strings to display or erase
    const currentString = textArray[stringIndex];

    if (isTyping) {
      // Typing animation
      if (charIndex < currentString.length) {
        typeJsText.innerHTML += currentString.charAt(charIndex);
        if(currentString.length>6) {
          typeJsText.style.fontSize = '3.5rem'
        } else {
          typeJsText.style.fontSize = ''
        }
        charIndex++;
      } else {
        isTyping = false; // Switch to erasing mode
      }
    } else {
      // Erasing animation
      if (charIndex > 0) {
        typeJsText.innerHTML = currentString.substring(0, charIndex - 1);
        charIndex--;
      } else {
        isTyping = true; // Switch back to typing mode
        stringIndex++; // Move to the next string

        if (stringIndex >= textArray.length) {
          stringIndex = 0; // Reset to the beginning of the array
        }

        charIndex = 0; // Reset character index
        typeJsText.innerHTML = ""; // Clear the content for the new string
      }
    }
  }
}

// Set an interval to call the typeJs function
setInterval(typeJs, animationSpeed); // You can adjust the animation speed as needed
