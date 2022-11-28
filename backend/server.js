const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 8080;
const static_dir = path.join(__dirname, 'static');
const connectDB = require('./config/db')
const cors = require('cors');
const io = require('socket.io')(8000, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

// Connecting to MongoDB
connectDB()

// WebSocket Setup
io.on("connection", socket => {
    console.log(`\nSERVER_SIDE: A user has connected on socket: ${socket.id}\n`)

    // Web Socket Connection made on the Mafia Server Component
    socket.on("msc-Connect", (msg) => {
        console.log(msg)
    })

    // Web Socket Connection made on the Mafia Server Component receiving news that a New Mafia Game Server has been created
    socket.on("create-mafia-server", (msg, gameServer, player) => {
        socket.join(gameServer.serverCode)
        console.log(msg, gameServer, player)
        // Sending GameServer to Mafia Server
        io.to(gameServer.serverCode).emit("receive-mafia-server", JSON.stringify(gameServer), JSON.stringify(player))
        console.log("SERVER_SIDE_MESSAGE: Game Server Sent...")
    })

    socket.on("join-room", (msg, gameServer, player) => {
        socket.join(gameServer.serverCode)
        io.to(gameServer.serverCode).emit("receive-mafia-player", JSON.stringify(gameServer), JSON.stringify(player))
        console.log(`SERVER_SIDE_MESSAGE: Mafia Player Joined Room: ${gameServer.serverCode}`)
    })

    socket.on("mafia-player-ready", (gameServer, player) => {
        console.log(gameServer, player)
        socket.join(gameServer.serverCode)
        io.to(gameServer.serverCode).emit("receive-mafia-player-update", JSON.stringify(gameServer), JSON.stringify(player))
        console.log(`SERVER_SIDE_MESSAGE: ${player.name} in ${gameServer.serverCode} status: ${player.status}`)
    })

    socket.on("mafia-server-connect", msg => {
        console.log(msg)
        // console.log("SERVER SIDE: SUCCESSFULLY received message from mafia server component\n")
    })

})

// express and middleware setup
const app = express();

app.use(express.static(static_dir));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/gamenight/server', require('./routes/MafiaRoutes'))

// Start up the server
console.log("Javascript running on the server");
app.listen(port, () => console.log(`Server started on port ${port}`));