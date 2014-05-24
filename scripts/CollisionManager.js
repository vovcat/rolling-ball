var CollisionManager = {
    /* 
     * init
     * Initialize the object
     */
    init: function() {

    },
    /*
     * target
     * Check whether the ball should fall into hole
     * @param {Double} x
     * @param {Double} y
     * @returns {Boolean}
     */
    target: function(x, y) {

        if ((y <= Target.position.y + Ball.size && y >= Target.position.y - Ball.size)
                && (x <= Target.position.x + Ball.size && x >= Target.position.x - Ball.size)) {

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
        if (y <= (Boundaries.top - 0 + (Ball.size / 2))) {
            ret += 'top';
        }
        else if (y >= (Boundaries.height - 0 + Boundaries.margin - (Ball.size / 2))) {
            ret += 'bottom';
        }

        if (x <= (Boundaries.left + (Ball.size / 2))) {
            ret += 'left';
        }
        else if (x >= (Boundaries.width - 0 + Boundaries.margin - (Ball.size / 2))) {
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

        var obstacles = Obstacles.items;

        for (var i = 0; i < obstacles.length; i++) {

            var leftCollision = obstacles[i].left - (Ball.size / 2);
            var topCollision = obstacles[i].top - 0 - (Ball.size / 2);
            var rightCollision = obstacles[i].left - 0 + obstacles[i].width - 0 + (Ball.size / 2);
            var bottomCollision = obstacles[i].top - 0 + obstacles[i].height - 0 + (Ball.size / 2);

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
