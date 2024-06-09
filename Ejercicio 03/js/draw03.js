window.onload = init;

var canvas;
var ctx;
var rot = 0;
function init() {
    canvas = document.getElementById("my-canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext('2d');
	draw();
}

function draw() {

	ctx.save();
	//ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = 'rgba(0,0,0,0)';
	ctx.rect(0,0,canvas.width,canvas.height);
	ctx.fill();
	ctx.translate(canvas.width/2,canvas.height/2);
	ctx.rotate(rot);
	rot += 0.01;


	ctx.strokeStyle = 'teal';
	for(var i=0;i<20;i++) {
		ctx.translate(i*5,i*5);
		ctx.rotate(18*Math.PI/180);
		ctx.save();
			ctx.scale(0.1,0.1);
			drawGoron();
		ctx.restore();
	}
	ctx.restore();
	requestAnimationFrame(draw);
}

function drawKirby() {


	ctx.beginPath();
	//                                        x1  y1 r1 x2  y2  r2
	var gradient2 = ctx.createRadialGradient(400,400,1,400,400,200);
	gradient2.addColorStop(0,'white');
	gradient2.addColorStop(1,'#ffcbcf');
	ctx.fillStyle = gradient2;
	ctx.strokeStyle = '#681f2a';
	ctx.lineWidth=50;
	ctx.arc(400,400,200,0,Math.PI*2);
	ctx.stroke();
	ctx.fill();

	//cachetes
	ctx.beginPath();
	ctx.lineWidth=5;
	ctx.strokeStyle = '#fea9ac';
	ctx.fillStyle="#ff7074";
	ctx.moveTo(250,400);
	ctx.bezierCurveTo(250,380,310,380,310,400);
	ctx.moveTo(250,400);
	ctx.bezierCurveTo(250,420,310,420,310,400);

	ctx.moveTo(490,400);
	ctx.bezierCurveTo(490,380,550,380,550,400);
	ctx.moveTo(490,400);
	ctx.bezierCurveTo(490,420,550,420,550,400);
	ctx.fill();
	ctx.stroke();

	//boca
	ctx.beginPath();
	ctx.strokeStyle = '#681f2a';
	ctx.moveTo(370,430);
	ctx.bezierCurveTo(375,450,435,450,440,430);
	ctx.stroke();

	ctx.beginPath();
	ctx.fillStyle = '#681f2a';
	ctx.arc(370,430,4,0,Math.PI*2);
	ctx.arc(440,430,4,0,Math.PI*2);
	ctx.fill();

	//Ojos partes negras
	ctx.beginPath();
	ctx.fillStyle = '#681f2a';
	ctx.moveTo(340,280);
	ctx.bezierCurveTo(310,280,310,400,340,400);
	ctx.moveTo(340,280);
	ctx.bezierCurveTo(370,280,370,400,340,400);

	ctx.moveTo(460,280);
	ctx.bezierCurveTo(430,280,430,400,460,400);
	ctx.moveTo(460,280);
	ctx.bezierCurveTo(490,280,490,400,460,400);
	ctx.fill();

	//Ojos partes Blancas
	ctx.beginPath();
	ctx.fillStyle = 'white';
	ctx.moveTo(340,290);
	ctx.bezierCurveTo(325,290,320,330,340,330);
	ctx.moveTo(340,290);
	ctx.bezierCurveTo(355,290,360,330,340,330);

	ctx.fillStyle = 'white';
	ctx.moveTo(460,290);
	ctx.bezierCurveTo(445,290,440,330,460,330);
	ctx.moveTo(460,290);
	ctx.bezierCurveTo(475,290,480,330,460,330);
	ctx.fill();
}
function drawGoron() {

	ctx.beginPath();

	//Contorno
	ctx.moveTo(472,163);
	ctx.bezierCurveTo(406,172,379,182,297,260);
	ctx.bezierCurveTo(117,434,170,568,304,643);
	ctx.bezierCurveTo(412,702,530,698,631,647);
	ctx.bezierCurveTo(798,564,806,421,668,282);
	ctx.bezierCurveTo(572,187,523,166,472,163);
	ctx.stroke();

	//Gradiente cara
	var gradient2 = ctx.createRadialGradient(473,425,270,477,273,0);
	gradient2.addColorStop(0,'#654825');
	gradient2.addColorStop(.07,'#754A1C');
	gradient2.addColorStop(.5,'#BF8E56');
	gradient2.addColorStop(1,'#DBB181');
	ctx.fillStyle = gradient2;
	ctx.fill();
	ctx.closePath();

	//Ojos
	ctx.beginPath();
	ctx.arc(353,418,41,0,Math.PI*2);
	ctx.arc(600,418,41,0,Math.PI*2);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(335,405,13,0,Math.PI*2);
	var gradient3 = ctx.createRadialGradient(335,405,2,335,405,13);
	gradient3.addColorStop(0,'white');
	gradient3.addColorStop(1,'black');
	ctx.fillStyle = gradient3;
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(618,405,13,0,Math.PI*2);
	var gradient4 = ctx.createRadialGradient(618,405,2,618,405,13);
	gradient4.addColorStop(0,'white');
	gradient4.addColorStop(1,'black');
	ctx.fillStyle = gradient4;
	ctx.fill();
	ctx.closePath();

	//Contorno Boca
	ctx.beginPath();
	ctx.moveTo(286,547);
	ctx.bezierCurveTo(286,526,343,510,486,510);
	ctx.bezierCurveTo(601,510,657,528,657,547);
	ctx.moveTo(657,547);
	ctx.bezierCurveTo(657,566,601,584,488,584);
	ctx.bezierCurveTo(344,584,286,568,286,547);
	ctx.fillStyle = '#a06f4c';
	ctx.fill();
	ctx.moveTo(286,547);
	ctx.lineTo(657,547);
	ctx.strokeStyle = '#57341D';
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.closePath();

	//Dimples
	ctx.beginPath();
	ctx.moveTo(273,511);
	ctx.bezierCurveTo(289,535,289,556,273,572);
	ctx.moveTo(669,511);
	ctx.bezierCurveTo(655,535,655,556,669,572);
	ctx.strokeStyle = '#57341D';
	ctx.lineWidth = 5;
	ctx.stroke();
	ctx.closePath();

	//Nariz
	ctx.beginPath();
	ctx.moveTo(466,477);
	ctx.bezierCurveTo(460,483,464,486,469,480);
	ctx.bezierCurveTo(475,475,471,471,466,477);
	ctx.moveTo(498,480);
	ctx.bezierCurveTo(503,487,507,484,502,477);
	ctx.bezierCurveTo(497,471,493,474,498,480);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.closePath();

	//Cejas
	ctx.beginPath();
	ctx.moveTo(315,331);
	ctx.bezierCurveTo(335,311,355,308,358,312);
	ctx.bezierCurveTo(366,321,309,357,298,348);
	ctx.lineTo(315,331);
	ctx.moveTo(637,331);
	ctx.bezierCurveTo(616,311,597,308,594,312);
	ctx.bezierCurveTo(586,321,643,357,653,348);
	ctx.lineTo(637,331);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.closePath();
	
	//Pelo
	ctx.beginPath();
	ctx.moveTo(473,163);
	ctx.bezierCurveTo(411,171,376,187,333,230);
	ctx.lineTo(383,205);
	ctx.lineTo(367,233);
	ctx.lineTo(413,196);
	ctx.lineTo(401,237);
	ctx.lineTo(445,205);
	ctx.lineTo(454,244);
	ctx.lineTo(469,205);
	ctx.lineTo(507,245);
	ctx.lineTo(499,208);
	ctx.lineTo(548,246);
	ctx.lineTo(533,210);
	ctx.lineTo(591,234);
	ctx.lineTo(575,217);
	ctx.lineTo(611,232);
	ctx.bezierCurveTo(561,187,509,166,473,163);
	ctx.strokeStyle = '#57341D';
	ctx.stroke();
	ctx.fillStyle ='#d1c298';
	ctx.fill();
	ctx.closePath();
}

