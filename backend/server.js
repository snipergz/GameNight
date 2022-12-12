const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 8080;
const static_dir = path.join(__dirname, 'static');
const connectDB = require('./config/db')
const cors = require('cors');
const io = require('socket.io')(8000, {
    'reconnection': true,
    cors: {
        origin: ['http://localhost:3000']
    }
})

const mafiaGameServer = require('../backend/models/MafiaServerModel')

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
        // console.log(gameServer, player)
        socket.join(gameServer.serverCode)
        io.to(gameServer.serverCode).emit("receive-mafia-player-update", JSON.stringify(gameServer), JSON.stringify(player))
        console.log(`SERVER_SIDE_MESSAGE: ${player.name} in ${gameServer.serverCode} status: ${player.status}`)
    })

    socket.on("mafia-moderator-ready", (gameServer, player) => {
        // console.log(gameServer, player)
        socket.join(gameServer.serverCode)
        io.to(gameServer.serverCode).emit("receive-mafia-moderator-ready", JSON.stringify(gameServer), JSON.stringify(player))
        console.log(`SERVER_SIDE_MESSAGE: Mafia Moderator Has Begun The Game...`)
    })


    socket.on("mafia-reload", (msg, gameServer) => {
        console.log(msg)
        console.log("SERVER_SIDE_MESSAGE: Reconnecting socket to room")
        socket.join(gameServer.serverCode)
        // io.to(gameServer.serverCode).emit("mafia-reconnect", "IT WORKED!")
    })

    socket.on("mafia-server-connect", msg => {
        console.log(msg)
        // console.log("SERVER SIDE: SUCCESSFULLY received message from mafia server component\n")
    })

    socket.once("receive-shuffle-roles", async (shuffledRoles, player, players) => {
        try {
            console.log("SERVER_SIDE_MESSAGE: Shuffling and assigning Roles\n")
            const playerReceived = JSON.parse(player)
            if(playerReceived.name === "Moderator" && players.length > 0){
                socket.join(playerReceived.serverCode)
                console.log("Shuffling")
                console.log("----------------------------------------------")
                console.log(shuffledRoles)
                console.log("----------------------------------------------")
                for(let i = 1; i < players.length; i++){
                    try {
                        await mafiaGameServer.updateOne({serverCode:players[i].serverCode, "players.playerID":players[i].playerID}, {$set:{"players.$.role":shuffledRoles[i - 1]}})
                        console.log(`Updated ${players[i].name}'s role to ${shuffledRoles[i - 1]}\n`)
                    } catch (error) {
                        console.log(error)
                    }
                }
                const server = await mafiaGameServer.findOne({serverCode:playerReceived.serverCode})
                io.to(playerReceived.serverCode).emit("shuffle-complete-start-game", JSON.stringify(server), JSON.stringify(server.players))
            }
        } catch (error) {
            // console.log("Could not parse player object")
        }
    })

})

// express and middleware setup
const app = express();

app.use(express.static(static_dir));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/gamenight/server', require('./routes/MafiaRoutes'), require('./routes/MurderMysteryRoutes'))

// Start up the server
console.log("Javascript running on the server");
app.listen(port, () => console.log(`Server started on port ${port}`));