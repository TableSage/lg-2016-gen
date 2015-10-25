function Particle(x,y,rad,vx,vy) {
	this.position = createVector (x,y);
	this.velocity = createVector (vx,vy);
	this.radius = rad;
	this.diameter = rad*2;

	// Class Methods

	//UPDATE
	//handles movement and (collision detection?)
	this.update = function() {

		//updates position based on velocity
		this.position.add(this.velocity);
	}

	//DISPLAY
	//render particles/cells to screen
	this.render = function() {

		ellipse(
			this.position.x,
			this.position.y,
			this.diameter,
			this.diameter
			);
	}

	this.rebound = function() {
		if (this.position.x >= width - this.radius){
			this.position.x = width - this.radius;
			this.velocity.x = -1 * this.velocity.x;
		}
		if (this.position.x <= 0 + this.radius) {
			this.position.x = 0 + this.radius;
			this.velocity.x = -1 * this.velocity.x;
		}
		if (this.position.y >= height - this.radius) {
			this.position.y = height - this.radius;
			this.velocity.y = -1 * this.velocity.y;
		}
		if (this.position.y <= 0 + this.radius) {
			this.position.y = 0 + this.radius;
			this.velocity.y = -1 * this.velocity.y;
		}
	}


}
