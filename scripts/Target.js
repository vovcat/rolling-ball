var Target = {
    /* 
     * init
     * Initialize the object
     */
    init: function(settings) {
        this.size = settings.size;

        this.position = {
            x: settings.xPos,
            y: settings.yPos
        };

        /* Draw the hole */
        this.draw();
    },
    /*
     * draw
     * Draw the hole
     */
    draw: function() {
        Game.playgroundContext.fillStyle = '#000000';
        Game.playgroundContext.beginPath();
        Game.playgroundContext.arc(this.position.x, this.position.y, this.size / 2, 0, 2 * Math.PI);
        Game.playgroundContext.closePath();
        Game.playgroundContext.fill();
    }
};
