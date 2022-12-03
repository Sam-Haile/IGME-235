function Scroller(stage) {
	
	this.layer1 = new Layer1();
	stage.addChild(this.layer1);
	
	this.layer2 = new Layer2();
	stage.addChild(this.layer2);

	this.layer3 = new Layer3();
	stage.addChild(this.layer3);
	
	this.layer4 = new Layer4();
	stage.addChild(this.layer4);
	
	this.front = new Walls();	
	stage.addChild(this.front);

	this.mapBuilder = new MapBuilder(this.front);
	this.viewportX = 0;
}

Scroller.prototype.setViewportX = function(viewportX) {
	this.viewportX = viewportX;

	this.layer1.setViewportX(viewportX);
	this.layer2.setViewportX(viewportX);
	this.layer3.setViewportX(viewportX);
	this.layer4.setViewportX(viewportX);
	this.front.setViewportX(viewportX);
};

Scroller.prototype.getViewportX = function() {
	return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(units) {
	var newViewportX = this.viewportX + units;
	this.setViewportX(newViewportX);
};
