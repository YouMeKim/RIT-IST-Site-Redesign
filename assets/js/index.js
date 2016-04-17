var urlAbout = "https://people.rit.edu/~sarics/web_proxy.php?path=about";
var urlFooter = "https://people.rit.edu/~sarics/web_proxy.php?path=footer";

$(document).ready(function() {
    loadAbout();
    loadSocial();
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

function loadSocial() {
    var socialContainter = $('#index-social-content');

    var jqxhr = $.getJSON(urlFooter)
    .done(function(data) {
        var tweet = data.social.tweet;
        var by = data.social.by;
        var twitter = data.social.twitter;
        var facebook = data.social.facebook;

        socialContainter.html("<p id='by'>" + by + "</p><p id='tweet'>" + tweet + "</p><p><a target='_blank' href='" + twitter + "'><i id='twitter' class='fa fa-twitter-square fa-2x'></i></a><a target='_blank' href='" + facebook + "'><i id='facebook' class='fa fa-facebook-square fa-2x'></i></a></p>");
    })
    .fail(function() {
        console.log("error loading json stream from " + urlFooter);
    });
}
