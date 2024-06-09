var Click3D = {
	scene:null,
	camera:null,
	raycaster:null,
	mouse:null,
	init:function(scene,camera) {
		this.scene = scene;
		this.camera = camera;
		this.mouse = new THREE.Vector2();
		this.raycaster = new THREE.Raycaster();
		window.addEventListener("click",Click3D.onClick);
	},
	onClick:function(event) {
		event.preventDefault();
		Click3D.mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
		Click3D.mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;
		Click3D.raycaster.setFromCamera( Click3D.mouse, Click3D.camera );
		var intersects = Click3D.raycaster.intersectObjects( Click3D.scene.children,true);
		console.log(intersects);

		for ( var i in intersects ) { 
			var object = intersects[i].object;
			try{
				while(object) {
					if((object._listeners && object._listeners["click3D"]) || (object._eventListeners && object._eventListeners["click3D"])) {
						var cb = object._listeners ? object._listeners["click3D"][0]:object._eventListeners["click3D"][0];
						var evt = new Event('click3D');
						evt.point = intersects[i].point;
						var called = cb.call(object,evt);
						return;
					}
					object = object.parent;
				}
			} catch(e){}
		}
				
	}

}