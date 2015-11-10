(function () {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    function preload() {

        game.load.image('background', 'assets/bg.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('commoncell', 'assets/CommonCell_Sprite.png', 64, 52);
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

        for (var i = 0; i < 6; i++)
        {
            //  Create a star inside of the 'cells' group
            var tempCell = cells.create(i * game.width / 6, 0, 'commoncell');

            //  Add gravity
            tempCell.body.gravity.y = 300;
            //  This just gives each star a slightly random bounce value
            tempCell.body.bounce.y = 0.7 + Math.random() * 0.2;
            tempCell.body.bounce.y = 0.7 + Math.random() * 0.2;
            tempCell.body.collideWorldBounds = true;
            tempCell.animations.add('idle');
            tempCell.animations.play('idle', 10, true);
        }

        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        cursors = game.input.keyboard.createCursorKeys();

    }

    function update() {

        //Add collision between cells and platforms
        game.physics.arcade.collide(cells, cells);

        if (cursors.left.isDown)
        {

        }
        else if (cursors.right.isDown)
        {

        }
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown /*&& player.body.touching.down*/)
        {

        }

    }
})();
