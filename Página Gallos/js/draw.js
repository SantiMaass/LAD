window.onload = init;

var canvas;
var ctx;

var g1 = 0;
var g2 = 0;

var standby = true;
var ataque1 = false;
var regreso1 = false;
var ataque2 = false;
var regreso2 = false;
var win1 = false;
var win2 = false;
var danio = false;
var sparx1 = false;
var sparx2 = false;

var vida1 = 100;
var vida2 = 100;

var x1 = 300;
var x2 = 700;

var sparx_cont = 0;
function init() {
	canvas = document.getElementById("my-canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext('2d');
	draw();
}

function draw(){
	
	//ctx.save();
	var grd=ctx.createLinearGradient(0,0,canvas.width,canvas.height);
	grd.addColorStop(0,"black");

	grd.addColorStop(1,"#545454");
	ctx.fillStyle = grd;
	ctx.rect(0,0,canvas.width,canvas.height);

	ctx.fill();

	ctx.drawImage(imgarr[imgindex],0,0,canvas.width,768);
	//console.log(imgindex);
	imgindex++;
	imgindex = imgindex%imgarr.length;

	if (standby == true){
		drawGallo1(x1);
		drawGallo2(x2);
		// Duelo
		standby = false;
		
		//console.log(g1);
		//console.log(g2);
		//console.log('standby');
		window.setTimeout(timer,1000);
	} else if (ataque1 == true){
		drawGallo2(700);
		drawGallo1(x1);
		console.log(vida2);
		if (x1 < 510){
			x1 += 30;
		}
		else{
			if (danio == false){
				vida2 -= (g1*25);
				danio = true;
			}
			danio = false;
			ataque1 = false;
			regreso1 = true;
			sparx2 = true;			
		}
	} else if (regreso1 == true){
		drawGallo2(700);
		drawGallo1(x1);
		//console.log(x1);
		if (x1 > 300){
			x1 -= 10;
		}
		else{
			x1 = 300;
			regreso1 = false;
			if (vida2 <= 0){
				win1 = true;
			}
			else{
				standby = true;
			}
		}
	} else if (ataque2 == true){
		drawGallo1(300);
		drawGallo2(x2);
		console.log(vida1);
		if (x2 > 490){
			x2 -= 30;
		}
		// Fin de animación
		else{
			if (danio == false){
				vida1 -= (g2*25);
				danio = true;
			}
			danio = false;
			ataque2 = false;
			regreso2 = true;
			sparx1 = true;
		}
	} else if (regreso2 == true){
		drawGallo1(300);
		drawGallo2(x2);
		if (x2 <= 700){
			x2 += 10;
		}
		else{
			x2 = 700;
			regreso2 = false;
			if (vida1 <= 0){
				win2 = true;
			}
			else{
				standby = true;
			}
		}
	} else if(win1 == true){
		drawGallo1(300);
		drawGallo2Muerto(700);
	} else if (win2 == true){
		drawGallo2(700);
		drawGallo1Muerto(300);
	} else {
		
		drawGallo1(x1);
		drawGallo2(x2);
	}
	if (sparx1 == true){
		//Para que las chispas sólo duren 3 frames
		if (sparx_cont < 10){
			drawSparkles(490);
			sparx_cont++;
		}
		else{
			sparx_cont = 0;
			sparx1 = false;
			sparx_r = 10;
		}
	}
	else if (sparx2 == true){
		//Para que las chispas sólo duren 3 frames
		if (sparx_cont < 10){
			drawSparkles(700);
			sparx_cont++;
		}
		else{
			sparx_cont = 0;
			sparx2 = false;
			sparx_r = 10;
		}
	}

	requestAnimationFrame(draw);
}

var gallo1 = new Image();
gallo1.src = 'img/mut1.png';

var gallo2 = new Image();
gallo2.src = 'img/mut2.png';

var gallo1_50 = new Image();
gallo1_50.src = 'img/mut1_50.png';

var gallo2_50 = new Image();
gallo2_50.src = 'img/mut2_50.png';

var gallo1_20 = new Image();
gallo1_20.src = 'img/mut1_20.png';

var gallo2_20 = new Image();
gallo2_20.src = 'img/mut2_20.png';

var gallo1Muerto = new Image();
gallo1Muerto.src = 'img/mut1_dead.png';

var gallo2Muerto = new Image();
gallo2Muerto.src = 'img/mut2_dead.png';


var bg1 = new Image();
bg1.src = 'img/frame1.png';
var bg2 = new Image();
bg2.src = 'img/frame2.png';

var imgarr = new Array(bg1,bg1,bg1,bg1,bg1,bg1,bg1,bg1,bg1,bg2,bg2,bg2,bg2,bg2,bg2,bg2,bg2,bg2);
var imgindex = 0;




function drawGallo1(a){
	ctx.save();
		ctx.translate(a,300);
		if (vida1 > 50){
			ctx.drawImage(gallo1,0,0,200,200);
		}
		else if (vida1 <= 50 && vida1 > 20){
			ctx.drawImage(gallo1_50,0,0,200,200);
		}
		else{
			ctx.drawImage(gallo1_20,0,0,200,200);
		}
	ctx.restore();
}

function drawGallo2(a){
	ctx.save();
		ctx.translate(a,300);
		if (vida2 > 50){
			ctx.drawImage(gallo2,0,0,200,200);
		}
		else if (vida2 <= 50 && vida2 > 20){
			ctx.drawImage(gallo2_50,0,0,200,200);
		}
		else{
			ctx.drawImage(gallo2_20,0,0,200,200);
		}
	ctx.restore(); 
}

function drawGallo1Muerto(a){
	ctx.save();
	ctx.translate(a,300);
	ctx.drawImage(gallo1Muerto,0,0,200,200);
	ctx.restore();
}

function drawGallo2Muerto(a){
	ctx.save();
	ctx.translate(a,300);
	ctx.drawImage(gallo2Muerto,0,0,200,200);
	ctx.restore();
}

var sparx_r = 20;

function drawSparkles(a){
	ctx.save();
		ctx.translate(a,350);
		for (var i = 0; i<20; i++){
			ctx.beginPath();
			ctx.strokeStyle = '#FFDB12';
			ctx.lineWidth = 5;
			//console.log('e = '+e);
			//console.log('x = '+x+' i = '+i);
			ctx.moveTo(sparx_r,0);
			ctx.lineTo((sparx_r+10),0);
			ctx.stroke();
			ctx.rotate(((360/20)*Math.PI)/180);
		}
	ctx.restore();
		//console.log('entra; sparx_r = '+sparx_r);
		sparx_r += 5;
}

function timer(){
	g1 = Math.random();
	g2 = Math.random();
	console.log(g1,g2);

	if(g1 > g2){
		ataque1 = true;
	}
	else if (g1 < g2){
		ataque2 = true;
	}	
}
/*function drawGana1(){
	for(var i = 700; i>400; i-=10);{
		ctx.fillStyle = 'white';
		ctx.rect(0,0,canvas.width,canvas.height);
		ctx.fill();
		drawGallo1();

		console.log(i)
		ctx.save();
		ctx.translate(i,300);
		ctx.drawImage(gallo2,0,0,200,200);
		ctx.restore();
		window.setTimeout(nada,1000/60);
	}
	for(var i = 400; i<700; i+=5);{
		ctx.fillStyle = 'white';
		ctx.rect(0,0,canvas.width,canvas.height);
		ctx.fill();
		drawGallo1();

		ctx.save();
		ctx.translate(i,300);
		ctx.drawImage(gallo2,0,0,200,200);
		ctx.restore();
		window.setTimeout(nada,1000/60);
	}
	
}*/