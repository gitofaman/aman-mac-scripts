/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};


// Payment Login:
// https://commbank.simplify.com/commerce/login/auth
// info@newmg.online
// Winthenattack2023!

const express = require('express');
const bodyParser = require('body-parser');
const Simplify = require('simplify-commerce');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize the Simplify Commerce client
const client = Simplify.getClient({
  publicKey: 'lvpb_MTBiNjZlOGItNzA5YS00MGY0LWE2OTYtODk5MzZmZTIxM2Fi',
  privateKey: 'HUBO9gLAW/Xs91zcO1gi0mNMY8zanWCiX0xQ8cqdNFp5YFFQL0ODSXAOkNtXTToq'
});

// app.post('/', (req, res) => {
//   // Extract parameters from the request body
//   const { name, email, cardnum, expmonth, expyear, cvc } = req.body;

//   // Create a customer using the provided parameters
//   client.customer.create({
//     reference: 'Ref1',
//     subscriptions: [
//       {
//         plan: 'aMrdkqjoxe9'
//       }
//     ],
//     name,
//     email,
//     card: {
//       number: cardnum,
//       expMonth: expmonth,
//       cvc,
//       expYear: expyear
//     }
//   }, (errData, data) => {
//     if (errData) {
//       const errorMessage = 'Error Message: ' + errData;
//       res.send(errorMessage);
//       // Handle the error
//     } else {
//       const successResponse = 'Success Response: ' + JSON.stringify(data);
//       res.send(successResponse);
//       // Handle the success
//     }
//   });
// });

app.get('/', (req, res) => {
	res.send('WORKING CORRECTLY')
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});