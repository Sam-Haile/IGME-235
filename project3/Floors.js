function Floors() {
    PIXI.Container.call(this);

    this.pool = new ObjectPool();
    this.createLookupTables();

    // Array of pieces that make up the platformers
    this.slices = [];
    this.createTestMap();

    this.viewportX = 0;
    this.viewportSliceX = 0;
}

Floors.prototype = Object.create(PIXI.Container.prototype);

Floors.VIEWPORT_WIDTH = 928;
Floors.VIEWPORT_NUM_SLICES = Math.ceil(Floors.VIEWPORT_WIDTH / FloorSlice.WIDTH) + 1;

Floors.prototype.setViewportX = function (viewportX) {
    this.viewportX = this.checkViewportXBounds(viewportX);

    // Store the previous index position 
    var prevViewportSliceX = this.viewportSliceX;

    // Calculate the index position of the slice that will come within the viewport
    this.viewportSliceX = Math.floor(this.viewportX/WallSlice.WIDTH);

};

Floors.prototype.checkViewportXBounds = function (viewportX) {
    var maxViewportX = (this.slices.length - Floors.VIEWPORT_NUM_SLICES) *
        FloorSlice.WIDTH;
    if (viewportX < 0) {
        viewportX = 0;
    }
    else if (viewportX > maxViewportX) {
        viewportX = maxViewportX;
    }

    return viewportX;
};




Floors.prototype.addSlice = function (sliceType, y) {
    var slice = new FloorSlice(sliceType, y);
    this.slices.push(slice);
};

Floors.prototype.createLookupTables = function () {
    this.borrowFloorSpriteLookup = [];
    this.borrowFloorSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
    this.borrowFloorSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
    this.borrowFloorSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
    this.borrowFloorSpriteLookup[SliceType.FLAT] = this.pool.borrowFlat;
    this.borrowFloorSpriteLookup[SliceType.FLOOR] = this.pool.borrowFloor;

    this.returnFloorSpriteLookup = [];
    this.returnFloorSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
    this.returnFloorSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
    this.returnFloorSpriteLookup[SliceType.STEP] = this.pool.returnStep;
    this.returnFloorSpriteLookup[SliceType.FLAT] = this.pool.returnFlat;
    this.returnFloorSpriteLookup[SliceType.FLOOR] = this.pool.returnFloor;
};

Floors.prototype.borrowFloorSprite = function (sliceType) {
    return this.borrowFloorSpriteLookup[sliceType].call(this.pool);
};

Floors.prototype.returnFloorSprite = function (sliceType, sliceSprite) {
    return this.returnFloorSpriteLookup[sliceType].call(this.pool, sliceSprite);
};

Floors.prototype.createTestWallSpan = function () {
    this.addSlice(SliceType.FRONT, 192);
    this.addSlice(SliceType.FLOOR, 192);
    this.addSlice(SliceType.FLAT, 192);
    this.addSlice(SliceType.FLOOR, 192);
    this.addSlice(SliceType.FLAT, 192);
    this.addSlice(SliceType.FLOOR, 192);
    this.addSlice(SliceType.FLAT, 192);
    this.addSlice(SliceType.FLOOR, 192);
    this.addSlice(SliceType.BACK, 192);
};

Floors.prototype.createTestSteppedFloorSpan = function () {
    this.addSlice(SliceType.FRONT, 192);
    this.addSlice(SliceType.FLAT, 192);
    this.addSlice(SliceType.FLOOR, 192);
    this.addSlice(SliceType.STEP, 256);
    this.addSlice(SliceType.FLAT, 256);
    this.addSlice(SliceType.BACK, 256);
};

Floors.prototype.createTestGap = function () {
    this.addSlice(SliceType.GAP);
};

Floors.prototype.createTestMap = function () {
    for (var i = 0; i < 10; i++) {
        this.createTestWallSpan();
        this.createTestGap();
        this.createTestSteppedFloorSpan();
        this.createTestGap();
    }
};