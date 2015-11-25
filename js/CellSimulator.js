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
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('commoncell', 'assets/CommonCell2_Sprite.png', 64, 64);
        game.load.spritesheet('whitebloodcell', 'assets/CommonCell_Sprite.png', 64, 64);
    }

    var player;
    var platforms;
    var cursors;
    var background;

    var cells;
    var score = 0;
    var scoreText;

    function create() {
        // Enable aracde physics for game
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Add background sprite to game instance
        background = game.add.sprite(0, 0, 'background');



        // Create some cells
        cells = game.add.group();
        //  We will enable physics for any star that is created in this group
        cells.enableBody = true;

        var numberOfCells = 150;
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

        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        cursors = game.input.keyboard.createCursorKeys();

    }

    function update() {

        //Add collision between cells and platforms
        game.physics.arcade.collide(cells, cells);
        //game.physics.arcade.overlap(cells, cells, cellCollision, null, this);

        if (cursors.left.isDown)
        {
            //Camera movement
        }
        else if (cursors.right.isDown)
        {
            //camera movement
        }
        else if (cursors.up.isDown)
        {
            //camera movement
        }
        else if (cursors.down.isDown)
        {
            //camera movement
        }
        /*
        for(cell in cells) {
            cell.body.velocity.x += 1.0;
            cell.body.velocity.y += 1.0;
        }*/
    }
})();
