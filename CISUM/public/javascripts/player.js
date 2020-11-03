/**
 * @author 이의현, 김민석, 김헌준
 * @version 0.0.1
 * @since 2020-11-03
 */

let index = 0;

function titleChange(number) {
    var trSelect = document.querySelector("#play_view_tr_" + number);
    if (trSelect != null) {
        trSelect.style.borderLeft = "5px solid dodgerblue";

        var title = trSelect.getAttribute("data-title");
        document.querySelector("div.player-title .title").innerText =
            "현재 동영상 : " + title;
    }
}

function nextVideo() {
    document.querySelector("#play_view_tr_" + index).style.border = "";
    index = index + 1;
    let selectFrame = document.getElementById("frame_" + index);

    if (selectFrame === null) {
        index = 0;
        selectFrame = document.getElementById("frame_" + index);
    }
    var videoId = selectFrame.getAttribute("data-id");

    setTimeout(function () {
        __player.loadVideoById(videoId, 0, "large");
        titleChange(index);
    }, 1000);
}

function onYouTubeIframeAPIReady() {
    let frame = document.querySelector("#frame_" + index);
    if (frame !== null) {
        createYouTubePlayer(frame.getAttribute("data-id"));
        titleChange(0);
    }
}

const playVideo = (videoId, newIndex) => {
    document.querySelector("#play_view_tr_" + index).style.borderLeft = "";
    __player.loadVideoById(videoId, 0, "large");

    index = newIndex;
    titleChange(index);
};

const createYouTubePlayer = (videoId) => {
    __player = new YT.Player("player", {
        height: "300%",
        width: "100%",
        videoId,

        playerVars: {
            version: 3,
            showinfo: 0,
            rel: 0,
            loop: 1,
            autoplay: "true",
            wmode: "opaque",
            autohide: 1,
            controls: 1,
            disablekb: 1,
            enablejsapi: 1,
            modestbranding: 1,
        },
        rel: 0,

        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
};

function onPlayerStateChange(event) {
    if (event.data === 0) {
        nextVideo();
    }
}

function onPlayerReady(event) {
    event.target.playVideo();
    document.getElementById("sleep_btn").setAttribute("class", "fas fa-pause");
    var volume = __player.getVolume();
    if (volume === 0) {
        document
            .querySelector("#sound_btn")
            .setAttribute("class", "fas fa-volume-mute");
    } else if (volume <= 30) {
        document
            .querySelector("#sound_btn")
            .setAttribute("class", "fas fa-volume-down");
    } else {
        document
            .querySelector("#sound_btn")
            .setAttribute("class", "fas fa-volume-up");
    }
    document.querySelector("#volume_slider").value = volume;
}

/**
 * @HACK 코드 정리가 필요한 이벤트 메서드 구간
 */
document.addEventListener("DOMContentLoaded", function () {
    const sleepButton = document.querySelector("#sleep_btn");

    sleepButton.addEventListener("click", function () {
        if (sleepButton.getAttribute("class") === "fas fa-play") {
            __player.unMute();
            sleepButton.setAttribute("class", "fas fa-pause");
            __player.playVideo();
        } else {
            sleepButton.setAttribute("class", "fas fa-play");
            __player.pauseVideo();
        }
    });

    const stopButton = document.querySelector("#stop_btn");

    stopButton.addEventListener("click", function () {
        sleepButton.setAttribute("class", "fas fa-play");
        __player.stopVideo();
    });

    const prevButton = document.querySelector("#prev_btn");

    prevButton.addEventListener("click", function () {
        document.querySelector("#play_view_tr_" + index).style.border = "";

        if (index <= 0) {
            let frameSize = document.querySelectorAll(".youtubeFrame").length;
            index = frameSize - 1;
        } else {
            index = index - 1;
        }

        let selectFrame = document.querySelector("#frame_" + index);

        if (selectFrame === null) {
            /**
             * index = 0 을 줌으로써
             * #frame_0 Element를 선택
             */
            index = 0;
            selectFrame = document.querySelector("#frame_" + index);
        }

        var videoId = selectFrame.getAttribute("data-id");
        __player.loadVideoById(videoId, 0, "large");
        titleChange(index);
    });

    const nextButton = document.querySelector("#next_btn");

    nextButton.addEventListener("click", function () {
        nextVideo();
    });

    const soundButton = document.querySelector("#sound_btn");

    soundButton.addEventListener("click", function () {
        var volume = __player.getVolume();

        if (
            soundButton.getAttribute("class") === "fas fa-volume-down" ||
            soundButton.getAttribute("class") === "fas fa-volume-up"
        ) {
            __player.mute();
            soundButton.setAttribute("class", "fas fa-volume-mute");
            volumeSlider.value = 0;
        } else if (volume <= 30) {
            __player.unMute();
            soundButton.setAttribute("class", "fas fa-volume-down");
            volumeSlider.value = volume;
        } else {
            __player.unMute();
            soundButton.setAttribute("class", "fas fa-volume-up");
            volumeSlider.value = volume;
        }
    });

    const volumeSlider = document.querySelector("#volume_slider");

    volumeSlider.addEventListener("input", function () {
        var volume = volumeSlider.value;
        __player.setVolume(volume);

        if (volume === 0) {
            soundButton.setAttribute("class", "fas fa-volume-mute");
        } else if (volume <= 30) {
            soundButton.setAttribute("class", "fas fa-volume-down");
        } else {
            soundButton.setAttribute("class", "fas fa-volume-up");
        }
    });
});
