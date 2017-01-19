var songs = [
"Legs > by Z*ZTop on the album Eliminator",
"The Logical Song > by Supertr@amp on the album Breakfast in America",
"Another Brick in the Wall > by Pink Floyd on the album The Wall",
"Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction",
"Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill"
];

// ADDING A SONG STRING TO THE BEGGINING AND END OF ARRAY

function addSomeSongs() {
    songs.unshift("AFK > by Pinback on the album Summer in Abaddon");
    songs.push("Lonesome > by Dr. Dog on the album Be the Void");
    // console.log(songs);
    return songs;
}

addSomeSongs();

// REMOVING IRRERULAR CHARACTERS AND REPLACING ">" WITH "-"

//Variable to store the edited songs
var editedSongs = [];
//Variable to store edited song string
var charsOnlySong = "";
//Upper and lower bounds for upper case characters
var lowerBoundUpper = "A".charCodeAt(0);
var upperBoundUpper = "Z".charCodeAt(0);
//Upper and lower bounds for lower case characters
var lowerBoundLower = "a".charCodeAt(0);
var upperBoundLower = "z".charCodeAt(0);


for (var i = 0; i < songs.length; i++) {
    for (var j = 0; j < songs[i].length; j++) {
        var currentSong = songs[i];
        var charToAdd = currentSong[j];
        var charToCheck = currentSong.charCodeAt(j);
        if (charToCheck >= lowerBoundUpper && charToCheck <= upperBoundUpper) {
            charsOnlySong += charToAdd;
        } else if (charToCheck >= lowerBoundLower && charToCheck <= upperBoundLower) {
            charsOnlySong += charToAdd;
        } else if (charToAdd == " ") {
            charsOnlySong += charToAdd;
        } else if (charToAdd == "&") {
            charsOnlySong += charToAdd;
        } else if (charToAdd == ">") {
            charsOnlySong += "-";
        } else {
            continue;
        }
    }
    editedSongs.push(charsOnlySong);
    charsOnlySong = "";
    // console.log(editedSongs);
}

// ADDING SONGS TO "MAIN CONTENT" DIV OF index.html

//*********This technically is what the asignment called for*********

// songs = editedSongs;
// var mainContent = document.getElementById("selections");

// for (var i = 0; i < songs.length; i++) {
//     mainContent.innerHTML = mainContent.innerHTML + "<h2>" + songs[i] + "</h2>";
// }

//********But this made it formatted like the mock-up!!!************

songs = editedSongs;
var mainContent = document.getElementById("selections");

function addAllSongs() {
    for (var i = 0; i < songs.length; i++) {
        var currentSong = songs[i];
        var firstSplit = currentSong.split(" - by ");
        var songName = firstSplit[0];
        var firstRemainder = firstSplit[1];
        var secondSplit = firstRemainder.split(" on the album ");
        var artist = secondSplit[0];
        var album = secondSplit[1];
        mainContent.innerHTML = mainContent.innerHTML + "<div class='song'><h2>" + songName + "</h2><p>" + artist + "</p><p>" + album + "</p><p>Genre</p></div>";
    }
}

addAllSongs();


// Hide and show divs based on click
var addMusicLink = document.getElementById("addMusic");
addMusicLink.addEventListener('click', showAdd);

function showAdd() {
    if (addMusicView.style.display === "none") {
            addMusicView.style.display = "block";
            listMusicView.style.display = "none";
    } else {
        addMusicView.style.display = "none";
        listMusicView.style.display = "block";
    }
}


// Once the user fills out the song form and clicks the add button, you should collect all values from the input fields, add the song to your array of songs
var addButton = document.getElementById("addButton");
addButton.addEventListener('click', addSongToSongs);

function addSongToSongs() {
    var song = document.getElementById("addSongName").value;
    var artist = document.getElementById("addArtistName").value;
    var album =document.getElementById("addAlbumName").value;
    var songToAdd = song + " - by " + artist + " on the album " + album;
    songs.push(songToAdd);
    console.log(songs);
}




