function Particle(x,y,rad,vx,vy,maxAcc) {
	this.position = createVector (x,y);
	this.velocity = createVector (vx,vy);
	this.acceleration = createVector (0.0,0.0);
	this.radius = rad;
	this.diameter = rad*2;
	this.maxAcc = maxAcc;

	//UPDATE
	//handles movement (position, velocity, acceleration)
	this.update = function(attract,inner,outer) {

		if (attract == true) { //CONDITIONAL ATTRACTION TO CENTER
			//Calculate destination vector
			var dest = createVector (width/2, height/2); //must be a var declared every frame
			//only accelerate if destination is near but not too close.
			var distance = this.position.dist(dest)
			if (distance < outer && distance > inner) {
				dest.sub(this.position);
				dest.setMag(maxAcc);

				//Calculate and apply Acceleration
				this.acceleration = createVector (dest.x,dest.y);
			}
			else {this.acceleration = createVector(random(-this.maxAcc,this,maxAcc),random(-this.maxAcc,this,maxAcc))};
		}

		//Updates position based on velocity
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.velocity.limit(0.8); //limits max speed my god is this useful

	}

	//RENDER
	//draws the particles/cells to screen
	this.render = function() {
		noStroke();
		ellipse(
			this.position.x,
			this.position.y,
			this.diameter,
			this.diameter
			);
	}

	//INTERACTIONS
	//Draws connection lines between cells that are close to one another
	this.interactions = function(tissue,max,min,mult) {
      for (var i=0; i<tissue.length; i++) {
      	//calculate distance between each object
        range = dist(this.position.x,this.position.y,tissue[i].position.x,tissue[i].position.y);
        if (range > min && range < max) {

        	//applies "network" effect with line strokes
        	strokeWeight(map(range,min,max,3,0))
        	line(this.position.x,this.position.y,tissue[i].position.x,tissue[i].position.y)


        	//Pushes away from each other at a certain distance to prevent clumping lag
        	if (range < min*mult){
        	dest = createVector (tissue[i].position.x,tissue[i].position.y);
        	dest.sub(this.position);
        	dest.rotate(PI);
			dest.setMag(0.1);


			//Calculate and apply Acceleration
			this.acceleration = createVector (dest.x,dest.y);
			}

        }
      }
	}

	//EDGES
	//Bounce off or flow over edges (currently flow over)
	this.edges = function() {
		if (this.position.x >= width+this.radius){
			this.position.x = 0-this.radius+1;
		}
		if (this.position.x <= 0-this.radius) {
			this.position.x = width+this.radius-1;
		}
		if (this.position.y >= height+this.radius) {
			this.position.y = 0-this.radius+1;
		}
		if (this.position.y <= 0-this.radius) {
			this.position.y = height+this.radius-1;
		}
	}
}
