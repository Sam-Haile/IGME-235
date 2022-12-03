function Layer3() {
	var texture = PIXI.Texture.fromImage("resources/layer3.png");
	PIXI.extras.TilingSprite.call(this, texture, 928, 793);

	this.position.x = 0;
	this.position.y = 0;
	this.tilePosition.x = 0;
	this.tilePosition.y = 20;

	this.viewportX = 0;
}

Layer3.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Layer3.DELTA_X = 0.100;

Layer3.prototype.setViewportX = function(newViewportX) {
	var distanceTravelled = newViewportX - this.viewportX;
	this.viewportX = newViewportX;
	this.tilePosition.x -= (distanceTravelled * Layer3.DELTA_X);
};