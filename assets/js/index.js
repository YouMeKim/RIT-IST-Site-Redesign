var urlAbout = "https://people.rit.edu/~sarics/web_proxy.php?path=about";

$(document).ready(function() {
    loadAbout();
});

function loadAbout() {
    var aboutContainter = $('#index-about-content');
    var quoteContainer = $('#index-quote-content');

    var jqxhr = $.getJSON(urlAbout)
    .done(function(data) {
        var title = data.title;
        var desc = data.description;
        var quote = data.quote;
        var author = data.quoteAuthor;

        aboutContainter.html("<h1>Information Sciences and Technology at RIT</h1><h2>" + title + "</h2><p>" + desc + "</p>");
        quoteContainer.html("<p id='quote'><i id='quote-left' class='fa fa-quote-left fa-2x'></i>" + quote + "<i id='quote-right' class='fa fa-quote-right fa-2x'></i></p><p>" + author + "</p>");
    })
    .fail(function() {
        console.log("error loading json stream from " + urlAbout);
    });
    jqxhr.complete(function() {

    });
}
