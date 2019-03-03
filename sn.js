function update (direction, snake, apple) {
	var eaten = false,
        gameover = false,
        prev = snake[0],
        current  = {'x': snake[0].x + direction.x, 'y': snake[0].y + direction.y};
	if (current.x === 15) current.x =  0;
    if (current.x === -1) current.x = 14;
	if (current.y === 10) current.y =  0;
	if (current.y === -1) current.y =  9;
	snake[0] = current;
	if (snake[0].x === apple.x && snake[0].y === apple.y) eaten = true;
	for (var i = 1, len = snake.length; i < len; i++)
		if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) gameover = true;
	for (var i = 1, len = snake.length; i < len; i++) {
		current	= snake[i];
		snake[i] = prev;
		prev = current; }
	if (eaten) {
		snake.push(current);
		apple.x = Math.random() * 15 | 0;
		apple.y = Math.random() * 9 | 0; }
	if (gameover) {
		alert('GAME OVER!');
		location.reload(); }
};
function draw (context, snake, apple) {
	for (var i = 0, len = snake.length; i < len; i++) {
		context.fillStyle = (i === 0) ? '#000' : '#666';
        context.fillRect(snake[i].x * 32, snake[i].y * 32, 32, 32); }
	context.fillStyle = '#933';
	context.fillRect(apple.x * 32, apple.y * 32, 32, 32);
};
function main () {
    var canvas = document.getElementById('snake'),
        context = canvas.getContext('2d'),
		snake = [{'x': 5, 'y': 3}, {'x': 4, 'y': 3}],
		direction = {'x': 0, 'y': 1},
        apple = {'x': Math.random() * 15 | 0, 'y': Math.random() * 9 | 0};
    canvas.width  = 480; canvas.height = 320;
	alert('GET READY!');
	setInterval(function () {
		context.clearRect(0, 0, canvas.width, canvas.height);
        update(direction, snake, apple);
        draw(context, snake, apple);
		}, 1000 / 2);
	document.onkeydown = function (event) {
        if (event.keyCode === 37)
				if (direction.x !==  1) direction = {'x': -1, 'y': 0};
        if (event.keyCode === 38)
				if (direction.y !==  1) direction = {'x': 0, 'y': -1};
        if (event.keyCode === 39)
				if (direction.x !== -1) direction = {'x': 1, 'y': 0};
        if (event.keyCode === 40)
				if (direction.y !== -1) direction = {'x': 0, 'y': 1};
	};
}
main();