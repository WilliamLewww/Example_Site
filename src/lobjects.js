class Player {
  constructor(positionParam) {
    this.texture1 = PIXI.Texture.fromImage("content/pigeon1.png");
    this.texture2 = PIXI.Texture.fromImage("content/pigeon2.png");
    this.texture3 = PIXI.Texture.fromImage("content/pigeon3.png");
    this.texture4 = PIXI.Texture.fromImage("content/pigeon4.png");
    this.texture5 = PIXI.Texture.fromImage("content/pigeon5.png");

    this.object = new PIXI.Sprite(this.texture1);
    stage.addChildAt(this.object, 0);

    this.object.x = positionParam.x;
    this.object.y = positionParam.y;
    this.object.scale.x = 0.25;
    this.object.scale.y = 0.25;

    this.facingRight = true;

    this.velocityX = 0;
    this.velocityY = 0;

    this.object.anchor.x = 0.5;
    this.object.anchor.y = 0.5;

    this.animationPhase = 0;

    this.onGround = false;
  }

  Width() { return (this.texture1.width * .25) / 2; }
  Height() { return (this.texture1.height * .25) / 2; }

  Top() { return this.object.y - this.Height() }
  Bottom() { return this.object.y + this.Height() }
  Left() { return this.object.x - this.Width() }
  Right() { return this.object.x + this.Width() }

  SetTexture(index) {
    switch (index) {
      case 1:
        this.object.texture = this.texture1;
        break;
      case 2:
        this.object.texture = this.texture2;
        break;
      case 3:
        this.object.texture = this.texture3;
        break;
      case 4:
        this.object.texture = this.texture4;
        break;
      case 5:
        this.object.texture = this.texture5;
        break;
    }
  }

  Update(deltaTime) {
    var deltaTimeS = deltaTime / 1000;
    if (keyList.indexOf(39) != -1 && keyList.indexOf(37) == -1) {
      if (this.object.rotation == 0) { this.object.rotation = -0.3; }
      if (this.facingRight == false) {
        this.object.scale.x = 0.25;
        //this.object.x -= this.texture1.width * 0.25;
        this.facingRight = true;
      }
      this.velocityX = 2.5;
      this.animationPhase += 2.5;
    }
    if (keyList.indexOf(37) != -1 && keyList.indexOf(39) == -1) {
      if (this.object.rotation == 0) { this.object.rotation = 0.3; }
      if (this.facingRight == true) {
        this.object.scale.x = -0.25;
        //this.object.x += this.texture1.width * 0.25;
        this.facingRight = false;
      }
      this.velocityX = -2.5;
      this.animationPhase += 2.5;
    }
    if (keyList.indexOf(37) == -1 && keyList.indexOf(39) == -1 || keyList.indexOf(37) != -1 && keyList.indexOf(39) != -1) {
      this.velocityX = 0;
      this.object.rotation = 0;
      this.animationPhase = 0;
    }

    if (this.animationPhase >= 50) {
      this.SetTexture(Math.floor((Math.random() * 5) + 1));

      if (this.object.rotation < 0) { this.object.rotation = 0.3; }
      else {  if (this.object.rotation > 0) { this.object.rotation = -0.3; } }

      this.animationPhase = 0;
    }

    if (this.Bottom() >= SCREENHEIGHT - 50) {
      this.velocityY = 0;
      this.object.y = SCREENHEIGHT - 50 - this.Height();
      this.onGround = true;
    }

    if (this.onGround == false) {
      this.velocityY += 9.8 * deltaTimeS;
    }
    else {
      if (keyList.indexOf(32) != -1 ) {
        this.velocityY = -5;
        this.onGround = false;
      }
    }

    this.object.x += this.velocityX;
    this.object.y += this.velocityY;
  }
}

class Cloud {
  constructor(positionParam, scale) {
    this.texture = PIXI.Texture.fromImage("content/cloud.png");
    this.object = new PIXI.Sprite(this.texture);
    stage.addChildAt(this.object, 1);

    this.object.anchor.x = 0.5;
    this.object.anchor.y = 0.5;

    this.object.x = positionParam.x;
    this.object.y = positionParam.y;
    this.object.scale.x = scale;
    this.object.scale.y = scale;

    this.speed = (Math.random() * .3) + .2
    this.cycle = Math.random() * 200;

    this.moveRight = Math.floor(Math.random() * 2);
  }

  Update() {
    if (this.cycle >= 200) {
      this.moveRight = !this.moveRight;
      this.cycle = 0;
    }

    if (this.moveRight == true) { this.object.x += this.speed; }
    else { this.object.x -= this.speed; }

    this.cycle += 1;
  }
}

class SpaceBear {
  constructor(initialPosition, scale) {
    this.texture = PIXI.Texture.fromImage("content/bear.png");
    this.object = new PIXI.Sprite(this.texture);
    this.object.alpha = (Math.random() * .3) + .2;
    stage.addChildAt(this.object, 0);

    this.object.anchor.x = 0.5;
    this.object.anchor.y = 0.5;

    this.object.x = initialPosition.x;
    this.object.y = initialPosition.y;
    this.object.scale.x = scale;
    this.object.scale.y = scale;

    this.speedX = (Math.random() * 2) + 1;;
    this.speedY = (Math.random() * 3) + 4;
    this.speedRotation = (Math.random() * .05) + .005;
  }

  Update() {
    this.object.rotation += this.speedRotation;
    this.object.x += this.speedX;
    this.object.y += this.speedY;

    if (this.object.x > SCREENWIDTH) {
      this.object.x = -this.texture.width;
    }

    if (this.object.y > SCREENHEIGHT) {
      this.object.y = 50;
    }
  }
}

class Cow {
  constructor(initialPosition, scale) {
    this.texture = PIXI.Texture.fromImage("content/cow.png");
    this.object = new PIXI.Sprite(this.texture);
    this.object.alpha = (Math.random() * .3) + .2;
    stage.addChildAt(this.object, 0);

    this.object.anchor.x = 0.5;
    this.object.anchor.y = 0.5;

    this.object.x = initialPosition.x;
    this.object.y = initialPosition.y;
    this.object.scale.x = scale;
    this.object.scale.y = scale;

    this.speedX = (Math.random() * 2) + 1;;
    this.speedY = (Math.random() * 3) + 4;
    this.speedRotation = (Math.random() * .05) + .005;
  }

  Update() {
    this.object.rotation += this.speedRotation;
    this.object.x += this.speedX;
    this.object.y += this.speedY;

    if (this.object.x > SCREENWIDTH) {
      this.object.x = -this.texture.width;
    }

    if (this.object.y > SCREENHEIGHT) {
      this.object.y = 50;
    }
  }
}

class Environment {
  constructor(cloudCount, cowCount) {
    this.GenerateGround(39);

    this.cloudArray = [];
    for (var x = 0; x < cloudCount; x++) {
      this.cloudArray.push(new Cloud(new Vector2(x * (SCREENWIDTH / cloudCount) + 100, (Math.random() * 75) + 10), 1));
    }

    this.cowArray = [];
    for (var x = 0; x < cowCount; x++) {
      this.cowArray.push(new Cow(new Vector2(x * (SCREENWIDTH / cowCount), (Math.random() * SCREENHEIGHT) + 50), .20));
    }

    this.bearArray = [];
    for (var x = 0; x < cowCount; x++) {
      this.bearArray.push(new SpaceBear(new Vector2(x * (SCREENWIDTH / cowCount), (Math.random() * SCREENHEIGHT) + 50), .15));
    }
  }

  GenerateGround(count) {
    this.texture = PIXI.Texture.fromImage("content/dirt.png");
    this.groundArray = [];
    for (var x = 0; x < count; x++) {
      this.groundArray.push(new PIXI.Sprite(this.texture));
      this.groundArray[x].y = SCREENHEIGHT - 50;
      this.groundArray[x].x = x * 50;
      stage.addChildAt(this.groundArray[x], 0);
    }
  }

  Update() {
    this.cloudArray.forEach(function(element) { element.Update(); });
    this.cowArray.forEach(function(element) { element.Update(); });
    this.bearArray.forEach(function(element) { element.Update(); });
  }
}

class FadeObject {
  constructor(initialState, speedParam, color) {
    this.visible = initialState;
    this.speed = speedParam;

    this.rectangle = new Rectangle(new Vector2(0,0), new Vector2(SCREENWIDTH, SCREENHEIGHT), color, initialState);
  }

  SetSpeed(speed) {
    this.speed = speed;
  }

  Run() {
    if (this.visible == true) {
      if (this.rectangle.alpha - this.speed <= 0) {
        this.rectangle.alpha = 0;
        this.visible = false;
      }
      else {
        this.rectangle.alpha -= this.speed;
      }
    }
    else {
      if (this.rectangle.alpha + this.speed >= 1) {
        this.rectangle.alpha = 1;
        this.visible = true;
      }
      else {
        this.rectangle.alpha += this.speed;
      }
    }
  }

  RunOnce(state) {
    if (state == true) {
      if (this.rectangle.alpha - this.speed <= 0) {
        this.rectangle.alpha = 0;
        this.visible = false;
      }
      else {
        this.rectangle.alpha -= this.speed;
      }
    }
    else {
      if (this.rectangle.alpha + this.speed >= 1) {
        this.rectangle.alpha = 1;
        this.visible = true;
      }
      else {
        this.rectangle.alpha += this.speed;
      }
    }
  }

  Draw() {
    this.rectangle.Draw();
  }
}
