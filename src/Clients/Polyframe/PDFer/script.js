var animateEl = (el, elJson, duration) => {
    var jsonToUse = {
        targets: el,
        duration: duration,
        easing: 'easeOutSine'
    }
    for (key in elJson) {
        jsonToUse[key] = elJson[key]
    }
    anime(jsonToUse)
}

// Add a click event listener to the button
var refreshEvents = () => {
    $('.layout_block-normal').on('mouseenter', function (e) {
        makeActive($(this))
    });
    $('.layout_block-normal').on('mouseleave', function (e) {
        makeInActive($(this))
    });
}
refreshEvents()


var makeActive = (block) => {
    var faActions = $('.fa-actions').clone();
    block.append(faActions);
    faActions.find('[delete]').on('click', () => {
        openPopup(()=>{
            block.remove();
        }, 'Are you sure you want to delete? You CANNOT UNDO this action')
    });
    faActions.find('[move="up"]').on('click', () => {
        moveBlockUp(block);
    });
    faActions.find('[move="down"]').on('click', () => {
        moveBlockDown(block);
    });
    faActions.find('[duplicate]').on('click', () => {
        var newBlock = block.clone()
        newBlock.removeClass("state-actions");
        newBlock.find('.fa-actions').remove()
        newBlock.insertAfter(block)
        refreshEvents()
    });
    block.addClass('state-actions');
}

var makeInActive = (block) => {
    block.removeClass('state-actions');
    block.find('.fa-actions').remove();
}

function moveBlockUp(block) {
    var blocks = $('.layout_block-normal');
    var referenceIndex = blocks.index(block);

    if (referenceIndex > 0) {
        var prevBlock = blocks.eq(referenceIndex - 1);
        block.insertBefore(prevBlock);
    } else {
        console.log('No previous block with the same class found.');
    }
}

function moveBlockDown(block) {
    var blocks = $('.layout_block-normal');
    var referenceIndex = blocks.index(block);

    if (referenceIndex < blocks.length - 1) {
        var nextBlock = blocks.eq(referenceIndex + 1);
        block.insertAfter(nextBlock);
    } else {
        console.log('No next block with the same class found.');
    }
}


var animateEl = (el, elJson, duration) => {
    var jsonToUse = {
        targets: el,
        duration: duration,
        easing: 'easeOutSine'
    };
    for (var key in elJson) {
        jsonToUse[key] = elJson[key];
    }
    anime(jsonToUse);
}

function openPopup(action, msg) {
    $('.fa-popup').css('display', 'flex');
    gsap.fromTo('.fa-popup', {
        opacity: 0
    }, {
        opacity: 1
    });
    
    // Clone the response button
    var newResponseBtn = $('[response=yes]').clone();
    
    // Replace the old response button with the cloned one
    $('[response=yes]').replaceWith(newResponseBtn);
    
    // Attach click event handlers to the new button
    newResponseBtn.on('click', () => {
        action();
        closePopup();
    });
    
    $('[response=no]').on('click', closePopup);
    $('[main-dialog]').text(msg);
}


function closePopup() {
    gsap.to('.fa-popup', {
        opacity: 0,
        onComplete: function() {
            // Set display to 'none' after the animation is finished
            $('.fa-popup').css('display', 'none');
        }
    });
}

$('.print-btn').on('click', ()=>{
    window.print()
})