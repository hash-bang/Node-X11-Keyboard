X11-Keyboard
============
Simple X11 keyboard input module.

There doesn't appear to be any way of getting decent keybaord input within Node that specifies things like the keyRelease event.

This module creates a dummy X11 window and attaches a keyboard listener to it so you can extract detailed keyboard information.
