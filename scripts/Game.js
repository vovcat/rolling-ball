
function Game() {
    this.status = 'stopped';
    this.level = 1;
    this.speed = 1;

    this.playground = document.getElementById("playground");
    this.playground.setAttribute('width', window.innerWidth);
    this.playground.setAttribute('height', window.innerHeight);

    this.playgroundContext = this.playground.getContext("2d");

    /* Initialize window.requestAnimationFrame taking into account vendor prefixes */
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

}

Game.prototype = {
    /*
     * start
     * Starts the level
     */
    start: function() {
        /* Clear the playground */
        this.clearPlayground();

        /* Draw toy pieces */
        window.mBoundaries.draw();
        this.generateBricks();
        this.generateTarget();
        this.generateBall();

        /* Activate the device motion control */
        window.mDeviceMotionControl.handleMotionEvent(window.mGame.step.bind(window.mGame));

        /* The game is running now */
        this.status = 'running';
    },
    /*
     * step
     * Push the game a step forward, called every time the ball moves
     * @param {Double} motionX
     * @param {Double} motionY
     * @param {Double} motionZ
     * @param {Integer} interval
     */
    step: function(motionX, motionY, motionZ, interval) {

        var self = this;

        /* Stop if the game is not running */
        if (this.status !== 'running') {
            return;
        }

        /* Stop if ball is jumping */
        if (window.mBall.status === 'jumping') {
            return;
        }

        /* Check the motion on the z axis */
        if (motionZ > 12) {
            var jumpX = 0, jumpY = 0;

            /* Calculate direction to jump */
            if (motionX !== 0) {
                jumpX = motionX < 0 ? -1 : 1;
            }
            if (motionY !== 0) {
                jumpY = motionY < 0 ? -1 : 1;
            }

            /* Make the ball jump */
            window.mBall.jump(jumpX, jumpY, motionZ);

            return;
        }

        /* Calculate the next position of the ball */
        var nextPositionX = window.mBall.position.x - 0 - motionX;
        var nextPositionY = window.mBall.position.y - 0 + motionY;

        /* Check if the ball reached the target */
        if (CollisionManager.target(nextPositionX, nextPositionY)) {
            self.stop();
            self.nextLevel();

            return;
        }

        /* Check if the ball collides with a brick or boundaries  */
        var collision = CollisionManager.bricks(nextPositionX, nextPositionY) || CollisionManager.boundaries(nextPositionX, nextPositionY);
        if (collision) {
            if (collision === 'left' && motionX < 0) {
                motionX = 0;
            }
            else if (collision === 'top' && motionY > 0) {
                motionY = 0;
            }
            else if (collision === 'right' && motionX > 0) {
                motionX = 0;
            }
            else if (collision === 'bottom' && motionY < 0) {
                motionY = 0;
            }
            else {
                return;
            }
        }

        /* Make the ball roll at the right speed */
        if (this.speed >= 0) {
            this.speed--;
            window.requestAnimationFrame(function() {
                self.step(motionX, motionY, motionZ, interval);
            });
        }
        else {
            this.speed = interval / 100;
        }

        window.mBall.roll(motionX, motionY);

    },
    /*
     * stop
     * Stop the game
     */
    stop: function() {
        this.status = 'stopped';
    },
    /*
     * nextLevel
     * Go to the next level
     */
    nextLevel: function() {
        window.mBall.fall(window.mTarget.position.x, window.mTarget.position.y);

        var self = this;
        window.setTimeout(function() {
            self.level++;
//            self.start();
            window.location = '';
        }, 3000);
    },
    /*
     * clearPlayground
     * Remove toy pieces from the playground
     */
    clearPlayground: function() {
        this.playgroundContext.clearRect(0, 0, this.playground.width, this.playground.height);
    },
    /*
     * generateBricks
     * Draw bricks in random positions
     */
    generateBricks: function() {
        window.mBricks.items = [];

        var numberOfVerticalWalls = 1 + (Math.random() * 2 * window.mBoundaries.width / 480);
        var numberOfHorizontalWalls = 1 + (Math.random() * 2 * window.mBoundaries.height / 320);

        /* vertical positioned bricks */
        for (var i = 0; i < numberOfVerticalWalls; i++) {
            var width = 20;
            var height = (Math.random() - 0 + 1) * 100 * window.mBoundaries.height / 320;
            var top = Math.random() * (window.mBoundaries.height - height) + window.mBoundaries.margin;
            var left = Math.random() * (window.mBoundaries.width - width) + window.mBoundaries.margin;

            window.mBricks.items.push({
                top: top,
                left: left,
                width: width,
                height: height
            });
        }

        /* horizontal positioned bricks */
        for (var i = 0; i < numberOfHorizontalWalls; i++) {
            var width = (Math.random() - 0 + 1) * 100 * window.mBoundaries.width / 480;
            var height = 20;
            var top = Math.random() * (window.mBoundaries.height - height) + window.mBoundaries.margin;
            var left = Math.random() * (window.mBoundaries.width - width) + window.mBoundaries.margin;

            window.mBricks.items.push({
                top: top,
                left: left,
                width: width,
                height: height
            });
        }

        window.mBricks.draw();
    },
    /*
     * generateTarget
     * Draw the hole in a random position
     */
    generateTarget: function() {
        var xPos, yPos;

        do {
            xPos = Math.abs(Math.random() * window.mGame.playground.width - window.mBoundaries.top - window.mTarget.size);
            yPos = Math.abs(Math.random() * window.mGame.playground.height - window.mBoundaries.left - window.mTarget.size);
        }
        while (CollisionManager.bricks(xPos, yPos) || CollisionManager.boundaries(xPos, yPos));

        window.mTarget.position.x = xPos;
        window.mTarget.position.y = yPos;
        window.mTarget.draw();
    },
    /*
     * generateBall
     * Draw the ball in a random position
     */
    generateBall: function() {
        window.mBall.size = window.mBall.originalSize;

        var xPos, yPos;

        do {
            xPos = Math.abs(Math.random() * this.playground.width - window.mBoundaries.top - window.mBall.size);
            yPos = Math.abs(Math.random() * this.playground.height - window.mBoundaries.left - window.mBall.size);
        }
        while (CollisionManager.bricks(xPos, yPos) || CollisionManager.boundaries(xPos, yPos)
                || CollisionManager.target(xPos, yPos));

        window.mBall.position.x = xPos;
        window.mBall.position.y = yPos;
        window.mBall.draw();
    }
};
