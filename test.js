var assert = require("assert");

var keyboard = new require('./app.js');

keyboard.on('key.press', function(ev) {
	console.log('Pressed', ev);
});

console.log('Please press key "A"');
keyboard.on('key.up:a', function() {
	console.log('A pressed');
});

console.log('Please press key "Ctrl+B"');
keyboard.on('key.up:ctrl+b', function() {
	console.log('Ctrl+B pressed');
});

console.log('Please press key "Shift+Ctrl+K"');
keyboard.on('key.up:shift+ctrl+k', function() {
	console.log('Shift+Ctrl+K pressed');
});

keyboard.listen();
