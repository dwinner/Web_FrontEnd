var databox;

function initiate() {
    databox = document.getElementById('dataBox');

    databox.addEventListener('dragenter', function(e) {
        e.preventDefault();
    }, false);

    databox.addEventListener('dragover', function(e) {
        e.preventDefault();
    }, false);

    databox.addEventListener('drop', dropped, false);
}

function dropped(e) {
    e.preventDefault();
    var files = e.dataTransfer.files;

    if (files.length) {
        var list = '';
        for (var fileIndex = 0; fileIndex < files.length; fileIndex++) {
            var file = files[fileIndex];
            list += '<blockquote>File: ' + file.name;
            list += '<br /><span><progress value="0" max="100">0%</progress></span>';
            list += '</blockquote>';
        }

        databox.innerHTML = list;
        var count = 0;

        var upload = function() {
            var currentFile = files[count];
            var data = new FormData();
            data.append('file', currentFile);
            var url = 'ProcessFilesUploadingHandler.ashx';
            var request = new XMLHttpRequest();
            var xmlupload = request.upload;

            xmlupload.addEventListener('progress', function(e) {
                if (e.lengthComputable) {
                    var child = count + 1;
                    var per = parseInt(e.loaded / e.total * 100);
                    var progressbar = databox.querySelector('blockquote:nth-child(' + child + ') > span > progress');
                    progressbar.value = per;
                    progressbar.innerHTML = per + '%';
                }
            }, false);

            xmlupload.addEventListener('load', function() {
                var child = count + 1;
                var elem = databox.querySelector('blockquote:nth-child(' + child + ') > span');
                elem.innerHTML = 'Ready!';
                count++;
                if (count < files.length) {
                    upload();
                }
            }, false);

            request.open('POST', url, true);
            request.send(data);
        };

        upload();
    }
}