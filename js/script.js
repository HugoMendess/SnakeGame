let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let pont = 0;
let tick = 0;
let snake = [];
snake[0] = {
	x: 8 * box,
	y: 8 * box
}

let direction = "right";
// Definindo a posição random aleatoria da comida
let food = {
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box
}


function criarBG(){
	context.fillStyle = "#8a2be2";
	context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
	for(i=0; i<snake.length;i++){
		context.fillStyle = "#00ced1";
		context.fillRect(snake[i].x, snake[i].y, box, box);
	}
}

function drawFood(){
	context.fillStyle = "#00ff00";
	context.fillRect(food.x, food.y, box, box);
}

// Vai pegar o evento de clique "keydown" e chamar a funcao update
document.addEventListener('keydown', update);

function update(){
	if(event.keyCode == 37 && direction != "right"){
		direction = "left";
	}

	if(event.keyCode == 38 && direction != "down"){
		direction = "up";
	}

	if(event.keyCode == 39 && direction != "left"){
		direction = "right";
	}

	if(event.keyCode == 40 && direction != "up"){
		direction = "down";
	}
}

function iniciarJogo(){



	if(snake[0].x > 15 * box && direction == "right"){
		snake[0].x = 0;
	}

	if(snake[0].x < 0 && direction == "left"){
		snake[0].x = 16 * box;
	}

	if(snake[0].y > 15 * box && direction == "down"){
		snake[0].y = 0;
	}

	if(snake[0].y < 0 && direction == "up"){
		snake[0].y = 16 * box;
	}

	for(i = 1; i<snake.length; i++){
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
			pont = pont - 50;
			if(pont <= 0){
			clearInterval(jogo);
			alert("GAME OVER! SEUS PONTOS:"+pont);
		}
		else{
			document.getElementById("pont").innerHTML = "PONTOS: "+ pont;
		}
		}

		if (pont >= 300) {
			document.getElementById("mudar").innerHTML = "FASE 2";
		}

		if (pont >= 400) {
			document.getElementById("mudar").innerHTML = "FASE 3";
		}

		if (pont >= 700) {
			document.getElementById("mudar").innerHTML = "FASE 4";
		}

		if (pont >= 800) {
			document.getElementById("mudar").innerHTML = "FASE FINAL";
		}


	}

	criarBG();
	criarCobrinha();
	drawFood();

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(direction == "right") {
		snakeX = snakeX + box;
	}

	if (direction == "left") {
		snakeX = snakeX - box;
	}

	if (direction == "up") {
		snakeY = snakeY - box;
	}

	if (direction == "down") {
		snakeY = snakeY + box;
	}

	if(snakeX != food.x || snakeY != food.y){
		snake.pop();

	}

	else{

	food.x = Math.floor(Math.random() * 15 + 1) * box;
	food.y = Math.floor(Math.random() * 15 + 1) * box;
		tick = tick + 1;
		if(tick == 10){

			pont = pont + 35;
			document.getElementById("pont").innerHTML = "PONTOS: "+ pont;
			tick = tick - tick;
		}

		else{
		pont = pont + 15;
		document.getElementById("pont").innerHTML = "PONTOS: "+ pont;
	}

	if(pont >= 1000){
		clearInterval(jogo);
			alert("VOCÊ ZEROU O JOGO! SEUS PONTOS:"+pont);
	}
}
	


	let newHead = {
		x: snakeX,
		y: snakeY
	}

	snake.unshift(newHead);
}

// passando intervelo para iniciar o jogo a cada 100 milesegundos
let jogo = setInterval(iniciarJogo, 100);




