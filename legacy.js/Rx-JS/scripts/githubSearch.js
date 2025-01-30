var searchGitHub = function (term) {
    var params = {
        url: "http://github.com/api/v3/json/repos/search/" + encodeURI(term),
        data: "json"
    };

    return $.ajaxAsObservable(params).select(function (x) {
        return x.data.repositories;
    });
};

var textBoxChanges = $("#searchInput")
    .toObservable("keyup")
    .select(function (x) {
        return $("#searchInput").val();
    })
    .throttle(600)
    .where(function (x) {
        return /^\s*$/.test(x) !== true;
    });

var searchResult = textBoxChanges
    .select(function (x) {
        return searchGitHub(x);
    })
    .switch();

searchResult.subscribe(function (repos) {
    $("#content").empty();

    var count = 0;
    $.each(repos, function (x, value) {
        if (++count > 10) {
            return;
        }

        $("#content").append("<li><b>" + value.name + ":</b> - " + value.description + "</li>");
    });
});