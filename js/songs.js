"use strict";

var SongList = (function(songPopulator) {
    var songs = [];
    var moreSongs = [];
    songPopulator.loadSongs = function() {
        // load initial songs to songs array
        $.ajax({
            url:"songs.json"
        }).done(function(result){
            $.each(result, function(iterator) {
                songs.push(result[iterator]);
            });
            SongList.populateSongs();
        });

        // load more songs to moreSongs array
        $.ajax({
            url:"more-songs.json"
        }).done(function(result){
            $.each(result, function(iterator) {
                moreSongs.push(result[iterator]);
            });
        });
    };

    songPopulator.populateSongs = function() {
        // console.log('populateSongs initiated');
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
        // Clicking on more button shows more songs listener
        $("#more-button").click(SongList.populateMoreSongs);
        // Clicking on remove button removes song listener
        $(".remove-button").click(function(){
            $(this).closest("div").remove();
        });
    };

    songPopulator.populateMoreSongs = function() {
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
        // Clicking on more button shows more songs listener
        $("#more-button").click(SongList.populateMoreSongs);
        // Clicking on remove button removes song listener
        $(".remove-button").click(function(){
            $(this).closest("div").remove();
        });
    };

    // Hide and show divs based on clicking "Add Music" listener
    $("#addMusic").click(showAdd);

    function showAdd() {
        console.log('you clicked Add Music');
        $("#addMusic").addClass("selected");
        $("#listMusic").removeClass("selected");
        $("#addMusicView").show();
        $("#listMusicView").hide();
    }

    $("#listMusic").click(showList);

    function showList() {
        console.log('you clicked List Music');
        $("#addMusic").removeClass("selected");
        $("#listMusic").addClass("selected");
        $("#addMusicView").hide();
        $("#listMusicView").show();
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
    // switch to the "List Music view"
    $("#addMusicView").hide();
    $("#listMusicView").show();
    // change the styling on the links
    $("#addMusic").removeClass("selected");
    $("#listMusic").addClass("selected");
}
    return songPopulator;
})(SongList || {});
SongList.loadSongs();








