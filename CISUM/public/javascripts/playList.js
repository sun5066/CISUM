var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var __player;
var index = 0;

function videoBorder() {
    document.querySelector("#play_view_tr_" + index).style.borderLeft =
        "5px solid dodgerblue";
}

function nextVideo() {
    document.querySelector("#play_view_tr_" + index).style.border = "none";

    index = index + 1;
    let selectFrame = document.getElementById("frame_" + index);
    if (selectFrame === null) {
        index = 0;
        selectFrame = document.getElementById("frame_" + index);
    }

    var videoId = selectFrame.getAttribute("data-id");

    setTimeout(function () {
        __player.loadVideoById(videoId, 0, "large");
        document.querySelector("#play_view_tr_" + index).style.borderLeft =
            "5px solid dodgerblue";
    }, 1000);
}

function onYouTubeIframeAPIReady() {
    let frame = document.querySelector("#frame_" + index);
    if (frame !== null) {
        firstPlayVideo(frame.getAttribute("data-id"));
    }
}

function playVideo(id, newIndex) {
    document.querySelector("#play_view_tr_" + index).style.borderLeft = "none";

    __player.loadVideoById(id, 0, "large");

    index = newIndex;
    document.querySelector("#play_view_tr_" + index).style.borderLeft =
        "5px solid dodgerblue";
}

function firstPlayVideo(id) {
    __player = new YT.Player("player", {
        height: "300%",
        width: "100%",
        videoId: id,

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

    document.querySelector("#play_view_tr_0").style.borderLeft =
        "5px solid dodgerblue";
}

function onPlayerStateChange(event) {
    if (event.data === 0) {
        nextVideo();
    }
}

function onPlayerReady(event) {
    event.target.playVideo();

    var volume = __player.getVolume();
    if (volume === 0) {
        document.querySelector(".sound_btn").innerHTML = "🔈";
    } else {
        document.querySelector(".sound_btn").innerHTML = "🔊";
    }
    document.querySelector(".volume_slider").value = volume;
}

/**
 * @HACK 코드 정리가 필요한 이벤트 메서드 구간
 */
document.addEventListener("DOMContentLoaded", function () {
    let sleepButton = document.querySelector(".sleep_btn");
    let stopButton = document.querySelector(".stop_btn");
    let prevButton = document.querySelector(".prev_btn");
    let nextButton = document.querySelector(".next_btn");
    let soundButton = document.querySelector(".sound_btn");
    let volumeSlider = document.querySelector(".volume_slider");

    sleepButton.addEventListener("click", function () {
        var itemText = sleepButton.innerHTML;
        if (itemText === "▶") {
            sleepButton.innerHTML = "∥";
            __player.playVideo();
        } else {
            sleepButton.innerHTML = "▶";
            __player.pauseVideo();
        }
    });

    stopButton.addEventListener("click", function () {
        sleepButton.innerHTML = "▶";
        __player.stopVideo();
    });

    prevButton.addEventListener("click", function () {
        document.querySelector("#play_view_tr_" + index).style.border = "none";
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

        document.querySelector("#play_view_tr_" + index).style.borderLeft =
            "5px solid dodgerblue";
    });

    nextButton.addEventListener("click", function () {
        nextVideo();
    });

    soundButton.addEventListener("click", function () {
        if (soundButton.innerHTML === "🔊") {
            __player.mute();

            soundButton.innerHTML = "🔈";
            volumeSlider.value = 0;
        } else {
            __player.unMute();

            var volume = __player.getVolume();
            soundButton.innerHTML = "🔊";
            volumeSlider.value = volume;
        }
    });

    volumeSlider.addEventListener("input", function () {
        var volume = volumeSlider.value;
        __player.setVolume(volume);

        if (volume === 0) {
            soundButton.innerHTML = "🔈";
        } else {
            soundButton.innerHTML = "🔊";
        }
    });
});
