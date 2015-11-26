/*
    CommonCell class
*/

var CC_STATES = {
    BORN : {value: 0, name: "BORN"}, 
    SEARCH_FOOD : {value: 1, name: "SEARCH_FOOD"}, 
    SEARCH_WATER : {value: 2, name: "SEARCH_WATER"},
    SEARCH_MATE : {value: 3, name: "SEARCH_MATE"}
    DEATH: {value: 4, name:"DEATH"} 
};

var CommonCell = function(x, y, parentDNA) {
    this.x = x;
    this.y = y;
    this.DNA = parentDNA;
    this.DNA = this.mutateDNA();
    this.currentState = ;
    this.velocityX = 0.0;
    this.velocityY = 0.0;
};

CommonCell.prototype.move = function() {

};

CommonCell.prototype.update = function() {
    this.move();
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