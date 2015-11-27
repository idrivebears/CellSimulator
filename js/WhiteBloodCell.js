/*
    WhiteBloodCell class
*/

var WB_STATES = {
    BORN : {value: 0, name: "BORN"},
    SEARCH_SICKNESS : {value: 1, name: "SEARHC_SICKNESS"},
    DEATH: {value: 2, name:"DEATH"}
};

function WhiteBloodCell(game, x, y, sicknessIndicator) {
    Phaser.Sprite.call(this, game, x, y, 'whitebloodcell');
    this.x = x;
    this.y = y;
    this.sicknessIndicator = sicknessIndicator;
    this.currentState = WB_STATES.BORN;

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.gravity.y = 0;
    this.body.bounce.x = 0.7;
    this.body.bounce.y = 0.7;
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

WhiteBloodCell.prototype.secondElapsed = function() {
    if(this.game.rnd.integerInRange(0,100)%2 === 0) {
        this.body.velocity.y = this.body.velocity.y + this.game.rnd.integerInRange(-20, 20);
        this.body.velocity.x = this.body.velocity.x + this.game.rnd.integerInRange(-20, 20);
    }
};

WhiteBloodCell.prototype.checkCollidedCell = function(commonCell) {
    //if(commonCell.DNA)
};
