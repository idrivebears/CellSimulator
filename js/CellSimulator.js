/*
    Project todo list:
    - Abstract cells into their own class
    - Make cell automata for movement and cell life
    - Make cell DNA mutation system
    - Make cell reproduction system (adding elements to the cell group might be a bit hard)
    - Make white blood cell automata for movement and cell life
    - Make DNA mutation searcher
    - Implement Bone Marrow (white blood cell creator)
    - Implement cell killing (removing from cell group, might be a bit tricky)
*/
var SimulatorState = function(game) {

};

SimulatorState.prototype.preload = function() {
    this.game.load.image('background', 'assets/bg.png');
    this.game.load.spritesheet('commoncell', 'assets/CommonCell2_Sprite.png', 64, 64);
    this.game.load.spritesheet('whitebloodcell', 'assets/CommonCell_Sprite.png', 64, 64);

    var cursors;
    var background;
    var cells;

};

SimulatorState.prototype.create = function() {

    var testCell = new CommonCell(32,32, "teststringdna", this.game);

    // Enable aracde physics for this.game
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Add background sprite to this.game instance
    background = this.game.add.sprite(0, 0, 'background');

    // Create some cells
    cells = this.game.add.group();

    //  We will enable physics for any cell in the group
    cells.enableBody = true;

    var numberOfCells = 40;
    for (var i = 0; i < numberOfCells; i++)
    {
        //  Create a cell inside of the 'cells' group
        var tempCell = cells.create(i * this.game.width / numberOfCells, i * this.game.height/numberOfCells, 'commoncell');

        //  Add gravity
        tempCell.body.gravity.y = 0;
        //  This just gives each star a slightly random bounce value
        tempCell.body.bounce.y = 0.7 + Math.random() * 0.2;
        tempCell.body.bounce.x = 0.7 + Math.random() * 0.2;
        tempCell.body.collideWorldBounds = true;
        tempCell.body.velocity.x = 100 * Math.random();
        tempCell.body.velocity.y = 100 * Math.random();
        tempCell.animations.add('idle');
        tempCell.animations.play('idle', 10, true);
        tempCell.body.height = 35;
        tempCell.body.width = 35;
    }

    cursors = this.game.input.keyboard.createCursorKeys();

};

SimulatorState.prototype.update = function() {

    //Add collision between cells and other cells
    this.game.physics.arcade.collide(cells, cells);
    //this.game.physics.arcade.overlap(cells, cells, cellCollision, null, this);

    //Camera Movements
    if (cursors.left.isDown)
    {
        this.game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        this.game.camera.x += 4;
    }
    else if (cursors.up.isDown)
    {
        this.game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        this.game.camera.y += 4;
    }

    //Call cell update function
    //Call white blood cell update function
};

//Create new game with the simulator starting state
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('simulator', SimulatorState, true);
