/*
    CommonCell class

    LEFT OFF: death handler now works, figure out how to spawn more cells
*/

var CC_STATES = {
    BORN : {value: 0, name: "BORN"},
    SEARCH_FOOD : {value: 1, name: "SEARCH_FOOD"},
    SEARCH_MATE : {value: 3, name: "SEARCH_MATE"},
    MATING : {value: 4, name: "MATING"},
    DEATH: {value: 5, name:"DEATH"}
};

function CommonCell(game, x, y, parentDNA) {
    Phaser.Sprite.call(this, game, x, y, 'commoncell');
    this.game = game;
    this.DNA = parentDNA;
    this.DNA = this.mutateDNA();
    this.currentState = CC_STATES.BORN;

    game.physics.enable(this, Phaser.Physics.ARCADE);

    //how hungry the cell is, if it gets to 100, the cell dies.
    this.hunger = 30;
    this.isMated = false;
    this.isAvailable = true;
    this.isMatingFinished = false;
    this.partner = null;
    this.matingTime = 8; //in secs

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
    this.events.onKilled.add(this.handleDeath, this)
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
   
};

CommonCell.prototype.moveCell = function() {

};

CommonCell.prototype.handleDeath = function() {
    alert("died for sins");
};


CommonCell.prototype.updateCell = function() {
    this.moveCell();

    if(DEBUG == true)
    {
        this.text.x = this.body.x;
        this.text.y = this.body.y;    
    }

    // Update cell states
    //BORN STATE
    if(this.currentState == CC_STATES.BORN) {
        // set animation
        this.currentState = CC_STATES.SEARCH_FOOD;
    }
    //SEARCHING FOR FOOD STATE
    else if(this.currentState == CC_STATES.SEARCH_FOOD) {
        if(this.hunger <= 1) {
            this.currentState = CC_STATES.SEARCH_MATE;
        }
        if(this.hunger >= 100) {
            this.currentState = CC_STATES.DEATH;
        }

        this.tint = 0x75FFBF;
    }
    //SEARCHING FOR MATE <3
    else if(this.currentState == CC_STATES.SEARCH_MATE) {
        if(this.hunger >= 40) {
            this.currentState = CC_STATES.SEARCH_FOOD;
        }
        if(this.isMated == true) {
            this.currentState = CC_STATES.MATING;
        }
        this.tint = 0xFF7AEB;
    }
    //MATING STATE
    else if(this.currentState == CC_STATES.MATING) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        if(this.isMatingFinished == true) {
            this.currentState = CC_STATES.DEATH;
        }

        this.tint = 0xD9020D;
    }
    //DEATH STATE
    else if(this.currentState == CC_STATES.DEATH) {
        // set death animation
        this.width -= 1;
        this.height -= 1;

        if(this.width == 0 || this.height == 0) {
            this.kill();
        }

        this.tint = 0x3D4D52;
    }
    
};

CommonCell.prototype.checkCommonCellCollision = function(commonCell) {
    if(this === commonCell){
        return;
    }
    if(this.currentState == CC_STATES.SEARCH_MATE && this.isMated == false &&commonCell.isMated == false && commonCell.currentState == CC_STATES.SEARCH_MATE) {
        this.isMated = true;
        this.partner = commonCell;
        commonCell.isMated = true;
    }
};

CommonCell.prototype.secondElapsed = function() {
    if(this.matingTime == 0) {
        this.isMatingFinished = true;
    }
    if(this.isMated == true) {
        this.matingTime--;
    }
    this.hunger += 1;
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
    if(this.currentState == CC_STATES.SEARCH_FOOD) {
        this.hunger -= protein.proteinValue;
        protein.kill();
    }
};
