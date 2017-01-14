class Player {
  constructor(positionParam) {
    this.texture = PIXI.Texture.fromImage("content/pigeon.png");
    this.object = new PIXI.Sprite(this.texture);
    this.object.x = positionParam.x;
    this.object.y = positionParam.y;
    this.object.scale.x = 0.33;
    this.object.scale.y = 0.33;
    stage.addChildAt(this.object, 0);

    this.velocityX = 0;
    this.velocityY = 0;
  }

  Update(deltaTime) {
    if (keyList.indexOf(39) != -1 && keyList.indexOf(37) == -1) {
      this.velocityX = 1;
    }
    if (keyList.indexOf(37) != -1 && keyList.indexOf(39) == -1) {
      this.velocityX = -1;
    }
    if (keyList.indexOf(37) == -1 && keyList.indexOf(39) == -1 || keyList.indexOf(37) != -1 && keyList.indexOf(39) != -1) {
      this.velocityX = 0;
    }

    this.object.x += this.velocityX;
    this.object.y += this.velocityY;
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
