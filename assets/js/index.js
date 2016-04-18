var urlAbout = "https://people.rit.edu/~sarics/web_proxy.php?path=about";
var urlDegrees = "https://people.rit.edu/~sarics/web_proxy.php?path=degrees";
var urlMinors = "https://people.rit.edu/~sarics/web_proxy.php?path=minors";
var urlCourses = "https://people.rit.edu/~sarics/web_proxy.php?path=courses";
var urlCourse = "https://people.rit.edu/~sarics/web_proxy.php?path=course";
var urlResources = "https://people.rit.edu/~sarics/web_proxy.php?path=resources";
var urlEmployment = "https://people.rit.edu/~sarics/web_proxy.php?path=employment";
var urlResearch = "https://people.rit.edu/~sarics/web_proxy.php?path=research";
var urlMap = "http://www.ist.rit.edu/api/map/";
var urlPeople = "https://people.rit.edu/~sarics/web_proxy.php?path=people";
var urlNews = "https://people.rit.edu/~sarics/web_proxy.php?path=news";
var urlContactForm = "https://people.rit.edu/~sarics/web_proxy.php?path=contactForm";
var urlFooter = "https://people.rit.edu/~sarics/web_proxy.php?path=footer";

var modalContainer;

$(document).ready(function() {
    modalContainer = $('#modals');

    $.when(loadAbout(), loadDegrees(), loadMinors(), loadCourses(), loadCourse(), loadResources(), loadCoop(), loadResearch(), loadPeople(), loadNews(), loadSocial(), loadContactForm()).done(function() {
        $.getScript("assets/js/remodal.js");
    });

    /*
    $('a').click(function() {
        var parts = $(this).href.split("/");
        var href = parts[parts.length - 1];

        if (href.length > 1) {
            var target = $(href);

            $('html,body').animate({scrollTop: target.offset().top}, 1000);
        }
    });
    */

    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                    return false;
                }
            }
        });
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

            var courseCode = name;
            switch (name) {
                case "wmc":
                    courseCode = "BSWMC";
                    break;
                case "hcc":
                    courseCode = "BSHCC";
                    break;
                case "cit":
                    courseCode = "BSCIT";
                    break;
            }

            undergradHtml += "<div class='third'><a class='degrees-link' data-remodal-target='" + name + "' href='#'><h2>" + title + "</h2></a></div>";

            var modalContent = "<p>" + desc + "</p><h3 class='left'>Concentrations</h3><ul>";
            $.each(concentrations, function (i, concentration) {
                modalContent += "<li class='left'>" + concentration + "</li>";
            });
            modalContent += "</ul><h3><a data-remodal-target='" + courseCode + "' href='#'>View All Courses</a></h3>";
            createModal(name, title, modalContent);
        });

        undergradHtml += "</div>";
        var gradHtml = "<h1>GRADUATE DEGREES</h1><div class='split-container'>";

        $.each(graduates, function(i, grad) {
            var name = grad.degreeName;
            var title = grad.title;
            var desc = grad.description;
            var concentrations = grad.concentrations;

            var courseCode = name;
            switch (name) {
                case "ist":
                    courseCode = "MSIT";
                    break;
                case "hci":
                    courseCode = "MSHCI";
                    break;
                case "nsa":
                    courseCode = "MSNSA";
                    break;
            }

            if (title != null) {
                gradHtml += "<div class='third'><a class='degrees-link' data-remodal-target='" + name + "' href='#'><h2>" + title + "</h2></a></div>";
            }

            var modalContent = "<p>" + desc + "</p><h3 class='left'>Concentrations</h3><ul>";
            $.each(concentrations, function (i, concentration) {
                modalContent += "<li class='left'>" + concentration + "</li>";
            });
            modalContent += "</ul><h3><a data-remodal-target='" + courseCode + "' href='#'>View All Courses</a></h3>";
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

            var courseCode = name;
            switch (name) {
                case "DBDDI-MN":
                    courseCode = "DBDDIMN";
                    break;
                case "GIS-MN":
                    courseCode = "GISMN";
                    break;
                case "MEDINFO-MN":
                    courseCode = "MEDINFOMN";
                    break;
                case "MDDEV-MN":
                    courseCode = "MDDEVMN";
                    break;
                case "MDEV-MN":
                    courseCode = "MDEVMN";
                    break;
                case "NETSYS-MN":
                    courseCode = "NETSYSMN";
                    break;
                case "WEBDD-MN":
                    courseCode = "WEBDDMN";
                    break;
                case "WEBD-MN":
                    courseCode = "WEBDMN";
                    break;
            }

            html += "<div class='fourth minors'><a class='minors-link' data-remodal-target='" + name + "' href='#'><h2>" + title + "</h2></a></div>";

            var modalContent = "<p>" + desc + "</p><h3 class='left'>Required Courses</h3><ul>";
            $.each(courses, function(i, course) {
                modalContent += "<li class='left'>" + course + "</li>";
            });
            modalContent+= "</ul><h3><a data-remodal-target='" + courseCode + "' href='#'>View All Courses</a></h3><p class='note'>" + note + "</p>";

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

function loadCourses() {
    // urlCourses

    var jqxhr = $.getJSON(urlCourses)
    .done(function(data) {
        $.each(data, function(i, course) {
            var courseContent = "<p class='note'>" + course.semester + "</p><ul class='courses'>";
            $.each(course.courses, function(i, cor) {
                courseContent += "<li>" + cor + "</li>";
            });
            courseContent += "</ul>";
            createModal(course.degreeName, course.degreeName + " Courses", courseContent);
        });
    })
    .fail(function() {
        console.log("error loading json stream from " + urlCourses);
    });

    return jqxhr;
}

function loadCourse() {
    var jqxhr = $.getJSON(urlCourse)
    .done(function(data) {
        $.each(data, function(i, course) {
            var courseContent = "<p class='note'>" + course.courseID + "</p><p>" + course.description + "</p>";
            createModal(course.courseID, course.title, courseContent);
        });
    })
    .fail(function() {
        console.log("error loading json stream from " + urlCourse);
    });

    return jqxhr;
}

function loadResources() {
    var resourcesContainer = $('#index-resources-content');
    var html = "<h1>RESOURCES</h1>";

    var jqxhr = $.getJSON(urlResources)
    .done(function(data) {
        var studyAbroad = data.studyAbroad;
        var studentServices = data.studentServices;
        var tutorsAndLabInformation = data.tutorsAndLabInformation;
        var studentAmbassadors = data.studentAmbassadors;
        var undergraduateForms = data.forms.undergraduateForms;
        var graduateForms = data.forms.graduateForms;
        var coopEnrollment = data.coopEnrollment;

        html += "<a data-remodal-target='resource-studyAbroad' href='#'><div class='resource'><h2>" + studyAbroad.title + "</h2><p class='note'>" + studyAbroad.description + "</p></div></a>";
        createModal("resource-studyAbroad", studyAbroad.title, "<p>" + studyAbroad.description + "</p><p>" + studyAbroad.places[0].nameOfPlace + "<br><span class='note'>" + studyAbroad.places[0].description + "</span></p><p>" + studyAbroad.places[1].nameOfPlace + "<br><span class='note'>" + studyAbroad.places[1].description + "</span></p>");
        html += "<a data-remodal-target='resource-studentServices' href='#'><div class='resource'><h2>" + studentServices.title + "</h2></div></a>";
        var studentServicesContent = "<h2>" + studentServices.academicAdvisors.title + "</h2><p>" + studentServices.academicAdvisors.description + "</p><a target='_blank' href='https://www." + studentServices.academicAdvisors.faq.contentHref + "'>" + studentServices.academicAdvisors.faq.title + "</a>";
        studentServicesContent += "<h2>" + studentServices.professonalAdvisors.title + "</h2>";
        $.each(studentServices.professonalAdvisors.advisorInformation, function(i, advisor) {
            studentServicesContent += "<p><strong>" + advisor.name + "</strong><br>" + advisor.email + "<br>" + advisor.department + "</p>";
        });
        studentServicesContent += "<h2>" + studentServices.facultyAdvisors.title + "</h2><p>" + studentServices.facultyAdvisors.description + "</p>";
        studentServicesContent += "<h2>" + studentServices.istMinorAdvising.title + "</h2>";
        $.each(studentServices.istMinorAdvising.minorAdvisorInformation, function(i, advisor) {
            studentServicesContent += "<p><strong>" + advisor.title + "</strong><br>" + advisor.advisor + "<br>" + advisor.email + "</p>";
        });
        createModal("resource-studentServices", studentServices.title, studentServicesContent);
        html += "<a data-remodal-target='resource-tutorsAndLabInformation' href='#'><div class='resource'><h2>" + tutorsAndLabInformation.title + "</h2><p class='note'>" + tutorsAndLabInformation.description + "</p></div></a>";
        createModal("resource-tutorsAndLabInformation", tutorsAndLabInformation.title, "<a target='_blank' href='" + tutorsAndLabInformation.tutoringLabHoursLink + "'><h3>View Lab Hours</h3></a><p>" + tutorsAndLabInformation.description + "</p>");
        html += "<a data-remodal-target='resource-studentAmbassadors' href='#'><div class='resource'><h2>" + studentAmbassadors.title + "</h2></div></a>";
        var studentAmbassadorsContent = "<img alt='student ambassadors' src='" + studentAmbassadors.ambassadorsImageSource + "'>";
        studentAmbassadorsContent += "<a target='_blank' href='" + studentAmbassadors.applicationFormLink + "'><h2>Apply Today!</h2></a>";
        $.each(studentAmbassadors.subSectionContent, function(i, subContent) {
            studentAmbassadorsContent += "<h3>" + subContent.title + "</h3><p>" + subContent.description + "</p>";
        });
        studentAmbassadorsContent += "<p class='note'>" + studentAmbassadors.note + "</p>";
        createModal("resource-studentAmbassadors", studentAmbassadors.title, studentAmbassadorsContent);
        html += "<a data-remodal-target='resource-undergraduateForms' href='#'><div class='resource'><h2>Undergraduate Forms</h2></div></a>";
        createModal("resource-undergraduateForms", "Undergraduate Forms", "<a href='http://www.ist.rit.edu/" + undergraduateForms[0].href + "'>" + undergraduateForms[0].formName + "</a>");
        html += "<a data-remodal-target='resource-graduateForms' href='#'><div class='resource'><h2>Graduate Forms</h2></div></a>";
        var graduateFormsContent = "";
        $.each(graduateForms, function(i, form) {
            graduateFormsContent += "<a href='http://www.ist.rit.edu/" + form.href + "'>" + form.formName + "</a><br>";
        });
        createModal("resource-graduateForms", "Graduate Forms", graduateFormsContent);
        html += "<a data-remodal-target='resource-coopEnrollment' href='#'><div class='resource'><h2>" + coopEnrollment.title + "</h2></div></a>";
        var coopEnrollmentContent = "";
        $.each(coopEnrollment.enrollmentInformationContent, function(i, info) {
            coopEnrollmentContent += "<h3>" + info.title + "</h3><p class='note'>" + info.description + "</p>";
        });
        createModal("resource-coopEnrollment", coopEnrollment.title, coopEnrollmentContent);

        resourcesContainer.html(html);
    })
    .fail(function() {
        console.log("error loading json stream from " + urlResources);
    });

    return jqxhr;
}

function loadCoop() {
    var coopContainer = $('#index-coop-content');
    var htmlEmployment = "<h1>COOP PROGRAM</h1>";
    var htmlMap = "";

    // urlEmployment

    var jqxhr = $.getJSON(urlEmployment)
    .done(function(data) {
        var introduction = data.introduction;
        var degreeStatistics = data.degreeStatistics;
        var employers = data.employers;
        var careers = data.careers;
        var coopTable = data.coopTable;
        var employmentTable = data.employmentTable;

        htmlEmployment += "<p class='thinner center'>" + introduction.title + "</p><div class='split-container'>";
        $.each(introduction.content, function(i, item) {
            htmlEmployment += "<div class='half info'><h3>" + item.title + "</h3><p class='note-white'>" + item.description + "</p></div>";
        });
        htmlEmployment += "</div>";

        htmlEmployment += "<h2>" + degreeStatistics.title + "</h2><div class='split-container'>";
        $.each(degreeStatistics.statistics, function(i, stat) {
            htmlEmployment += "<div class='fourth stat'><h3>" + stat.value + "</h3><p>" + stat.description + "</p></div>";
        });
        htmlEmployment += "</div>";

        htmlEmployment += "<div class='split-container'><div class='half'><h2>" + employers.title + "</h2><p>";
        $.each(employers.employerNames, function(i, emp) {
            htmlEmployment += emp + "<br>";
        });
        htmlEmployment += "</p><a data-remodal-target='coop-employerTable' href='#'><h1>View Past Employers</h1></a></div><div class='half'><h2>" + careers.title + "</h2><p>";
        $.each(careers.careerNames, function(i, car) {
            htmlEmployment += car + "<br>";
        });
        htmlEmployment += "</p><a data-remodal-target='coop-coopTable' href='#'><h1>View Past Coops</h1></a></div></div><h2>Where Our Students Work</h2>"

        createModal("coop-employerTable", employmentTable.title, "<table id='employerTable' class='display' cellspacing='0' width='100%'><thead><tr><th>Employer</th><th>Degree</th><th>City</th><th>Title</th><th>Start Date</th></tr></thead><tfoot><tr><th>Employer</th><th>Degree</th><th>City</th><th>Title</th><th>Start Date</th></tr></tfoot></table>");
        createModal("coop-coopTable", coopTable.title, "<table id='coopTable' class='display' cellspacing='0' width='100%'><thead><tr><th>Employer</th><th>Degree</th><th>City</th><th>Term</th></tr></thead><tfoot><tr><th>Employer</th><th>Degree</th><th>City</th><th>Term</th></tr></tfoot></table>");

        $('#employerTable').DataTable({
            "ajax" : {
                url : urlEmployment,
                dataSrc : 'employmentTable.professionalEmploymentInformation'
            },
            "columns" : [
                {"data" : "employer"},
                {"data" : "degree"},
                {"data" : "city"},
                {"data" : "title"},
                {"data" : "startDate"}
            ]
        });

        $('#coopTable').DataTable({
            "ajax" : {
                url : urlEmployment,
                dataSrc : 'coopTable.coopInformation'
            },
            "columns" : [
                {"data" : "employer"},
                {"data" : "degree"},
                {"data" : "city"},
                {"data" : "term"}
            ]
        });

        coopContainer.append(htmlEmployment);
    })
    .fail(function() {
        console.log("error loading json stream from " + urlEmployment);
    });

    return jqxhr;
}

function loadResearch() {
    var researchContainer = $('#index-research-content');
    var html = "<h1>RESEARCH</h1><div class='split-container'>";

    var jqxhr = $.getJSON(urlResearch)
    .done(function(data) {
        var interests = data.byInterestArea;
        var faculty = data.byFaculty;

        $.each(interests, function(i, interest) {
            if (i % 4 == 0) {
                html += "</div><div class='split-container'>";
            }
            html += "<div class='fourth research'><a data-remodal-target='research-" + interest.areaName + "' href='#'>" + interest.areaName + "</a></div>";
            var interestContent = "<p class='citation'>";
            $.each(interest.citations, function (i, cit) {
                interestContent += cit + "</p><p class='citation'>";
            });
            interestContent += "</p>"
            createModal("research-" + interest.areaName, interest.areaName, interestContent);
        });

        html += "</div>";

        $.each(faculty, function(i, fac) {
            var facContent = "<p class='citation'>";
            $.each(fac.citations, function (i, cit) {
                facContent += cit + "</p><p class='citation'>";
            });
            facContent += "</p>";
            createModal("research-" + fac.username, "Research lead by " + fac.facultyName, facContent);
        });

        researchContainer.html(html);
    })
    .fail(function() {
        console.log("error loading json stream from " + urlResearch);
    });

    return jqxhr;
}

function loadPeople() {
    var peopleContainer = $('#index-people-content');
    var html = "<h1>STAFF</h1><div class='split-container'>";

    var jqxhr = $.getJSON(urlPeople)
    .done(function(data) {
        var staffs = data.staff;
        var faculties = data.faculty;

        $.each(staffs, function(i, staff) {
            if (i % 5 == 0) {
                html += "</div><div class='split-container'>";
            }
            html += "<div class='fifth person'><a data-remodal-target='" + staff.username + "' href='#'><p><strong>" + staff.name + "</strong><br>" + staff.title + "</p></a></div>";
            var staffContent = "<img alt='img' src='" + staff.imagePath + "'>";
            staffContent += "<p class='note'>" + staff.title + " " + staff.tagline + "</p><table>";
            staffContent += "<tr><td><strong>Office</strong></td><td>" + staff.office + "</td></tr>";
            staffContent += "<tr><td><strong>Website</strong></td><td> " + staff.website + "</td></tr>";
            staffContent += "<tr><td><strong>Phone</strong></td><td> " + staff.phone + "</td></tr>";
            staffContent += "<tr><td><strong>Email</strong></td><td> " + staff.email + "</td></tr>";
            staffContent += "<tr><td><strong>Twitter</strong></td><td> " + staff.twitter + "</td></tr>";
            staffContent += "<tr><td><strong>Facebook</strong></td><td> " + staff.facebook + "</td></tr>";
            staffContent += "</table><p class='note'>" + staff.interestArea + "</p>";
            createModal(staff.username, staff.name, staffContent);
        });

        html += "</div><h1>FACULTY</h1><div class='split-container'>";

        $.each(faculties, function(i, faculty) {
            if (i % 5 == 0) {
                html += "</div><div class='split-container'>";
            }
            html += "<div class='fifth person'><a data-remodal-target='" + faculty.username + "' href='#'><p><strong>" + faculty.name + "</strong><br>" + faculty.title + "</p></a></div>";
            var facultyContent = "<img alt='img' src='" + faculty.imagePath + "'>";
            facultyContent += "<p class='note'>" + faculty.title + " " + faculty.tagline + "</p><table>";
            facultyContent += "<tr><td><strong>Office</strong></td><td>" + faculty.office + "</td></tr>";
            facultyContent += "<tr><td><strong>Website</strong></td><td> " + faculty.website + "</td></tr>";
            facultyContent += "<tr><td><strong>Phone</strong></td><td> " + faculty.phone + "</td></tr>";
            facultyContent += "<tr><td><strong>Email</strong></td><td> " + faculty.email + "</td></tr>";
            facultyContent += "<tr><td><strong>Twitter</strong></td><td> " + faculty.twitter + "</td></tr>";
            facultyContent += "<tr><td><strong>Facebook</strong></td><td> " + faculty.facebook + "</td></tr>";
            facultyContent += "</table><a data-remodal-target='research-" + faculty.username + "' href='#'><h3>View Research Papers</h3></a><p class='note'>" + faculty.interestArea + "</p>";
            createModal(faculty.username, faculty.name, facultyContent);
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

function loadContactForm() {
    $('#index-contact-form-content').load(urlContactForm);

    return true;
}

function createModal(id, title, content) {
    var html = "<div class='remodal' data-remodal-id='" + id + "'><button data-remodal-action='close' class='remodal-close'></button>";
    html += "<h1>" + title + "</h1>";
    html += content + "</div>";

    modalContainer.append(html);
}
