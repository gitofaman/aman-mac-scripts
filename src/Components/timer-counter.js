var tipsNumber = 20000
var followersNumber = 178
var clonesNumber = 3098

//updating the numbers based on change in date. 
// Define a date in a variable
var definedDate = new Date('2023-09-14'); // Change this date to your desired date

// Get today's date
var today = new Date();

// Calculate the difference in milliseconds
var timeDifference = today - definedDate;

// Calculate the difference in days
var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
var toUpdateBy = daysDifference*3
tipsNumber += toUpdateBy
followersNumber += toUpdateBy
clonesNumber += toUpdateBy


var initPureCounter = (selector, start, end) => {
    new PureCounter({
        // Setting that can't' be overriden on pre-element
        selector: selector,		// HTML query selector for spesific element
    
        // Settings that can be overridden on per-element basis, by `data-purecounter-*` attributes:
        start: start, 			            // Starting number [unit]
        end: end, 			            // End number [unit]
        duration: 1, 	                // The time in seconds for the animation to complete [seconds]
        delay: 10, 			            // The delay between each iteration (the default of 10 will produce 100 fps) [miliseconds]
        once: true, 		            // Counting at once or recount when the element in view [boolean]
        repeat: false, 		            // Repeat count for certain time [boolean:false|seconds]
        decimals: 0, 		            // How many decimal places to show. [unit]
        legacy: true,                   // If this is true it will use the scroll event listener on browsers
        filesizing: false, 	            // This will enable/disable File Size format [boolean]
        currency: false, 	            // This will enable/disable Currency format. Use it for set the symbol too [boolean|char|string]
        separator: false, 	            // This will enable/disable comma separator for thousands. Use it for set the symbol too [boolean|char|string]
    });
}

initPureCounter('.tips', 0, tipsNumber)
initPureCounter('.followers', 0, followersNumber)
initPureCounter('.clones', 0, clonesNumber)