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
  }

  Update(deltaTime) {
    var deltaTimeS = deltaTime / 1000;
    if (keyList.indexOf(39) != -1 && keyList.indexOf(37) == -1) {
      if (this.facingRight == false) {
        this.object.scale.x = 0.25;
        this.object.x -= this.texture1.width * 0.25;
        this.facingRight = true;
      }
      this.velocityX = 2.5;
    }
    if (keyList.indexOf(37) != -1 && keyList.indexOf(39) == -1) {
      if (this.facingRight == true) {
        this.object.scale.x = -0.25;
        this.object.x += this.texture1.width * 0.25;
        this.facingRight = false;
      }
      this.velocityX = -2.5;
    }
    if (keyList.indexOf(37) == -1 && keyList.indexOf(39) == -1 || keyList.indexOf(37) != -1 && keyList.indexOf(39) != -1) {
      this.velocityX = 0;
    }

    if (keyList.indexOf(32) != -1 ) {
      this.velocityY += 9.8 * deltaTimeS;
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
