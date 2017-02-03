"use strict";

// // Variable for songs section
var selectionsSection = document.getElementById("selections");
// add listener for clicks on various buttons in song section of DOM
selectionsSection.addEventListener("click", SongList.buttonClick, true);