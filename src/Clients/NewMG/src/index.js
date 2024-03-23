const secretKey = 'Y5aSreZsoQFMTUBKjFQjUl03010630uL';
const apiKey = '32qIiSaxMoK2Fhbi9wWzCx03313838gr';
const merchantId = 'lIoi0273';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var axios = require('axios'); // NPM package axios user for HTTP request for REST API's
var BASE_URL = 'https://api.rethinkpay.io/api/Paymentgateway/v1/savePayment';

//Sample user inputs
const userInputData = {
    "amount": "1050",
    "currency": "USD",
    "card": {
        "number": "4111111111111111",
        "expiration_month": "05",
        "expiration_year": "2025",
        "cvc": "456",
        "brand": "american-express"
    },
    "capture_method": "manual",
    "country_code": "1",
    "phone_number": "0987654321",
    "email": "reet@reet.com",
    "firstName": "Reet",
    "lastName": "Rosen",
    "ipAddress": "103.66.113.62",
    "merchantId": merchantId,
    "secretKey": secretKey,
    "redirectURL": "https://rethinkpay.io",
    "redirect_time": "3",
    "payment_element_display": 0,
    "is_allow_store_card": 0,
    "show_only_latest_card": 1,
    "billing_zipcode": "39500",
}

var config = {
    method: 'post',
    url: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
    },
    data: userInputData
};

axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(JSON.stringify(error));
    });