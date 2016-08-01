// Получение и обработка текста с сервера

function getText(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var contentType = request.getResponseHeader("Content-Type");
            if (contentType.match(/^text/)) {
                callback(request.responseText);
            }
        }
    };
    request.send(null);
}