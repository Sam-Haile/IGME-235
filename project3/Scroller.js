function Scroller(stage) {
    this.front = new Floors();
    stage.addChild(this.front);

	this.viewportX = 0;
}

