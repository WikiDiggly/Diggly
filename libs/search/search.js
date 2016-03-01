/*!
 * search.js
 * https://github.com/sukritchhabra/searchJS
 *
 * Author: Sukrit Chhabra
 * Year: 2016
 */
$(document).ready(function() {
    var searchResult_JSON;      // Search results recieved from ajax request and used to create the search result list
    var debounceTimeout = 200;  // Global timeout for debouce.
    var searchText = "";        // Search string the user typed
    var keyupCounter = 0;       // Counter to set debounce timeout

    var selectedSearchResult = undefined;   // Final list element that is selected from the search results
    var selectedSearchString = "";          // The topic that is finally selected


    $('body').on('keyup', '.searchBar', $.debounce(function(event) {
        var keyPressed = event.keyCode;
        if (keyPressed != 37 && keyPressed != 38 && keyPressed != 39 && keyPressed != 40 && keyPressed != 13) {
            keyupCounter = keyupCounter + 1;
            if (keyupCounter%2 != 0) {
                debounceTimeout = 0;
            } else {
                debounceTimeout = 200;
            }

            $('.results').empty();
            $('.results').removeClass('active');

            searchText = $('.searchBar').val();

            if (searchText != "") {
                var searchTextForQuery = searchText.replace(' ', '+');
                /* Getting search result for the current search string in the search bar */
                $.ajax({
                    url: "http://rack36.cs.drexel.edu/suggest/?q=" + searchTextForQuery,
                    type: "GET",
                    async: false,
                    success: function (response) {
                        searchResult_JSON = JSON.parse(response);
                        console.log('recieved json:');
                        console.log(searchResult_JSON);
                    },
                    error: function (errorReport) {
                        console.log('Error happened in AJAX Request!!');
                    }
                });

                var len = searchResult_JSON.length;     // Number of search results acquired

                $('.results').addClass('active');
                for (var i = 0; i < len-1; i++) {
                    var temp = searchResult_JSON[i].title;
                    temp = searchResult_JSON[i].title.toLowerCase();
                    var tempSearchText = searchText.toLowerCase();
                    if(temp.indexOf(tempSearchText) >= 0 || searchResult_JSON[i].title.indexOf(tempSearchText) >= 0) {
                        $('.results').append('<li>' + searchResult_JSON[i].title + '</li>');
                    }
                }
            }
        }
    }, debounceTimeout));

    $('body').on('keydown', '.searchBar', function(event) {
        var keyPressed = event.keyCode;
        if (keyPressed == 37 || keyPressed == 38 || keyPressed == 39 || keyPressed == 40) {
            var numResults = $('.results li').length;
            var selectedIndex = $('.results li').index($('.selected'));

            if (keyPressed == 40) {     /* If _DOWN_ key is pressed */
                if (selectedIndex < 0) {
                    $('.results li').eq(0).addClass('selected');    // Select the new element
                    selectedIndex = 0;
                    selectedSearchResult = $('.results .selected');
                } else {
                    $('.results li').eq(selectedIndex).removeClass('selected');     // Remove Selection from previously selected element
                    $('.results li').eq((selectedIndex + 1)%numResults).addClass('selected');   // Select the new element
                    selectedIndex = (selectedIndex + 1)%numResults;
                    selectedSearchResult = $('.results .selected');
                }
            } else if (keyPressed == 38) {  /* If _UP_ key is pressed */
                if (selectedIndex == -1) {
                    $('.results li').eq(numResults - 1).addClass('selected');   // Select the new element
                    selectedIndex = numResults - 1;
                    selectedSearchResult = $('.results .selected');
                } else {
                    $('.results li').eq(selectedIndex).removeClass('selected');     // Remove Selection from previously selected element

                    if (selectedIndex < 1) {
                        $('.results li').eq( ( numResults - (Math.abs(selectedIndex-1) ) % numResults)).addClass('selected');   // Select the new element
                        selectedIndex = numResults - (Math.abs(selectedIndex-1) % numResults);
                    } else {
                        $('.results li').eq( (selectedIndex - 1) ).addClass('selected');    // Select the new element
                        selectedIndex = selectedIndex - 1;

                    }
                    selectedSearchResult = $('.results .selected');
                }
            }
        } else if (keyPressed == 13) {
            selectedSearchString = $('.results .selected').text();
            $('.searchBar').val(selectedSearchString);
            $('.results').removeClass('active');
            $('.results').empty();

            /* Creating search event */
            var searchEvent = $.Event("search");
            searchEvent.searchString = selectedSearchString;    // Adding key searchString to search event
            $('body').trigger(searchEvent);
        }
    });

    $('body').on('click', '.results li', function(event) {
        selectedSearchString = $(this).text();
        $('.searchBar').val(selectedSearchString);
        $('.results').removeClass('active');
        $('.results').empty();

        /* Creating search event */
        var searchEvent = $.Event("search");
        searchEvent.searchString = selectedSearchString;    // Adding key searchString to search event
        $('body').trigger(searchEvent);
    });
});