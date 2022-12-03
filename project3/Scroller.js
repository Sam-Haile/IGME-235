function Scroller(stage) {
    this.front = new Floors();
    stage.addChild(this.front);

    this.viewportX = 0;
    this.setViewportX();
}

Scroller.prototype.setViewportX = function (viewportX) {
    this.viewportX = viewportX;
    this.front.setViewportX(viewportX);
    console.log("Floors::setViewportX( " + viewportX + ");");

    var maxViewportX = (this.slices.length - Floors.VIEWPORT_NUM_SLICES) *
        FloorSlice.WIDTH;
    if (viewportX < 0) {
        viewportX = 0;
    }
    else if (viewportX >= maxViewportX) {
        viewportX = maxViewportX;
    }
    this.viewportX = viewportX;

};

Scroller.prototype.moveViewportXBy = function (units) {
    var newViewportX = this.viewportX + units;
    this.setViewportX(newViewportX);
};
