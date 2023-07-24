function setup() {
    createCanvas(700, 500, WEBGL);
    noCursor();
    cam1 = createCamera();
    capture = createCapture(VIDEO);
    capture.hide();
  }
  
  function draw() {
    background(250);
     drawScene();
    firstPerson(cam1);
  }
  
  function drawScene() {
    lights();
    //pointLight(255, 255, 255, 0, -4000, 0);
    
    
      for(let a=0; a<=10000; a+=1000){
    push();
    fill(200);
    noStroke();
    fill(10);
    translate(a, 400, 450);
    rotateX(PI / 2);
    plane(1000);
    pop();
    }
    
    
    //ESPEJO
    push();
    texture(capture);
    noStroke();
   //sphere(1000);
   //plane(400, 400);
    
  // filter(THRESHOLD,0.2);
    pop();
    
  }
  