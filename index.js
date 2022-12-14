//Install express server
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/e_commerce_clothes'));

app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname+'/dist/e_commerce_clothes/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(port, () => {
    console.log(`Application started on the port: ${port}`);
});
