function Layer1() {
	var texture = PIXI.Texture.fromImage("resources/layer1.png");
	PIXI.extras.TilingSprite.call(this, texture, 928, 793);

	this.position.x = 0;
	this.position.y = 0;
	this.tilePosition.x = 0;
	this.tilePosition.y = 20;

	this.viewportX = 0;
}

Layer1.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Layer1.DELTA_X = 0.024;

Layer1.prototype.setViewportX = function(newViewportX) {
	var distanceTravelled = newViewportX - this.viewportX;
	this.viewportX = newViewportX;
	this.tilePosition.x -= (distanceTravelled * Layer1.DELTA_X);
};