const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors');

PORT=8080;

// connect to db
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

///////////////////////////////////////
var sortString = function(str) {
    return str.split('').sort().join('');
};
///////////////////////////////////////

app.get('/data', async (req, res) => {
	let courses = await db.all('select * from course');
	const instructors = await db.all('select * from instructor');
	const sections = await db.all('select * from section');
	courses = courses.map(course => ({...course, sections: sections.filter(section => section.course_id === course.id)}));
	console.log(`bingo: `);
	res.json({courses, instructors});
});

app.get('/gameState', async (req, res) => {
	let gameString = await db.all('select game from GAME123');
	//courses = courses.map(course => ({...course, sections: sections.filter(section => section.course_id === course.id)}));
	//console.log(`sent game string: ${gamestring}`);
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