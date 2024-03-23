var express = require('express')
var datas = [
    {
      "Name": "Assumenda",
      "Slug": "assumenda",
      "Collection ID": "630cb64797b68757deab16ad",
      "Item ID": "630cb65330719b2afe5b9377",
      "Created On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Updated On": "Mon Aug 29 2022 12:52:02 GMT+0000 (Coordinated Universal Time)",
      "Published On": "",
      "Photo": "https://uploads-ssl.webflow.com/6060d959b4f92e615f56c848/630cb64c9643d14b22d66210_1661777484044-image20.jpg",
      "Mail Id": "Luella10@gmail.com",
      "Phone": "+1 107 902 285",
      "Facebook Link": "https://www.apple.com/",
      "Youtube Link": "https://www.youtube.com",
      "TikTok Link": "https://dropbox.com",
      "Instagram Link": "http://instagram.com",
      "Description": "Sed voluptatibus consequatur et et. Eos explicabo ut consequatur ut. Enim et est dolores autem sunt sed d"
    },
    {
      "Name": "Autem",
      "Slug": "autem",
      "Collection ID": "630cb64797b68757deab16ad",
      "Item ID": "630cb65357c56a163032d3d2",
      "Created On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Updated On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Published On": "",
      "Photo": "https://uploads-ssl.webflow.com/6060d959b4f92e615f56c848/630cb64dc5c4fa64613cca24_1661777484119-image4.jpg",
      "Mail Id": "Erling.Stanton12@gmail.com",
      "Phone": "+1 131 794 804",
      "Facebook Link": "https://dropbox.com",
      "Youtube Link": "https://www.instagram.com",
      "TikTok Link": "https://www.reddit.com",
      "Instagram Link": "https://www.reddit.com",
      "Description": "Sapiente quisquam saepe accusamus alias dolore et odit quo. Quos quidem laboriosam necessitatibus commodi laudantium consequuntur ut ea rerum."
    },
    {
      "Name": "Doloremque Beatae Quisquam",
      "Slug": "doloremque-beatae-quisquam",
      "Collection ID": "630cb64797b68757deab16ad",
      "Item ID": "630cb653ded6017df08eba20",
      "Created On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Updated On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Published On": "",
      "Photo": "https://uploads-ssl.webflow.com/6060d959b4f92e615f56c848/630cb64c0e567d905bacd2cf_1661777484033-image18.jpg",
      "Mail Id": "Kathleen.Ryan92@hotmail.com",
      "Phone": "+1 154 906 171",
      "Facebook Link": "https://www.google.com",
      "Youtube Link": "https://www.yahoo.com",
      "TikTok Link": "https://wordpress.com",
      "Instagram Link": "https://www.bing.com",
      "Description": "Beatae quaerat quam aut nesciunt. Voluptates quia sed adipisci. Aut quo vel. Eum et totam. Molestiae consectetur natus nesciunt ipsam sed sed volu"
    },
    {
      "Name": "Doloremque Libero Aut Voluptatem",
      "Slug": "doloremque-libero-aut-voluptatem",
      "Collection ID": "630cb64797b68757deab16ad",
      "Item ID": "630cb6539e118523fc3a32b6",
      "Created On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Updated On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Published On": "",
      "Photo": "https://uploads-ssl.webflow.com/6060d959b4f92e615f56c848/630cb64c9643d14b22d66210_1661777484044-image20.jpg",
      "Mail Id": "Adrianna43@gmail.com",
      "Phone": "+1 110 501 189",
      "Facebook Link": "https://pinterest.com",
      "Youtube Link": "https://www.reddit.com",
      "TikTok Link": "https://www.tumblr.com",
      "Instagram Link": "https://www.cnn.com",
      "Description": "Aut saepe doloribus minus nulla delectus. Ut omnis architecto molestiae. Velit eos a"
    },
    {
      "Name": "Et Impedit Harum",
      "Slug": "et-impedit-harum",
      "Collection ID": "630cb64797b68757deab16ad",
      "Item ID": "630cb653a9cb3c162214b858",
      "Created On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Updated On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Published On": "",
      "Photo": "https://uploads-ssl.webflow.com/6060d959b4f92e615f56c848/630cb64dc5c4fa64613cca24_1661777484119-image4.jpg",
      "Mail Id": "Selmer62@yahoo.com",
      "Phone": "+1 117 535 965",
      "Facebook Link": "https://www.google.com",
      "Youtube Link": "https://www.whatsapp.com",
      "TikTok Link": "https://www.whatsapp.com",
      "Instagram Link": "https://www.apple.com/",
      "Description": "Aliquid unde sapiente rem e"
    },
    {
      "Name": "Nisi Facere Assumenda Commodi",
      "Slug": "nisi-facere-assumenda-commodi",
      "Collection ID": "630cb64797b68757deab16ad",
      "Item ID": "630cb653a133e4da256c5cdf",
      "Created On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Updated On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Published On": "",
      "Photo": "https://uploads-ssl.webflow.com/6060d959b4f92e615f56c848/630cb64d0e567d75a9acd2d1_1661777484086-image3.jpg",
      "Mail Id": "Chelsea_Buckridge@gmail.com",
      "Phone": "+1 160 896 536",
      "Facebook Link": "https://www.cnn.com",
      "Youtube Link": "https://www.ebay.com",
      "TikTok Link": "https://www.cnn.com",
      "Instagram Link": "https://www.whatsapp.com",
      "Description": "Et reprehenderit omnis qui aut officia illum. Est aliquid nam reprehenderit et et nobis eligendi sapiente expedita. Sapiente face"
    },
    {
      "Name": "Provident Corporis Voluptatibus",
      "Slug": "provident-corporis-voluptatibus",
      "Collection ID": "630cb64797b68757deab16ad",
      "Item ID": "630cb653c693d237f117dd2c",
      "Created On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Updated On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Published On": "",
      "Photo": "https://uploads-ssl.webflow.com/6060d959b4f92e615f56c848/630cb64d302bf0159131945c_1661777484045-image1.jpg",
      "Mail Id": "Danny90@hotmail.com",
      "Phone": "+1 159 134 629",
      "Facebook Link": "https://www.amazon.com",
      "Youtube Link": "https://webflow.com",
      "TikTok Link": "https://www.tumblr.com",
      "Instagram Link": "https://www.google.com",
      "Description": "Voluptas cupiditate non ut culpa autem molestiae. Veniam dolor perspiciatis nost"
    },
    {
      "Name": "Rerum",
      "Slug": "rerum",
      "Collection ID": "630cb64797b68757deab16ad",
      "Item ID": "630cb653d7b19444d231abca",
      "Created On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Updated On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Published On": "",
      "Photo": "https://uploads-ssl.webflow.com/6060d959b4f92e615f56c848/630cb64d34fef65ccc3ea44a_1661777484152-image16.jpg",
      "Mail Id": "Deborah_Yundt15@gmail.com",
      "Phone": "+1 134 012 828",
      "Facebook Link": "https://www.google.com",
      "Youtube Link": "https://wordpress.com",
      "TikTok Link": "https://www.yahoo.com",
      "Instagram Link": "https://adobe.com",
      "Description": "Nam voluptatem qui assumenda eveniet rerum eum placeat sed. Voluptate soluta perferendis et autem atque sed. Corrupti qui quis laudantium. Aut reiciendis vol"
    },
    {
      "Name": "Saepe Enim Eius",
      "Slug": "saepe-enim-eius",
      "Collection ID": "630cb64797b68757deab16ad",
      "Item ID": "630cb653cd033020cbaa387a",
      "Created On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Updated On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Published On": "",
      "Photo": "https://uploads-ssl.webflow.com/6060d959b4f92e615f56c848/630cb64c9e1185525c3a3299_1661777483968-image9.jpg",
      "Mail Id": "Jermain_Goodwin78@gmail.com",
      "Phone": "+1 111 752 013",
      "Facebook Link": "https://www.whatsapp.com",
      "Youtube Link": "https://pinterest.com",
      "TikTok Link": "https://www.bing.com",
      "Instagram Link": "https://twitter.com",
      "Description": "Mollitia quibusdam et beatae sit id ab repudiandae molestiae. Occaecati tempora sequi nesciunt asperiores. Rem"
    },
    {
      "Name": "Sit",
      "Slug": "sit",
      "Collection ID": "630cb64797b68757deab16ad",
      "Item ID": "630cb65381ab103e0c2f3efb",
      "Created On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Updated On": "Mon Aug 29 2022 12:51:31 GMT+0000 (Coordinated Universal Time)",
      "Published On": "",
      "Photo": "https://uploads-ssl.webflow.com/6060d959b4f92e615f56c848/630cb64cef12211f257ce66a_1661777483963-image7.jpg",
      "Mail Id": "General_Kuhn57@hotmail.com",
      "Phone": "+1 133 518 712",
      "Facebook Link": "https://www.yahoo.com",
      "Youtube Link": "https://www.amazon.com",
      "TikTok Link": "https://www.youtube.com",
      "Instagram Link": "https://twitter.com",
      "Description": "Et minus ea. Magni autem aut ex sit exercitationem repellat rerum quas. Eligendi magni vitae autem sed. Eaque in eos incidunt qui in voluptatem"
    }
  ]
var mockData = [{"first_name":"Gasparo","last_name":"Carvil"},
{"first_name":"Lynnett","last_name":"Buckleigh"},
{"first_name":"Eugen","last_name":"Strugnell"},
{"first_name":"Raynard","last_name":"Tesmond"},
{"first_name":"Kacey","last_name":"Bathowe"},
{"first_name":"Thaxter","last_name":"O'Duane"},
{"first_name":"Amber","last_name":"Redon"},
{"first_name":"Judi","last_name":"Pawelczyk"},
{"first_name":"Violetta","last_name":"Tomson"},
{"first_name":"Toby","last_name":"Battyll"},
{"first_name":"Cherri","last_name":"Szanto"},
{"first_name":"Lavena","last_name":"Haselwood"},
{"first_name":"Nichole","last_name":"Antos"},
{"first_name":"Karmen","last_name":"Baverstock"},
{"first_name":"Frances","last_name":"Garwood"},
{"first_name":"Goldia","last_name":"Clerk"},
{"first_name":"Lindy","last_name":"Brewers"},
{"first_name":"Baron","last_name":"McKinnon"},
{"first_name":"Tomasine","last_name":"Kalinovich"},
{"first_name":"Abe","last_name":"Benns"},
{"first_name":"Orly","last_name":"Baldelli"},
{"first_name":"Micheal","last_name":"Dorian"},
{"first_name":"Bobby","last_name":"Shatliff"},
{"first_name":"Margot","last_name":"Shingler"},
{"first_name":"Shirlee","last_name":"Daughton"},
{"first_name":"Penny","last_name":"McLeary"},
{"first_name":"Janeta","last_name":"Clissold"}]

datas.forEach(data=>{
    data["Name"] = `${mockData[datas.indexOf(data)]["first_name"]} ${mockData[datas.indexOf(data)]["last_name"]}`
    data["Facebook Link"] = 'facebook.com'
    data["Instagram Link"] = "instagram.com"
    data['TikTok Link'] = 'tiktok.com'
    data["Youtube Link"] ='youtube.com'
})
var app = express();

app.get('/',(req, res)=>{
    res.send(datas)
})

app.listen(3000, ()=>{
    console.log('server started at 3000')
})




console.log(mockData[0])
// const uniqueNamesGenerator = require('unique-names-generator')
// console.log(uniqueNamesGenerator())