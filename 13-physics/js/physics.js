window.onload = init;

//
Physijs.scripts.worker = 'js/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

var ground;
var ball;
var scene;
var camera;
var renderer;
var pinball
;
function init() {
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);

	//scene = new THREE.Scene();
	scene = new Physijs.Scene();

	camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);


	var gndGeom = new THREE.BoxGeometry(100,1,150);
	var gndMat = Physijs.createMaterial(new THREE.MeshBasicMaterial({color:0xff0000}),0,1.2);

//	ground = new THREE.Mesh(gndGeom,gndMat);

	ground = new Physijs.BoxMesh(gndGeom,gndMat,0);
	ground.rotation.x = 1.3;
	ground.position.y = 40;

	var ballGeom = new THREE.SphereGeometry(1,20,20);

	// friction, restitution
	var ballMat = Physijs.createMaterial(new THREE.MeshBasicMaterial({color:0xffff00}),0,1.2);

	ball = new Physijs.SphereMesh(ballGeom,ballMat,1);

	ball.addEventListener("collision",onBallCollision);
	camera.position.set(0,30,200);
	ball.position.set(0,60,0);

	scene.setGravity(new THREE.Vector3(0,-30,0));

	Click3D.init(scene,camera);
	ball.addEventListener("click3D",onBallClick);
	scene.add(camera);
	scene.add(ground);
	scene.add(ball);
	ground.addEventListener("click3D",addBall);
	loadPinball();
	render();
}
function loadPinball() {
	var loader = new THREE.OBJMTLLoader();
	loader.load('pinball/Pinball.obj','pinball/Pinball.mtl',objectLoaded);
}
function objectLoaded(object) {
		pinball = object;
		pinball.position.set(0,40,0);
		scene.add(pinball);
		render();
}
function addBall(event) {
	var ballGeom = new THREE.SphereGeometry(5,20,20);

	// friction, restitution
	var ballMat = Physijs.createMaterial(new THREE.MeshBasicMaterial({color:Math.random()*0xffffff}),0,1.2);

	var nb = new Physijs.SphereMesh(ballGeom,ballMat,1);
	nb.position.set(event.point.x,40,event.point.z);
	nb.addEventListener("collision",onBallCollision);
	scene.add(nb);
}
function onBallClick(event) {
	console.log(this);

	this.applyCentralImpulse(new THREE.Vector3(10,10,0));
}
function onBallCollision(other) {
	//this es el objeto que tiene el evento (ball)
	//other es con el que chocó (en este caso sería el piso)
	this.material.color.setHex(Math.random()*0xffffff);
	other.material.color.setHex(Math.random()*0xffffff);
}

function render() {
	requestAnimationFrame(render);
	renderer.render(scene,camera);
	scene.simulate();
}




