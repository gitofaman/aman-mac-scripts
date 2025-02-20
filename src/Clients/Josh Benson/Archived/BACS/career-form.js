var addMoreBlocks = document.querySelectorAll('[add-more]')
addMoreBlocks.forEach(addMoreBlock => {
    var addMoreBtn = addMoreBlock.querySelector('.button-2')
    var blockToDuplicate = addMoreBlock.querySelector('.form-step_1_inside')
    addMoreBtn.addEventListener('click', ()=>{
        var newBlock = blockToDuplicate.cloneNode(true)
        var prevHead = newBlock.querySelector('.label_tops').innerText
        var insideBlocks = addMoreBlock.querySelectorAll('.form-step_1_inside')
        var newIndex = insideBlocks.length + 1
        if(newIndex > 5) {
            alert('Sorry, Only 5 entries possible')
            return;
        }
        newBlock.querySelector('.label_tops').innerText = prevHead.slice(0, prevHead.length-1) + newIndex
        var newInputs = newBlock.querySelectorAll('input')
        newInputs.forEach(newInput=>{
            newInput.setAttribute('name', `${newInput.getAttribute('name')}${newIndex}`)
            newInput.setAttribute('data-name', `${newInput.getAttribute('data-name')}${newIndex}`)
        })
        addMoreBlock.appendChild(newBlock)
    })
})