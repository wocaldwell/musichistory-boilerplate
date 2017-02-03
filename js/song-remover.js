"use strict";

var SongList = (function(songRemover) {
    songRemover.removeSong = function() {
        console.log("event.target = ", event.target);
        console.log("event.currentTarget = ", event.currentTarget);
        event.target.parentElement.remove();
    };
    return songRemover;
})(SongList || {});
