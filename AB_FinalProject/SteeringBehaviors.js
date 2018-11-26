
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

        this.Behavior = 10;
    }

    seek(target)
    {
        let desire = new THREE.Vector3();
        desire = target.sub(this.Agent.position);

        let desiredVelocity = desire.multiplyScalar(this.Agent.MaxSpeed);

        desiredVelocity.normalize();

        return desiredVelocity.sub(this.Agent.Direction);
    }

    flee(target)
    {
        let desire = new THREE.Vector3();
        desire = this.Agent.position;
        desire = desire.sub(target);
        console.log(desire);
      let desiredVelocity = desire.multiplyScalar(this.Agent.MaxSpeed);

      desiredVelocity.normalize();

      return desiredVelocity.sub(this.Agent.Direction);
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
