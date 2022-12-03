function Scroller(stage) {
	this.layer0 = new Layer0();
	stage.addChild(this.layer0);

	
	this.layer4 = new Layer4();
	stage.addChild(this.layer4);
	this.layer2 = new Layer2();
	stage.addChild(this.layer2);
	
	this.layer3 = new Layer3();
	stage.addChild(this.layer3);
	
	this.layer1 = new Layer1();
	stage.addChild(this.layer1);
	/*
	this.layer5 = new Layer5();
	stage.addChild(this.layer5);
	
	this.layer6 = new Layer6();
	stage.addChild(this.layer6);
	
	this.layer7 = new Layer7();
	stage.addChild(this.layer7);
	
	
	this.layer8 = new Layer8();
	stage.addChild(this.layer8);
	
	this.layer9 = new Layer9();
	stage.addChild(this.layer9);
	*/

	
	this.front = new Walls();
	stage.addChild(this.front);
	this.mapBuilder = new MapBuilder(this.front);


	this.viewportX = 0;
}

Scroller.prototype.setViewportX = function(viewportX) {
	this.viewportX = viewportX;
	this.layer2.setViewportX(viewportX);
	this.layer3.setViewportX(viewportX);
	this.layer4.setViewportX(viewportX);
	/*
	this.layer5.setViewportX(viewportX);
	this.layer6.setViewportX(viewportX);
	this.layer7.setViewportX(viewportX);
	this.layer8.setViewportX(viewportX);
	this.layer9.setViewportX(viewportX);*/
	this.front.setViewportX(viewportX);
};

Scroller.prototype.getViewportX = function() {
	return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(units) {
	var newViewportX = this.viewportX + units;
	this.setViewportX(newViewportX);
};
