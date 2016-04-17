$(document).ready(function() {
    var $_GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        $_GET[decode(arguments[1])] = decode(arguments[2]);
    });

    var urlDegrees = "https://people.rit.edu/~sarics/web_proxy.php?path=degrees";
    var degree = $_GET['degree'];
    var level = "";
    var degreeContainer = $('#degree-content');
    var html = "";

    var jqxhr = $.getJSON(urlDegrees)
    .done(function(data) {
        var undergradDegrees = data.undergraduate;
        $.each(undergradDegrees, function(i, undergrad) {
            var name = undergrad.degreeName;

            if (name == degree) {
                level = "Undergraduate";
                var title = undergrad.title;
                var desc = undergrad.description;
                var concentrations = undergrad.concentrations;

                html = "<h2>" + level + "</h2><h1>" + title + "</h1><p>" + desc + "</p><h3>Concentrations</h3><ul>";
                $.each(concentrations, function(i, concentration) {
                    html += "<li>" + concentration + "</li>";
                })
                html += "</ul>";
            }
        });

        var gradDegrees = data.graduate;

        $.each(gradDegrees, function(i, grad) {
            var name = grad.degreeName;

            if (name == degree) {
                level = "Graduate";
                var title = grad.title;
                var desc = grad.description;
                var concentrations = grad.concentrations;

                html = "<h2>" + level + "</h2><h1>" + title + "</h1><p>" + desc + "</p><h3>Concentrations</h3><ul>";
                $.each(concentrations, function(i, concentration) {
                    html += "<li>" + concentration + "</li>";
                })
                html += "</ul>";
            }
        });

        degreeContainer.html(html);
    })
    .fail(function() {
        console.log("error loading json stream from " + urlDegrees);
    });
});
