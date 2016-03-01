/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/

$(document).ready(function() {

    $('body').on('search', function(event) {
        var searchedString = event.searchString;
        searchedString = searchedString.replace(' ', '+');
        $.ajax({
            url: "http://rack36.cs.drexel.edu/getpageid/?q=" + searchedString,
            type: "GET",
            async: false,
            success: function (response) {
                var searchedItem = JSON.parse(response);
                console.log('\n\n');
                console.log('Searched: ' + searchedItem.title);
                console.log('ID: ' + searchedItem.pageid);
            }
        });
    });
})