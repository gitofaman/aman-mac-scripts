var cards = Array.from(document.querySelectorAll('.acc--card'))

var cardsData = []

function doesCardExist(titleToFind) {
    const foundCard = cardsData.find(card => card.title === titleToFind);
    return !!foundCard; // Returns true if foundCard is not undefined
  }

function isHidden(el) {
    return (el.offsetParent === null)
}

function isSubstringInText(substring, text) {
    // Convert both the substring and text to lowercase for a case-insensitive comparison
    const lowercaseSubstring = substring.toLowerCase();
    const lowercaseText = text.toLowerCase();

    // Check if the lowercase text contains the lowercase substring
    return lowercaseText.includes(lowercaseSubstring);
}

function removeLineBreaks(inputString) {
    // Use a regular expression to replace line breaks with empty strings
    return inputString.replace(/[\r\n]+/g, "");
  }


var cardCategories = [
    "Affordable", //done
    "Apartments", //done
    "Bed & Breakfast", //done
    "Chalets", //done
    "Family Friendly",
    "Hostels", //done
    "Hotels", //done
    "Luxury",
    "Mid Range",
    "Self Catered", // done
    "Short Stays",
    "Solo Travellers", // done
    "Super Central",
    "Summer", // done
    "Winter" // done
]

cards.forEach(card=>{
    var cardTitle = card.querySelector('.acc--card-heading').innerText
    if(!doesCardExist(cardTitle)) {
        var cardsJson = {
            mainImg: card.querySelector('.acc--card-img').getAttribute('src'),
            title: cardTitle,
            pageLink: card.getAttribute('href')
        }
        var relatedCategories = []
        var features = card.querySelectorAll('.acc--feature-grid')
        var featureIndex = 0
        features.forEach(feature=>{
            var featureImg, featureName;
            featureName = feature.querySelector('.acc--card-text').innerText
            cardsJson['Icon Image ' + `${featureIndex + 1}`] = feature.querySelector('.acc--feature-img').getAttribute('src')
            cardsJson['Icon Text ' + `${featureIndex + 1}`] = removeLineBreaks(featureName)
            if(isSubstringInText('£', featureName)) {
                //it means the current feature is price related
                var givenPrice = parseInt(featureName)
                if(givenPrice >= 100) {
                    relatedCategories.push(cardCategories[0]) //it means the accomodation is affordable
                }
            }
            if(isSubstringInText('bed', featureName) && isSubstringInText('breakfast', featureName)) {
                relatedCategories.push(cardCategories[2]) //it means the accommodation has bed and breakfast facilities
            }
            if(isSubstringInText('cater', featureName)) {
                relatedCategories.push(cardCategories[9]) //it means the accommodation has self catering facilities
            }
            if(isSubstringInText('super central', featureName)) {
                relatedCategories.push(cardCategories[12])
            }
            featureIndex++;
        })
    
        if(card.parentElement.classList.contains('chalet')) {
            relatedCategories.push(cardCategories[3]);
        }
        if(card.parentElement.classList.contains('appartment')) {
            relatedCategories.push(cardCategories[1]);
        }
        if(card.parentElement.classList.contains('hotel')) {
            if(isSubstringInText('hostel', cardTitle)) {
                relatedCategories.push(cardCategories[5])
                relatedCategories.push(cardCategories[11])            //hostel is for solo travellers
            } else {
                relatedCategories.push(cardCategories[6])
            }
        }
        // if(card.closest('.section.is--white-linear-gradient').classList.contains('summer-slider-section')) {
        //     relatedCategories.push(cardCategories[13])
        //     console.log('Summer card')
        // }
        // if(card.closest('.section.is--white-linear-gradient').classList.contains('winter-slider-section')) {
        //     relatedCategories.push(cardCategories[14])
        //     console.log('Winter card')
        // }
    
        cardsJson['Categories'] = relatedCategories.join(';');
    
        if(!isHidden(card)) {
            cardsData.push(cardsJson);
        }
    }
})

cardsData.forEach(cardData=>{
    let title = cardData.title
    let summerCards = document.querySelectorAll('.summer-slider-section .acc--card')
    let Categories = cardData['Categories']
    let relatedCategories = Categories.split(';')
    let summerCategory = cardCategories[13]
    summerCards.forEach(summerCard=>{
        var sumTitle = summerCard.querySelector('.acc--card-heading').innerText
        if(sumTitle.toLowerCase() === title.toLowerCase()) {
            if(!relatedCategories.includes(summerCategory)) {
                relatedCategories.push(summerCategory)
            }
        }
    })
    cardData['Categories'] = relatedCategories.join(';')
})
cardsData.forEach(cardData=>{
    let title = cardData.title
    let winterCards = document.querySelectorAll('.winter-slider-section .acc--card')
    let Categories = cardData['Categories']
    let relatedCategories = Categories.split(';')
    let winterCategory = cardCategories[14]
    winterCards.forEach(winterCard=>{
        var winTitle = winterCard.querySelector('.acc--card-heading').innerText
        if(winTitle.toLowerCase() === title.toLowerCase()) {
            if(!relatedCategories.includes(winterCategory)) {
                relatedCategories.push(winterCategory)
            }
        }
    })  
    cardData['Categories'] = relatedCategories.join(';')
})

console.log(cardsData)