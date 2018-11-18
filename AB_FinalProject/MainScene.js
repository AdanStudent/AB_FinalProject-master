var camera, scene, renderer;
var geometry, material, mesh;
var agents = [];

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.z = 20;

    scene = new THREE.Scene();

    for (var i = 0; i < 1000; i++)
    {
      agents.push(new MovingAgent(scene));
    }

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


    renderer.render(scene, camera);

}
