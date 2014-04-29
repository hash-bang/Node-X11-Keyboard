X11-Keyboard
============
Simple X11 keyboard input module.

There doesn't appear to be any way of getting decent keybaord input within Node that specifies things like the keyRelease event.

This module creates a dummy X11 window and attaches a keyboard listener to it so you can extract detailed keyboard information.

It inherits the generic Node [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter) class so you can use all the normal callback functions like `on()`, `off()`, `once()` etc.


Examples
--------

	var keyboard = new require('./app.js');

	keyboard.on('key.down:a', function() {
		console.log('A key pressed');
	});

	keyboard.on('key.up:a', function() {
		console.log('A key released');
	});

	keyboard.on('key.up:ctrl+b', function() {
		console.log('Ctrl+B pressed');
	});
