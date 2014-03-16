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
     * @returns {Boolean}
     */
    handleMotionEvent: function(callback) {
        if (this.isDeviceMotionEventSupported()) {
            /* Add a listener for the devicemotion event */
            window.addEventListener('devicemotion', function(deviceOrientationEvent) {
                callback(deviceOrientationEvent.accelerationIncludingGravity.x, // acceleration on the x axis without the effect of gravity
                        deviceOrientationEvent.accelerationIncludingGravity.y, // acceleration on the y axis without the effect of gravity
                        deviceOrientationEvent.accelerationIncludingGravity.z, // acceleration on the z axis without the effect of gravity
                        deviceOrientationEvent.interval); // interval (expressed in ms) at which data is obtained from the underlying hardware
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