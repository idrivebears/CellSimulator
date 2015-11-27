/*
    ProteinMolecule class
*/

function ProteinMolecule(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'protein');

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.proteinValue = 10;

    this.body.gravity.y = 0;
    this.body.bounce.x = 1.0;
    this.body.bounce.y = 1.0;
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 100 * Math.random();
    this.body.velocity.y = 100 * Math.random();
    this.animations.add('idle');
    this.animations.play('idle', 10, true);
    this.body.height = 38;
    this.body.width = 38;
    this.alive = true;
};

ProteinMolecule.prototype = Object.create(Phaser.Sprite.prototype);
ProteinMolecule.prototype.constructor = ProteinMolecule;


