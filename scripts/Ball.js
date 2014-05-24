var Ball = {
    /* 
     * init
     * Initialize the object
     */
    init: function(settings) {
        this.originalSize = settings.size;
        this.size = settings.size;
        this.status = 'rolling'; // rolling, jumping, crashing, onabrick, falling
        this.position = {
            x: settings.xPos,
            y: settings.yPos
        };

        /* Draw the ball */
        this.draw();
    },
    /*
     * draw
     * Draw the ball
     */
    draw: function() {
        Game.playgroundContext.fillStyle = '#66CC00';
        Game.playgroundContext.beginPath();
        Game.playgroundContext.arc(this.position.x, this.position.y, this.size / 2, 0, 2 * Math.PI);
        Game.playgroundContext.closePath();
        Game.playgroundContext.fill();
    },
    /*
     * roll
     * Make the ball roll
     */
    roll: function(motionX, motionY) {

        this.position.y += motionY;
        this.position.x += motionX;

        Game.clearPlayground();
        Target.draw();
        this.draw();
        Boundaries.draw();
        Obstacles.draw();
    },
    /*
     * jump
     * Make the ball jump
     */
    jump: function(motionX, motionY, motionZ) {

        var outofboundaries = CollisionManager.boundaries(this.position.x, this.position.y);
        if (outofboundaries) {
            this.crash(outofboundaries);
            this.land(motionX, motionY, motionZ);
            return;
        }

        this.size += 1;
        this.status = 'jumping';

        this.position.y += motionY;
        this.position.x -= motionX;

        Game.clearPlayground();
        Target.draw();
        Boundaries.draw();
        Obstacles.draw();
        this.draw();

        if (this.size - this.originalSize <= motionZ) {
            var self = this;
            window.requestAnimationFrame(function() {
                self.jump(motionX, motionY, motionZ);
            });
        }
        else {
            this.land(motionX, motionY, motionZ);
        }
    },
    /*
     * land
     * Make the ball land
     */
    land: function(motionX, motionY) {

        var outofboundaries = CollisionManager.boundaries(this.position.x, this.position.y);
        if (outofboundaries) {
            this.crash(outofboundaries);
        }

        if (this.size > this.originalSize) {

            this.size -= 0.5;

            if (this.status === 'jumping') {
                this.position.y += motionY;
                this.position.x -= motionX;
            }

            Game.clearPlayground();
            Target.draw();
            Boundaries.draw();
            Obstacles.draw();
            this.draw();

            var self = this;
            window.requestAnimationFrame(function() {
                self.land(motionX, motionY);
            });
        }
        else {
            this.size = this.originalSize;

            if (CollisionManager.target(this.position.x, this.position.y)) {
                Game.stop();
                Game.nextLevel();
                return;
            }

            if (CollisionManager.obstacles(this.position.x, this.position.y)) {
                this.draw();
                this.status = 'onabrick';
                return;
            }

            this.status = 'rolling';
        }
    },
    /*
     * crash
     * Make the ball crash against boundaries
     */
    crash: function(outofboundaries) {
        this.status = 'crashing';

        if (outofboundaries === 'left') {
            this.position.x = Boundaries.left - 0 + (this.originalSize / 2);
        }
        else if (outofboundaries === 'top') {
            this.position.y = Boundaries.top - 0 + (this.originalSize / 2);
        }
        else if (outofboundaries === 'right') {
            this.position.x = Boundaries.top - 0 + Boundaries.width - (this.originalSize / 2);
        }
        else if (outofboundaries === 'bottom') {
            this.position.y = Boundaries.left - 0 + Boundaries.height - (this.originalSize / 2);
        }

        this.draw();
    },
    /*
     * fall
     * Make the ball fall into the hole
     */
    fall: function(x, y) {
        /* Update ball status */
        this.status = 'falling';

        /* Update ball position */
        this.position.x = x;
        this.position.y = y;

        /* Decrease ball size */
        this.size -= 1;

        /* Repaint */
        Game.clearPlayground();
        Target.draw();
//        Boundaries.draw();
//        Obstacles.draw();
        this.draw();

        /* Animate until the ball is visible */
        if (this.size > 0) {
            var self = this;
            window.requestAnimationFrame(function() {
                self.fall(x, y);
            });
        }
        else {
            this.status = 'rolling';
        }
    }
};
