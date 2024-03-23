const progressPara = document.querySelector('[progress]')
const unit = document.querySelector('[unit]')
// Function to calculate the sum of numbers in an array
function calculateSum(arr) {
    return arr.reduce((total, num) => {
        if (!isNaN(num)) {
            return total + parseFloat(num);
        }
        return total;
    }, 0);
}
function filterNumbersAndZeros(arr) {
    return arr.filter(item => {
        if (typeof item === 'number' && !isNaN(item) && item !== 0) {
            return true;
        }
        if (typeof item === 'string') {
            const numericValue = parseFloat(item);
            return !isNaN(numericValue) && numericValue !== 0;
        }
        return false;
    });
}
// Get all elements with class "ce-content_1"
const ceContentElements = document.querySelectorAll('.ce-content_1');

const weeksData = [];
let currentWeek = [];
let previousWeekTotal = 0;
progressPara.innerHTML = ''
ceContentElements.forEach((element, index) => {
    const text = element.innerText.trim();
    
    // Check if the text is a number (or "-")
    if (!isNaN(text) || text === '-') {
        currentWeek.push(text);
    }
    var weekMessage = ''

    // Check if we have reached the end of a week (7 elements)
    if (currentWeek.length === 7) {
        const currentWeekTotal = calculateSum(currentWeek);
        // Only include weeks with a non-zero total
        if (currentWeekTotal > 0) {
            weeksData.push(currentWeekTotal);
            // Display the current week's total and compare with the previous week (if available)
            weekMessage += `Week ${weeksData.length} total: <br> ${filterNumbersAndZeros(currentWeek).join(' + ')} = ${currentWeekTotal} ${document.querySelector('[unit]').innerText}<br><br>`;
            progressPara.innerHTML += weekMessage
            // Output the week's data
        }


        // Reset the current week data
        currentWeek = [];
        previousWeekTotal = currentWeekTotal;
    }

    // Check if this is the last element and we don't have a complete week
    if (index === ceContentElements.length - 1 && currentWeek.length > 0) {
        console.log("Week data is still incomplete.");
    }
});
