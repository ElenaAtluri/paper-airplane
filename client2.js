var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.PlaneGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial( { color: 0xc6dcff} );
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );

camera.position.z = 5

var animate = function () {
	requestAnimationFrame( animate );
		 plane.position.x += 0.12;
		 plane.position.z -= 0.08;
		 plane.rotation.x += 0.005;
		 plane.rotation.y += 0.005;
		

	renderer.render( scene, camera );
};

var context1 = canvas1.getContext('2d');
	context1.font = "Bold 40px Arial";
	context1.fillStyle = "rgba(255,0,0,0.95)";
    context1.fillText('Hello, world!', 0, 50);
var texture1 = new THREE.Texture(canvas1) 



var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function render() {

	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObject( plane );

	if ( intersects == true ) {

		intersects[ i ].object.material.color.set( 0xff0000 );

	}

	renderer.render( scene, camera );

}

window.addEventListener( 'mousemove', onMouseMove, false );

window.requestAnimationFrame(render);

animate();
