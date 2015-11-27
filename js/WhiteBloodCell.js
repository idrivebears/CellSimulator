/*
    WhiteBloodCell class
*/

var WB_STATES = {
    BORN : {value: 0, name: "BORN"},
    SEARCH_SICKNESS : {value: 1, name: "SEARHC_SICKNESS"},
    KILL_MODE : {value: 2, name: "KILL_MODE"},
    DEATH: {value: 3, name:"DEATH"}
};

function WhiteBloodCell(game, x, y, sicknessIndicator) {
    Phaser.Sprite.call(this, game, x, y, 'whitebloodcell');
    this.x = x;
    this.y = y;
    this.sicknessIndicator = sicknessIndicator;
    this.currentState = WB_STATES.BORN;

    this.isKilling = false;

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

    if(this.currentState == WB_STATES.BORN) {
        // do born animation
        this.currentState = WB_STATES.SEARCH_SICKNESS;
    }

    else if(this.currentState == WB_STATES.SEARCH_SICKNESS) {
        if(this.isKilling == true) {
            this.currentState = WB_STATES.KILL_MODE;
        }

    }

    else if(this.currentState == WB_STATES.KILL_MODE) {
        this.tint = 0xF123D1;
    }

    else if(this.currentState == WB_STATES.DEATH) {

    }

};

WhiteBloodCell.prototype.secondElapsed = function() {
    if(this.game.rnd.integerInRange(0,100)%2 === 0) {
        this.body.velocity.y = this.body.velocity.y + this.game.rnd.integerInRange(-20, 20);
        this.body.velocity.x = this.body.velocity.x + this.game.rnd.integerInRange(-20, 20);
    }
};

WhiteBloodCell.prototype.checkCollidedCell = function(commonCell) {
    if(commonCell.currentState == CC_STATES.DEATH) {
        commonCell.kill();
    }
};
