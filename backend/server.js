const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 8080;
const static_dir = path.join(__dirname, 'static');
const mongoose = require('mongoose');

// express and middleware setup
const app = express();

app.use(express.static(static_dir));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/gamenight/server', require('./routes/MafiaRoutes'))

// Start up the server
console.log("Javascript running on the server");
app.listen(port, () => console.log(`Server started on port ${port}`));