window.onload = init;

var renderer;
var scene;
var camera;
var XWingLight;
var XWing;

var spriteStar; //La imagen que será cada partícula
var particleCloudStar; //El sistema de partículas
var particleGeomStar; //Cada partícula
var particleMatStar; //El material de las partículas
var maxParticlesStar = 5000;
var emitterStar;

var spriteFire; //La imagen que será cada partícula
var particleCloudFire; //El sistema de partículas
var particleGeomFire; //Cada partícula
var particleMatFire; //El material de las partículas
var maxParticlesFire = 100;
var emitterFire;


var lightSpeed = false;

function init() {
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement); 

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,5000);
	camera.position.set(0,0,100);
	createSystemStar();
	createSystemFire()
	//createSystem(particleGeomStar,maxParticlesStar);
	scene.add(camera);
	window.addEventListener("keydown",keyListener);
	load3DModel();	
}

function load3DModel(){
	var loader = new THREE.OBJMTLLoader();
	loader.load('models/XWing.obj','models/XWing.mtl',objectLoaded);
}

function objectLoaded(object){
	XWing = object;
	camera.add(XWing);
	XWing.position.set(0,-3.5,-16);
	//XWing.rotation.y = 20;

	XWingLight = new THREE.PointLight(0xffffff,1,600);
	camera.add(XWingLight);
	XWingLight.position.set(0,5,-10);

	XWing.add(emitterFire);
	emitterFire.position.z = 88;


	render();
}

//function createSystem(system,maxPart) {
function createSystemStar(){
	
	//var particleGeom = system;
	//var maxParticles = maxPart;

	emitterStar = new THREE.Object3D();
	emitterStar.position.z = -200;
	scene.add(emitterStar);
	particleGeomStar = new THREE.Geometry(); //Geometría de partículas, cada vértice es una partícula
	for(var i =0;i<maxParticlesStar;i++) {
		var particle = new THREE.Vector3(); //Creamos el vértice (partícula)
		resetParticleStar(particle); //Reseteamos la partícula
		particleGeomStar.vertices.push(particle); //agregamos el vértice (partícula) a la geometría
	}
	spriteStar = THREE.ImageUtils.loadTexture('img/particle-star.png');
	particleMatStar = new THREE.PointCloudMaterial({
		map:spriteStar, //Textura de la partícula
		color:0xffffff, //Color de la partícula
		size:1.5, //Tamaño
		transparent:true, //Hacemos el png transparente
		blending:THREE.AdditiveBlending //Mezcla de partícula con el fondo
		});
	particleCloudStar = new THREE.PointCloud(particleGeomStar,particleMatStar);
	scene.add(particleCloudStar);
}

function createSystemFire(){
	
	//var particleGeom = system;
	//var maxParticles = maxPart;

	emitterFire = new THREE.Object3D();
	scene.add(emitterFire);
	particleGeomFire = new THREE.Geometry(); //Geometría de partículas, cada vértice es una partícula
	for(var i =0;i<maxParticlesFire;i++) {
		var particle = new THREE.Vector3(); //Creamos el vértice (partícula)
		resetParticleFire(particle); //Reseteamos la partícula
		particleGeomFire.vertices.push(particle); //agregamos el vértice (partícula) a la geometría
	}
	spriteFire = THREE.ImageUtils.loadTexture('img/wizard-fire.png');
	particleMatFire = new THREE.PointCloudMaterial({
		map:spriteFire, //Textura de la partícula
		//color:0xffffff, //Color de la partícula
		size:1.5, //Tamaño
		transparent:true, //Hacemos el png transparente
		blending:THREE.AdditiveBlending //Mezcla de partícula con el fondo
		});
	particleCloudFire = new THREE.PointCloud(particleGeomFire,particleMatFire);
	scene.add(particleCloudFire);
}

function resetParticleStar(particle) {
	particle.x = emitterStar.position.x; //x del vector3
	particle.y = emitterStar.position.y; //y del vector3
	particle.z = emitterStar.position.z; //z del vector3
	if (lightSpeed == true){
		particle.vx = -1.5+Math.random()*3; //creamos nuestra variable vx (velocidad en x)
		particle.vy = -1+Math.random()*2; //creamos nuestra variable vy (velocidad en y)
		particle.vz = Math.random()*6; //creamos nuestra variable vz (velocidad en z)
		particle.life = Math.random()*0.6; //creamos nuestra variable life (vida)
	}
	else{	
		particle.vx = -0.6+Math.random()*1.2; //creamos nuestra variable vx (velocidad en x)
		particle.vy = -0.3+Math.random()*0.6; //creamos nuestra variable vy (velocidad en y)
		particle.vz = Math.random()*1.2;
		particle.life = Math.random()*10; //creamos nuestra variable life (vida)
	}
	particle.ax = 0; //creamos nuestra variable ax (aceleración en x)
	particle.ay = 0; //creamos nuestra variable ay (aceleración en y)
	particle.az = 0; //creamos nuestra variable az (aceleración en z)
}

function resetParticleFire(particle) {
	particle.x = emitterFire.position.x; //x del vector3
	particle.y = emitterFire.position.y; //y del vector3
	particle.z = emitterFire.position.z; //z del vector3
	if (lightSpeed == true){
		particle.vx = 0; //creamos nuestra variable vx (velocidad en x)
		particle.vy = 0; //creamos nuestra variable vy (velocidad en y)
		particle.vz = 1; //creamos nuestra variable vz (velocidad en z)
		particle.life = Math.random()*0.008; //creamos nuestra variable life (vida)
	}
	else{
		particle.vx = 0; //creamos nuestra variable vx (velocidad en x)
		particle.vy = 0; //creamos nuestra variable vy (velocidad en y)
		particle.vz = .5; //creamos nuestra variable vz (velocidad en z)
		particle.life = Math.random()*0.006; //creamos nuestra variable life (vida)
	}
	particle.ax = 0; //creamos nuestra variable ax (aceleración en x)
	particle.ay = 0; //creamos nuestra variable ay (aceleración en y)
	particle.az = 0; //creamos nuestra variable az (aceleración en z)
}

function updateSystemStar() {

	//var particleGeomStar = system;
	//var maxParticles = maxPart;

	for(var i =0;i<maxParticlesStar;i++) {
		var particle = particleGeomStar.vertices[i]; //Jalamos la partícula de la geometría
		particle.x += particle.vx;
		particle.y += particle.vy;
		particle.z += particle.vz;

		particle.vx += particle.ax;
		particle.vy += particle.ay;
		particle.vz += particle.az;
		particle.life -= 0.01;
		if(particle.life <=0) {
			resetParticleStar(particle);
		}
	}
	particleGeomStar.verticesNeedUpdate = true;
}

function updateSystemFire() {

	//var particleGeomStar = system;
	//var maxParticles = maxPart;

	for(var i =0;i<maxParticlesFire;i++) {
		var particle = particleGeomFire.vertices[i]; //Jalamos la partícula de la geometría
		particle.x += particle.vx;
		particle.y += particle.vy;
		particle.z += particle.vz;

		particle.vx += particle.ax;
		particle.vy += particle.ay;
		particle.vz += particle.az;
		particle.life -= 0.001;
		if(particle.life <=0) {
			resetParticleFire(particle);
		}
	}
	particleGeomFire.verticesNeedUpdate = true;
}

var ex = 0;
var randomPositionX;
var randomPositionY;
var bandera = true;
function render() {
	updateSystemStar();
	updateSystemFire();
	emitterStar.position.x = -3+Math.random()*6;
	emitterStar.position.y = -3+Math.random()*6;
	if(lightSpeed == true){
		if (bandera == true){
		randomPositionX = (-0.05+Math.random()*0.1);
		randomPositionY = (-0.05+Math.random()*0.1);
		bandera = false;
		}
		else{
		randomPositionX = -randomPositionX;
		randomPositionY = -randomPositionY;
		bandera = true;
		}
		XWing.position.x = randomPositionX+XWing.position.x;
		XWing.position.y = randomPositionY+XWing.position.y;
		//emitterFire.position.x = randomPositionX+emitterFire.position.x;
		//emitterFire.position.y = randomPositionY-0.78+emitterFire.position.y;
		emitterFire.position.y = -.78;
	}
	else{
		emitterFire.position.x = (-0.1+Math.random()*0.2);
		emitterFire.position.y = (-0.1+Math.random()*0.2)-.78;
		//emitterFire.position.y = (-0.1+Math.random()*0.2);
	}
	//ex +=0.2;
	//particleCloudStar.rotation.z += 0.1;
	renderer.render(scene,camera);
	requestAnimationFrame(render);
}

function keyListener(e) {
	if (e.keyCode == 13){
		if (lightSpeed == true){
			XWing.position.set(0,-3.5,-16);
			lightSpeed = false;
			for(var i =0;i<maxParticlesStar;i++) {
			//	console.log(particleGeomStar.vertices[i]);
				var particle = particleGeomStar.vertices[i]
				particle.vx = particle.vx*.35;
				particle.vy = particle.vy*.35; 
				particle.vz = particle.vz*.35;
				particle.life = Math.random()*3;
				//particleGeomStar.vertices[i] = 0; //agregamos el vértice (partícula) a la geometría
			}
		}else{
			lightSpeed = true;
			for(var i =0;i<maxParticlesStar;i++) {
				//console.log(particleGeomStar.vertices[i]);
				var particle = particleGeomStar.vertices[i]
				particle.vx = particle.vx*8;
				particle.vy = particle.vy*8; 
				particle.vz = particle.vz*8;
				particle.life = Math.random()*0.1;
				//particleGeomStar.vertices[i] = 0 //agregamos el vértice (partícula) a la geometría
			}

		}
		console.log(particleGeomStar.vertices[10].vx);
	}
}