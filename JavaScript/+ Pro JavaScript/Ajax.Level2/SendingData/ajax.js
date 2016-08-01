var databox;

function initiate() {
    databox = document.getElementById('dataBox');
    var button = document.getElementById('button');
    button.addEventListener('click', send, false);
}

function send() {
    var data = new FormData();
    data.append('name', 'John');
    data.append('lastname', 'Doe');
    var url = 'ProcessRequestHandler.ashx';
    var request = new XMLHttpRequest();
    request.addEventListener('load', show, false);
    request.open('POST', url, true);
    request.send(data);
}

function show(e) {
    databox.innerHTML = e.target.responseText;
}

window.addEventListener('load', initiate, false);