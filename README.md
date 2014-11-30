# Rolling ball

Rolling Ball is a simple game in which you move a ball through a labyrinth in order to make it fall into a hole and get access to the next level.

![Screenshot](http://www.francesco.iovine.name/mdn/rolling-ball/public_html/img/screenshots/rolling-ball.png)

Try it [live](http://franciov.github.io/rolling-ball):

- keyboard control: use arrows to make the ball roll, and space to make it jump
- device motion control: change the orientation of your mobile device to make the ball roll, and move it up to make the ball jump

This demo is part of the following article on Mozilla Developer Network:

- [Keep it level: responding to device orientation changes - MDN App Center](https://developer.mozilla.org/en-US/Apps/Build/gather_and_modify_data/Keep_it_level_responding_to_device_orientation_changes)

## Notes

The web app makes use of canvas to draw graphics and the Device Orientation API to move the ball. More info inside the MDN article.

## Contributing

- open github issues
- add tests
- levels
- better look&feel
- better playability
- lock screen to landscape
- make the ball roll via deviceorientation event
- DOM-based version, instead of canvas-based
