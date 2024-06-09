window.onload = init;

var renderer;
var camera;
var scene;

var plane;
var sphere;
var light;
function init() {
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth,window.innerHeight);
	renderer.setClearColor(0x000000);
	
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	renderer.shadowMapWidth = 2048;
	renderer.shadowMapHeight = 2048;

	document.body.appendChild(renderer.domElement);


	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
	//Posición de la cámara
	camera.position.set(0,10,20);
	camera.lookAt(new THREE.Vector3(0,0,0));
	//Luz direccional
	light = new THREE.DirectionalLight(0xffffff,1);
	light.position.set(-20,20,20);

	//Sombras de la cámara
	//light.shadowCameraVisible = true;
	light.castShadow = true;
	light.shadowDarkness = 0.3;
	light.shadowCameraLeft = -30;
	light.shadowCameraRight = 30;
	light.shadowCameraTop = -30;
	light.shadowCameraBottom = 30;
	light.shadowCameraNear = 0.1;
	light.shadowCameraFar = 100;

	//Geometría de la esfera
	var sg = new THREE.SphereGeometry(5,25,25);
	//Material de la esfera
	var sm = new THREE.MeshPhongMaterial({color:0x0000ff,shininess:300});
	//Esfera
	sphere = new THREE.Mesh(sg,sm);
	sphere.position.set(10,10,10);
	sphere.castShadow = true;

	var pg = new THREE.PlaneGeometry(100,100);
	var pm = new THREE.MeshPhongMaterial({color:0xff0000,shininess:100});
	plane = new THREE.Mesh(pg,pm);
	plane.rotation.x = -Math.PI/2; //90 grados
	plane.receiveShadow = true;
	scene.add(plane);
	scene.add(sphere);
	scene.add(light);
	//render();
	//Iniciamos el click en 3D
	Click3D.init(scene,camera);
	plane.addEventListener("click3D",clickListener);
	window.addEventListener("keydown",keyListener);

	var loader = new THREE.OBJMTLLoader();
	loader.load("models/object.obj","models/object.mtl",helixLoaded);
}

function helixLoaded(object) {
	object.scale.set(3,3,3);
	object.position.set(0,10,0);
	object.children[2].castShadow = true;
	object.children[2].receiveShadow = true;
	scene.add(object);
	render();
}

function clickListener(e) {
	TweenMax.to(light.position,0.5,{x:e.point.x,z:e.point.z});
}

function keyListener(e) {

	switch(e.keyCode) {
		case 37: //LEFT
			camera.rotateY(0.03); //PAN
		//	TweenMax.to(camera.rotation,0.5,{y:"+="+0.03});
			break;
		case 38: //UP
			camera.rotateX(0.03); //TILT
		//	TweenMax.to(camera.rotation,0.5,{x:"-="+0.03});
			break;
		case 39: //RIGHT
			camera.rotateY(-0.03); //PAN
		//	TweenMax.to(camera.rotation,0.5,{y:"-="+0.03});
			break;
		case 40: //DOWN
			camera.rotateX(-0.03); //TILT
		//	TweenMax.to(camera.rotation,0.5,{x:"+="+0.03});
			break;
		case 65: //A
			camera.translateX(-0.5); //TRAVEL
		//	TweenMax.to(camera.position,0.5,{x:"-="+0.5});
			break;
		case 87: //W
			camera.translateZ(-0.5); //DOLLY
		//	TweenMax.to(camera.position,0.5,{z:"-="+0.5});
			break;
		case 68: //D
			camera.translateX(0.5); //TRAVEL
		//	TweenMax.to(camera.position,0.5,{x:"+="+0.5});
			break;
		case 83: //S
			camera.translateZ(0.5); //DOLLY
		//	TweenMax.to(camera.position,0.5,{z:"+="+0.5});
			break;
	}
}

function render() {
	renderer.render(scene,camera);
	requestAnimationFrame(render);

}