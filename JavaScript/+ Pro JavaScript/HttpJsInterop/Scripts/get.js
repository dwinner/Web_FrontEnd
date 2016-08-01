// GET-запросы с получением разных типов содержимого

function get(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var contentType = request.getResponseHeader("Content-Type");
            if (contentType.indexOf("xml") !== -1 && request.responseXML) {
                callback(request.responseXML);
            } else if (contentType === "application/json") {
                callback(JSON.parse(request.responseText));
            } else {
                callback(request.responseText);
            }
        }
    };

    request.send(null);
}