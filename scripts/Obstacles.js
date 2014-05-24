var Obstacles = {
    /* 
     * init
     * Initialize the object
     */
    init: function() {
        this.items = [];
    },
    /*
     * draw
     * Draw the obstacles
     */
    draw: function() {
        Game.playgroundContext.fillStyle = '#721B1B';
        Game.playgroundContext.beginPath();
        for (var i = 0; i < this.items.length; i++) {
            Game.playgroundContext.rect(this.items[i].left, this.items[i].top, this.items[i].width, this.items[i].height);
        }
        Game.playgroundContext.closePath();
        Game.playgroundContext.fill();
    }
};