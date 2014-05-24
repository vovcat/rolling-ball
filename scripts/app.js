
var App = {
    /* 
     * init
     * Initialize the app
     */
    init: function() {
        /* Create a new Game */
        Game.init();

        /* Create new Boundaries and Obstacles */
        Boundaries.init({
            margin: 10
        });
        Obstacles.init();

        /* Create a new Target */
        Target.init({
            size: 50,
            xPos: 100,
            yPos: 50
        });

        /* Create the ball */
        Ball.init({
            size: 20,
            xPos: Game.playground.width - 30,
            yPos: Game.playground.height - 30
        });

        /* Lock screen orientation to portrait */
        ScreenOrientationManager.init();
        ScreenOrientationManager.lockOrientation('portrait-primary');

        /* Add devicemotion control */
        DeviceMotionControl.init();

        /* Add keyboard control */
        KeyboardControl.init();

        /* Start the game */
        Game.start();
    }
};
