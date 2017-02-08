"use strict";

var SongList = (function(songPopulator) {
    var mainContent = document.getElementById("selections");
    var songs = [];
    var moreSongs = [];
    songPopulator.loadSongs = function(callback) {
        // load initial songs to songs array
        var songLoader = new XMLHttpRequest();
        songLoader.open("GET", "songs.json");
        songLoader.send();
        songLoader.addEventListener("error", function(event) {
            console.log("There was an error loading songs.json");
        });
        songLoader.addEventListener("load", function(event) {
            var songsData = JSON.parse(event.target.responseText);
            for (var i in songsData) {
                songs.push(songsData[i]);
            }
            console.log(songs);
            callback(songsData);
        });
        // load more songs to moreSongs array
        var moreSongLoader = new XMLHttpRequest();
        moreSongLoader.open("GET", "more-songs.json");
        moreSongLoader.send();
        moreSongLoader.addEventListener("error", function(event) {
            console.log('There was an error loading more-songs.json');
        });
        moreSongLoader.addEventListener("load", function(event) {
            var moreSongsData = JSON.parse(event.target.responseText);
            for (var i in moreSongsData) {
                moreSongs.push(moreSongsData[i]);
            }
        });

    };

    songPopulator.populateSongs = function() {
        for (var i = 0; i < songs.length; i++) {
            var songsSong = songs[i];
            mainContent.innerHTML += `  <div class='song'>
                                            <h2>${songsSong.song}</h2>
                                            <p>${songsSong.artist}</p>
                                            <p>${songsSong.album}</p>
                                            <p>${songsSong.genre}</p>
                                            <button type="button" class="remove-button">Remove</button>
                                        </div>`;
        }
        mainContent.innerHTML += `<button type="button" id="more-button" >More ></button>`;
    };

    songPopulator.populateMoreSongs = function() {
        var theMoreButton = mainContent.lastElementChild;
        mainContent.removeChild(theMoreButton);
        for (var i = 0; i < moreSongs.length; i++) {
            var songsSong = moreSongs[i];
            mainContent.innerHTML +=  ` <div class='song'>
                                            <h2>${songsSong.song}</h2>
                                            <p>${songsSong.artist}</p>
                                            <p>${songsSong.album}</p>
                                            <p>${songsSong.genre}</p>
                                            <button type="button" class="remove-button">Remove</button>
                                        </div>`;
        }
        mainContent.innerHTML += `<button type="button" id="more-button" >More ></button>`;
    };

// Hide and show divs based on clicking "Add Music"
$("#addMusic").click(showAdd);

function showAdd() {
    $("#addMusicView").show();
    $("#listMusicView").hide();
}


// // Once the user fills out the song form and clicks the add button, you should collect all values from the input fields, add the song to your array of songs
$("#addButton").click(addSongToSongs);

function addSongToSongs() {
    // variable to store the new song
    var songToAdd = {};
    songToAdd.song = $("#addSongName").val();
    songToAdd.artist = $("#addArtistName").val();
    songToAdd.album = $("#addAlbumName").val();
    // add the new song object to the array of songs
    songs.push(songToAdd);
    // clear out the selections div
    $("#selections").html("");
    // repopulate the selections div with the array that includes the new song
    songPopulator.populateSongs();
    // clear the input fields
    $("#addSongName").val("");
    $("#addArtistName").val("");
    $("#addAlbumName").val("");
    // switch to the "List Music view"
    $("#addMusicView").hide();
    $("#listMusicView").show();
}
    return songPopulator;
})(SongList || {});
SongList.loadSongs(SongList.populateSongs);







