var renderer = PIXI.autoDetectRenderer(SCREENWIDTH, SCREENHEIGHT,{backgroundColor : 0x000000});
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

var text = new PIXI.Text("William's Showcase", {font:"75px Times New Roman", fill:"darkred"});
text.x = (SCREENWIDTH / 2) - (text.width / 2);
text.y = (SCREENHEIGHT / 2) - (text.height / 2);
stage.addChild(text);

var graphics = new PIXI.Graphics();
stage.addChild(graphics);

var fade = new FadeObject(true, .01, 0x000000);
var exitIntro = false, createText = false;

function RunIntro() {
  if (exitIntro == false) {
    if (fade.visible == true) {
      if (createText == true) {
        exitIntro = true;
      }
      fade.Run();
    }
    else {
      setTimeout(function() {
        var text2 = new PIXI.Text("of useless shit", {font:"25 Times New Roman", fill:"#090909"});
        text2.x = (SCREENWIDTH / 2) - (text2.width / 2);
        text2.y = (SCREENHEIGHT / 2) + text2.height;
        stage.addChildAt(text2, 0);
        createText = true;
        setTimeout(function() {
        if (fade.visible == false) {
          fade.Run();
        } }, 500);
      }, 350);
    }
  }
}

Update();
function Update() {
    requestAnimationFrame(Update);
    setTimeout(function() { RunIntro(); }, 1000);

    Draw();
}

function Draw() {
  fade.Draw();

  renderer.render(stage);
  graphics.clear();
}
