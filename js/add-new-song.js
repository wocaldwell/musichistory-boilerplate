"use strict";

// function to add music to songs array and DOM
function addSongToSongs() {
    // variable to store the new song
    var songToAdd = {};
    songToAdd.song = $("#addSongName").val();
    songToAdd.artist = $("#addArtistName").val();
    songToAdd.album = $("#addAlbumName").val();
    songToAdd.genre = $("#addGenreName").val();
    // add the new song object to the array of songs
    // songs.push(songToAdd);
    // populate song to top of "selections" div
    $("#selections").prepend(`<div class='song'>
                                <h2>${songToAdd.song}</h2>
                                <p>${songToAdd.artist}</p>
                                <p>${songToAdd.album}</p>
                                <p>${songToAdd.genre}</p>
                                <button type="button" class="remove-button">Remove</button>
                            </div>`);
    // clear the input fields
    $("#addSongName").val("");
    $("#addArtistName").val("");
    $("#addAlbumName").val("");
    $("#addGenreName").val("");
    // switch to the "List Music view"
    $("#addMusicView").hide();
    $("#listMusicView").show();
    // change the styling on the links
    $("#addMusic").removeClass("selected");
    $("#listMusic").addClass("selected");
}

module.exports = {addSongToSongs};
