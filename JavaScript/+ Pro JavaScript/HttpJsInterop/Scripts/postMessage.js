// Простая отправка сообщения на сервер методом POST

function postMessage(msg) {
    var request = new XMLHttpRequest();
    request.open("POST", "PostIncomingHandler.ashx");
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.send(msg);
}