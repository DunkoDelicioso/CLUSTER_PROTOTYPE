//x rotate
let value1 = 40

//y rotate
let value2 = 0;

//z rotate
let value3 = 0

let value4 = 0

let song;

let rate;

let speed = 0.5

let rateSp = 0;

let rateSpr = 0.1

let speech;

function preload() {
  song = loadSound('Woof.mp3');
}

function setup() {
  canvas = createCanvas(1000, 1000, WEBGL);
  canvas.id('mycanvas');
  canvas.parent('sketch-container');
  amplitude = new p5.Amplitude();
  song.amp(0.5)
  song.loop()
  background(255)
  let button = select('#submit')
  let user_input = select('#user_input')
  let output = select('#output')
  speech = new p5.Speech();
  let bot = new RiveScript();
  bot.loadFile("mind.rive").then(loading_done).catch(loading_error);
  
  

  function loading_done() {
    console.log("Bot has finished loading!");
    speech.setVoice("Google UK English Female")

  
    // Now the replies must be sorted!
    bot.sortReplies();
  
    // And now we're free to get a reply from the brain!
  
    // RiveScript remembers user data by their username and can tell
    // multiple users apart.
    let username = "local-user";
  
    // NOTE: the API has changed in v2.0.0 and returns a Promise now.
    bot.reply(username, "Hello, bot!").then(function(reply) {
      console.log("The bot says: " + reply);
    });
  }

  function loading_error(error, filename, lineno) {
    console.log("Error when loading files: " + error);
  }

    document.body.onclick = function() {

    console.log("I'm listening...");
  }

  //show result of speech in text box
  function showResult() {
    document.getElementById("myText").value = speechRec.resultString;
    console.log('Transcript: '+ speechRec.resultString); 		// log the transcript
    console.log('Confidence: '+ speechRec.resultConfidence); 	// log the confidence
  }
  
  //show error in case detected
  function showError(){
    document.getElementById("myText").value = 'An error occurred!';
    console.log('An error occurred!');
  }

  // button.mousePressed(speech.stop())
  button.mousePressed(chat);

  function chat(){
    //let input = speechRec.resultString;
    speech.stop();
    let input = document.getElementById("myText").value
    bot.reply("local-user", input).then(function(reply) {
      console.log("Bot>", reply);
      output.html(reply);
      speech.speak(reply)
      document.getElementById("myText").value = ""
    });
  }

}

window.document.onkeydown = function(e) {
  if (!e) {
    e = event;
  }
  if (e.keyCode == 27) {
    lightbox_close();
  }
}

function lightbox_open() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo");
  window.scrollTo(0, 0);
  document.getElementById('light').style.display = 'block';
  document.getElementById('fade').style.display = 'block';
  lightBoxVideo.play();
  song.pause();
}

function lightbox_close() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo");
  document.getElementById('light').style.display = 'none';
  document.getElementById('fade').style.display = 'none';
  lightBoxVideo.load();
  song.play();
}


function draw() {
  let level = amplitude.getLevel();
  let pulse = level * 100
  value1 = value1 + 0.01
  value4 = value4 + speed
  if(value4 > 80 || value4 < 0){
    speed = speed * -1
    
  }
  let rate = 1 + value4/ 1000 + rateSp
  song.rate(rate)

  noStroke();

  pointLight(255, 255, 255, 0, 0, 400);
  ambientLight(255 - (rate * 50), 122 - value4 - (rate * 20), rate * 50);
  
  orbitControl(5, 5, 0);
  
  push();
  rotateX(value1);
  rotateY(value2);
  rotateZ(value3)
  fill(255)
  box(60, 500 + value4, 60 + value4);
  pop();
  
  push();
  translate(120, 120, - 120)
  rotateX(value1);
  rotateY(value2);
  rotateZ(value3)
  fill(255)
  box(40, 40 + value4 + pulse, 40 + value4);
  pop();
  
  push();
  translate(-120, -120, - 120)
  rotateX(value1);
  rotateY(value2);
  rotateZ(value3)
  fill(255)
  box(40, 40 + value4 + pulse, 40 + value4);
  pop();
  
  push();
  translate(120, -120, - 120)
  rotateX(value1);
  rotateY(value2);
  rotateZ(value3)
  fill(255)
  box(40, 40 + value4 + pulse, 40 + value4);
  pop();
  
  push();
  translate(-120, 120, - 120)
  rotateX(value1);
  rotateY(value2);
  rotateZ(value3)
  fill(255)
  box(40, 40 + value4 + pulse, 40 + value4);
  pop();
  
   push();
  translate(120, 120,  120)
  rotateX(value1);
  rotateY(value2);
  rotateZ(value3);
  fill(255)
  box(40, 40 + value4 + pulse, 40 + value4);
  pop();
  
  push();
  translate(-120, -120,  120)
  rotateX(value1);
  rotateY(value2);
  rotateZ(value3)
  fill(255)
  box(40, 40 + value4 + pulse, 40 + value4);
  pop();
  
  push();
  translate(120, -120,  120)
  rotateX(value1);
  rotateY(value2);
  rotateZ(value3)
  fill(255)
  box(40, 40 + value4 + pulse, 40 + value4);
  pop();
  
  push();
  translate(-120, 120,  120)
  rotateX(value1);
  rotateY(value2);
  rotateZ(value3)
  fill(255)
  box(40, 40 + value4  + pulse, 40 + value4);
  pop();
  

  
}
  
function mouseDragged() {
  if(mouseX > 0 && mouseX < 1000){
    rateSp = rateSp + rateSpr;
  }
  if (rateSp > 2 || rateSp < -5) {
    rateSpr = rateSpr * -1
  }
}

function keyPressed() {
  let rando = random(1, 10)

    song.jump(rando, 10);
  fill(random(0, 255), random(0, 255), random(0, 255), 120);
  rect(random(-width, width), random(-height, height), random(1, 1000), random(1,1000))

}
