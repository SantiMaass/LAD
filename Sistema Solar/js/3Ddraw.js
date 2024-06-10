window.onload = init;

// var ctx;
var renderer; //El objeto para renderizar la escena 3D
var scene; //escena 3d
var camera; //camara

var suun; //objeto
var merc;
var ven;
var earth;
var moon;
var mars;
var jup;
var sat;
var uran;
var nept;

var mercRotation;
var venRotation;
var earthRotation;
var moonRotation;
var marsRotation;
var jupRotation;
var satRotation;
var uranRotation;
var neptRotation;


function init() {
	//Crea el canvas y obtiene el contexto webgl
	renderer = new THREE.WebGLRenderer(); 

	//tamaño del canvas
	renderer.setSize(window.innerWidth,window.innerHeight); 

	//agregamos el canvas al html
	document.body.appendChild(renderer.domElement); 

	scene = new THREE.Scene();

	//Camara
	camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,5000);
	camera.position.set(0,50,300);
	camera.lookAt(new THREE.Vector3(0,0,0));

	scene.add(camera);

	//Sol
	var sunGeom = new THREE.SphereGeometry(40,20,20);
	var sunTex = THREE.ImageUtils.loadTexture('img/sun.jpg');
	var sunMat = new THREE.MeshBasicMaterial({map:sunTex});
	suun = new THREE.Mesh(sunGeom,sunMat);
	scene.add(suun);

	//Luz Sol
	var pointLight = new THREE.PointLight(0xffffff,1,600);
	pointLight.position.set(0,0,0);
	scene.add(pointLight);

	//Mercurio
	var mercGeom = new THREE.SphereGeometry(1,20,20);
	var mercTex = THREE.ImageUtils.loadTexture('img/mercury.jpg');
	var mercMat = new THREE.MeshLambertMaterial({map:mercTex});
	merc = new THREE.Mesh(mercGeom,mercMat);
	merc.position.set(100,0,0);
	mercRotation = new THREE.Object3D();
	mercRotation.add(merc);
	scene.add(mercRotation);

	//Venus
	var venGeom = new THREE.SphereGeometry(2,20,20);
	var venTex = THREE.ImageUtils.loadTexture('img/venus.jpg');
	var venMat = new THREE.MeshLambertMaterial({map:venTex});
	ven = new THREE.Mesh(venGeom,venMat);
	ven.position.set(-130,0,0);
	venRotation = new THREE.Object3D();
	venRotation.add(ven);
	scene.add(venRotation);

	//Tierra
	var earthGeom = new THREE.SphereGeometry(2,20,20);
	var earthTex = THREE.ImageUtils.loadTexture('img/earth.jpg');
	var earthMat = new THREE.MeshLambertMaterial({map:earthTex});
	earth = new THREE.Mesh(earthGeom,earthMat);
	earth.position.set(160,0,0);
	earthRotation = new THREE.Object3D();
	earthRotation.add(earth);
	//scene.add(earthRotation);

	//Luna
	var moonGeom = new THREE.SphereGeometry(1/3,20,20);
	var moonTex = THREE.ImageUtils.loadTexture('img/moon.jpg');
	var moonMat = new THREE.MeshLambertMaterial({map:moonTex});
	//var moonMat = new THREE.MeshBasicMaterial({color:0xffff00});
	moon = new THREE.Mesh(moonGeom,moonMat);
	moon.position.set(5,0,0);
	moonRotation = new THREE.Object3D();
	moonRotation.position.set(160,0,0)
	earthRotation.add(moonRotation);
	moonRotation.add(moon);


	scene.add(earthRotation);	


	//Marte
	var marsGeom = new THREE.SphereGeometry(1,20,20);
	var marsTex = THREE.ImageUtils.loadTexture('img/mars.jpg');
	var marsMat = new THREE.MeshLambertMaterial({map:marsTex});
	mars = new THREE.Mesh(marsGeom,marsMat);
	mars.position.set(-190,0,0);
	marsRotation = new THREE.Object3D();
	marsRotation.add(mars);
	scene.add(marsRotation);

	//Jupiter
	var jupGeom = new THREE.SphereGeometry(10,20,20);
	var jupTex = THREE.ImageUtils.loadTexture('img/jupiter.jpg');
	var jupMat = new THREE.MeshLambertMaterial({map:jupTex});
	jup = new THREE.Mesh(jupGeom,jupMat);
	jup.position.set(220,0,0);
	jupRotation = new THREE.Object3D();
	jupRotation.add(jup);
	scene.add(jupRotation);


	//Saturno
	var satGeom = new THREE.SphereGeometry(8,20,20);
	var satTex = THREE.ImageUtils.loadTexture('img/saturn.jpg');
	var satMat = new THREE.MeshLambertMaterial({map:satTex});
	sat = new THREE.Mesh(satGeom,satMat);
	sat.position.set(-260,0,0);
	satRotation = new THREE.Object3D();
	satRotation.add(sat);
	scene.add(satRotation);

	//Urano
	var uranGeom = new THREE.SphereGeometry(6,20,20);
	var uranTex = THREE.ImageUtils.loadTexture('img/uranus.jpg');
	var uranMat = new THREE.MeshLambertMaterial({map:uranTex});
	uran = new THREE.Mesh(uranGeom,uranMat);
	uran.position.set(290,0,0);
	uranRotation = new THREE.Object3D();
	uranRotation.add(uran);
	scene.add(uranRotation);

	//Neptuno
	var neptGeom = new THREE.SphereGeometry(6,20,20);
	var neptTex = THREE.ImageUtils.loadTexture('img/neptune.jpg');
	var neptMat = new THREE.MeshLambertMaterial({map:neptTex});
	nept = new THREE.Mesh(neptGeom,neptMat);
	nept.position.set(-320,0,0);
	neptRotation = new THREE.Object3D();
	neptRotation.add(nept);
	scene.add(neptRotation);

	//var dirLight = new THREE.DirectionalLight(0x00ff00,1);
	//dirLight.position.set(1,1,0);

	draw();

}

function draw() {
	//cube.rotation.x += 0.005;
	//cube.rotation.y -= 0.01;
	//cube.rotation.z += 0.005;+
	
	var i = 10;
	var e = 1;

	suun.rotation.y -= 0.01/i;
	mercRotation.rotation.y += 0.02/i;
	venRotation.rotation.y += 0.02/i;
	earthRotation.rotation.y += 0.03/i;
	//moonRotation.rotation.y += 0.04;
	moonRotation.rotation.y += 0.02;
	marsRotation.rotation.y += 0.05/i;
	jupRotation.rotation.y += 0.04/i;
	satRotation.rotation.y += 0.03/i;
	uranRotation.rotation.y += 0.02/i;
	neptRotation.rotation.y += 0.01/i;

	merc.rotation.y -= 0.01/e;
	ven.rotation.y -= 0.01/e;
	earth.rotation.y -= 0.01/e;
	mars.rotation.y -= 0.01/e;
	moon.rotation.y -= 0.01/e;
	jup.rotation.y -= 0.01/e;
	sat.rotation.y -= 0.01/e;
	uran.rotation.y -= 0.01/e;
	nept.rotation.y -= 0.01/e;


	renderer.render(scene,camera);
	requestAnimationFrame(draw);
}


