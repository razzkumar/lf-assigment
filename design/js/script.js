(function () {

    // Vieo paly section
    let videoPlay = document.querySelector("#playBtn");
    let video = document.querySelector("#video");
    let timeline = document.querySelector(".timeline");

    videoPlay.addEventListener("click", () => {
        if (video.paused) {
            videoPlay.src = "img/icon/pause.png";
            video.play();
        } else {
            videoPlay.src = "img/icon/play.png";
            video.pause();
        }
    });

    video.addEventListener("timeupdate", () => {
        let timePos = video.currentTime / video.duration;
        timeline.style.width = timePos * 100 + "%";
        if (video.ended) {
            videoPlay.src = "img/icon/play.png";
        }
    });



    // Back to top btn

    let scrollTopBtn = document.querySelector("#scrollTopBtn");

    window.addEventListener("scroll", () => {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    // When the user clicks on the button, scroll to the top of the document
    scrollTopBtn.addEventListener("click", () => {
        let interval = setInterval(() => {
            let top = document.body.scrollTop || document.documentElement.scrollTop;
            if (top > 10) {
                top = top / 1.1 - 1;
                document.body.scrollTop = top;
                document.documentElement.scrollTop = top;
            } else {
                clearInterval(interval);
            }
        }, 10)

    });

})()