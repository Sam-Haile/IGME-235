function Background(texture) {

    PIXI.extras.TilingSprite.call(this, texture, 928, 793);

    this.position.x = 0;
    this.position.y = 0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    stage.addChild(this);
}

Background.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Background.prototype.update = function(scrollspeed) {
    this.tilePosition.x -= scrollspeed;
  };
