/*
    CommonCell class
*/

var CC_STATES = {
    BORN : {value: 0, name: "BORN"},
    SEARCH_FOOD : {value: 1, name: "SEARCH_FOOD"},
    SEARCH_MATE : {value: 3, name: "SEARCH_MATE"},
    DEATH: {value: 4, name:"DEATH"}
};

function CommonCell(game, x, y, parentDNA) {
    Phaser.Sprite.call(this, game, x, y, 'commoncell');
    this.DNA = parentDNA;
    this.DNA = this.mutateDNA();
    this.currentState = CC_STATES.BORN;

    game.physics.enable(this, Phaser.Physics.ARCADE);

    //how hungry the cell is, if it gets to 100, the cell dies.
    this.hunger = 10;

    this.body.gravity.y = 0;
    this.body.bounce.x = 1.0;
    this.body.bounce.y = 1.0;
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 10;
    this.body.velocity.y = 10;
    this.animations.add('idle');
    this.animations.play('idle', 10, true);
    this.body.height = 35;
    this.body.width = 35;
    this.alive = true;
    //this.inputEnabled = true;
    //this.input.enableDrag();

    if(DEBUG == true) {
        style = {font: "10px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: this.width, align: "center" };
        this.text = game.add.text(x, y, this.DNA, style);    
    }
    
};

CommonCell.prototype = Object.create(Phaser.Sprite.prototype);
CommonCell.prototype.constructor = CommonCell;

CommonCell.prototype.moveCell = function() {

};

CommonCell.prototype.updateCell = function() {
    this.moveCell();

    if(DEBUG == true)
    {
        this.text.x = this.body.x;
        this.text.y = this.body.y;    
    }

    // Update cell states

    if(this.currentState == CC_STATES.BORN) {
        // set animation
    }

    else if(this.currentState == CC_STATES.SEARCH_FOOD) {
        // set search food on
    }

    else if(this.currentState == CC_STATES.SEARCH_MATE) {
        // set search mate on
    }

    else if(this.currentState == CC_STATES.DEATH) {
        // set death animation
    }


    
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
