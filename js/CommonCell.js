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
    this.game = game;
    this.DNA = parentDNA;
    this.DNA = this.mutateDNA();
    this.currentState = CC_STATES.BORN;

    game.physics.enable(this, Phaser.Physics.ARCADE);

    //how hungry the cell is, if it gets to 100, the cell dies.
    this.hunger = 1;
    this.mated = false;

    this.isSelected = false;
    this.selectionRectangle = game.add.graphics(this.body.x, this.body.y);

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
    //Phaser.Sprite.call(this,game,x,y, 'ui');
    var style = { font: "12px Arial", fill: "#FFFFFF", wordWrap: false, wordWrapWidth: this.width, align: "left" };
   
    this.game.add.sprite(20,20, 'ui');
    

     this.text = game.add.text(60, 40, "Cell Stats:", style);

    

    this.text.anchor.set(0.5);

    this.isSelected = true;
   

   
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
        if(this.hunger >= 100) {
            this.currentState = CC_STATES.DEATH;
        }
    }

    else if(this.currentState == CC_STATES.SEARCH_MATE) {
        if(this.hunger >= 50) {
            this.currentState = CC_STATES.SEARCH_FOOD;
        }
        if(this.mated == true) {
            this.currentState = CC_STATES.DEATH;
        }
    }

    else if(this.currentState == CC_STATES.DEATH) {
        // set death animation
        this.tint = 0xFF195B;
        this.width -= 1;
        this.height -= 1;

        if(this.width == 0 || this.height == 0) {
            this.kill();
        }
    }

    if(this.isSelected == true) {
        this.game.debug.renderSpriteBounds(this);
        
    }
    
};

CommonCell.prototype.secondElapsed = function() {
    this.hunger += 10;
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
