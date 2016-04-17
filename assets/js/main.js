var urlFooter = "https://people.rit.edu/~sarics/web_proxy.php?path=footer";

$(document).ready(function() {
    loadFooter();
});

function loadFooter() {
    var copyrightContainer = $('#footer-copyright');
    var newsContainer = $('#footer-news');
    var linksContainer = $('#footer-links');
    var socialContainer = $('#footer-social');

    var jqxhr = $.getJSON(urlFooter)
    .done(function(data) {
        var copyright = data.copyright.html;
        var news = data.news;
        var links = data.quickLinks;

        copyrightContainer.html(copyright);
        newsContainer.html("<h1>NEWS</h1><p><a href='" + news + "'>View News</a></p>");
        linksContainer.html("<h1>QUICK LINKS</h1>");
        $.each(links, function(i, link) {
            linksContainer.append("<a href='http://" + link.href + "'>" + link.title + "</a><br>");
        });
        socialContainer.html("<h1>SOCIAL MEDIA</h1>");
    })
    .fail(function() {
        console.log("error loading json stream from " + urlFooter);
    });
    jqxhr.complete(function() {

    });
}
