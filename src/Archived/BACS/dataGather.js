var blocks = Array.from(document.querySelectorAll('.div-block-80'))
var datas = blocks.map(block=>{
    blockName = block.querySelector('h1').innerText
    blockProfession = block.querySelector('p').innerText
    blockImage = block.querySelector('img').getAttribute('src')
    if(blockImage==='https://uploads-ssl.webflow.com/5ec2dba9242b4809e2a71431/60a2b9c0685e52901a60b4e9_faefsdffadfdf.jpeg') {
        blockImage = ''
    }
    if(blockName!=='') {
        return {
            blockName: blockName,
            blockProfession: blockProfession,
            blockImage: blockImage
        }
    }
})
