function Layer6() {
	var texture = PIXI.Texture.fromImage("resources/layer6.png");
	PIXI.extras.TilingSprite.call(this, texture, 928, 793);

	this.position.x = 0;
	this.position.y = 0;
	this.tilePosition.x = 0;
	this.tilePosition.y = 700;

	this.viewportX = 0;
}

Layer6.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Layer6.DELTA_X = 0.25;

Layer6.prototype.setViewportX = function(newViewportX) {
	var distanceTravelled = newViewportX - this.viewportX;
	this.viewportX = newViewportX;
	this.tilePosition.x -= (distanceTravelled * Layer6.DELTA_X);
};