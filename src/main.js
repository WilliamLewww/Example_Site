var renderer = PIXI.autoDetectRenderer(SCREENWIDTH, SCREENHEIGHT,{backgroundColor : 0x000000});
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

var text = new PIXI.Text("William's Showcase", {font:"50px Courier New", fill:"darkred"});
text.x = (SCREENWIDTH / 2) - (text.width / 2); text.y = (SCREENHEIGHT / 2) - (text.height / 2);
var text2 = new PIXI.Text("I don't know how to make websites", {font:"20 Impact", fill:"#090909"});
text2.x = (SCREENWIDTH / 2) - (text2.width / 2); text2.y = (SCREENHEIGHT / 2) + text2.height;
text2.visible = false;
stage.addChild(text);
stage.addChild(text2);

var graphics = new PIXI.Graphics();
stage.addChild(graphics);

var fade = new FadeObject(true, .02, 0x000000);
var exitIntro = false, createText = false;

var runTransition = false;

var environmentGenerated = false;
var player; var environment;

function ScriptedEvents() {
  if (exitIntro == false) { setTimeout(function() { RunIntro(); }, 1000); }
  if (runTransition == true) { setTimeout(function() { GenIntEnv(); renderer.backgroundColor = 0xAED6F1; fade.SetSpeed(.002); fade.RunOnce(true); }, 2000);}
  if (runTransition == true && fade.visible == false) { runTransition = false; }
}

function GenIntEnv() {
  if (player == null) {
    player = new Player(new Vector2(100, SCREENHEIGHT - 100));
    environment = new Environment(25, 30, 30);
    environmentGenerated = true;
  }
}

var frameStart = Date.now(), frameEnd = 0;
var deltaTime  = 0;
Update();
function Update() {
    frameEnd = Date.now();
    deltaTime = frameEnd - frameStart;
    frameStart = frameEnd;

    requestAnimationFrame(Update);
    ScriptedEvents();

    if (environmentGenerated == true) {
      player.Update(deltaTime);
      environment.Update();
    }

    Draw();
}

function Draw() {
  fade.Draw();

  renderer.render(stage);
  graphics.clear();
}

function RunIntro() {
  if (exitIntro == false) {
    if (fade.visible == true) {
      if (createText == true) {
        stage.removeChildren(0,2);
        runTransition = true;
        exitIntro = true;
      }
      fade.Run();
    }
    else {
      setTimeout(function() {
        fade.SetSpeed(.01);
        text2.visible = true;
        createText = true;
        setTimeout(function() {
        if (fade.visible == false) {
          fade.Run();
        } }, 50);
      }, 500);
    }
  }
}
