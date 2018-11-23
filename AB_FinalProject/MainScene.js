﻿var camera, scene, renderer;
var agents = [];
var obj;
let numOfAgents = 2100;
let AgentsBehavior = 10;

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

function initGUI(){

  gui = new dat.GUI();

  let param =
  {
    'Behavior': 0,
    'X Position': 0,
    'Y Position': 0,
    'Z Position': 0,
  }

  gui.add(param, 'Behavior', {'Seeking': 0, 'Fleeing': 1}).onChange(function(val){
    switch (val) {
      case '0':
        AgentsBehavior = 10;
        break;

        case '1':
          AgentsBehavior = 100;
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
				camera.position.x = Math.cos( timer ) * 300;
				camera.position.z = Math.sin( timer ) * 300;
				camera.lookAt( scene.position );


    renderer.render(scene, camera);

}
