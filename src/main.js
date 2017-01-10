var SCREENWIDTH = 1920, SCREENHEIGHT = 1080;

var renderer = PIXI.autoDetectRenderer(SCREENWIDTH, SCREENHEIGHT,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

var text = new PIXI.Text("Pixi.js can has text!", {font:"50px Arial", fill:"red"});
text.x = (SCREENWIDTH / 2) - (text.width / 2);
text.y = (SCREENHEIGHT / 2) - (text.height / 2);
stage.addChild(text);

var graphics = new PIXI.Graphics();
stage.addChild(graphics);

var myRectangle = new Rectangle(new Vector2(0,0), new Vector2(100, 100), 0x000000, 1);

Update();
function Update() {
    requestAnimationFrame(Update);

    renderer.render(stage);
}
