(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
 "use strict";

var songs = [];
var moreSongs = [];

let loadSongs = function() {
    return new Promise(function(resolve, reject) {
        // load initial songs to songs array
        $.ajax({
            url:"songs.json"
        }).done(function(result){
            $.each(result, function(iterator) {
                songs.push(result[iterator]);
            });
            console.log('songs after ajax: ', songs);
            resolve(songs);
        }).fail(function(error) {
            reject(error);
        });
    });
};
var loadMoreSongs = function() {
    return new Promise(function(resolve, reject) {
        // load more songs to moreSongs array
        $.ajax({
            url:"more-songs.json"
        }).done(function(result){
            $.each(result, function(iterator) {
                moreSongs.push(result[iterator]);
            });
        }).fail(function(error) {
            reject(error);
        });
    });
};

function getSongs() {
    return songs;
}

function getMoreSongs() {
    return moreSongs;
}

module.exports = {loadSongs, loadMoreSongs, getSongs, getMoreSongs};
},{}],3:[function(require,module,exports){
"use strict";

// link to json-loader.js
let jsonLoader = require("./json-loader.js");

// variables to store songs arrays gotten from json-loader.js
let songs = jsonLoader.getSongs(),
    moreSongs = jsonLoader.getMoreSongs();

// function that populates DOM with songs
var populateSongs = function() {
    console.log('populateSongs initiated');
    for (var i = 0; i < songs.length; i++) {
        var songsSong = songs[i];
        $("#selections").append(`<div class='song'>
                                        <h2>${songsSong.song}</h2>
                                        <p>${songsSong.artist}</p>
                                        <p>${songsSong.album}</p>
                                        <p>${songsSong.genre}</p>
                                        <button type="button" class="remove-button">Remove</button>
                                    </div>`);
    }
    $("#selections").append(`<button type="button" id="more-button" >More ></button>`);
    // Clicking on more button shows more songs; listener
    $("#more-button").click(populateMoreSongs);
    // Clicking on remove button removes song; listener and function
    $(".remove-button").click(function(){
        $(this).closest("div").remove();
    });
};

// function that populates DOM when "More" button is clicked
var populateMoreSongs = function() {
    $("#more-button").remove();
    for (var i = 0; i < moreSongs.length; i++) {
        var songsSong = moreSongs[i];
        $("#selections").append(` <div class='song'>
                                        <h2>${songsSong.song}</h2>
                                        <p>${songsSong.artist}</p>
                                        <p>${songsSong.album}</p>
                                        <p>${songsSong.genre}</p>
                                        <button type="button" class="remove-button">Remove</button>
                                    </div>`);
    }
    $("#selections").append(`<button type="button" id="more-button" >More ></button>`);
    // Clicking on more button shows more songs; listener
    $("#more-button").click(populateMoreSongs);
    // Clicking on remove button removes song; listener and function
    $(".remove-button").click(function(){
        $(this).closest("div").remove();
    });
};

// load the songs and then populate the page
jsonLoader.loadSongs()
.then(populateSongs);
// load more songs
jsonLoader.loadMoreSongs();

// function that shows "Add Music" view
function showAdd() {
    console.log('you clicked Add Music');
    $("#addMusic").addClass("selected");
    $("#listMusic").removeClass("selected");
    $("#addMusicView").show();
    $("#listMusicView").hide();
}

// function that shows "List Music" view
function showList() {
    console.log('you clicked List Music');
    $("#addMusic").removeClass("selected");
    $("#listMusic").addClass("selected");
    $("#addMusicView").hide();
    $("#listMusicView").show();
}

module.exports = {showAdd, showList};
},{"./json-loader.js":2}],4:[function(require,module,exports){
"use strict";

let showViews = require("./show-views-handler.js"),
    addNewSongs = require("./add-new-song.js");

// Hide and show divs based on clicking "Add Music"; listener
$("#addMusic").click(showViews.showAdd);

// Hide and show divs based on clicking "Add Music"; listener
$("#listMusic").click(showViews.showList);

// Add new song to your array of songs and DOM; listener
$("#addButton").click(addNewSongs.addSongToSongs);









},{"./add-new-song.js":1,"./show-views-handler.js":3}]},{},[4]);
