var mmedia;
var maxim;
var bar;
var play;
var progress;
var loop;

function initiate() {
    maxim = 600;
    mmedia = document.getElementById('media');
    bar = document.getElementById('bar');
    play = document.getElementById('play');
    progress = document.getElementById('progress');

    play.addEventListener('click', push, false);
    bar.addEventListener('click', move, false);
}

function push() { // запуск / приостановка воспроизведения    
    if (!mmedia.paused && !mmedia.ended) {
        mmedia.pause();
        window.clearInterval(loop);
    } else {
        mmedia.play();
        play.innerHTML = 'Pause';
        loop = setInterval(status, 1000);
    }
}

function status() { // статус воспроизведения видео
    if (!mmedia.ended) {
        var size = parseInt(mmedia.currentTime * maxim / mmedia.duration);
        progress.style.width = size + 'px';
    } else {
        progress.style.width = '0px';
        play.innerHTML = 'Play';
        window.clearInterval(loop);
    }
}

function move(e) {  // Воспроизведение с позиции, заданной пользователем
    if (mmedia.paused || mmedia.ended)
        return;
    var mouseX = e.pageX - bar.offsetLeft;
    var newTime = mouseX * mmedia.duration / maxim;
    mmedia.currentTime = newTime;
    progress.style.width = mouseX + 'px';
}

window.addEventListener('load', initiate, false);