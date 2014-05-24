var KeyboardControl = {
    /* 
     * init
     * Initialize the object
     */
    init: function() {

        this.interval = 1000;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;

        this.leftArrow = {
            keycode: 37,
            steps: 0,
            lastTimePressed: null
        };

        this.upArrow = {
            keycode: 38,
            steps: 0,
            lastTimePressed: null
        };

        this.rightArrow = {
            keycode: 39,
            steps: 0,
            lastTimePressed: null
        };

        this.downArrow = {
            keycode: 40,
            steps: 0,
            lastTimePressed: null
        };

        this.jumpButton = {
            keycode: 32,
            steps: 0,
            lastTimePressed: null
        };

        var self = this;

        /*
         * Listen to the keydown event
         */
        window.onkeydown = function(e) {
            self.vx = 0;
            self.vy = 0;
            self.vz = 0;

            if (Ball.status !== 'jumping') {
                if (e.keyCode === self.leftArrow.keycode) { // left
                    self.goLeft();
                }
                else if (e.keyCode === self.upArrow.keycode) { // up
                    self.goUp();
                }
                else if (e.keyCode === self.rightArrow.keycode) { // right
                    self.goRight();
                }
                else if (e.keyCode === self.downArrow.keycode) { // down
                    self.goDown();
                }

                if (e.keyCode === self.jumpButton.keycode) { // space
                    self.jump();
                }
            }

        };

        /*
         * Listen to the keyup event
         */
        window.onkeyup = function(e) {
            if (e.keyCode === self.leftArrow.keycode) { // left
                self.leftArrow.lastTimePressed = null;
                self.leftArrow.steps = 0;
            }
            else if (e.keyCode === self.upArrow.keycode) { // up
                self.upArrow.lastTimePressed = null;
                self.upArrow.steps = 0;
            }
            else if (e.keyCode === self.rightArrow.keycode) { // right
                self.rightArrow.lastTimePressed = null;
                self.rightArrow.steps = 0;
            }
            else if (e.keyCode === self.downArrow.keycode) { // down
                self.downArrow.lastTimePressed = null;
                self.downArrow.steps = 0;
            }
        };
    },
    /*
     * goLeft
     * Make the ball go left
     */
    goLeft: function() {
        var now = new Date();

        this.vx = -1;

        this.leftArrow.steps++;
        this.leftArrow.lastTimePressed = now;

        if (this.upArrow.lastTimePressed) {
            var upleft = this.leftArrow.lastTimePressed - this.upArrow.lastTimePressed;

            if (upleft >= 0 && upleft < this.interval) {
                this.upArrow.lastTimePressed = new Date();
                this.leftArrow.lastTimePressed = new Date();
                this.vy = -1;
            }
        }
        else if (this.downArrow.lastTimePressed) {
            var downleft = this.leftArrow.lastTimePressed - this.downArrow.lastTimePressed;
            if (downleft >= 0 && downleft < this.interval) {
                this.downArrow.lastTimePressed = new Date();
                this.leftArrow.lastTimePressed = new Date();
                this.vy = 1;
            }
        }

        Game.step(this.vx, this.vy, this.vz, this.interval);
    },
    /*
     * goUp
     * Make the ball go up
     */
    goUp: function() {
        var now = new Date();

        this.vy = -1;

        this.upArrow.steps++;
        this.upArrow.lastTimePressed = now;

        if (this.leftArrow.lastTimePressed) {
            var leftup = this.upArrow.lastTimePressed - this.leftArrow.lastTimePressed;
            if (leftup >= 0 && leftup < this.interval) {
                this.leftArrow.lastTimePressed = new Date();
                this.upArrow.lastTimePressed = new Date();
                this.vx = -1;
            }
        }
        else if (this.rightArrow.lastTimePressed) {
            var rightup = this.upArrow.lastTimePressed - this.rightArrow.lastTimePressed;
            if (rightup >= 0 && rightup < this.interval) {
                this.rightArrow.lastTimePressed = new Date();
                this.upArrow.lastTimePressed = new Date();
                this.vx = 1;
            }
        }

        Game.step(this.vx, this.vy, this.vz, this.interval);
    },
    /*
     * goRight
     * Make the ball go right
     */
    goRight: function() {
        var now = new Date();

        this.vx = 1;

        this.rightArrow.steps++;
        this.rightArrow.lastTimePressed = now;

        if (this.upArrow.lastTimePressed) {
            var upright = this.rightArrow.lastTimePressed - this.upArrow.lastTimePressed;
            if (upright >= 0 && upright < this.interval) {
                this.upArrow.lastTimePressed = new Date();
                this.rightArrow.lastTimePressed = new Date();
                this.vy = -1;
            }
        }
        else if (this.downArrow.lastTimePressed) {
            var downright = this.rightArrow.lastTimePressed - this.downArrow.lastTimePressed;
            if (downright >= 0 && downright < this.interval) {
                this.downArrow.lastTimePressed = new Date();
                this.rightArrow.lastTimePressed = new Date();
                this.vy = 1;
            }
        }

        Game.step(this.vx, this.vy, this.vz, this.interval);
    },
    /*
     * goDown
     * Make the ball go down
     */
    goDown: function() {
        var now = new Date();

        this.vy = 1;

        this.downArrow.steps++;
        this.downArrow.lastTimePressed = now;

        if (this.leftArrow.lastTimePressed) {
            var leftdown = this.downArrow.lastTimePressed - this.leftArrow.lastTimePressed;
            if (leftdown >= 0 && leftdown < this.interval) {
                this.leftArrow.lastTimePressed = new Date();
                this.downArrow.lastTimePressed = new Date();
                this.vx = -1;
            }
        }
        else if (this.rightArrow.lastTimePressed) {
            var rightdown = this.downArrow.lastTimePressed - this.rightArrow.lastTimePressed;
            if (rightdown >= 0 && rightdown < this.interval) {
                this.rightArrow.lastTimePressed = new Date();
                this.downArrow.lastTimePressed = new Date();
                this.vx = 1;
            }
        }

        Game.step(this.vx, this.vy, this.vz, this.interval);
    },
    /*
     * jump
     * Make the ball jump
     */
    jump: function() {
        this.vz = 16;

        if (this.leftArrow.lastTimePressed) {
            this.vx = 1;
            this.vz += this.leftArrow.steps;
        }
        if (this.upArrow.lastTimePressed) {
            this.vy = -1;
            this.vz += this.upArrow.steps;
        }
        if (this.rightArrow.lastTimePressed) {
            this.vx = -1;
            this.vz += this.rightArrow.steps;
        }
        if (this.downArrow.lastTimePressed) {
            this.vy = 1;
            this.vz += this.downArrow.steps;
        }

        Game.step(this.vx, this.vy, this.vz, this.interval);
    }
};
