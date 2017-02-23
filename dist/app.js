(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./json-loader.js":3}],2:[function(require,module,exports){
"use strict";

// link json-loader.js to page
let songGetter = require("./json-loader"),
    selectorSongs = songGetter.getSongs(),
    selectorMoreSongs = songGetter.getMoreSongs();


// function that fills the selectors with the data from songs.json
function fillSelectors() {
    // function to populate artist selector
    function fillArtistSelector() {
        for (var song in selectorSongs) {
            $("#artist-seletor").append(`<option value="${selectorSongs[song].artist}">${selectorSongs[song].artist}</option>`);
        }
    }

    // function to populate Album selector
    function fillAlbumSelector() {
        for (var song in selectorSongs) {
            $("#album-selector").append(`<option value="${selectorSongs[song].album}">${selectorSongs[song].album}</option>`);
        }
    }
    fillArtistSelector();
    fillAlbumSelector();
}

// function that fills the selectors with the data from moreSongs.json
function fillMoreSelectors() {
    console.log('fillMoreSelectors initiated');
    // selectorSongs = songGetter.getMoreSongs();
    // function to populate artist selector
    function fillArtistSelector() {
        for (var song in selectorMoreSongs) {
            $("#artist-seletor").append(`<option value="${selectorMoreSongs[song].artist}">${selectorMoreSongs[song].artist}</option>`);
        }
    }

    // function to populate Album selector
    function fillAlbumSelector() {
        for (var song in selectorMoreSongs) {
            $("#album-selector").append(`<option value="${selectorMoreSongs[song].album}">${selectorMoreSongs[song].album}</option>`);
        }
    }
    fillArtistSelector();
    fillAlbumSelector();
}


// function that filters displayed songs based on user selections
function filterView() {
    $("#selections").html("");
    let selectedArtist = $("#artist-seletor").val(),
        selectedAlbum = $("#album-selector").val(),
        allSongs = selectorSongs.concat(selectorMoreSongs);
    for (var i = 0; i < allSongs.length; i++) {
        if (allSongs[i].artist === selectedArtist) {
            $("#selections").append(`<div class='song'>
                                        <h2>${allSongs[i].song}</h2>
                                        <p>${allSongs[i].artist}</p>
                                        <p>${allSongs[i].album}</p>
                                        <p>${allSongs[i].genre}</p>
                                    </div>`);
        } if (allSongs[i].album === selectedAlbum && allSongs[i].artist !== selectedArtist) {
            $("#selections").append(`<div class='song'>
                                        <h2>${allSongs[i].song}</h2>
                                        <p>${allSongs[i].artist}</p>
                                        <p>${allSongs[i].album}</p>
                                        <p>${allSongs[i].genre}</p>
                                    </div>`);
        } if (selectedArtist === "all-artists" && allSongs[i].album !== selectedAlbum || selectedAlbum === "all-albums" && allSongs[i].artist !== selectedArtist) {
            $("#selections").append(`<div class='song'>
                                        <h2>${allSongs[i].song}</h2>
                                        <p>${allSongs[i].artist}</p>
                                        <p>${allSongs[i].album}</p>
                                        <p>${allSongs[i].genre}</p>
                                    </div>`);
        }
    }
}


module.exports = {fillSelectors, fillMoreSelectors, filterView};
},{"./json-loader":3}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
"use strict";

// link to json-loader.js
let jsonLoader = require("./json-loader.js"),
    formFilter = require("./form-filter.js");

// variables to store songs arrays gotten from json-loader.js
let songs = jsonLoader.getSongs(),
    moreSongs = jsonLoader.getMoreSongs();

// function that populates DOM with songs
var populateSongs = function() {
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
    // Clicking on more button shows more songs and appends selctors; listener
    $("#more-button").click(function() {
        populateMoreSongs();
        formFilter.fillMoreSelectors();
    });
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
    // Clicking on more button shows alert; listener
    $("#more-button").click(function() {
        alert("No more songs in the database!");
    });
    // Clicking on remove button removes song; listener and function
    $(".remove-button").click(function(){
        $(this).closest("div").remove();
    });
};

// load the songs and then populate the page
jsonLoader.loadSongs()
.then(populateSongs)
.then(formFilter.fillSelectors);
// load more songs
jsonLoader.loadMoreSongs();
// .then(formFilter.fillSelectors);

// function that shows "Add Music" view
function showAdd() {
    console.log('you clicked Add Music');
    $("#addMusicLI").addClass("active");
    $("#listMusicLI").removeClass("active");
    $("#addMusicView").show();
    $("#listMusicView").hide();
}

// function that shows "List Music" view
function showList() {
    console.log('you clicked List Music');
    $("#addMusicLI").removeClass("active");
    $("#listMusicLI").addClass("active");
    $("#addMusicView").hide();
    $("#listMusicView").show();
}

module.exports = {showAdd, showList};
},{"./form-filter.js":2,"./json-loader.js":3}],5:[function(require,module,exports){
"use strict";

let showViews = require("./show-views-handler.js"),
    addNewSongs = require("./add-new-song.js"),
    formFilter = require("./form-filter.js");

// Hide and show divs based on clicking "Add Music"; listener
$("#addMusic").click(showViews.showAdd);

// Hide and show divs based on clicking "List Music"; listener
$("#listMusic").click(showViews.showList);

// Add new song to your array of songs and DOM; listener
$("#addButton").click(addNewSongs.addSongToSongs);

// filter songs button; listener
$("#filter-button").click(formFilter.filterView);

// $("#artist-seletor").click(formFilter.fillSelectors);








},{"./add-new-song.js":1,"./form-filter.js":2,"./show-views-handler.js":4}]},{},[5]);
