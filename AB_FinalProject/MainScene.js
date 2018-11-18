var camera, scene, renderer;
var geometry, material, mesh;
var agents = [];

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);

    scene = new THREE.Scene();

    for (var i = 0; i < 2000; i++)
    {
      agents.push(new MovingAgent(scene));
    }

    var geometry = new THREE.TorusBufferGeometry( 25, 10, 10, 10 );
    var material = new THREE.MeshBasicMaterial( { color: 0xcc9900 } );
    //material.lights = true;
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = 0;
    cube.position.y = -20;
    cube.position.z = -50;
    scene.add( cube );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}

function animate() {

    requestAnimationFrame(animate);

    for (var i = 0; i < agents.length; i++)
    {
      agents[i].run();
    }

    var timer = Date.now() * 0.0001;
				camera.position.x = Math.cos( timer ) * 300;
				camera.position.z = Math.sin( timer ) * 300;
				camera.lookAt( scene.position );


    renderer.render(scene, camera);

}
