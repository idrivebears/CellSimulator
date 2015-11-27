/*
    ProteinMolecule class
*/

function ProteinMolecule(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'protein');

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.gravity.y = 0;
    this.body.bounce.x = 1.1;
    this.body.bounce.y = 1.1;
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 100 * Math.random();
    this.body.velocity.y = 100 * Math.random();
    this.animations.add('idle');
    this.animations.play('idle', 10, true);
    this.body.height = 35;
    this.body.width = 35;
    this.alive = true;
};

WhiteBloodCell.prototype = Object.create(Phaser.Sprite.prototype);
WhiteBloodCell.prototype.constructor = WhiteBloodCell;

WhiteBloodCell.prototype.moveCell = function() {

};

WhiteBloodCell.prototype.updateCell = function() {
    this.moveCell();
};
