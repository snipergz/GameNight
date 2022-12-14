const asyncHandler = require('express-async-handler')

const gameServer = require('../models/MurdermysteryServerModel')
const murderMysteryPlayer = require('../models/MurderMysteryPlayerModel');
const { restart } = require('nodemon');

// choice array
const firstchoice = [{o:'the red door', r:'On the otherside, you see that both doors lead to the same room. You wonder why it was designed this way.'}, {o:'the blue door', r:'On the otherside, you see that both doors lead to the same room. You wonder why it was designed this way.'}]

const lastchoice = [{o:'go down the corridor', r:'You make a break for the corridor as the room fills up. It is long and make various turn though you reach the ends to find that there is no exit. It is too late to go back now. The water is too deep to wade or swim through fast enough. You drown.'}, {o:'garbage chute', r:'You enter the garbage chute and try to slide down though you can feel water pouring down just as you make it to the bottom. You see the reverse silhouette of a door as lit by light from the other side. You rush through it to see a dock leading to a small boat. You sprint through the dock, start the boat, and escape the island and mansion.'}]

let updateint = 0

let turn = 0;
let thisset = 0;

let picset = [{pic:'https://i.imgur.com/PJ0E27X.png'}, 
              {pic:'https://i.imgur.com/IFCmBO4.png'}, 
              {pic:'https://i.imgur.com/iS2CZcC.png'}, 
              {pic:'https://i.imgur.com/iGIsjM2.png'}, 
              {pic:'https://i.imgur.com/fD3Op1g.png'}, 
              {pic:'https://i.imgur.com/sLUKDfv.png'}, 
              {pic:'https://i.imgur.com/awhX0S7.png'}, 
              {pic:'https://i.imgur.com/8gnbwIN.png'}, 
              {pic:'https://i.imgur.com/PBEVTsI.png'},
              {pic:'https://i.imgur.com/XM7bGyT.png'}];

let curpic = 0;

let placeholderset = {C:'choice', R:'You and several others wake up in what appears to be a mansion. what do you do?', id:997};

let finalgenset = [];

let finalfirstset = [
    {
        C:'Go through the Red door', 
        R:'You pass through the door with the group. On the other side you find that next to the door you\'ve gone through, is also the Blue door. There was no real choice to have been made. The room you have entered is large and open. What do you do?', 
        id:0,
        type:'C'
    },
    {
        C:'Go through the Blue door', 
        R:'You pass through the door with the group. On the other side you find that next to the door you\'ve gone through, is also the Red door. There was no real choice to have been made. The room you have entered is large and open. What do you do?', 
        id:1,
        type:'C'
    }
    ];

let finallastset = [
    {
        C:'Escape through the garbage chute', 
        R:'You enter the garbage chute and try to slide down and make it to the bottom. You see the reverse silhouette of a door as lit by light from the other side. You rush through it to see a dock leading to a small boat. You sprint through the dock, start the boat, and escape the island and mansion.', 
        id:23,
        type:'C'
    },
    {
        C:'Go down the corridor', 
        R:'You make a break for the corridor as the room fills with gas. It is long and make various turn though you reach the end to find that there is no exit. It is too late to go back now. The water is too deep to wade or swim through fast enough. You drown.', 
        id:24,
        type:'I'
    }
    ];

let finalCorrectSet = [
    {
        C:'Go up the staris.', 
        R:'As you reach the upper floor you are greeted by a well lit hallway filled with doors. Most doors are locked and unable to be opened.', 
        id:2,
        type:'C'
    },
    {
        C:'Take the first right door', 
        R:'You open the door. You enter a clearing surrounded by tall continuous building. The wall is too tall to climb. There trees, grass, tables, and benches. What do you do?', 
        id:5,
        type:'C'
    },
    {
        C:'Go through the door', 
        R:'You pass through the door and enter a room with a pool at its center. As you close the door behind you, you see the pools water level begin to rise and pass the edge, beginning to flood the room. You search the room for an exit, but the door behind you.', 
        id:8,
        type:'C'
    },
    {
        C:'Go through the vent', 
        R:'You make it up to the vent and crawl through it and fall into the next room. It is kitchen like and water begins to follow through the vent. You look around only to and find few options available. With the room filling with water, what do you do?', 
        id:11,
        type:'C'
    },
    {
        C:'Go back out from where you entered', 
        R:'You walk back out to find that teh romm you came from is now completly different. You have new options to choose from now. What do you do?', 
        id:14,
        type:'C'
    },
    {
        C:'You go through the hole in the wall', 
        R:'Crawling your way through you find yourself somewhere new.', 
        id:17,
        type:'C'
    },
    {
        C:'You go through the door with an angel marking', 
        R:'Entering the door, nothing odd seems to happen and you are led into a new room.', 
        id:20,
        type:'C'
    }
    ];

let finalExpositorySet = [
    {
        C:'Explore the room', 
        R:'You find a lottery ticket, a soccer ball, and a shoe in various parts of the room. The lottery ticket is smeared and faded but you can make out the date: 1980. The shoe is worn and has clearly seen better days. The size is difficult to make out, but it is clear this was a child\'s shoe. The Soccer ball is tattered and deflated as if it were drenched in water and dried several times. With nothing else to investigate, you decide to go up the stairs.', 
        id:3,
        type:'E'
    },
    {
        C:'Take the left door', 
        R:'Entering into the dimly lit room, you explore for a short time before finding a manifest that indicates the transportation of a dangerous animal on board a ship.', 
        id:6,
        type:'E'
    },
    {
        C:'Climb the ladder', 
        R:'You go up the ladder to the hole. You hear a roar and the clanging of the a cage. A lion reveals itself to be held within what you thought was an empty cage. The creature begins to put its weight against the rusted metal bars and they bend ever so slightly outwards. Inspecting the hole leads you to find that it is actually simply painted on, and so you jump off the ladder and make your way to the door on the other side.', 
        id:9,
        type:'E'
    },
    {
        C:'Kick a whole in the wall', 
        R:'You kick a whole in the wall. Realizing your leg went through, you start peeling back more drywall to see if you can brute force an escape. You keep peeling off more and more wall revealing and foot of empty space followed by a large steal panel connecting to others at all corners. You go back the way you came', 
        id:12,
        type:'E'
    },
    {
        C:'Try going through the smaller door', 
        R:'It is a bathroom. You check out the mirror and find that passes the space test and is therefore a two way mirror. you break it but find only a wall behind it. You leave back to the room you came from.', 
        id:15,
        type:'E'
    },
    {
        C:'You crawl through a nearby vent', 
        R:'The vent does not lead to any other openings, but does reveal several rooms identical to the one you came from. Eventually you find an opening and move to another room.', 
        id:18,
        type:'E'
    },
    {
        C:'Go down the spiral slide', 
        R:'Upon reaching the bottom of the slide you fall onto a trampoline. You bounce for a few hours and eventully bounce back up onto the slide and head back up. ', 
        id:21,
        type:'E'
    }
    ];

let finalIncorrectSet = [
    {
        C:'Go down the stairs.', 
        R:'You descend into another, completely empty room, and as soon as everyone enters, the stairs retract into the wall before shutting the group out in complete darkness. There are no means by which you can escape this room and thus all lose.', 
        id:4,
        type:'I'
    },
    {
        C:'Take the second right door', 
        R:'You open the door and begin to search the featureless room. Soon after, the door slams shut and becomes locked from the other side. Each member of the group begins to pass out one by one as you realize the vents have been flooded with gas until you slowly begin to fade out of consciousness. Death soon takes you.', 
        id:7,
        type:'I'
    },
    {
        C:'Open the gate', 
        R:'Upon opening the gate, you are met by a swift strike from a lion\'s paw as the feline jumps out from a hiding place. It is clear now that the gate lead to a lion enclosure that was kept behind the gate to protect you.', 
        id:10,
        type:'I'
    },
    {
        C:'Search for another way out', 
        R:'You try to break through the wall. As you chip away at the drywall, you start pulling at large peices. As you reach in deeper, you get hooked on a live wire and can\'t let go as you geet electrocuted. Should\'ve worn gloves.', 
        id:13,
        type:'I'
    },
    {
        C:'Try jumping out the window', 
        R:'As you try to raise raise the windows open, it does not lift. You try breaking it and it cracks revealing that it is just a screen. As the screen chnges to a camera view of the room your in, you hear machnaical noies and the room feals as though it is falling. The room hits the ground at terminal velocity smashing it and you.', 
        id:16,
        type:'I'
    },
    {
        C:'You go through the door with a skull marking', 
        R:'As you enter the room, poison floods in and you are unable to escape it.', 
        id:19,
        type:'I'
    },
    {
        C:'You crawl through a crawl space with dandelyon surrounding it', 
        R:'Shortly after entering the space you are met with a mysterious gas that causes you to cough uncontrollably. Eventually you begin to cough up blood and realize too late that you have been poisoned.', 
        id:22,
        type:'I'
    }
    ];

let winset = [[{C:'congratulations!', R:'', id:997}, {C:'You win!', R:'', id:998}, {C:'Have fun?', R:'', id:999}], [picset[curpic]] ];

let loseset = [[{C:'Sorry!', R:'', id:997}, {C:'You Died!', R:'', id:998}, {C:'It was the wrong door', R:'', id:999}], [picset[curpic]] ];

let finalMixedGameSet = [];
//////

//General Functions
function generateServerCode(){
    // Generate a random UUID
    // Trim it down to 6 digits maybe use modulus
    // return code that will be used in createServer
    return Math.floor(Math.random() * 1010000);
}

function generatePlayerID(){
    // Generate a random playerID
    //CAPS, 0-9
    const characters ='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for ( let i = 0; i < 6; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 36));
    }
    return result
}

function chooseRooms(){
    //Randomly Chooses a room and removes from the pool of room choices
    return Math.floor(Math.random() % 3);
}

function shuffle(arr){
    //Shuffles an input array arr
    for(let i = arr.length - 1; i > 0; i--){
		let j = Math.floor(Math.random() * (i + 1));
		let temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
    }
}

//MurderMystery Player CRUD METHODS

// @desc    Get Player with playerID and serverCode
// @route   Get /gamenight/server/murderMystery/player/:serverCode/:playerID
// @access  Public
const getPlayer = asyncHandler(async (req, res) => {
    try{
        console.log(`Finding player with PlayerID: ${req.params.playerID}...`)
        const server = await gameServer.findOne({serverCode:req.params.serverCode})
        console.log(server)
        const player = server.players.find(plr => plr.playerID === req.params.playerID)
        console.log(player)
        res.status(200).json(player)
        console.log(player)
    }
    catch ( error ){
        console.log(error)
        res.status(400)
        throw new Error('Player not found')
    }
})

// @desc    Create Player
// @route   Post /gamenight/server/murderMystery/player/:serverCode
// @access  Public
const createPlayer = asyncHandler(async (req, res) => {
    try{
        console.log(req.params)
        console.log(`\nCreating Player for Server: ${req.params.serverCode}...`)
        const currentServer = await gameServer.findOne({serverCode:req.params.serverCode})
        if (currentServer) {
            console.log("Creating Player...")
            const player = await murderMysteryPlayer.create({
                serverCode: req.params.serverCode,
                playerID: generatePlayerID(),
                name: req.body.name,
                vote: 0,
                status: false,
            })
            const players = currentServer.players.concat(player)
            const server = await gameServer.updateOne({serverCode:req.params.serverCode}, {$set:{players:players}})
            res.status(200).json({message: `Created player successfully`, player: {player}, status: 'OK'})
            console.log(player)
            console.log(`(Backend) Successfully added ${req.body.name} to the Server: ${req.params.serverCode}`)
        } else {
            console.log("Invalid serverCode")
            res.status(400).json({status: 'NONE'})
        }
    }
    catch ( error ){
        console.log(error)
        res.status(400).json({status: 'NONE'})
        throw new Error('Player cannot be created')
    }
})

// @desc    Delete Player
// @route   Update /gamenight/server/murderMystery/player/:serverCode/:playerID
// @access  Public
const deletePlayer = asyncHandler(async (req, res) => {
    try {
        const plrs = await gameServer.findOne({serverCode:req.params.serverCode})
        const players = plrs.players.filter(plr => plr.playerID != req.params.playerID)
        const server = await gameServer.updateOne({serverCode:req.params.serverCode}, {$set:{players:players}})
        res.status(200).json({message: `Deleted player with playerID: ${req.params.playerID}` })
    } catch (error) {
        res.status(400)
        throw new Error('Player not found')
    }
})

// @desc    Update Player
// @route   Update /gamenight/server/murderMystery/player/:serverCode/:playerID
// @access  Public
const updatePlayer = asyncHandler(async (req, res) => {
    try {
        console.log(`Finding player with PlayerID: ${req.params.playerID}...`)
        await gameServer.updateOne({serverCode:req.params.serverCode, "players.playerID":req.params.playerID}, {$set:{"players.$.vote":req.body.vote}})
        console.log(`Updated ${req.params.playerID}'s status to True`)
        res.status(200).json({message: `Updated player with playerID: ${req.params.playerID} vote`})
    } catch (error) {
        res.status(400)
        console.log(error)
        throw new Error('Failed updating player')
    }
})

// Game Server CRUD METHODS

// @desc    Get Server with serverCode
// @route   Get /gamenight/server/murderMystery/:serverCode
// @access  Public
const getServer = asyncHandler(async (req, res) => {
    try {
        console.log(`Finding Server with serverCode: ${req.params.serverCode}...`)
        //for the this to actaull work proper
        const server = await gameServer.findOne({serverCode:req.params.serverCode})
        //return all the gameServers for TS
        //const server = await gameServer.find()
        // console.log(server)
        res.status(200).json(server)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Server not found')
    }
})

// @desc    Create Server
// @route   Post /gamenight/server/murderMystery
// @access  Public
const createServer = asyncHandler(async (req, res) => {
    try {
        console.log(`Creating Game Server for the game: ${req.body.game}...`)
        const serverCode = generateServerCode()
        const server = await gameServer.create({
            serverCode: serverCode,
            players: [],
            status: true,
            room: 0,
            choiceOne: chooseSafeRoom(),
            choiceTwo: chooseRooms(),
            choiceThree: chooseRooms(),
        })
        console.log("Creating Moderator Player Object...")
        const player = await murderMysteryPlayer.create({
            serverCode: serverCode,
            playerID: generatePlayerID(),
            name: "Moderator",
            vote: 0,
            status: true,
        })
        await gameServer.updateOne({serverCode:serverCode}, {$set:{players:player}})
        const updatedServer = await gameServer.findOne({serverCode:serverCode})
        res.status(200).json(updatedServer)
        console.log(`Successfully Created a Game Server for the game: ${req.body.game}`)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Incorrect Request Body')
    }
})

// @desc    Update Server
// @route   Update /gamenight/server/murderMystery/:serverCode
// @access  Public
const updateServer = asyncHandler(async (req, res) =>{

    try{
        
        if(updateint == 0){
            await gameServer.updateOne({serverCode:req.params.serverCode, "room":"You find yourself in a dimly lit room. You and a few others are all coming to. Before you can speak, everyones gaze is drawn to the glow of the two doors which stand before you all.", "choiceOne":firstchoice[0].o, "choiceTwo":firstchoice[1].o})
        }

        await gameServer.updateOne({serverCode:req.params.serverCode, "room":"", "choiceOne":"one", "choiceTwo":"two", "choiceThree":"three"})
        
        
        res.status(200).json({message: `Updated server with serverCode: ${req.params.serverCode} status to true`})
    } catch(error){
        res.status(400)
        throw new Error('Incorrect Request Body')
    }
})

// @desc    Delete Server with serverCode
// @route   Delete /gamenight/server/murderMystery/:serverCode
// @access  Public
const deleteServer = asyncHandler(async (req, res) => {
    try {
        const server = await gameServer.findOne({serverCode:req.params.serverCode})
        console.log(server)
        await server.remove()
        res.status(200).json({message: `Deleted Server with server code: ${req.params.serverCode}` })
    } catch (error) {
        res.status(400)
        throw new Error('Server not found')
    }
})

// @desc    initail test for MP
// @route   get /gamenight/server/data
// @access  Public
const testinitdata = asyncHandler(async (req, res) => {
    
    let result = [ [placeholderset], finalfirstset, [picset[curpic]] ];

	thisset+=3;
    curpic+=1;
    
	if(thisset == 9)
		thisset = 0;

    if(curpic == 9)
        curpic = 0;

	res.json(result);
})

// @desc    mext test for MP
// @route   post /gamenight/server/next
// @access  Public
const testnextdata = asyncHandler(async (req, res) => {

    let result = [ [finalgenset[thisset], finalgenset[thisset+1], finalgenset[thisset+2]], [picset[curpic]] ];
    console.log(result);
	thisset+=3;
    
    turn+=1;

    if(turn == 4)
        result = [finallastset, [picset[curpic]]];

	if(thisset == 9)
		thisset = 0;
    
    if((req.body.type == 'I')){
        result = loseset;
        thisset = 0
        turn = 0;}

	if(turn == 5){//win after 5 choices
		//let result = finallastset;
        result = winset
		thisset = 0;
        turn = 0;}

    if(curpic == 8)
        curpic = 0;

    curpic+=1;

    console.log(result)
	res.json(result);
})

// @desc    shuffle data for MP
// @route   post /gamenight/server/shuffle
// @access  Public
const testshuffledata = asyncHandler(async (req, res) => {

	shuffle(finalCorrectSet);
	shuffle(finalExpositorySet);
	shuffle(finalIncorrectSet);

	for(let i = finalCorrectSet.length - 1; i >= 0; i--){
		let arr = [finalCorrectSet[i], finalExpositorySet[i], finalIncorrectSet[i]];
		shuffle(arr);
		arr.forEach(element => {
			finalgenset.push(element);
		});
	}
    //console.log(finalgenset)
	res.json(finalgenset);
});

module.exports = {
    getServer, createServer, updateServer, deleteServer, getPlayer, createPlayer, deletePlayer, updatePlayer, testinitdata, testnextdata, testshuffledata
} 