var urlAbout = "https://people.rit.edu/~sarics/web_proxy.php?path=about";
var urlNews = "https://people.rit.edu/~sarics/web_proxy.php?path=news";
var urlFooter = "https://people.rit.edu/~sarics/web_proxy.php?path=footer";
var urlDegrees = "https://people.rit.edu/~sarics/web_proxy.php?path=degrees";
var urlMinors = "https://people.rit.edu/~sarics/web_proxy.php?path=minors";

$(document).ready(function() {
    loadAbout();
    loadDegrees();
    loadMinors();
    loadNews();
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
        quoteContainer.html("<h1>TESTIMONY</h1><p id='quote'><i id='quote-left' class='fa fa-quote-left fa-2x'></i>" + quote + "<i id='quote-right' class='fa fa-quote-right fa-2x'></i></p><p>" + author + "</p>");
    })
    .fail(function() {
        console.log("error loading json stream from " + urlAbout);
    });
    jqxhr.complete(function() {

    });
}

function loadDegrees() {
    var degreeContainer = $('#index-degree-content');

    var jqxhr = $.getJSON(urlDegrees)
    .done(function(data) {
        var undergraduates = data.undergraduate;
        var graduates = data.graduate;
        var count = 0;
        var undergradHtml = "<h1>UNDERGRADUATE DEGREES</h1><div class='split-container'>";

        $.each(undergraduates, function(i, undergrad) {
            var name = undergrad.degreeName;
            var title = undergrad.title;

            undergradHtml += "<div class='third'><a class='degrees-link' href='degrees.html?degree=" + name + "'><h2>" + title + "</h2></a></div>";
        });

        undergradHtml += "</div>";
        var gradHtml = "<h1>GRADUATE DEGREES</h1><div class='split-container'>";

        $.each(graduates, function(i, grad) {
            var name = grad.degreeName;
            var title = grad.title;

            if (title != null) {
                gradHtml += "<div class='third'><a class='degrees-link' href='degrees.html?degree=" + name + "'><h2>" + title + "</h2></a></div>";
            }
        });

        gradHtml += "</div>";

        degreeContainer.html(undergradHtml);
        degreeContainer.append(gradHtml);
    })
    .fail(function() {
        console.log("error loading json stream from " + urlDegrees);
    });
}

function loadMinors() {
    var degreeContainer = $('#index-degree-content');

    var jqxhr = $.getJSON(urlMinors)
    .done(function(data) {
        var minors = data;
        var count = 0;
        var html = "<h1>MINORS</h1><div class='split-container' style='margin-bottom: 33px;'>";

        $.each(minors, function(i, minor) {
            count ++;
            if (count != 1 && count % 4 == 1) {
                html += "</div><div class='split-container' style='margin-bottom: 33px;'>";
            }

            var name = minor.name;
            var title = minor.title;
            var desc = minor.description;
            var courses = minor.courses;
            var note = minor.note;

            html += "<div class='fourth minors'><a class='minors-link' href='minors.html?minor=" + name + "'><h2>" + title + "</h2></a></div>";
        });

        html += "</div>";
        degreeContainer.append(html);
    })
    .fail(function() {
        console.log("error loading json stream from " + urlMinors);
    });
}

function loadNews() {
    var newsContainter = $('#index-news-content');

    var jqxhr = $.getJSON(urlNews)
    .done(function(data) {
        var year = data.year;
        var html = "<h1>NEWS</h1><div class='slider'>";

        $.each(year, function(i, news) {
            var date = news.date;
            var title = news.title;
            var desc = news.description.substring(0,244) + "...";

            html += "<a data-remodal-target='modal' href='#'><div class='news-item'><h2 class='news-title'>" + title + "</h2><p class='news-date'>" + date + "</p><p class='news-desc'>" + desc + "</p></div></a>";
        });

        html += "</div>";
        newsContainter.html(html);
    })
    .fail(function() {
        console.log("error loading json stream from " + urlNews);
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
