/**
 * Created by zosia on 26/12/13.
 */

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'snake', { preload: preload, create: create, update: update, render: render});

function preload() {

}

var snake = [];
var initSnakeLength = 3;
var food;
var grid = 20;
var direction = 'right';

function create() {

	initSnake();

	console.log(snake);

	//  The score
	scoreString = 'Score : ';
	//scoreText = game.add.text(10, 10, scoreString + score, { fontSize: '34px', fill: '#fff' });

	//  And some controls to play the game with
	cursors = game.input.keyboard.createCursorKeys();
}

function initSnake() {
	for(var i = 0; i <= initSnakeLength - 1; i++) {
		snake.push({x: i*grid, y: 0, rect: new Phaser.Rectangle(i*grid, 0, grid, grid)});
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

function update() {
	//  Run collision
	//game.physics.collide(bullets, aliens, collisionHandler, null, this);
}

