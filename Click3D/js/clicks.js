window.onload = init;

var renderer;
var camera;
var scene;
var cube;
var barrel;

function init() {
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
	camera.position.set(0,0,50);
	var light = new THREE.DirectionalLight(0xffffff,1);
	light.position.set(1,1,1);
	scene.add(light);
	scene.add(camera);

	var geom = new THREE.BoxGeometry(15,15,15);
	var mat = new THREE.MeshPhongMaterial({color:Math.random()*0xffffff});
	Click3D.init(scene,camera);
	cube = new THREE.Mesh(geom,mat);
	cube.position.set(-15,0,0);
	cube.addEventListener('click3D',onCubeClick);
	scene.add(cube);
	
	loadBarrel();

}
function loadBarrel() {
	var loader = new THREE.OBJMTLLoader();
	loader.load("models/Barril.obj","models/Barril.mtl",onBarrelLoaded);
}
function onBarrelLoaded(object) {
	barrel = object;
	//barrel.scale.set(0.1,0.1,0.1);
	barrel.position.set(15,0,0);
	scene.add(barrel);
	barrel.addEventListener('click3D',onBarrelClick);
	render();
}
function onBarrelClick() {
	var s = Math.random()*5;
	TweenMax.to(this.scale,1,{x:s,y:s,z:s});
}
function onCubeClick() {
	console.log("click");
	this.material.color.setHex(Math.random()*0xffffff);
}

function render() {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.rotation.z += 0.01;

	barrel.rotation.x += 0.01;
	barrel.rotation.y += 0.01;
	barrel.rotation.z += 0.01;
	renderer.render(scene,camera);
	requestAnimationFrame(render);
}