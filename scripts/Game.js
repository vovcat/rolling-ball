
var Game = {
    /* 
     * init
     * Initialize the object
     */
    init: function() {
        this.status = 'stopped';
        this.level = 1;
        this.speed = 1;

        this.playground = document.getElementById("playground");
        this.playground.setAttribute('width', window.innerWidth - 5);
        this.playground.setAttribute('height', window.innerHeight - 5);

        this.playgroundContext = this.playground.getContext("2d");

        this.lastMotionX = 0;
        this.lastMotionY = 0;

        /* Initialize window.requestAnimationFrame taking into account vendor prefixes */
        window.requestAnimationFrame = window.requestAnimationFrame || ozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame || sRequestAnimationFrame;

    },
    /*
     * start
     * Starts the level
     */
    start: function() {
        /* Clear the playground */
        this.clearPlayground();

        this.playground.setAttribute('width', window.innerWidth - 5);
        this.playground.setAttribute('height', window.innerHeight - 5);

        /* Draw toy pieces */
        Boundaries.init();
        this.generateTarget();
        this.generateObstacles();
        this.generateBall();

        /* Handle the screen orientation change */
        ScreenOrientationManager.handleOrientationChange({
            portraitPrimaryCallback: Game.resume.bind(Game),
            landscapePrimaryCallback: Game.pause.bind(Game),
            portraitSecondaryCallback: Game.pause.bind(Game),
            landscapeSecondaryCallback: Game.pause.bind(Game)
        });

        /* Activate the device motion control */
        DeviceMotionControl.handleMotionEvent(Game.step.bind(Game));

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
            Ball.jump(jumpX, jumpY, motionZ);

            return;
        }

        /* Stop if ball is not rolling */
        if (Ball.status !== 'rolling') {
            return;
        }

        /* Calculate the next position of the ball */
        var nextPositionX = Ball.position.x - 0 + motionX;
        var nextPositionY = Ball.position.y - 0 + motionY;

        /* Check if the ball reached the target */
        if (CollisionManager.target(nextPositionX, nextPositionY)) {
            self.stop();
            self.nextLevel();

            return;
        }

        /* Check if the ball collides with a brick or boundaries  */
        var collision = CollisionManager.obstacles(nextPositionX, nextPositionY) || CollisionManager.boundaries(nextPositionX, nextPositionY);
        if (collision) {

            if (collision === 'left' || collision === 'right') {
                if ((motionX < 0 && this.lastMotionX < 0) || (motionX > 0 && this.lastMotionX > 0)) {
                    motionX = 0;
                }
            }
            else if (collision === 'top' || collision === 'bottom') {
                if ((motionY < 0 && this.lastMotionY < 0) || (motionY > 0 && this.lastMotionY > 0)) {
                    motionY = 0;
                }
            }
            else if (collision === 'topleft' || collision === 'topright' || collision === 'bottomleft' || collision === 'bottomright') {
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

        Ball.roll(motionX, motionY);

        /* Save last motion */
        if (motionX !== 0) {
            this.lastMotionX = motionX;
        }
        if (motionY !== 0) {
            this.lastMotionY = motionY;
        }

    },
    /*
     * pause
     * Pause the game
     */
    pause: function() {
        this.status = 'paused';
    },
    /*
     * resume
     * Resume the game
     */
    resume: function() {
        var self = this;
        setTimeout(function() {
            self.status = 'running';
        }, 1000);
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
        Ball.fall(Target.position.x, Target.position.y);

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
     * generateObstacles
     * Draw obstacles in random positions
     */
    generateObstacles: function() {
        Obstacles.items = [];

        var numberOfVerticalWalls = 1 + (Math.random() * 2 * Boundaries.width / 480);
        var numberOfHorizontalWalls = 1 + (Math.random() * 2 * Boundaries.height / 320);

        /* vertical positioned obstacles */
        for (var i = 0; i < numberOfVerticalWalls; i++) {
            var width = 20;
            var height = (Math.random() - 0 + 1) * 100 * Boundaries.height / 320;

            var topMax = Boundaries.height - height + Boundaries.top - Target.size;
            var topMin = Boundaries.top - 0 + Target.size;
            var top = (Math.random() * (topMax - topMin)) - 0 + topMin;

            var leftMax = Boundaries.width - width + Boundaries.left - Ball.size;
            var leftMin = Boundaries.left - 0 + Ball.size;
            var left = (Math.random() * (leftMax - leftMin)) - 0 + leftMin;

            Obstacles.items.push({
                top: top,
                left: left,
                width: width,
                height: height
            });
        }

        /* horizontal positioned obstacles */
        for (var i = 0; i < numberOfHorizontalWalls; i++) {
            var width = (Math.random() - 0 + 1) * 100 * Boundaries.width / 480;
            var height = 20;

            var topMax = Boundaries.height - height + Boundaries.top - Target.size;
            var topMin = Boundaries.top - 0 + Target.size;
            var top = (Math.random() * (topMax - topMin)) - 0 + topMin;

            var leftMax = Boundaries.width - width + Boundaries.left - Ball.size;
            var leftMin = Boundaries.left - 0 + Ball.size;
            var left = (Math.random() * (leftMax - leftMin)) - 0 + leftMin;

            Obstacles.items.push({
                top: top,
                left: left,
                width: width,
                height: height
            });
        }

        Obstacles.draw();
    },
    /*
     * generateTarget
     * Draw the hole in a random position
     */
    generateTarget: function() {
        var xPos, yPos;

        var leftMax = Boundaries.left - 0 + (Boundaries.width / 2) - Target.size;
        var leftMin = Boundaries.left - 0 + Target.size;

        var topMax = Boundaries.top - 0 + (Boundaries.height / 2) - Target.size;
        var topMin = Boundaries.top - 0 + Target.size;

        do {
            xPos = (Math.random() * (leftMax - leftMin)) - 0 + leftMin;
            yPos = (Math.random() * (topMax - topMin)) - 0 + topMin;
        }
        while (CollisionManager.obstacles(xPos, yPos) || CollisionManager.boundaries(xPos, yPos));

        Target.position.x = xPos;
        Target.position.y = yPos;
        Target.draw();
    },
    /*
     * generateBall
     * Draw the ball in a random position
     */
    generateBall: function() {
        Ball.size = Ball.originalSize;

        var xPos, yPos;

        var leftMax = Boundaries.left - 0 + Boundaries.width - Ball.size;
        var leftMin = Boundaries.left - 0 + (Boundaries.width / 2);

        var topMax = Boundaries.top - 0 + Boundaries.height - Ball.size;
        var topMin = Boundaries.top - 0 + (Boundaries.height / 2);

        do {
            xPos = (Math.random() * (leftMax - leftMin)) - 0 + leftMin;
            yPos = (Math.random() * (topMax - topMin)) - 0 + topMin;
        }
        while (CollisionManager.obstacles(xPos, yPos) || CollisionManager.boundaries(xPos, yPos)
                || CollisionManager.target(xPos, yPos));

        Ball.position.x = xPos;
        Ball.position.y = yPos;
        Ball.draw();
    }
};
