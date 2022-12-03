function Floors() {
    PIXI.Container.call(this);

    this.pool = new ObjectPool();
    this.createLookupTables();

    this.slices = [];

    //this.createTestMap();

    // Store viewports current x-position
    this.viewportX = 0;
    this.viewportSliceX = 0;
}

Floors.prototype = Object.create(PIXI.Container.prototype);

// Width of viewport
Floors.VIEWPORT_WIDTH = 928;
// Determines how many floor slices can be shown at a time
Floors.VIEWPORT_NUM_SLICES = Math.ceil(Floors.VIEWPORT_WIDTH / FloorSlice.WIDTH) + 1;

Floors.prototype.setViewportX = function (viewportX) {
};

Floors.prototype.addSlice = function (sliceType, y) {
    var slice = new FloorSlice(sliceType, y);
    this.slices.push(slice);
};

Floors.prototype.createLookupTables = function () {
    // Holds reference to each of our object pools borrow methods
    this.borrowFloorSpriteLookup = [];
    this.borrowFloorSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
    this.borrowFloorSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
    this.borrowFloorSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
    this.borrowFloorSpriteLookup[SliceType.FLAT] = this.pool.borrowFlat;
    this.borrowFloorSpriteLookup[SliceType.FLOOR] = this.pool.borrowFloor;

    // Holds reference to each of the return methods
    this.returnFloorSpriteLookup = [];
    this.returnFloorSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
    this.returnFloorSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
    this.returnFloorSpriteLookup[SliceType.STEP] = this.pool.returnStep;
    this.returnFloorSpriteLookup[SliceType.FLAT] = this.pool.returnFlat;
    this.returnFloorSpriteLookup[SliceType.FLOOR] = this.pool.returnFloor;
};

// Take wall slice type and return a sprite of that type from the object pool
Floors.prototype.borrowFloorSprite = function (sliceType) {
    return this.borrowFloorSpriteLookup[sliceType].call(this.pool);
};

// Take an object and return it to the object pool
Floors.prototype.returnFloorSprite = function (sliceType, sliceSprite) {
    return this.returnFloorSpriteLookup[sliceType].call(this.pool, sliceSprite);
};

Floors.prototype.createTestFloorSpan = function () {
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
    this.addSlice(SliceType.FLOOR, 192);
    this.addSlice(SliceType.FLAT, 192);
    this.addSlice(SliceType.STEP, 256);
    this.addSlice(SliceType.FLOOR, 256);
    this.addSlice(SliceType.BACK, 256);
};

Floors.prototype.createTestGap = function () {
    this.addSlice(SliceType.GAP);
};

Floors.prototype.createTestMap = function () {
    for (var i = 0; i < 10; i++) {
        this.createTestFloorSpan();
        this.createTestGap();
        this.createTestSteppedFloorSpan();
        this.createTestGap();
    }
};