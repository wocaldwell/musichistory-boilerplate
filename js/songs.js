"use strict";

var SongList = (function(songPopulator) {
    var songs = [];
    var mainContent = document.getElementById("selections");

    songPopulator.loadSongs = function(callback) {
        var songLoader = new XMLHttpRequest();
        songLoader.open("GET", "songs.json");
        songLoader.send();
        songLoader.addEventListener("error", function(event) {
            console.log("There was an error loading");
        });
        songLoader.addEventListener("load", function(event) {
            var songsData = JSON.parse(event.target.responseText);
            for (var i in songsData) {
                songs.push(songsData[i]);
            }
            callback(songsData);
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
    };

    return songPopulator;
})(SongList || {});
SongList.loadSongs(SongList.populateSongs);



// Hide and show divs based on click
var addMusicLink = document.getElementById("addMusic");
var listMusicLink = document.getElementById("listMusic");
addMusicLink.addEventListener('click', showAdd);


function showAdd() {
    console.log(addMusicLink);
    if (addMusicView.style.display === "none") {
            addMusicView.style.display = "block";
            listMusicView.style.display = "none";
            addMusicLink.classList.add("selected"); // for link styling
            listMusicLink.classList.remove("selected"); // for link styling
    } else {
        addMusicView.style.display = "none";
        listMusicView.style.display = "block";
    }
}


// Once the user fills out the song form and clicks the add button, you should collect all values from the input fields, add the song to your array of songs
var addButton = document.getElementById("addButton");
addButton.addEventListener('click', function() {
    addSongToSongs();
});

function addSongToSongs() {
    var song = document.getElementById("addSongName").value;
    var artist = document.getElementById("addArtistName").value;
    var album =document.getElementById("addAlbumName").value;
    var songToAdd = song + " - by " + artist + " on the album " + album;
    // songs.push(songToAdd);
    // console.log(songs);
}

// add the class selected to nav links for correct syling




