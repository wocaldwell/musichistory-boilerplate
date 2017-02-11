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