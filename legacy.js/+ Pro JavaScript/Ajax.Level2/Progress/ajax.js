var databox;

function initiate() {
    databox = document.getElementById('dataBox');
    var button = document.getElementById('button');
    button.addEventListener('click', read, false);
}

function read() {
    var url = 'http://www.minkbooks.com/content/trailer.ogg';
    var request = new XMLHttpRequest();
    request.addEventListener('loadstart', start, false);
    request.addEventListener('progress', status, false);
    request.addEventListener('load', show, false);
    request.open('GET', url, true);
    request.send(null);
}

function start() {
    databox.innerHTML = '<progress value="0" max="100">0%</progress>';
}

function status(e) {
    if (e.lengthComputable) {
        var per = parseInt(e.loaded / e.total * 100);
        var progressBar = databox.querySelector('progress');
        progressBar.value = per;
        progressBar.innerHTML = per + '%';
    }
}

function show() {
    databox.innerHTML = 'Ready';
}

window.addEventListener('load', initiate, false);
