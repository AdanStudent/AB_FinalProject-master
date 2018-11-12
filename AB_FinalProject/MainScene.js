var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 10;

    scene = new THREE.Scene();

    // geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    // material = new THREE.MeshNormalMaterial();
    //
    // mesh = new THREE.Mesh(geometry, material);

    // let Geometry = new THREE.ConeGeometry(1, 5, 8);
    // let Material = new THREE.MeshNormalMaterial();
    // let Mesh = new THREE.Mesh(Geometry, Material);
    //
    // scene.add(Mesh);

    let agent = new MovingAgent(scene);
    agent.run();

    // scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}

function animate() {

    //requestAnimationFrame(animate);

    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.02;

    renderer.render(scene, camera);

}
