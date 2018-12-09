var camera, scene, renderer, hemiLight;
var agents = [];
var obj;
let numOfAgents = 3000;
let AgentsBehavior = 1;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);

    scene = new THREE.Scene();

    //create donut
    var geometry = new THREE.TorusBufferGeometry( 30, 10, 10, 10 );
    var material = new THREE.MeshToonMaterial( { color: 0xcc9900 } );
    obj = new THREE.Mesh( geometry, material );
    scene.add( obj );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    directionalLight.position.y = 100;
    directionalLight.castShadow = true;
    scene.add( directionalLight );

    var light = new THREE.PointLight( 0xB9051A, 1, 50 );
    light.position.set( 0, 0, 0 );
    scene.add( light );


    for (var i = 0; i < numOfAgents; i++)
    {
      let a = new MovingAgent(scene, obj.position);
      agents.push(a);
    }

    for (let a of agents)
    {
      a.addAgentReference(agents);
    }

    hemiLight = new THREE.HemisphereLight( 0xF79D4D, 0xF79D4D, 0.6 );
		hemiLight.color.setHSL( 0.6, 1, 0.6 );
		hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
		hemiLight.position.set( 0, 100, 0 );
		scene.add( hemiLight );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    initGUI();

}

function updateAgentsTarget(){
  for (var i = 0; i < agents.length; i++)
  {
    agents[i].updateTarget(obj.position);
  }
}

function updateAgentsBehavior(){
  for (var i = 0; i < agents.length; i++)
  {
    agents[i].updateBehavior(AgentsBehavior);
  }
}

var gui;

function initGUI()
{

  gui = new dat.GUI();

  let param =
  {
    'Behavior': 0,
    'X Position': 0,
    'Y Position': 0,
    'Z Position': 0,
  }

  gui.add(param, 'Behavior', {'None': 0, 'Seeking': 1, 'Fleeing': 2, 'Path Follow': 3}).onChange(function(val){
    switch (val) {
      case '0':
        AgentsBehavior = 1;
        break;
        case '1':
          AgentsBehavior = 10;
          break;
        case '2':
          AgentsBehavior = 100;
          break;
          case '3':
            AgentsBehavior = 1000;
            break;
    }
    updateAgentsBehavior();
  })

  gui.add(param, 'X Position', -300, 300).onChange(function(val){
    obj.position.x = val;
    updateAgentsTarget();
  });

  gui.add(param, 'Y Position', -300, 300).onChange(function(val){
    obj.position.y = val;
    updateAgentsTarget();
  });

  gui.add(param, 'Z Position', -300, 300).onChange(function(val){
    obj.position.z = val;
    updateAgentsTarget();
  });

}


function animate() {

    requestAnimationFrame(animate);

    for (var i = 0; i < agents.length; i++)
    {
      agents[i].run();
    }

    var timer = Date.now() * 0.0001;
				camera.position.x = Math.cos( timer ) * 450;
				camera.position.z = Math.sin( timer ) * 450;
				camera.lookAt( scene.position );


    renderer.render(scene, camera);

}
