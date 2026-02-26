const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const rutasVideojuegos = require('./routes/videojuegos.routs');
app.use('/videojuegos', rutasVideojuegos);
 
app.listen(3000);