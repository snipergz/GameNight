const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors');

PORT=8080;

let db;
(async () => {
	db = await open({
		filename: 'data.sqlite',
		driver: sqlite3.Database
	});
})();

app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(cors());

let gid = 'GAME123';
let cre = 'CREATE TABLE ';
let ate = ' ( gameId , player1Id , player2Id , player1 VARCHAR(10 ) , player2 VARCHAR(10 ))';
let sel = 'select * from ';
let res1 = cre.concat(gid);
let res2 = res1.concat(ate);
let res3 = sel.concat(gid);

var sortString = function(str) {
    return str.split('').sort().join('');
};

app.get('/createDefaultGame', async (req, res) => {
	const result = await db.run(res2);
	let gameString = await db.all(res3);
	console.log('creating table in DB: GAME123');
	console.log(gameString);
	res.json({});
});

app.get('/gameState', async (req, res) => {
	let gameString = await db.all('select game from GAME123');
	console.log('result.data: %o', gameString);
	res.json(gameString);
});

app.post('/sendPosition/:position', async (req, res) => {
	console.log('trying to send position');
	let gameString = await db.all('select game from GAME123');
	let strlen = gameString.length;
	let gameTurn = strlen + 1;
	let winCondition = false;

	if(gameTurn % 2 != 0){
		let playerTurn = 'player1';
	}else{
		let playerTurn = 'player2';
	}

	let playerString = await db.all('select ' + playerTurn + ' from GAME123');

	let fullPlayerString = playerString.concat(position);
	let fullGameString = gameString.concat(position);
	
	if(gameTurn > 1){
		let fullSortedGameString = sortString(fullGameString);
	}

	if(gameTurn > 2){
		let fullSortedPlayerString = sortString(fullPlayerString);
	}

	if(gameTurn > 4){
		if(fullSortedPlayerString.includes('012') ||
		   fullSortedPlayerString.includes('345') ||
		   fullSortedPlayerString.includes('678') ||
		   fullSortedPlayerString.includes('048') ||
		   fullSortedPlayerString.includes('246') ||
		   fullSortedPlayerString.includes('036') ||
		   fullSortedPlayerString.includes('147') ||
		   fullSortedPlayerString.includes('258')){
			console.log('win condition met for :' + playerTurn);
			winCondition = true;
		   }
	}

	const sendNewGameString = await db.run('UPDATE GAME123 SET game = ' + fullSortedGameString);
	const sendNewPlayerString = await db.run('UPDATE GAME123 SET ' + playerTurn + ' = ' + fullSortedPlayerString);

	if(winCondition == true){
		if(sendNewGameString.changes == 0){
			res.json({'status' : 'NONE', 
				   'winStatus' : 'win'});
		}else{
			res.json({'status' : 'OK',
				   'winStatus' : 'win'});
		}
	}else{
		if(sendNewGameString.changes == 0){
			res.json({'status' : 'NONE'});
		}else{
			res.json({'status' : 'OK'});
		}
	}
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));