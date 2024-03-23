var inputSaves = {}
var inputSavedBlocks = {}
var inputSaveNo = 0

function removeParentButNotChild(nodeToBeRemoved) {
    while (nodeToBeRemoved.firstChild) {
        nodeToBeRemoved.parentNode.insertBefore(nodeToBeRemoved.firstChild,
            nodeToBeRemoved);
    }
    nodeToBeRemoved.parentNode.removeChild(nodeToBeRemoved);
}

function saveDivInputs(block) {
    //saves data in input save with index, then deletes each input and then hides the block;
    var blockInputs = Array.from(block.querySelectorAll('input'))
    blockInputs.forEach(blockInput => {
        inputSaves[blockInput.name] = blockInput.value;
    })
    // saving the block node to add later
    if (!block.hasAttribute('saved-input-no')) {
        block.setAttribute('saved-input-no', inputSaveNo)
        inputSavedBlocks[block.getAttribute('saved-input-no')] = block.cloneNode(true)
    }
    block.innerHTML = ''
    block.style.display = 'none'
}

function retainDivInputs(block) {
    block.style.display = ''
    var blockInputs = Array.from(block.querySelectorAll('input'))
    var blockSaveNo = block.getAttribute('saved-input-no');
    block.appendChild(inputSavedBlocks[blockSaveNo])
    removeParentButNotChild(block.firstChild)
    blockInputs.forEach(blockInput => {
        blockInput.value = inputSaves[blockInput.name];
    })
}