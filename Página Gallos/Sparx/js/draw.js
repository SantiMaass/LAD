window.onload = init;

var canvas;
var ctx;
var x = 10;
var e = 0;

function init() {
	canvas = document.getElementById("my-canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext('2d');
	draw();
}

function draw(){

	ctx.fillStyle = 'white';
	ctx.rect(0,0,canvas.width,canvas.height);
	ctx.fill();

	ctx.save();
		ctx.translate(400,400);
		for (var i = 0; i<20; i++){
			ctx.beginPath();
			/*ctx.fillStyle = 'black';
			ctx.rect(0,0,10,10);
			ctx.fill();*/
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 3;
			console.log('e = '+e);
			console.log('x = '+x+' i = '+i);
			ctx.moveTo(x,0);
			ctx.lineTo((x+10),0);
			ctx.stroke();
			ctx.rotate(((360/20)*Math.PI)/180);
		}
	ctx.restore();
	e ++;
	if (e == 1){
		e = 0;
		x += 15;
	}
	requestAnimationFrame(draw);
	//window.setTimeout(timer,1000);
}

function timer (){
	//requestAnimationFrame(draw);
}
