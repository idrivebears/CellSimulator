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


(function () {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    function preload() {

        game.load.image('background', 'assets/bg.png');
        game.load.spritesheet('commoncell', 'assets/CommonCell2_Sprite.png', 64, 64);
        game.load.spritesheet('whitebloodcell', 'assets/CommonCell_Sprite.png', 64, 64);
    }

    var cursors;
    var background;
    var cells;

    function create() {

        var testCell = new CommonCell(32,32, "teststringdna");

        // Enable aracde physics for game
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Add background sprite to game instance
        background = game.add.sprite(0, 0, 'background');

        // Create some cells
        cells = game.add.group();

        //  We will enable physics for any star that is created in this group
        cells.enableBody = true;

        var numberOfCells = 40;
        for (var i = 0; i < numberOfCells; i++)
        {
            //  Create a star inside of the 'cells' group
            var tempCell = cells.create(i * game.width / numberOfCells, i * game.height/numberOfCells, 'commoncell');

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

        cursors = game.input.keyboard.createCursorKeys();

    }

    function update() {

        //Add collision between cells and other cells
        game.physics.arcade.collide(cells, cells);
        //game.physics.arcade.overlap(cells, cells, cellCollision, null, this);

        //Camera Movements
        if (cursors.left.isDown)
        {
            game.camera.x -= 4;
        }
        else if (cursors.right.isDown)
        {
            game.camera.x += 4;
        }
        else if (cursors.up.isDown)
        {
            game.camera.y -= 4;
        }
        else if (cursors.down.isDown)
        {
            game.camera.y += 4;
        }

        //Call cell update function
        //Call white blood cell update function
    }
})();
