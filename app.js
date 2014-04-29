var util = require("util");
var events = require("events");
var x11 = require("x11");

var ks = x11.keySyms;
var ks2Name = {};
for (var key in ks)
	ks2Name[ ks[key] ] = key;
var kk2Name = {};


function keyboardClass() {
	// events.EventEmitter.call(this);
	var keyboard = this;

	this.listen = function() {
		x11.createClient(function(err, display) {
			var X = display.client;
			var min = display.min_keycode;
			var max = display.max_keycode;
			X.GetKeyboardMapping(min, max-min, function(err, list) {
			for (var i=0; i < list.length; ++i)
				{
					var name = kk2Name[i+min] = [];
					var sublist = list[i];
					for (var j =0; j < sublist.length; ++j)
				name.push(ks2Name[sublist[j]]);
				}

				var root = display.screen[0].root;
				var wid = X.AllocID();
				var white = display.screen[0].white_pixel;
				var black = display.screen[0].black_pixel;
				X.CreateWindow(wid, root, 10, 10, 400, 300, 0, 0, 0, 0, { backgroundPixel: white, eventMask: x11.eventMask.KeyPress + x11.eventMask.KeyRelease});
				X.MapWindow(wid);

				X.on('event', function(ev) {
					var type = (ev.name == 'Keypress') ? 'key.down' : 'key.up';
					var modifiers =
						( ((ev.buttons & 8) == 8) ? 'alt+' : '') +
						( ((ev.buttons & 4) == 4) ? 'ctrl+' : '') +
						( ((ev.buttons & 1) == 1) ? 'shift+' : '');

					var key = String.fromCharCode(ev.keycode);

					var matches = /^XK_(.+?),/.exec(kk2Name[ev.keycode]);
					if (matches)
						key = matches[1];

					keyboard.emit('key.press', {buttons: ev.buttons, keycode: ev.keycode, which: modifiers + key});
					keyboard.emit(type + ':' + modifiers + key);
				});
			});
		});
	};
	return this;
}
util.inherits(keyboardClass, events.EventEmitter);

module.exports = new keyboardClass();
