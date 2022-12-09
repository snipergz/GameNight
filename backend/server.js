const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 8080;
const static_dir = path.join(__dirname, 'static');
const connectDB = require('./config/db')
const cors = require('cors');

// Connecting to MongoDB
connectDB()

// express and middleware setup
const app = express();

app.use(express.static(static_dir));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

<<<<<<< HEAD
app.use('/gamenight/server', require('./routes/MafiaRoutes'))
app.use('/gamenight/server', require('./routes/MurderMysteryRoutes'))
=======
app.use('/gamenight/server', require('./routes/MafiaRoutes'), require('./routes/MurderMysteryRoutes'))
>>>>>>> bb7f1ce2fe59e9ada6fb7cb7cdc56ecd0f5cd130

// Start up the server
console.log("Javascript running on the server");
app.listen(port, () => console.log(`Server started on port ${port}`));