const songDuration = 72; 

function startSite() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('video-background').style.display = 'block';
    document.querySelector('.content').style.display = 'block';
    document.querySelector('.progress-container').style.display = 'block';
    var iframe = document.getElementById('video');
    var player = new YT.Player(iframe, {
        events: {
            'onReady': function(event) {
                event.target.playVideo();
                updateProgressBar(player);
            }
        }
    });
}

function updateProgressBar(player) {
    var progressElement = document.getElementById('progress');
    var interval = setInterval(function() {
        var currentTime = player.getCurrentTime();
        var progressPercentage = (currentTime / songDuration) * 100;
        progressElement.style.width = progressPercentage + '%';
        progressElement.setAttribute('data-time', formatTime(currentTime));
        if (currentTime >= songDuration) {
            clearInterval(interval);
        }
    }, 1000);
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}


var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


document.addEventListener('mousemove', (e) => {
    const elements = document.querySelectorAll('.content, .progress-container, #profile-pic, #by-sero, #centered-text');
    elements.forEach(el => {
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;
        el.style.transform = `translate(-50%, -50%) rotateY(${x}deg) rotateX(${y}deg)`;
    });
});
