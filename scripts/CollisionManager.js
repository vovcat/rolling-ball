var CollisionManager = {
    /*
     * target
     * Check whether the ball should fall into hole
     * @param {Double} x
     * @param {Double} y
     * @returns {Boolean}
     */
    target: function(x, y) {

        if ((y <= window.mTarget.position.y + window.mBall.size && y >= window.mTarget.position.y - window.mBall.size)
                && (x <= window.mTarget.position.x + window.mBall.size && x >= window.mTarget.position.x - window.mBall.size)) {

            return true;
        }

        return false;
    },
    /*
     * boundaries
     * Check whether the ball should crash against a boundary
     * @param {Double} x
     * @param {Double} y
     * @returns {String} collision direction
     */
    boundaries: function(x, y) {
        var ret = '';

        /* Boundaries */
        if (y <= (window.mBoundaries.top - 0 + (window.mBall.size / 2))) {
            ret += 'top';
        }
        else if (y >= (window.mBoundaries.height - 0 + window.mBoundaries.margin - (window.mBall.size / 2))) {
            ret += 'bottom';
        }

        if (x <= (window.mBoundaries.left + (window.mBall.size / 2))) {
            ret += 'left';
        }
        else if (x >= (window.mBoundaries.width - 0 + window.mBoundaries.margin - (window.mBall.size / 2))) {
            ret += 'right';
        }

        if (ret !== '') {
            return ret;
        }

        return false;
    },
    /*
     * obstacles
     * Check whether the ball should crash against a brick
     * @param {Double} x
     * @param {Double} y
     * @returns {String} collision direction
     */
    obstacles: function(x, y) {
        
        var obstacles = window.mObstacles.items;
        
        for (var i = 0; i < obstacles.length; i++) {

            var leftCollision = obstacles[i].left - (window.mBall.size / 2);
            var topCollision = obstacles[i].top - 0 - (window.mBall.size / 2);
            var rightCollision = obstacles[i].left - 0 + obstacles[i].width - 0 + (window.mBall.size / 2);
            var bottomCollision = obstacles[i].top - 0 + obstacles[i].height - 0 + (window.mBall.size / 2);

            var collisions = [Math.abs(leftCollision - x), Math.abs(topCollision - y), Math.abs(rightCollision - x), Math.abs(bottomCollision - y)];

            if ((y >= topCollision && y <= bottomCollision)
                    && x >= leftCollision && x <= rightCollision) {

                var collisionDirection = collisions.indexOf(Math.min.apply(Math, collisions));

                if (collisionDirection === 0) {
                    return 'left';
                }
                else if (collisionDirection === 1) {
                    return 'top';
                }

                if (collisionDirection === 2) {
                    return 'right';
                }
                else if (collisionDirection === 3) {
                    return 'bottom';
                }
            }
        }

        return false;
    }
};
