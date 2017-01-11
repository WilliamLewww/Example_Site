var renderer = PIXI.autoDetectRenderer(SCREENWIDTH, SCREENHEIGHT,{backgroundColor : 0x220000});
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

var text = new PIXI.Text("William's Showcase", {font:"75px Times New Roman", fill:"darkred"});
text.x = (SCREENWIDTH / 2) - (text.width / 2); text.y = (SCREENHEIGHT / 2) - (text.height / 2);
var text2 = new PIXI.Text("of useless shit", {font:"25 Times New Roman", fill:"#090909"});
text2.x = (SCREENWIDTH / 2) - (text2.width / 2); text2.y = (SCREENHEIGHT / 2) + text2.height;
text2.visible = false;
stage.addChild(text);
stage.addChild(text2);

var graphics = new PIXI.Graphics();
stage.addChild(graphics);

var fade = new FadeObject(true, .02, 0x000000);
var exitIntro = false, createText = false;

var runTransition = false;

Update();
function Update() {
    requestAnimationFrame(Update);
    if (exitIntro == false) { setTimeout(function() { RunIntro(); }, 1000); }
    if (runTransition == true) { fade.SetSpeed(.005); fade.RunOnce(true); }
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
