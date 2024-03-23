var ts = Array.from(document.querySelectorAll('.css-zcz79d'))
var tJson = 
ts.map(t=> {
    var details = t.querySelector('.css-1a6d38e').innerText.split('from')
    var authorName = details[0].trim()
    var authorPosition = details[1].trim()
    var authorComment = t.querySelector('.css-88xv6j').innerText
    var dateData = t.querySelector('.css-vjgz2w').innerText.split(' ')
    var date = t.querySelector('.css-vjgz2w').innerText.replace(dateData[0], '')
    return {
        name: authorName,
        pos: authorPosition,
        comment: authorComment,
        date: date.trim()
    }
})