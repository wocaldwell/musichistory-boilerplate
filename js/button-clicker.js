"use strict";

var SongList = (function(buttonClicker) {

    buttonClicker.buttonClick = function() {
        var moreButton = document.getElementById("more-button");
        if (event.target.classList.contains("remove-button")) {
            // Clicking on remove button removes song
            event.target.parentElement.remove();
        } if (event.target === moreButton) {
            // Clicking on more button shows more songs
            SongList.populateMoreSongs();
        }
    };
    return buttonClicker;
})(SongList || {});
