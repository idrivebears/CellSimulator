/*
    CommonCell class
*/

var CC_STATES = {
    BORN : {value: 0, name: "BORN"},
    SEARCH_FOOD : {value: 1, name: "SEARCH_FOOD"},
    SEARCH_WATER : {value: 2, name: "SEARCH_WATER"},
    SEARCH_MATE : {value: 3, name: "SEARCH_MATE"},
    DEATH: {value: 4, name:"DEATH"}
};

function CommonCell(game, x, y, parentDNA) {
    Phaser.Sprite.call(this, game, x, y, 'commoncell');
    this.x = x;
    this.y = y;
    this.DNA = parentDNA;
    this.DNA = this.mutateDNA();
    this.currentState = CC_STATES.BORN;

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
    //this.inputEnabled = true;
    //this.input.enableDrag();

    style = {font: "10px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: this.width, align: "center" };

    text = game.add.text(x, y, this.DNA, style);
};

CommonCell.prototype = Object.create(Phaser.Sprite.prototype);
CommonCell.prototype.constructor = CommonCell;

CommonCell.prototype.moveCell = function() {

};

CommonCell.prototype.updateCell = function() {
    this.moveCell();

    text.x = this.x;
    text.y = this.y;

};

CommonCell.prototype.mutateDNA = function() {
    var result = "";
    for(var i = 0; i < this.DNA.length; i++)
    {
        result += this.DNA[i];
        //Mutate based on probability
    }
    return result;
};
