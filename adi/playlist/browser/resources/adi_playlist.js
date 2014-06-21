(function($) {
    $(document).ready(function() {

/*


    DA FUNK


*/

function isPlaying() { 
    return !($('#playlist-container audio')[0].paused) 
}
function startNextSong() {
    // If not last song:
    if ($('#playlist-container li:last-child').attr('id') != 'selected-track'){
        // Play next song in list:
        $('#selected-track').next().click();
    }
    // Is last song:
    else {
        // User has selected list to loop:
        if( $('#playlist-loop').hasClass('loop')  ) {
            // Play first song of list:
            $('#playlist-container li:first-child').click();
        }
    }
}
function removeVisualClass(event) {
    $('#selected-track').removeClass('isPlaying'); 
}
function applyVisualClass(event) {
    var nr = $('#playlist-number-current').text();
    nr = nr - 1;
    var entry = $('#playlist-container li')[nr];
    $('#playlist-container li').removeClass('isPlaying');
    $(entry).addClass('isPlaying');
}
function createPlaylist(media_links_container) {
    
    var media_links = $(media_links_container).find('a');
    var media_links = $('#content-core').find('a');
    var medium = $(media_links)[0];
    var medium_source = String(medium);
    var medium_title = $(medium).text();
    var media_total_amount = media_links.length;

    // If total amount of tracks is less than 10...
    if (media_total_amount < 10) {
        // ...apply leading-zero to current songnumber:
        media_total_amount = '0' + String(media_total_amount);
    }

    // Insert skeleton:
    $(media_links_container).prepend('<div id="playlist-container"><audio id="playlist-player" autobuffer controls><source src="' + medium_source + '" /></audio><div id="playlist-controls"><span id="playlist-backward-button" tabindex="0">&#9664;&#9664;</span><span id="playlist-forward-button" tabindex="0">&#9654;&#9654;</span><span id="playlist-ticker"><span id="playlist-medium-title">'+medium_title+'</span></span></span><span id="playlist-loop" tabindex="0">&#8734;</span><span id="playlist-number"><span id="playlist-number-current">01</span><span id="playlist-number-total">/'+media_total_amount+'</span></span><span id="show-playlist" tabindex="0">&#9660;</span></div><ul></ul></div>');

    // Create playlist entries of link-container-ele:
    $(media_links).each(function() {
        $('#playlist-container ul').append('<li tabindex="0" src="'+$(this).attr('href')+'">' + $(this).text() + ' </li>');
    });

    // Get width of audio-ele and make it width of playlist-container (browser-dependent):
    $('#playlist-container').css('width', $('#playlist-container audio').css('width')  );

    // Mark first song as selected-track:
    $('#playlist-container li').first().attr('id','selected-track');

    // Set focus on player, so user can go right ahead with key-inputs:
    $('#playlist-container audio')[0].focus();

    // Apply event-listeners to initial player:
    $('#playlist-container audio')[0].addEventListener("playing", applyVisualClass);
    $('#playlist-container audio')[0].addEventListener("pause", removeVisualClass);
    $('#playlist-container audio')[0].addEventListener("ended", removeVisualClass);
    $('#playlist-container audio')[0].addEventListener("ended", startNextSong);

} // Create playlist, if playlist-view is selected on a folder:
if ($('.template-adi_playlist_view').length > 0) {
createPlaylist($('#content-core'));
}


/*


    USER-INTERACTIONS


*/

// Previous-button-click:
$('#playlist-backward-button').click(function() {
    // Is not first song:
    if( $('#playlist-container li:first-child').attr('id') != 'selected-track' ) {
        // Simulate click on previous playlist-entry:
        $('#playlist-container #selected-track').prev().click().focus();
    }
    // Is first song, go to last song:
    else {
        $('#playlist-container li:last-child').click().focus();
    }
    // Focuspocus was for making the scrollbar go along 
    // with the selected track, let's switch it back to the button:
    $(this).focus();
});
// Forward-button-click:
$('#playlist-forward-button').click(function() {
    // Is not last song:
    if( $('#playlist-container li:last-child').attr('id') != 'selected-track' ) {
        // Simulate click on next playlist-entry:
        $('#playlist-container #selected-track').next().click().focus();
    }
    // Is last song and user selected loop-button:
    else {
        $('#playlist-container li:first-child').click().focus();
    }
    // Focuspocus was for making the scrollbar go along 
    // with the selected track, let's switch it back to the button:
    $(this).focus();
});
// Loop-list-infinitely-button:
$('#playlist-loop').click(function() {
    $(this).toggleClass('loop');
});
// Open playlist (arrow-down):
$('#show-playlist').click(function() {
    $('#playlist-container ul').toggle();
    // Toggle arrow down to up and vice versa:
    if($('#playlist-container ul').css('display') != 'block') {
        $('#show-playlist').text('\u25BC').css('margin-top','0');
    }
    else {
        $('#show-playlist').text('\u25B2').css('margin-top','-2px');
    }
});

// A key has been pressed and focus is inside the playlist:
$('#playlist-container').keypress(function(e) {

    // Spacebar:
    if (e.which == 32) {

	// Focus is in audio-ele:
        if (e.target.id == 'playlist-player') {

	    // Agent is not Firefox:
            if( navigator.userAgent.indexOf('Firefox') == -1 ) {

		// Toggle play/pause:
		if(isPlaying()) {
		    $('#playlist-container audio')[0].pause();
		}
		else {
		    $('#playlist-container audio')[0].play();
		}
	    }
        }
        
	// Focus is not audio-ele:
	else {
		// Toggle play/pause:
		if(isPlaying()) {
		    $('#playlist-container audio')[0].pause();
		}
		else {
		    $('#playlist-container audio')[0].play();
		}
	}
    
    }
    
    // Enter-key:
    if(e.which == 13) { 
        // Simulate a click on focused ele, to activate it:
        $(document.activeElement).click();
    }

}); // End of keypress in playlist.


/*

    LISTENTRY CLICK

*/

$('#playlist-container li').click(function() {
    
    // Is selected-track, just switch play/pause:
    if($(this).attr('id')=='selected-track') {
       if(isPlaying()) {
            $('#playlist-container audio')[0].pause(); 
       }
       else {
           $('#playlist-container audio')[0].play();
       }
    }

    // Clicked on another track, than selected-track:
    else {
        // Get new audio target:
        medium_source = $(this).attr('src');
        // Remove old player:
        $('#playlist-container audio').remove(); // will fire pause after play of next player!
        // Insert new player:
        $('#playlist-container').prepend('<audio id="playlist-player" autobuffer controls><source src="' + medium_source + '" /></audio>');
        // Start play:
        $('#playlist-container audio')[0].play();
        // Update selected-track song in playlist (toggle):
        $('#playlist-container #selected-track').removeAttr('id');
        $(this).attr('id','selected-track');
        $('#playlist-container li').each(function(index) {
            // Update displayed songnumber in player:
            if( $(this).attr('id') == 'selected-track') {
                if(String(index+1).length > 1) {
                    $('#playlist-number-current').text(index+1);
                }
                // Prepend zero for single digits (max is 99, then):
                else {
                    index += 1;
                    index = String(index);
                    index = '0'+index;
                    $('#playlist-number-current').text(index);
                }
            }
        }); // each
        // Update displayed title in player:
        $('#playlist-medium-title').text($(this).text());
        // Apply event-listener to freshly created player:
        $('#playlist-container audio')[0].addEventListener("playing", applyVisualClass);
        $('#playlist-container audio')[0].addEventListener("pause", removeVisualClass);
        $('#playlist-container audio')[0].addEventListener("ended", removeVisualClass);
        $('#playlist-container audio')[0].addEventListener("ended", startNextSong);
    } // else: clicked new track
        // Get the length of title for out ticker-display:
        // TITLE TICKER: Tick, if title-length overflows available display-width:
        // Problem: Once triggered, animation continues also when changing song and title is short.
        // Also my machine gets bronchitis when executing this, seems to be heavy calculations.
/*
        if($('#playlist-medium-title').width() >= $('#playlist-ticker').width()) {
            $('#playlist-ticker').prepend('<style>\
#playlist-medium-title {\
    animation: ticker 27s linear infinite;\
}\
@keyframes ticker {\
    0%   {text-indent: 0;}\
    25%   {text-indent: 0;}\
    62.25% {text-indent: -' +  $("#playlist-medium-title").width() + 'px;}\
    62.27% {text-indent: ' + $("#playlist-medium-title").width() + 'px;}\
    100% {text-indent: 0;}\
}\
</style>');
        }
*/
}); // Click playlist-item ended.

    }); //doc ready


})(jQuery); // Ende
