var camera, scene, renderer;
var agents = [];
var obj;
let numOfAgents = 3000;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);

    scene = new THREE.Scene();

    //create donut
    var geometry = new THREE.TorusBufferGeometry( 50, 20, 20, 20 );
    var material = new THREE.MeshBasicMaterial( { color: 0xcc9900 } );
    obj = new THREE.Mesh( geometry, material );
    scene.add( obj );


    for (var i = 0; i < numOfAgents; i++)
    {
      agents.push(new MovingAgent(scene, obj.position));
    }


    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    initGUI();

}

function updateAgents(){
  for (var i = 0; i < agents.length; i++)
  {
    agents[i].updateTarget(obj.position);
  }
}

var gui;

function initGUI(){

  gui = new dat.GUI();

  let param =
  {
    'X Position': 0,
    'Y Position': 0,
    'Z Position': 0
  }

  gui.add(param, 'X Position', -100, 100).onChange(function(val){
    obj.position.x = val;
    updateAgents();
  });

  gui.add(param, 'Y Position', -100, 100).onChange(function(val){
    obj.position.y = val;
    updateAgents();
  });

  gui.add(param, 'Z Position', -100, 100).onChange(function(val){
    obj.position.z = val;
    updateAgents();
  });

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
