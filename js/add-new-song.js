"use strict";

let loader = require("./json-loader.js"),
    songsWithSongAdded = loader.getSongs();

// function to add music to songs array and DOM
function addSongToSongs() {
    // variable to store the new song
    var songToAdd = {};
    songToAdd.song = $("#addSongName").val();
    songToAdd.artist = $("#addArtistName").val();
    songToAdd.album = $("#addAlbumName").val();
    songToAdd.genre = $("#addGenreName").val();
    // add the new song object to the array of songs
    songsWithSongAdded.push(songToAdd);
    console.log('new songs array = ', songsWithSongAdded);
    // populate song to top of "selections" div
    $("#selections").prepend(`<div class='song'>
                                <h2>${songToAdd.song}</h2>
                                <p>${songToAdd.artist}</p>
                                <p>${songToAdd.album}</p>
                                <p>${songToAdd.genre}</p>
                                <button type="button" class="btn btn-default remove-button">Remove</button>
                            </div>`);
    // Clicking on remove button removes song; listener and function
    $(".remove-button").click(function(){
        $(this).closest("div").remove();
    });
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
