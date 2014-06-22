Introduction
============

A Plone add-on to turn a folder holding audio-files into a playlist.


Usage
=====

Fill a folder with audiofiles, select 'adi_playlist' of the "Display"-dropdown-menu to change the view of the folder and a playlist will be shown.

Default behaviour is to play the list until its end, one track after another, optionally click the inifinity-symbol to play the list infinitely in a loop.

You can use the space-bar to play/pause the current track, the tab-key to walk through the tracks and Enter-key for starting the selected track.


Motivation
==========

My dear sister Angela, who likes to turn the tables and wanted a non-proprietary solution to have her sets "in the cloud" with a decent player avaible right away.


Background
==========

This product takes advantage of browser-native audio-players, using the audio-tag introduced with HTML5 and the fact that all major browsers support this by now, dropping the need to provide a serverside-player.

However there are restrictions of supporting all of the possible audio-file-formats, depending on the browser's capabilities or choosen lack of support.

The add-on was written to use in conjunction with OGG-formats ('.ogg'-extension), expressing the love of the author for open (=non-proprietary) standards, dropping support to Safari, the only major-browser not supporting Vorbis.

This leaves out support for Safari, yet it should be fairly easy enough extending this add-on to hold each track in two formats, the other satisfying Safari and distinct which format to use, by checking which browser the client uses.


Used technique
==============

ECMAscript


Author
======

Ida Ebkes, 2014, <contact@ida-ebkes.eu>


Credits
=======

jQuery, which made writing this a breeze.


Furthermore
===========

Have a look at collective.transcode.star, if you want your arbitrary audio-formats transformed to OGG-format (or another) during upload, using beloved ffmpeg.
