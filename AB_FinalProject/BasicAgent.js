class BasicAgent
{
    constructor(scene)
    {
        //visual element
        this.Geometry = new THREE.ConeGeometry(1, 5, 8);
        this.Material = new THREE.MeshNormalMaterial();
        this.Mesh = new THREE.Mesh(this.Geometry, this.Material);

        this.Mesh.position.x = Math.random() * 10 - 5;
				this.Mesh.position.y = Math.random() * 10 - 5;
				this.Mesh.position.z = Math.random() * 10 - 5;

        scene.add(this.Mesh);

        //id
        this.ID = this.Geometry.id;
    }

}


class MovingAgent extends BasicAgent
{
    constructor(scene)
    {
        super(scene);

        //MaxSpeed
        this.MaxSpeed = 5;
        //MaxForce
        this.MaxForce = 10.0;
        //Mass
        this.Mass = 1.0;
        //Direction
        this.Direction = new THREE.Vector3();
        //Heading
        this.Heading = new THREE.Vector3();

        //this.Acceleration = new THREE.Vector3();
        this.Steering = new SteeringBehaviors(this, new THREE.Vector3(-2, 2, -10));
    }

    run()
    {
      this.Steering.updateForces();
    }

    get position()
    {
      return this.Mesh.position;
    }

    set position(value)
    {
      this.Mesh.position = value;
    }

}
