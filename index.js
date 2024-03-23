var express = require('express')
var app = express()
var path = require('path')

app.use(express.static(path.join(__dirname, 'src')));
// app.get('/', (req, res)=>{
//     res.send('all good')
// })

app.listen(3000, ()=>{
    console.log('Server started at port 3000')
})