function addNBlocks(parentDiv, childDiv, n) {
    // Get the current number of child divs
    const currentCount = parentDiv.querySelectorAll('.childDiv').length;
    // Clone and append child divs until the count reaches n
    for (let i = currentCount; i < n - 1; i++) {
        const clonedDiv = childDiv.cloneNode(true);
        parentDiv.appendChild(clonedDiv);
    }
}

function findFinalDate(startDateStr, daysToAdd) {
    // Parse the input date string to a Date object
    const startDate = new Date(startDateStr);

    // Calculate the final date by adding daysToAdd
    const finalDate = new Date(startDate);
    finalDate.setDate(startDate.getDate() + daysToAdd - 1);

    // Format the final date as "dd Month yyyy"
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const finalDateString = finalDate.toLocaleDateString('en-US', options);

    return finalDateString;
}

function subtractDatesInDays(date1, date2) {
    // Set both dates to the same time (midnight)
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = date1 - date2;

    // Convert milliseconds to days
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // 24 hours/day * 60 minutes/hour * 60 seconds/minute * 1000 milliseconds/second
    const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsPerDay);

    return differenceInDays;
}
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


var skills;



const savedJsonData = Cookies.get('all-skills');

if (savedJsonData) {
    // Parse the JSON string back to a JSON object
    const parsedJsonData = JSON.parse(savedJsonData);

    // Now, you can use the parsed JSON data as needed
    skills = parsedJsonData
} else {
    skills = [{
        "skillName": "Main Works",
        "startDate": "2023-10-09",
        "skillDays": 90,
        "skillData": [0, 1, 2, 3],
        "skilUnit": "Hours"
    }, {
        "skillName": "Exercise",
        "startDate": "2023-10-09",
        "skillDays": 75,
        "skillData": [0, 1, 2, 3],
        "skilUnit": "Reps"
    }]
}

var i = 1
while (i < skills.length) {
    const $newSkillblock = $('.skill_block').clone();
    $('[skill-row]').append($newSkillblock)
    i++;
}

var updateWholeContent = () => {
    skills.forEach(skill => {
        var skillIndex = skills.indexOf(skill)
        var skillBlock = document.querySelector(`.skill_block[skill-index="${skillIndex}"]`)
        const newData = Array.from(skillBlock.querySelectorAll('[contenteditable]')).map(sb => {
            return sb.innerText;
        })
        skill.skillData = newData
    })
    Cookies.set('all-skills', JSON.stringify(skills));
}

document.addEventListener('input', updateWholeContent)

var initiateSkill = (skill, index) => {
    var skillBlocks = document.querySelectorAll('.skill_block')
    var currentSb = skillBlocks[index];
    var title = currentSb.querySelector('[skill-name]')
    var daysLeft = currentSb.querySelector('[days-left]')
    var finalDate = currentSb.querySelector('[final-date]')
    var unit = currentSb.querySelector('[unit]')
    currentSb.setAttribute('skill-index', index)
    title.innerText = skill.skillName
    finalDate.innerText = findFinalDate(skill.startDate, skill.skillDays - 1)
    var daysToSubtract = subtractDatesInDays(new Date(), new Date(skill.startDate))
    console.log(daysToSubtract)
    daysLeft.innerText = skill.skillDays - daysToSubtract
    unit.innerText = skill.skilUnit

    addNBlocks(currentSb.querySelector('.crossboard'), currentSb.querySelector('.ce-cell'), skill.skillDays)
    var ceDates = currentSb.querySelectorAll('.ce-date')
    const startDate = new Date(skill.startDate); // Change this to your desired start date
    var index = 0
    ceDates.forEach(ceDate => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + index);

        // Format the date as 'Mon d' (e.g., 'Oct 9')
        const formattedDate = date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric'
        });

        // Update the innerText of the current .ce-date div
        ceDate.innerText = formattedDate
        index++;
    })
    var skillIndex = 0
    var contentEditables = currentSb.querySelectorAll('[contenteditable]')
    skill.skillData.forEach(num => {
        contentEditables[skillIndex].innerText = num
        skillIndex++;
    })

    const progressPara = currentSb.querySelector('[progress]')

    // Get all elements with class "ce-content_1"
    const ceContentElements = currentSb.querySelectorAll('.ce-content_1');

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
                weekMessage += `Week ${weeksData.length} total: <br> ${filterNumbersAndZeros(currentWeek).join(' + ')} = ${currentWeekTotal} ${currentSb.querySelector('[unit]').innerText}<br><br>`;
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

}

skills.forEach(skill => {
    initiateSkill(skill, skills.indexOf(skill))
})