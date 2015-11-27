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
    this.hunger = 1;

    this.body.gravity.y = 0;
    this.body.bounce.x = 1.0;
    this.body.bounce.y = 1.0;
    this.body.collideWorldBounds = true;
    this.body.velocity.x = Math.random() * 100;
    this.body.velocity.y = Math.random() * 100;
    this.animations.add('idle');
    this.animations.play('idle', 10, true);
    
    this.body.height = 35;
    this.body.width = 35;

    this.alive = true;
    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.events.onInputDown.add(this.onDown, this);
    //this.inputEnabled = true;
    //this.input.enableDrag();

    if(DEBUG == true) {
        style = {font: "10px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: this.width, align: "center" };
        this.text = game.add.text(x, y, this.DNA, style);    
    }
    
};

CommonCell.prototype = Object.create(Phaser.Sprite.prototype);
CommonCell.prototype.constructor = CommonCell;

CommonCell.prototype.onDown=function(cell, cursor){
    var style = { font: "12px Courier", fill: "#000000", wordWrap: true, wordWrapWidth: this.width, align: "center" };
   
    this.completionSprite = game.add.graphics( 0, 0 );
    this.completionSprite.beginFill(0xE1E1EA, 1);
    this.completionSprite.bounds = new PIXI.Rectangle(0, 0, 200, 200);
    this.completionSprite.drawRect(0, 0, 200, 200);
    
     this.text = game.add.text(45, 15, "Cell Stats:", style);
    this.text.anchor.set(0.5);
   

   
}

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
        this.currentState = CC_STATES.SEARCH_FOOD;
    }

    else if(this.currentState == CC_STATES.SEARCH_FOOD) {
        if(this.hunger <= 1) {
            this.currentState = CC_STATES.SEARCH_MATE;
        }
    }

    else if(this.currentState == CC_STATES.SEARCH_MATE) {
        // set search mate on
    }

    else if(this.currentState == CC_STATES.DEATH) {
        // set death animation
    }


    
};

CommonCell.prototype.secondElapsed = function() {
    this.hunger += 2;
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

CommonCell.prototype.checkCollidedProtein = function(protein) {
    this.hunger -= protein.proteinValue;
    protein.kill();
};
