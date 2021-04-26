var input;
var input2;
var dropzone;
var button;
let img;
let img2;
let canvas;

function setup() {
 let c = createCanvas(windowWidth, windowHeight);

  gui = new Gui();

  let gui_setup = new dat.GUI();

  gui_setup.add(gui, "Pen", 1, 10).step(1);

  gui_setup
    .add(gui, "HorizontalL", 0, 10)
    .step(1)
    .onChange(update),
    gui_setup
      .add(gui, "VerticalL", 0, 10)
      .step(1)
      .onChange(update),
    gui_setup
      .add(gui, "Dotted", 0, 15)
      .step(1)
      .onChange(update);

  //gui_setup.add(gui, 'ymargin', 0, 100).step(1).onChange(update);

  gui_setup
    .add(gui, "LineSpacing", 1, 50)
    .step(1)
    .onChange(update);

  gui_setup
    .add(gui, "DotSpacing", 1, 50)
    .step(1)
    .onChange(update);

  gui_setup
    .add(gui, "XImg", 0, 500)
    .step(1)
    .onChange(update);

  gui_setup
    .add(gui, "YImg", 0, 500)
    .step(1)
    .onChange(update);

  // gui_setup
  //.add(gui, "DropImgX", 0, 500)
  //.step(1)
  //.onChange(update);

  //gui_setup
  // .add(gui, "DropImgY", 0, 500)
  // .step(1)
  //.onChange(update);

  //gui_setup.add(circles, 's', 0, 10);.step(1).onChange(update);
  // gui_setup.add(gui, 'circle', 0, 15).step(1).onChange(update);

  gui_setup.addColor(gui, "Color").onChange(update);

  gui_setup.addColor(gui, "ColorDraw").onChange(update);

  gui_setup.addColor(gui, "LineColor").onChange(update);

  gui_setup.addColor(gui, "DotColor").onChange(update);
  //button function
  input = createInput();
  input.position(10, 35);
  button = createButton("submit");
  button.position(160, 35);
  button.mousePressed(datebutton);

  //image insert
  input2 = createFileInput(handleFile);
  input2.position(10, 60);

  //canvas = createCanvas(windowWidth, windowHeight);
  //canvas.drop(fileDropped);

   // dropzone = select('#dropzone');
  
  frameRate(120);

  noLoop();
}

function draw() {
  background(gui.Color);
  paper();
  papertwo();
  dotted();
  date();
  datebutton();
   if (img2) {
    image(img, 0, 0, 200, 200);
  }
}

function mouseDragged() {
  stroke(gui.ColorDraw);
  strokeWeight(gui.Pen);
  //ellipse(mouseX, mouseY, gui.strokeWeight/2, gui.strokeWeight/2)
  line(mouseX, mouseY, mouseX, mouseY);
}
function date() {
  let s = "Date:";
  fill(0);

  textSize(20);
  textFont("Courier New");
  text(s, 10, 10, 80, 80); // Text wraps within text box
}

function datebutton() {
  noStroke();

  fill(0);
  textSize(20);
  var name = input.value();
  for (var i = 0; i < 30; i++) {
    text(name, 80, 25);
  }
}

function paper() {
  strokeWeight(gui.HorizontalL);

  stroke(gui.LineColor);

  for (var i = 0; i <= windowHeight; i += gui.LineSpacing) {
    line(windowWidth * 2, i, 0, i);
  }
}

function papertwo() {
  strokeWeight(gui.VerticalL);

  stroke(gui.LineColor);

  for (var i = 0; i <= windowWidth; i += gui.LineSpacing) {
    line(i, windowHeight * 2, i, 0);
  }
}

function dotted() {
  fill(gui.DotColor);
  noStroke();
  for (let x = 0; x < windowWidth * 2; x += gui.DotSpacing) {
    for (let y = 0; y < windowHeight * 2; y += gui.DotSpacing) {
      ellipse(x, y, gui.Dotted, gui.Dotted);
    }
  }
}

function handleFile(file) {
  if (img) {
    image(img, gui.XImg, gui.YImg, 200, 200);
  }
  print(file);
  if (file.type === "image") {
    img = createImg(file.data, "");
    img.hide();
  } else {
    img = null;
  }
}
function gotFile(file) {
  img2 = createImg(file.data, '').hide();
}


function update() {
  redraw();
}
function Gui() {
  this.Color = "#FFFFFF";
  this.ColorDraw = "#000000";
  this.LineColor = "#add8e6";
  this.DotColor = "#000000";
  this.Pen = 10;
  this.HorizontalL = 2;
  this.VerticalL = 0;
  this.Dotted = 0;
  //this.ymargin = 100;
  this.LineSpacing = 50;
  this.DotSpacing = 30;
  this.XImg = 0;
  this.YImg = 50;
  //this.DropImgX = 0;
  //this.DropImgY = 50;
}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
}

