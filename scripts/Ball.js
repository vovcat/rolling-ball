function Ball(settings) {
    this.originalSize = settings.size;
    this.size = settings.size;
    this.status = 'rolling'; // rolling, jumping, crashing, onabrick, falling
    this.position = {
        x: settings.xPos,
        y: settings.yPos
    };

    /* Draw the ball */
    this.draw();
}

Ball.prototype = {
    /*
     * draw
     * Draw the ball
     */
    draw: function() {
        window.mGame.playgroundContext.fillStyle = '#66CC00';
        window.mGame.playgroundContext.beginPath();
        window.mGame.playgroundContext.arc(this.position.x, this.position.y, this.size / 2, 0, 2 * Math.PI);
        window.mGame.playgroundContext.closePath();
        window.mGame.playgroundContext.fill();
    },
    /*
     * roll
     * Make the ball roll
     */
    roll: function(motionX, motionY) {

        this.position.y += motionY;
        this.position.x += motionX;

        window.mGame.clearPlayground();
        window.mTarget.draw();
        this.draw();
        window.mBoundaries.draw();
        window.mBricks.draw();
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

        window.mGame.clearPlayground();
        window.mTarget.draw();
        window.mBoundaries.draw();
        window.mBricks.draw();
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

            window.mGame.clearPlayground();
            window.mTarget.draw();
            window.mBoundaries.draw();
            window.mBricks.draw();
            this.draw();

            var self = this;
            window.requestAnimationFrame(function() {
                self.land(motionX, motionY);
            });
        }
        else {
            this.size = this.originalSize;
                        
            if (CollisionManager.target(this.position.x, this.position.y)) {
                window.mGame.stop();
                window.mGame.nextLevel();
                return;
            }
            
            if (CollisionManager.bricks(this.position.x, this.position.y)) {
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
            this.position.x = window.mBoundaries.left - 0 + (this.originalSize / 2);
        }
        else if (outofboundaries === 'top') {
            this.position.y = window.mBoundaries.top - 0 + (this.originalSize / 2);
        }
        else if (outofboundaries === 'right') {
            this.position.x = window.mBoundaries.top - 0 + window.mBoundaries.width - (this.originalSize / 2);
        }
        else if (outofboundaries === 'bottom') {
            this.position.y = window.mBoundaries.left - 0 + window.mBoundaries.height - (this.originalSize / 2);
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
        window.mGame.clearPlayground();
        window.mTarget.draw();
//        window.mBoundaries.draw();
//        window.mBricks.draw();
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
