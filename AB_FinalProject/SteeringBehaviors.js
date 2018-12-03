
class SteeringBehaviors
{
    constructor(agent, target)
    {
        this.Agent = agent;
        this.target = target.clone();
        this.SteeringForce = new THREE.Vector3();
        this.Acceleration = new THREE.Vector3();

        this.clock = new THREE.Clock();
        this.clock.start();

        this.Behavior = 1;

        this.points = [];
        this.fillPoints();

        this.currentNode = this.points.length - 1;
        this.pathDirection = -1;

        this.otherAgents = [];
    }

    seek(target)
    {
        let desire = new THREE.Vector3();
        desire = this.Agent.position;
        desire = target.sub(desire);

        let desiredVelocity = desire.multiplyScalar(this.Agent.MaxSpeed);

        desiredVelocity.normalize();

        return desiredVelocity.sub(this.Agent.Direction);
    }

    flee(target)
    {
      let desire = new THREE.Vector3();
      desire = this.Agent.position;

      desire = target.add(desire);
      let desiredVelocity = desire.multiplyScalar(this.Agent.MaxSpeed);

      desiredVelocity.normalize();

      return desiredVelocity.sub(this.Agent.Direction);
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    fillPoints()
    {
      //get 10 points
      for (var i = 0; i < 10; i++)
      {
        let vec = new THREE.Vector3(0, 0, 0);

        //get 3 positions x, y, z
        for (var j = 0; j < 3; j++)
        {
          let p = this.getRndInteger(-200, 200);

          if (j === 0) {
            vec.x = p;
          }
          else if (j === 1) {
            vec.y = p;
          }
          else if (j === 2) {
            vec.z = p;
          }
        }

        this.points.push(vec);
      }

       //for (let v of this.points) {
       //  console.log(v);
       //}
    }

    pathFollow()
    {
      let tar = new THREE.Vector3();

      if (this.points != null)
      {

        tar = this.points[this.currentNode].clone();

        if (this.Agent.position.distanceTo(tar) <= 15)
        {
            //this.currentNode--;
            this.currentNode += this.pathDirection;

            if (this.currentNode <= -1 || this.currentNode >= this.points.length)
          {
                //this.currentNode = 0;
                this.pathDirection *= -1;
            this.currentNode += this.pathDirection;

          }
        }
      }

      return this.seek(tar);
    }

    separation()
    {
        let desiredSeparation = 3.5 * 2;

        let sum = new THREE.Vector3();

        let count = 0;

        for (let a of this.otherAgents)
        {

        }
    }

    updateBehaviors()
    {
        //no Behavior running
        if (this.Behavior === 1)
        {
            return this.SteeringForce = new THREE.Vector3(0, 0, 0);
        }
        //Seeking Behavior
        else if (this.Behavior === 10)
        {
            return this.SteeringForce = this.seek(this.target.clone());
        }
        //Fleeing Behavior
        else if (this.Behavior === 100)
        {
            return this.SteeringForce = this.flee(this.target.clone());
        }
        else if (this.Behavior === 1000)
        {
            return this.SteeringForce = this.pathFollow();
        }
    }


    updateForces()
    {

        //gets the behavior's SteeringForce and applys it to the agents movement
        var a = this.updateBehaviors();
        this.applyForce(a);

        //gets the Acceleration of the agent and scales it to the Agent's Mass
        this.Acceleration = this.SteeringForce.divideScalar(this.Agent.Mass);
        //this.Agent.Direction.min(this.Agent.MaxSpeed);
        let timer = this.clock.getDelta();

        //moves the agent
        this.Acceleration.multiplyScalar(timer);
        this.Agent.Direction.add(this.Acceleration);

        this.truncate();

        this.Agent.position.add(this.Agent.Direction);

        //checks if the magnitude of the Agent's Direction is greater than small number
        if (this.Agent.Direction.lengthSq() > 0.00001)
        {
            let heading = this.Agent.Direction;
            this.Agent.Heading = heading.normalize();
        }

        this.Agent.Mesh.lookAt(this.Agent.Heading);

        this.SteeringForce = new THREE.Vector3(0, 0, 0);

    }

    truncate()
    {
      if (this.Agent.Direction.length() > this.MaxSpeed)
      {
        this.Agent.Direction.normalize();
        this.Agent.Direction.multiplyScalar(this.MaxSpeed);
      }
    }

    applyForce(force)
    {
        if (this.sumForces(force))
        {
            this.SteeringForce.add(force);
        }
    }

    sumForces(forceToAdd)
    {
        let magSoFar = this.SteeringForce.length();

        let magRemaining = this.Agent.MaxForce - magSoFar;

        //console.log(this.SteeringForce.length());
        if (magRemaining <= 0)
        {
          return false;
        }

        let magToAdd = forceToAdd.length();

        if (magToAdd < magRemaining)
        {
          this.SteeringForce.add(forceToAdd);
        }
        else
        {
          let vec1 = forceToAdd.normalize();
          vec1.multiplyScalar(magRemaining);

          this.SteeringForce.addScalar(vec1);
        }

        return true;

    }
}
