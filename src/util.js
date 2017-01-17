const SCREENWIDTH = 1920;
const SCREENHEIGHT = 1080;

class Vector2 {
  constructor(pointA, pointB) {
    this.x = pointA;
    this.y = pointB;
  }
}

class Rectangle {
  constructor(positionParam, sizeParam, colorParam, alphaParam) {
    this.position = positionParam;
    this.size = sizeParam;
    this.color = colorParam;
    this.alpha = alphaParam;
  }

  get Top() { return this.position.y; }
  get Bottom() { return this.position.y + this.size.y; }
  get Left() { return this.position.x; }
  get Right() { return this.position.x + this.size.x; }

  Draw() {
    graphics.beginFill(this.color, this.alpha);
    graphics.drawRect(this.position.x, this.position.y, this.size.x, this.size.y);
    graphics.endFill();
  }
}
