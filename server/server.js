const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

//Build
app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.urlencoded({ extended: false }));
//Errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/error.html'));
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server listeing on port ${process.env.PORT || 4000}`);
});