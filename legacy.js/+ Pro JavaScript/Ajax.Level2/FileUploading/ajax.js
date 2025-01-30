var databox;

function initiate() {
    databox = document.getElementById('dataBox');
    var myfiles = document.getElementById('myfiles');
    myfiles.addEventListener('change', upload, false);
}

function upload(e) {
    var files = e.target.files;
    var file = files[0];
    var data = new FormData();
    data.append('file', file);
    var url = '/FileUploading/ProcessFileUploadHandler.ashx';
    var request = new XMLHttpRequest();
    var xmlUpload = request.upload;
    xmlUpload.addEventListener('loadstart', start, false);
    xmlUpload.addEventListener('progress', status, false);
    xmlUpload.addEventListener('load', show, false);
    request.open('POST', url, true);
    request.send(data);
}

function start() {
    databox.innerHTML = '<progress value="0" max="100">0%</progress>';
}

function status(e) {
    if (e.lengthComputable) {
        var per = parseInt(e.loaded / e.total * 100);
        var progressbar = databox.querySelector('progress');
        progressbar.value = per;
        progressbar.innerHTML = per + '%';
    }
}

function show(e) {
    databox.innerHTML = e.target.responseText;
}

window.addEventListener('load', initiate, false);