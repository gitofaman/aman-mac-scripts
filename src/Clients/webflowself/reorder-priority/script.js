const express = require('express');
const app = express();

const Webflow = require("webflow-api");

(async () => {
  try {
    // Initialize the client with the access token
    const webflow = new Webflow({ token: "155d66f1870bc4da948ae8b117028abd4a35a35b10bb094732b7fa7063e3b5f4" });

    // Fetch the collection
    const collection = await webflow.collection({ collectionId: "659ff0c1faf80e531a6747e9" });

    // Fetch the items belonging to the collection
    const items = await collection.items();

    // Start the Express server
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });

    // Define route to handle GET requests to the root URL
    app.get('/', (req, res) => {
        res.send(items);
    });
  } catch (error) {
    console.error("Error:", error);
  }
})();
