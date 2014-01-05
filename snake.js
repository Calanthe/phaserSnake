/**
 * Created by zosia on 26/12/13.
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'snake', {preload: preload, create: create, update: update, render: render});

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
	game.load.image('snakeBody', 'img/snake.gif');
	game.load.image('snakeHead', 'img/snakehead.gif');
	game.load.image('fruit', 'img/fruit.gif');
}

function create() {
	initSnake();
	//initFood();
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
		}
		else {
			snakePart = game.add.sprite(x, 0, 'snakeBody');
		}
		snake.push({
			x: x,
			y: 0,
			snakePart: snakePart
		});
	}
}

function initFood() {
	food.x = Math.round(Math.random() * (game.width - grid));
	food.y = Math.round(Math.random() * (game.height - grid));
	food.rect = new Phaser.Rectangle(food.x * velocity, food.y * velocity, grid, grid);
	//console.log(food, snake);
}

function render() {
	renderSnake();
	//renderFood();
}

function renderSnake() {
	for(var i = 0; i < snake.length; i++) {

		game.debug.renderRectangle(snake[i].rect,'#0FFFFF');
		//same as game.context.fillRect
	}
}

function renderFood() {
	game.debug.renderRectangle(food.rect,'#0FFFFF');
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
}

function detectFood() {
	/*if (snake[snakeLength - 1].x === food.x && snake[snakeLength - 1].y === food.y) {
		game.stage.backgroundColor = '#fff';
	}*/
	game.physics.collide(snake[snakeLength-1], food, collisionHandler, null, this);
}

function collisionHandler (obj1, obj2) {

	game.stage.backgroundColor = '#fff';
	//console.log(obj1.name + ' collided with ' + obj2.name);

}

function update() {
	if (showFrame) {
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

			var tail = snake.shift(); //remove first position, tail of the snake
			tail.snakePart.x = snake[snakeLength - 2].x;
			tail.snakePart.y = snake[snakeLength - 2].y;

			//add new position to the beginning of the array
			snake.push({
				x: headPosition.x,
				y: headPosition.y,
				snakePart: tail.snakePart
			});
			//console.log(snake);

			//detect collision with boundaries or snake part
			detectCollision();

			//detect collision with food
			//detectFood();
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

