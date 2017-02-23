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