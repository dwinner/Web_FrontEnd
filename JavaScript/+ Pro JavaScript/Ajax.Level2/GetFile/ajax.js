var dataBox;
var button;

window.addEventListener('load', function() {
    dataBox = document.getElementById('dataBox');
    button = document.getElementById('button');
    button.addEventListener('click', function() {
        var url = 'textfile.txt';
        var request = new XMLHttpRequest();
        request.addEventListener('load', function(e) {
            dataBox.innerHTML = e.target.responseText;
        }, false);
        request.open('GET', url, true);
        request.send(null);
    }, false);
}, false);