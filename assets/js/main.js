var urlFooter = "https://people.rit.edu/~sarics/web_proxy.php?path=footer";

$(document).ready(function() {
    loadFooter();
});

function loadFooter() {
    var copyrightContainer = $('#footer-copyright');

    var jqxhr = $.getJSON(urlAbout)
    .done(function(data) {
        var copyright = data.copyright.html;

        copyrightContainer.html(copyright);
    })
    .fail(function() {
        console.log("error loading json stream from " + urlFooter);
    });
    jqxhr.complete(function() {

    });
}
