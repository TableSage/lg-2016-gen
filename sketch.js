//TODO
//add unit collision between balls.. is this desireable?
//coloration and shape (aesthetics)
//sub-modules, create individualized 'tissues'

var tissue = [];
var inside,middle; //must be allocated as globals.

function setup() {
  //Declare Window Size
  createCanvas(windowWidth,windowHeight);

  //disable stroke (for now)
  noStroke();

  //declare colors
  c1 = color(random(255),random(255),random(255));
  c2 = color(random(255),random(255),random(255));

  //Contructor Function (generates a new tissue)
  for (var i=0; i<200; i++) {
  	cell = new Particle(
  		random(0,width),    //x position
  		random(0,height),   //y position
  		random(3,8),        //radius
  		random(-1,1),       //vel x
  		random(-1,1)        //vel y
  		);
  	tissue.push(cell);
  }

} // END SETUP /////////////////////////

function draw() {
	//clear background
	background(30);
  noStroke();

	//Runs Tissue Methods on every cell in tissue
	for (var i=0; i<tissue.length; i++) {
      fill(lerpColor(c1,c2,map(tissue[i].position.y,0,height,0,1)));
    	tissue[i].update();
    	tissue[i].edges();

      stroke(lerpColor(c1,c2,map(tissue[i].position.y,0,height,0,1)));
      tissue[i].connections(tissue,50,3);// connections does not stroke automatically

      //Always render last
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