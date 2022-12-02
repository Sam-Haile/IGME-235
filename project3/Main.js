function init() {
    stage = new PIXI.Container();
    renderer = PIXI.autoDetectRenderer(
        928,
        793,
        { view: document.getElementById("game-canvas") }
    );
    this.loadSpriteSheet();
}

function update() {

    // Call update method and move at specified speed
    layer2.update(.3);
    layer3.update(.4);
    layer4.update(.5);
    layer5.update(.6);
    layer6.update(.8);
    layer7.update(.8);
    layer8.update(.8);
    layer9.update(.9);
    light.update(.8);
    light2.update(.6);

    renderer.render(stage);
    requestAnimationFrame(update);
}

loadSpriteSheet = function () {
    var loader = PIXI.loader;
    loader.add("wall", "resources/wall.json");
    loader.once("complete", this.spriteSheetLoaded.bind(this));
    loader.load();
};


spriteSheetLoaded = function () {

    // Get layers for the panning screen
    var layer0Img = PIXI.Texture.fromImage("resources/layer0.png");
    var layer1Img = PIXI.Texture.fromImage("resources/layer1.png");
    var layer2Img = PIXI.Texture.fromImage("resources/layer2.png");
    var layer3Img = PIXI.Texture.fromImage("resources/layer3.png");
    var layer4Img = PIXI.Texture.fromImage("resources/layer4.png");
    var layer5Img = PIXI.Texture.fromImage("resources/layer5.png");
    var layer6Img = PIXI.Texture.fromImage("resources/layer6.png");
    var layer7Img = PIXI.Texture.fromImage("resources/layer7.png");
    var layer8Img = PIXI.Texture.fromImage("resources/layer8.png");
    var layer9Img = PIXI.Texture.fromImage("resources/layer9.png");
    var lightImg = PIXI.Texture.fromImage("resources/light.png");
    var light2Img = PIXI.Texture.fromImage("resources/light2.png");

    // Displaying panning layers to screen
    layer0 = new Background(layer0Img);
    layer1 = new Background(layer1Img);
    layer2 = new Background(layer2Img);
    layer3 = new Background(layer3Img);
    light2  = new Background(light2Img);
    layer4 = new Background(layer4Img);
    layer5 = new Background(layer5Img);
    layer6 = new Background(layer6Img);
    light  = new Background(lightImg);
    layer7 = new Background(layer7Img);
    layer8 = new Background(layer8Img);
    layer9 = new Background(layer9Img);

    this.scroller = new Scroller(this.stage);
    requestAnimationFrame(update);
};

// Obtain num of floors from pool and add them to stage
borrowFloorSprites = function (num) {
    for (var i = 0; i < num; i++) {
        if (i % 2 == 0) {
            var sprite = this.pool.borrowFloor();
        } else {
            var sprite = this.pool.borrowFlat();
        }
        sprite.position.x = -32 + (i * 64);
        sprite.position.y = 128;

        this.floorSlices.push(sprite);

        this.stage.addChild(sprite);
    }
};

// Remove floor sprite that was added to stage
// and return it to object pool
returnFloorSprites = function () {
    for (var i = 0; i < this.floorSlices.length; i++) {
        var sprite = this.floorSlices[i];
        this.stage.removeChild(sprite);
        if (i % 2 == 0) {
            this.pool.returnFloor(sprite);
        } else {
            this.pool.returnFlat(sprite);
        }
    }

    this.floorSlices = [];
};









/*
generateTestFloorSpan = function () {
    var lookupTable = [
        this.pool.borrowFrontEdge,  // 1st slice
        this.pool.borrowFloor,      // 2nd slice
        this.pool.borrowFlat,       // 3rd slice
        this.pool.borrowStep,       // 4th slice
        this.pool.borrowFloor,      // 5th slice
        this.pool.borrowBackEdge    // 6th slice
    ];

    var yPos = [
        128, // 1st slice
        128, // 2nd slice
        128, // 3rd slice
        192, // 4th slice
        192, // 5th slice
        192  // 6th slice
    ];

    for (var i = 0; i < lookupTable.length; i++) {
        var func = lookupTable[i];

        var sprite = func.call(this.pool);
        sprite.position.x = 64 + (i * 64);
        sprite.position.y = yPos[i];

        this.floorSlices.push(sprite);

        this.stage.addChild(sprite);
    }

}

clearTestFloorSpan = function () {
    var lookupTable = [
        this.pool.returnFrontEdge,  // 1st slice
        this.pool.returnFloor,     // 2nd slice
        this.pool.returnFlat, // 3rd slice
        this.pool.returnStep,       // 4th slice
        this.pool.returnFloor,     // 5th slice
        this.pool.returnBackEdge    // 6th slice
    ];

    for (var i = 0; i < lookupTable.length; i++) {
        var func = lookupTable[i];
        var sprite = this.floorSlices[i];

        this.stage.removeChild(sprite);
        func.call(this.pool, sprite);
    }

    this.floorSlices = [];
};*/