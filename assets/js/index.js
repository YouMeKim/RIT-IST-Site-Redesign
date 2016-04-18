var urlAbout = "https://people.rit.edu/~sarics/web_proxy.php?path=about";
var urlNews = "https://people.rit.edu/~sarics/web_proxy.php?path=news";
var urlFooter = "https://people.rit.edu/~sarics/web_proxy.php?path=footer";
var urlDegrees = "https://people.rit.edu/~sarics/web_proxy.php?path=degrees";
var urlMinors = "https://people.rit.edu/~sarics/web_proxy.php?path=minors";
var urlPeople = "https://people.rit.edu/~sarics/web_proxy.php?path=people";

var modalContainer;

$(document).ready(function() {
    modalContainer = $('#modals');

    $.when(loadAbout(), loadDegrees(), loadMinors(), loadPeople(), loadNews(), loadSocial()).done(function(loadAbout, loadDegrees, loadMinors, loadNews, loadSocial) {
        $.getScript("assets/js/remodal.js");
    });
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
        quoteContainer.html("<h1>TESTIMONY</h1><p id='quote'><i id='quote-left' class='fa fa-quote-left fa-2x'></i><span id='quote-typist'></span><i id='quote-right' class='fa fa-quote-right fa-2x'></i></p><p>" + author + "</p>");

        jQuery(function($) {
            $('#quote-typist').typist({
                speed: 15,
                text: quote
            });
        });
    })
    .fail(function() {
        console.log("error loading json stream from " + urlAbout);
    });
    jqxhr.complete(function() {

    });

    return jqxhr;
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
            var desc = undergrad.description;
            var concentrations = undergrad.concentrations;

            undergradHtml += "<div class='third'><a class='degrees-link' data-remodal-target='" + name + "' href='#'><h2>" + title + "</h2></a></div>";

            var modalContent = "<p>" + desc + "</p><h3 class='left'>Concentrations</h3><ul>";
            $.each(concentrations, function (i, concentration) {
                modalContent += "<li class='left'>" + concentration + "</li>";
            });
            modalContent += "</ul>";
            createModal(name, title, modalContent);
        });

        undergradHtml += "</div>";
        var gradHtml = "<h1>GRADUATE DEGREES</h1><div class='split-container'>";

        $.each(graduates, function(i, grad) {
            var name = grad.degreeName;
            var title = grad.title;
            var desc = grad.description;
            var concentrations = grad.concentrations;

            if (title != null) {
                gradHtml += "<div class='third'><a class='degrees-link' data-remodal-target='" + name + "' href='#'><h2>" + title + "</h2></a></div>";
            }

            var modalContent = "<p>" + desc + "</p><h3 class='left'>Concentrations</h3><ul>";
            $.each(concentrations, function (i, concentration) {
                modalContent += "<li class='left'>" + concentration + "</li>";
            });
            modalContent += "</ul>";
            createModal(name, title, modalContent);
        });

        gradHtml += "</div>";

        degreeContainer.html(undergradHtml);
        degreeContainer.append(gradHtml);
    })
    .fail(function() {
        console.log("error loading json stream from " + urlDegrees);
    });

    return jqxhr;
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

            html += "<div class='fourth minors'><a class='minors-link' data-remodal-target='" + name + "' href='#'><h2>" + title + "</h2></a></div>";

            var modalContent = "<p>" + desc + "</p><h3 class='left'>Required Courses</h3><ul>";
            $.each(courses, function(i, course) {
                modalContent += "<li class='left'>" + course + "</li>";
            });
            modalContent+= "</ul><p class='note'>" + note + "</p>";

            createModal(name, title, modalContent);
        });

        html += "</div>";
        degreeContainer.append(html);
    })
    .fail(function() {
        console.log("error loading json stream from " + urlMinors);
    });

    return jqxhr;
}

function loadPeople() {
    var peopleContainer = $('#index-people-content');
    var html = "<h1>STAFF</h1><div class='split-container'";

    var jqxhr = $.getJSON(urlPeople)
    .done(function(data) {
        var staffs = data.staff;
        var faculties = data.faculty;

        $.each(staffs, function(i, staff) {

        });

        html += "</div><h1>FACULTY</h1><div class='split-container'>";

        $.each(faculties, function(i, faculty) {

        });

        html += "</div>";

        peopleContainer.html(html);
    })
    .fail(function() {
        console.log("error loading json stream from " + urlPeople);
    });

    return jqxhr;
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
            var desc = news.description;
            var descShort = desc.substring(0,244) + "...";

            html += "<a data-remodal-target='news" + i + "' href='#'><div class='news-item'><h2 class='news-title'>" + title + "</h2><p class='news-date'>" + date + "</p><p class='news-desc'>" + descShort + "</p></div></a>";

            var id = "news" + i;
            var content = "<p class='note'>" + date + "</p><p>" + desc + "</p>";
            createModal(id, title, content);
        });

        html += "</div>";
        newsContainter.html(html);
    })
    .fail(function() {
        console.log("error loading json stream from " + urlNews);
    });

    return jqxhr;
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

    return jqxhr;
}

function createModal(id, title, content) {
    var html = "<div class='remodal' data-remodal-id='" + id + "'><button data-remodal-action='close' class='remodal-close'></button>";
    html += "<h1>" + title + "</h1>";
    html += content + "</div>";

    modalContainer.append(html);
}
