//TODO
//add unit collision between balls.. is this desireable?
//shape (aesthetics)
//sub-modules, create individualized 'tissues'

var tissue = [];
var attract = false;
var showDebug = false;

function setup() {  // START SETUP ///////////////////////////////////////////////////////
  //Declare Window Size
  createCanvas(windowWidth,windowHeight);
  frameRate(30);
  noStroke();

  //Declare variables
  numParticles = 150;
  c1 = color(random(255),random(255),random(255));
  c2 = color(random(255),random(255),random(255));

  //Contructor Function (generates a new tissue)
  for (var i=0; i<numParticles; i++) {
  	cell = new Particle(
  		random(0,width),    //x position
  		random(0,height),   //y position
  		random(3,8),        //radius
  		random(-1,1),       //vel x
  		random(-1,1),        //vel y
      0.5                 //max acceleration
  		);
  	tissue.push(cell);
  }

} // END SETUP ///////////////////////////////////////////////////////////////////////////

function draw() {
	//clear background
	background(30);
  noStroke();

	//Runs Tissue Methods on every cell in tissue
	for (var i=0; i<tissue.length; i++) {

    	tissue[i].update(attract,300,800);
    	tissue[i].edges();

      stroke(lerpColor(c1,c2,map(tissue[i].position.y,0,height,0,1)));
      tissue[i].interactions(tissue,50,8);//multipurpose interaction method

      //Always declare fill then render last
      fill(lerpColor(c1,c2,map(tissue[i].position.y,0,height,0,1)));
      tissue[i].render();
      }

  //Render Debugging Window
  if (showDebug == true) {
    renderDebug();
  }
} // END DRAW ///////////////////////////////////////////////////////////////////////////

//MOUSEPRESSED FUNCTION
function mousePressed() {
	cell = new Particle(
  		mouseX,           //x position
  		mouseY,           //y position
  		random(3,8),      //radius
  		random(-1,1),     //vel x
  		random(-1,1),     //vel y
      0.5               //max acceleration
  		);
  	tissue.push(cell);
}

//CONTROLS AND INPUT
function keyTyped() {
  if (key === 'a') {
    if (attract == false) {attract = true;}
    else {attract = false;}
  }
  if (key === '`') {
    if (showDebug == false) {showDebug = true;}
    else {showDebug = false;}
  }
}

//DEBUG
function renderDebug(){
  fill(100);
  text("Framerate: " + int(frameRate()), 10, height - 60);
  text("Particles: " + tissue.length, 10 , height - 40);
  text("Attraction: " + attract, 10, height - 20);

}