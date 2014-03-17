
function init() {
    /* Create a new Game */
    window.mGame = new Game();

    /* Create new Boundaries and Bricks */
    window.mBoundaries = new Boundaries();
    window.mBricks = new Bricks();

    /* Create a new Target */
    window.mTarget = new Target({
        size: 50,
        xPos: 100,
        yPos: 50
    });

    /* Create the ball */
    window.mBall = new Ball({
        size: 20,
        xPos: window.mGame.playground.width - 30,
        yPos: window.mGame.playground.height - 30
    });

    /* Lock screen orientation to portrait */
    window.mScreenOrientationControl = new ScreenOrientationControl();
    window.mScreenOrientationControl.lockOrientation('portrait-primary');

    /* Add devicemotion control */
    window.mDeviceMotionControl = new DeviceMotionControl();

    /* Add keyboard control */
    window.mKeyboardControl = new KeyboardControl();

    /* Start the game */
    window.mGame.start();    
}


/* Call init() when the window is loaded */
window.onload = init;
