/**
 * Created by zosia on 26/12/13.
 */

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'snake', {create: create, update: update, render: render});

var snake = [];
var snakeLength = 60;
var food;
var grid = 20;
var direction = 'right';
var headPosition = [];
var velocity = 0.2;
var play = true;

function create() {

	initSnake();

	//console.log(snake);

	//  The score
	scoreString = 'Score : ';
	//scoreText = game.add.text(10, 10, scoreString + score, { fontSize: '34px', fill: '#fff' });

	//  And some controls to play the game with
	cursors = game.input.keyboard.createCursorKeys();
}

function initSnake() {
	for(var i = 0; i <= snakeLength - 1; i++) {
		snake.push({x: i*grid*velocity, y: 0, rect: new Phaser.Rectangle(i*grid*velocity, 0, grid, grid)});
		if (i === snakeLength - 1) {
			headPosition = {x: i*grid, y: 0};
		}
	}
}

function render() {
	renderSnake();
	//TODO renderFood();
}

function renderSnake() {
	for(var i = 0; i < snake.length; i++) {
		var s = snake[i];

		game.debug.renderRectangle(s.rect,'#0FFFFF');
		//same as game.context.fillRect
	}
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
	//detect collision with boundaries
	if ((snake[snakeLength - 1].x + grid * velocity) >= game.width
		|| ((snake[snakeLength - 1].x + grid * velocity) <= 0)
		|| ((snake[snakeLength - 1].y + grid * velocity) <= 0)
		|| ((snake[snakeLength - 1].y + grid * velocity) >= game.height)) {
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
}

function update() {
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

		snake.shift(); //remove first position, tail of the snake

		//add the new position to the beginning of the array
		snake.push({x: headPosition.x * velocity, y: headPosition.y * velocity, rect: new Phaser.Rectangle(headPosition.x * velocity, headPosition.y * velocity, grid, grid)});

		detectCollision();
	}
	else {
		game.stage.backgroundColor = '#992d2d';
	}
}

