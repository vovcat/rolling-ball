function Bricks() {
    this.items = [];
}

Bricks.prototype = {
    /*
     * draw
     * Draw the bricks
     */
    draw: function() {
        window.mGame.playgroundContext.fillStyle = '#721B1B';
        window.mGame.playgroundContext.beginPath();
        for (var i = 0; i < this.items.length; i++) {
            window.mGame.playgroundContext.rect(this.items[i].left, this.items[i].top, this.items[i].width, this.items[i].height);
        }
        window.mGame.playgroundContext.closePath();
        window.mGame.playgroundContext.fill();
    }
};