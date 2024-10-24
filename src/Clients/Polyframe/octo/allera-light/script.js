// alert('WORKING')
// Require the 'fs' module to read files
// const fs = require('fs');

// // Read the JSON file
// fs.readFile('csvjson.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading the file:', err);
//         return;
//     }
//     // Parse the JSON data
//     const jsonData = JSON.parse(data);

//     // Print the contents of the JSON file
//     console.log(jsonData[0]);
// });

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/Clients/Polyframe/octo/allera-light/csvjson.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // console.log(data[0]);
            $(document).ready(function() {
                // Assuming data array is already defined
                var uniqueBrands = {};
            
                $.each(data, function(index, item) {
                    if (item.Brand) {
                        uniqueBrands[item.Brand] = true;
                    }
                });
            
                var uniqueBrandList = Object.keys(uniqueBrands);
                console.log(uniqueBrandList);
            });            
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});