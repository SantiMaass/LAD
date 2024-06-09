window.onload = init;

var canvas;
var ctx;

function init() {
	canvas = document.getElementById("my-canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext('2d');
	draw();
}
var car1 = 0;
var car2 = 0;
var car3 = 0;


function draw() {
	// guardas el contexto
	ctx.save();
	// limpias la pantalla
	//	ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.rect(0,0,canvas.width,canvas.height);
		ctx.fill();

		ctx.save();
			ctx.translate(car1,100+Math.sin(car1/20)*20);
			ctx.rotate(Math.cos(car1/20));
			drawCar(carroamarillo);
		ctx.restore();
		

		ctx.save();
			ctx.translate(car2,200);
			//ctx.save();
			//	ctx.scale(2,2);
				drawCar(carroazul);
			//ctx.restore();
		ctx.restore();


		ctx.save();
			ctx.translate(car3,300);
			drawCar(carroverde);
		ctx.restore();

	//restauras el contexto
	ctx.restore();
	//redibujas
	car1 += Math.random()*10;
	car2 += Math.random()*10;
	car3 += Math.random()*10;
	console.log(car1);
	if(car1 > canvas.width) {
		car1 = 0;
	}
	if(car2 > canvas.width) {
		car2 = 0;
	}
	if(car3 > canvas.width) {
		car3 = 0;
	}
	requestAnimationFrame(draw);
}
var carroamarillo = new Image();
carroamarillo.src = 'img/carroamarillo.png';

var carroazul = new Image();
carroazul.src = 'img/carroazul.png';
var carroverde = new Image();
carroverde.src = 'img/carroverde.png';

function drawCar(img) {

	ctx.drawImage(img,-50,-20);
	/*ctx.beginPath();
	ctx.fillStyle = 'gray';
	ctx.rect(-40,-20,20,40);
	ctx.fill();
	ctx.rect(20,-20,20,40);
	ctx.fill();
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.rect(-50,-15,100,30);
	ctx.fill();
	ctx.beginPath();*/

}