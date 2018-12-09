class BasicAgent
{
    constructor(scene)
    {
        //visual element
        this.Geometry = new THREE.ConeGeometry(1, 5, 8);

        this.Material = new THREE.MeshLambertMaterial();
        let color = new THREE.Color(Math.random(), 0, Math.random());
        this.Material.color = color;

        this.Mesh = new THREE.Mesh(this.Geometry, this.Material);
        this.Mesh.position.x = Math.random() * -200;
				this.Mesh.position.y = Math.random() * -200;
				this.Mesh.position.z = Math.random() * -200;
        this.Mesh.castShadow = true;

        scene.add(this.Mesh);

        //id
        this.ID = this.Geometry.id;
    }

}


class MovingAgent extends BasicAgent
{
    constructor(scene, target)
    {
        super(scene);

        //MaxSpeed
        this.MaxSpeed = 25;
        //MaxForce
        this.MaxForce = 10.0;
        //Mass
        this.Mass = 1.0;
        //Direction
        this.Direction = new THREE.Vector3();
        //Heading
        this.Heading = new THREE.Vector3();

        //this.Acceleration = new THREE.Vector3();
        this.Steering = new SteeringBehaviors(this, target);
    }

    run()
    {
      this.Steering.updateForces();
    }

    updateTarget(target){
      this.Steering.target = target.clone();
    }

    updateBehavior(val)
    {
      this.Steering.Behavior = val;
    }

    get position()
    {
      return this.Mesh.position;
    }

    set position(value)
    {
      this.Mesh.position = value;
    }

    addAgentReference(other)
    {
      this.Steering.otherAgents.push(other);
    }

}
