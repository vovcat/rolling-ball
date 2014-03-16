function Target(settings) {
    this.size = settings.size;

    this.position = {
        x: settings.xPos,
        y: settings.yPos
    };

    /* Draw the hole */
    this.draw();
}

Target.prototype = {
    /*
     * draw
     * Draw the hole
     */
    draw: function() {
        window.mGame.playgroundContext.fillStyle = '#000000';
        window.mGame.playgroundContext.beginPath();
        window.mGame.playgroundContext.arc(this.position.x, this.position.y, this.size / 2, 0, 2 * Math.PI);
        window.mGame.playgroundContext.closePath();
        window.mGame.playgroundContext.fill();
    }
};
