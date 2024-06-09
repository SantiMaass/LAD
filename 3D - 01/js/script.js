window.onload = init;


var scene;
var camera;
var cube;
var renderer;

function init(){
	scene = new THREE.Scene(); 
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); 

	renderer = new THREE.WebGLRenderer(); 
	renderer.setSize( window.innerWidth, window.innerHeight ); 
	document.body.appendChild( renderer.domElement ); 

	var geometry = new THREE.BoxGeometry( 1, 5, 2); 
	var material = new THREE.MeshBasicMaterial( { color:0x00ff00}); 
	cube = new THREE.Mesh( geometry, material ); 
	scene.add( cube ); 

	camera.position.z = 5; 
	render();
}

function render() { 
	cube.rotation.x += 0.03; 
	cube.rotation.y += 0.05; 
	cube.rotation.z += 0.0; 
	renderer.render(scene, camera);
	requestAnimationFrame( render ); 
	}; 
