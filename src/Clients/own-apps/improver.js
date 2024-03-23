// Function to add a day to a given date string
function addDay(dateStr) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }); // Format as "01 Oct"
}

const nextDateElements = document.querySelectorAll('.ce-date');
const daysLeftElement = document.querySelector('.days-left');
const finalDateElement = document.querySelector('[final-date]');

let currentDate = '2023-09-30'; // Get the starting date
let todaysDate = '2023-10-03'; // Get the current date

// Calculate the number of days passed
const startDate = new Date(currentDate);
const endDate = new Date(todaysDate);
const daysPassed = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000));

// Calculate the total number of "ce-date" blocks
const totalBlocks = nextDateElements.length;

// Calculate the remaining days
const remainingDays = totalBlocks - daysPassed;

// Update the inner text of the "days-left" block
daysLeftElement.innerText = remainingDays;

for (let i = 0; i < nextDateElements.length; i++) {
    currentDate = addDay(currentDate); // Add a day to the current date
    nextDateElements[i].innerText = currentDate; // Update the inner text
}

// Set the inner text of the final date element to the last calculated date
finalDateElement.innerText = currentDate;
