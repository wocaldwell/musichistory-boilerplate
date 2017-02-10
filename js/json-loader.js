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