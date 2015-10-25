var tissue = [];

function setup() {
  //Declare Window Size
  createCanvas(windowWidth,windowHeight);

  //disable stroke (for now)
  noStroke();

  //Contructor Function (generates a new tissue)
  for (var i=0; i<50; i++) {
  	cell = new Particle(
  		random(0,width), //x position
  		random(0,height), //y position
  		random(3,8),//radius
  		random(-1,1),//vel x
  		random(-1,1)//vel y
  		);
  	tissue.push(cell);
  }

} // END SETUP

function draw() {
	//clear background
	background(50);

	//Runs Tissue Methods
	for (var i=0; i<tissue.length; i++) {
    	tissue[i].update();
    	tissue[i].rebound();
    	tissue[i].render();
	}
} // END DRAW

function mousePressed() {
	cell = new Particle(
  		mouseX, //x position
  		mouseY, //y position
  		random(3,8),//radius
  		random(-1,1),//vel x
  		random(-1,1)//vel y
  		);
  	tissue.push(cell);
}