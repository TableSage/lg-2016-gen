function Particle(x,y,rad,vx,vy) {
	this.position = createVector (x,y);
	this.velocity = createVector (vx,vy);
	this.acceleration = createVector (0.0,0.0);
	this.radius = rad;
	this.diameter = rad*2;

	// Class Methods

	//UPDATE
	//handles movement and (collision detection?)
	this.update = function() {

		this.acceleration = createVector (random(-0.1,0.1),random(-0.1,0.1));

		//updates position based on velocity
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

	//EDGES
	//Bounce off or flow over edges
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

	//CONNECTIONS
	//Draws connection lines between cells that are close to one another
	this.connections = function(tissue,max,weight) {
      for (var i=0; i<tissue.length; i++) {
        range = dist(this.position.x,this.position.y,tissue[i].position.x,tissue[i].position.y);
        if (range < max) {
          strokeWeight(map(range,0,max,weight,0));
          line(this.position.x,this.position.y,tissue[i].position.x,tissue[i].position.y)
        } 
      }
	}
}
