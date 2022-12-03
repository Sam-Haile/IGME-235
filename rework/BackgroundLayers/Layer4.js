function Layer4() {
	var texture = PIXI.Texture.fromImage("resources/layer4.png");
	PIXI.extras.TilingSprite.call(this, texture, 928, 793);

	this.position.x = 0;
	this.position.y = 0;
	this.tilePosition.x = 0;
	this.tilePosition.y = 20;

	this.viewportX = 0;
}

Layer4.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Layer4.DELTA_X = 0.15;

Layer4.prototype.setViewportX = function(newViewportX) {
	var distanceTravelled = newViewportX - this.viewportX;
	this.viewportX = newViewportX;
	this.tilePosition.x -= (distanceTravelled * Layer4.DELTA_X);
};