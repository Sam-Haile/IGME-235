function ObjectPool() {
    this.createFloors();
    this.createFlats();
    this.createFrontEdges();
    this.createBackEdges();
    this.createSteps();
}


// Shuffle the array after populating it
ObjectPool.prototype.shuffle = function (array) {

    var len = array.length;
    var shuffles = len * 3;
    for (var i = 0; i < shuffles; i++) {
        var floorSlice = array.pop();
        var pos = Math.floor(Math.random() * (len - 1));
        array.splice(pos, 0, floorSlice);
    }
};


// Methods below provide a way to obtain a floor sprite from the object pool,
// and insert it back into the end of the floor array

// Remove floor sprite from the pool and return a reference to use
ObjectPool.prototype.borrowFloor = function () {
    return this.floors.shift();
};

ObjectPool.prototype.returnFloor = function (sprite) {
    this.floors.push(sprite);
};

ObjectPool.prototype.borrowFlat = function () {
    return this.flats.shift();
};

ObjectPool.prototype.returnFlat = function (sprite) {
    this.flats.push(sprite);
};

ObjectPool.prototype.borrowFrontEdge = function () {
    return this.frontEdges.shift();
};

ObjectPool.prototype.returnFrontEdge = function (sprite) {
    this.frontEdges.push(sprite);
};

ObjectPool.prototype.borrowBackEdge = function () {
    return this.backEdges.shift();
};

ObjectPool.prototype.returnBackEdge = function (sprite) {
    this.backEdges.push(sprite);
};
ObjectPool.prototype.borrowStep = function () {
    return this.steps.shift();
};

ObjectPool.prototype.returnStep = function (sprite) {
    this.steps.push(sprite);
};




// Add X amount of sprites into the object pool
ObjectPool.prototype.createFlats = function () {
    this.flats = [];
    this.addFlatSprites(6, "flat_01");
    this.addFlatSprites(6, "flat_02");
    this.addFlatSprites(6, "flat_03");

    // Randomly place the sprites
    this.shuffle(this.flats);
};

ObjectPool.prototype.createFloors = function () {
    this.floors = [];
    this.addFloorSprites(6, "floor_01");
    this.addFloorSprites(6, "floor_02");

    // Randomly place the sprites
    this.shuffle(this.floors);
};

ObjectPool.prototype.createFrontEdges = function () {
    this.frontEdges = [];
    this.addFrontEdgeSprites(2, "edge_01");
    this.addFrontEdgeSprites(2, "edge_02");

    // Randomly place the sprites
    this.shuffle(this.frontEdges);
};

ObjectPool.prototype.createBackEdges = function () {
    this.backEdges = [];
    this.addBackEdgeSprites(2, "edge_01");
    this.addBackEdgeSprites(2, "edge_02");

    // Randomly place the sprites
    this.shuffle(this.backEdges);
};

ObjectPool.prototype.createSteps = function () {
    this.steps = [];
    this.addStepSprites(2, "step_01");
};



// ADDING TO OBJECT POOL
ObjectPool.prototype.addFloorSprites = function (amount, frameId) {
    for (var i = 0; i < amount; i++) {
        var sprite = PIXI.Sprite.fromFrame(frameId);
        this.floors.push(sprite);
    }
};

ObjectPool.prototype.addFlatSprites = function (amount, frameId) {
    for (var i = 0; i < amount; i++) {
        var sprite = new PIXI.Sprite.fromFrame(frameId);
        this.flats.push(sprite);
    }
};


ObjectPool.prototype.addFrontEdgeSprites = function (amount, frameId) {
    for (var i = 0; i < amount; i++) {
        var sprite = new PIXI.Sprite.fromFrame(frameId);
        this.frontEdges.push(sprite);
    }
};

ObjectPool.prototype.addBackEdgeSprites = function (amount, frameId) {
    for (var i = 0; i < amount; i++) {
        var sprite = new PIXI.Sprite.fromFrame(frameId);
        // Flip sprite to align
        sprite.anchor.x = 1;
        sprite.scale.x = -1;
        this.backEdges.push(sprite);
    }
};

ObjectPool.prototype.addStepSprites = function (amount, frameId) {
    for (var i = 0; i < amount; i++) {
        var sprite = new PIXI.Sprite.fromFrame(frameId);
        sprite.anchor.y = 0.25;
        this.steps.push(sprite);
    }
};