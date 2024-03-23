const collectionId = '62c7276de299b23e97f260c9'
const accessToken = 'b284c04c5996afe172e6ed6fdd4ce55750345685b46816e744e1c523361fb092'
const request = require('request');

const options = {
    method: 'POST',
    url: `https://api.webflow.com/collections/${collectionId}/items`,
    qs: {
        live: 'true'
    },
    headers: {
        Authorization: `${accessToken}`,
        'content-type': 'application/json'
    },
    body: {
        fields: {
            "starting-date": "2022-07-07T00:00:00.000Z",
            "end-date": "2022-08-07T00:00:00.000Z",
            "_archived": false,
            "_draft": false,
            "hours-count": 13,
            "name": "ADI",
            "slug": "adi"
        }
    },
    json: true
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});