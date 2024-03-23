planChoiceBlocks.forEach(pBlock=>{
    var baseReturn = pBlock.getAttribute('base-returns')
    var basePercentage = parseInt(baseReturn)/10
    pBlock.querySelectorAll('.p--checkbox').forEach(checkbox=>{
        checkbox.addEventListener('click', ()=>{
            modifySliderWithPercentValues(`${basePercentage}`)
        })
    })
})