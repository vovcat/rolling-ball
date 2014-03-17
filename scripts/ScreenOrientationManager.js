
function ScreenOrientationManager() {
    
    /* Initialize screen.lockOrientation and screen.unlockOrientation taking into account vendor prefixes */
    screen.lockOrientation = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;
    screen.unlockOrientation = screen.unlockOrientation || screen.mozUnlockOrientation || screen.msUnlockOrientation;
    
}

ScreenOrientationManager.prototype = {
    /*
     * lockOrientation
     * lock the orientation to the value specified as parameter
     * @param {String} orientation
     */
    lockOrientation: function(orientation) {

        if (screen.lockOrientation) {
            screen.lockOrientation(orientation);
        }
    },
    /*
     * unlockOrientation
     * unlock the orientation
     */
    unlockOrientation: function() {
        if (screen.unlockOrientationFunction) {
            screen.unlockOrientationFunction();
        }
    }
};
