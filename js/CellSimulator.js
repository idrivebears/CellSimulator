/*
    Project todo list:
    - Make cell automata for movement and cell life
    - Make cell DNA mutation system
    - Make cell reproduction system (adding elements to the cell group might be a bit hard)
    - Make white blood cell automata for movement and cell life
    - Make DNA mutation searcher
    - Implement Bone Marrow (white blood cell creator)
    - Implement cell killing (removing from cell group, might be a bit tricky)
*/

var DEBUG = true;

var SimulatorState = function(game) {
    this.commonCells = null;
    this.whiteBloodCells = null;
};

SimulatorState.prototype.preload = function() {
    this.game.load.image('background', 'assets/bg.png');
    this.game.load.spritesheet('commoncell', 'assets/CommonCell2_Sprite.png', 64, 64);
    this.game.load.spritesheet('whitebloodcell', 'assets/WhiteBloodCell_Sprite.png', 64, 64);

};

SimulatorState.prototype.create = function() {

    // Enable aracde physics for game
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Set background to trippy ass dank ass cell type thing
    background = this.game.add.sprite(0, 0, 'background');

    // Create initial common cells
    var startingCells = 50;
    var startingSeed = "abcdefghijklmnop";

    this.commonCells = this.game.add.group();
    this.commonCells.enableBody = true;        //  Enable physics for any cell in the group

    for(var i = 0; i < startingCells; i++) {
        var testCell = new CommonCell(this.game, Math.random()*100, Math.random()*100, startingSeed);
        this.commonCells.add(testCell);
    }

    // Create initial white blood cells
    startingCells = 5;
    var sicknessIndicator = ['z', 'w', 'x', 'y', 'r'];

    this.whiteBloodCells = this.game.add.group();
    this.commonCells.enableBody = true;

    for(var i = 0; i < startingCells; i++) {
        var testWhiteBloodCell = new WhiteBloodCell(this.game, Math.random()*100, Math.random()*100, sicknessIndicator);
        this.whiteBloodCells.add(testWhiteBloodCell);
    }

    cursors = this.game.input.keyboard.createCursorKeys();

    game.time.events.add(Phaser.Timer.SECOND * 1, this.onSecondElapsed, this);

};

SimulatorState.prototype.update = function() {

    //Add collision between cells and other cells
    this.game.physics.arcade.collide(this.commonCells, this.commonCells);
    this.game.physics.arcade.collide(this.commonCells, this.whiteBloodCells);
    this.game.physics.arcade.collide(this.whiteBloodCells, this.whiteBloodCells);
    //this.game.physics.arcade.overlap(cells, cells, cellCollision, null, this);

    //Call cell update function
    this.commonCells.forEachAlive(function(cell){
        cell.updateCell();
    }, this);

    this.whiteBloodCells.forEachAlive(function(whiteBloodCell){
        whiteBloodCell.updateCell();
    }, this);

    //Call white blood cell update function
};

SimulatorState.prototype.onSecondElapsed = function() {
    this.commonCells.forEachAlive(function(cell){
        cell.secondElapsed();
    }, this);

    this.whiteBloodCells.forEachAlive(function(whiteBloodCell){
        whiteBloodCell.secondElapsed();
    }, this);

    this.game.time.events.add(Phaser.Timer.SECOND * 1, onSecondElapsed, this);
}

//Create new game with the simulator starting state
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('simulator', SimulatorState, true);
