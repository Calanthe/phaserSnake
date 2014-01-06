/**
 * Created by zosia on 26/12/13.
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'snake', {preload: preload, create: create, update: update});

var snakePart;
var snake = [];
var snakeLength = 5;
var food = {};
var grid = 20;
var direction = 'right';
var headPosition = [];
var play = true;
var score = 0;
var showFrame = false;

function preload() {
	game.stage.backgroundColor = '#00FF00';
	game.load.image('snakeBody', 'img/snake.gif');
	game.load.image('snakeHead', 'img/snakehead.gif');
	game.load.image('fruit', 'img/fruit.gif');
}

function create() {

	initSnake();
	initFood();
	console.log(snake);

	//scoreString = 'Score : ';
	//scoreText = game.add.text(300, 300, scoreString + score, { fontSize: '80px', fill: '#fff' });
}

function initSnake() {
	var i;
	var x;

	for(i = 0; i <= snakeLength - 1; i++) {
		x = i * grid;
		if (i === snakeLength - 1) {
			headPosition = {
				x: x,
				y: 0
			};
			snakePart = game.add.sprite(x, 0, 'snakeBody');
			snakePart.body.customSeparateX = true;
			snakePart.body.customSeparateY = true;
		}
		else {
			snakePart = game.add.sprite(x, 0, 'snakeBody');
			snakePart.body.customSeparateX = true;
			snakePart.body.customSeparateY = true;
		}
		snake.push({
			x: x,
			y: 0,
			snakePart: snakePart
		});
	}
}

function initFood() {
	food.x = getRandomInt(0, game.width);
	food.y = getRandomInt(0, game.height);
	food.icon = game.add.sprite(food.x, food.y, 'fruit');
	//food.icon = game.add.sprite(200, 0, 'fruit');
}

// Returns a random integer between min and max
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function moveHeadPosition() {
	if (direction === 'left') {
		headPosition.x -= grid;
	}
	else if (direction === 'right') {
		headPosition.x += grid;
	}
	else if (direction === 'down') {
		headPosition.y += grid;
	}
	else if (direction === 'up') {
		headPosition.y -= grid;
	}
}

function detectCollision() {
	//could be done better?
	//detect collision with boundaries
	if ((snake[snakeLength - 1].x) >= game.width
		|| ((snake[snakeLength - 1].x + grid) <= 0)
		|| ((snake[snakeLength - 1].y + grid) <= 0)
		|| ((snake[snakeLength - 1].y) >= game.height)) {
		play = false;
	}
	//detect collision with snake parts
	snake.forEach(function(item, index) {
		if (index !== (snakeLength - 1)
			&& ((snake[snakeLength - 1].x) === item.x)
			&& ((snake[snakeLength - 1].y) === item.y)) {
			play = false;
			return false;
		}
	});
	//game.physics.collide(snake[snakeLength-1].snakePart, food.icon, collisionHandler, null, this);
}

function detectFood() {
	/*if (snake[snakeLength - 1].x === food.x && snake[snakeLength - 1].y === food.y) {
		game.stage.backgroundColor = '#fff';
	}*/
	console.log(snake[snakeLength-1].snakePart, food.icon);
	game.physics.collide(snake[snakeLength-1].snakePart, food.icon, collisionHandler, null, this);
	//food.icon.kill();?
	//kill food?
}

function collisionHandler (obj1, obj2) {
	game.stage.backgroundColor = '#992d2d';
	play = false;
}

function update() {
	if (showFrame) { //could be done better?
		if (play) {
			if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && direction !== 'right')
			{
				direction = 'left';
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && direction !== 'up')
			{
				direction = 'down';
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && direction !== 'down')
			{
				direction = 'up';
			}
			else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && direction !== 'left')
			{
				direction = 'right';
			}

			moveHeadPosition();

			//is it the best solution? I just copy removed sprite and change its positions
			var tail = snake.shift(); //remove first position, tail of the snake
			//tail.snakePart.x = headPosition.x;
			//tail.snakePart.y = headPosition.y;
			tail.snakePart.body.x = headPosition.x; //to check collisions
			tail.snakePart.body.y = headPosition.y;

			//add new position to the beginning of the array
			snake.push({
				x: headPosition.x,
				y: headPosition.y,
				snakePart: tail.snakePart
			});

			/*snake.forEach(function(item){
				item.snakePart.body.velocity.x = grid;
			});*/

			//detect collision with boundaries or snake part
			detectCollision();

			//detect collision with food
			detectFood();
		}
		else {
			game.stage.backgroundColor = '#992d2d';
		}
		showFrame = false;
	}
	else {
		showFrame = true;
	}
}

