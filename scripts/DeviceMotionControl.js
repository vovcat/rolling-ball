function DeviceMotionControl() {
}

DeviceMotionControl.prototype = {
    /*
     * isDeviceOrientationEventSupported
     * Check if the deviceorientation event is supported
     * @returns {Boolean}
     */
    isDeviceOrientationEventSupported: function() {
        if (window.DeviceOrientationEvent) {
            return true;
        }

        return false;
    },
    /*
     * isDeviceMotionEventSupported
     * Check if the devicemotion event is supported
     * @returns {Boolean}
     */
    isDeviceMotionEventSupported: function() {
        console.log(window.DeviceMotionEvent);
        if (window.DeviceMotionEvent) {
            return true;
        }

        return false;
    },
    /*
     * handleMotionEvent
     * Listen for the devicemotion event and invoke the callback function every time the event is fired
     * @param {Function} callback
     */
    handleMotionEvent: function(callback) {
        
        /* In Safari for iOS the direction are reversed on axes x and y */
        var implementationFix = 1;
        if (window.navigator.userAgent.match(/^.*(iPhone|iPad).*(OS\s[0-9]).*(CriOS|Version)\/[.0-9]*\sMobile.*$/i)) {
            implementationFix = -1;
        }

        /* Check whether the DeviceMotionEvent is supported */
        if (this.isDeviceMotionEventSupported()) {

            /* Add a listener for the devicemotion event */
            window.addEventListener('devicemotion', function(deviceMotionEvent) {

                /* Get acceleration on x, y and z axis */
                var x = deviceMotionEvent.accelerationIncludingGravity.x * implementationFix;
                var y = deviceMotionEvent.accelerationIncludingGravity.y * implementationFix;
                var z = deviceMotionEvent.accelerationIncludingGravity.z;

                /* Get the interval (ms) at which data is obtained from the underlying hardware */
                var interval = deviceMotionEvent.interval;

                /* Invoke the callback function */
                callback(x, y, z, interval);

            }, true);
        }
    },
    /*
     * lockOrientation
     * lock the orientation to the value specified as parameter
     * @param {String} orientation
     */
    lockOrientation: function(orientation) {
        if (screen.lockOrientation) {
            screen.lockOrientation(orientation);
        }
    }
};