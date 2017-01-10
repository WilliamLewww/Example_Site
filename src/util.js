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

    graphics.beginFill(this.color, this.alpha);
    graphics.drawRect(this.position.x, this.position.y, this.size.x, this.size.y);
    graphics.endFill();
  }
}
