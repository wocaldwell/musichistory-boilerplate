"use strict";

let showViews = require("./show-views-handler.js"),
    addNewSongs = require("./add-new-song.js"),
    formFilter = require("./form-filter.js");

// Hide and show divs based on clicking "Add Music"; listener
$("#addMusic").click(showViews.showAdd);

// Hide and show divs based on clicking "Add Music"; listener
$("#listMusic").click(showViews.showList);

// Add new song to your array of songs and DOM; listener
$("#addButton").click(addNewSongs.addSongToSongs);

// filter songs button; listener
$("#filter-button").click(formFilter.filterView);

// $("#artist-seletor").click(formFilter.fillSelectors);







