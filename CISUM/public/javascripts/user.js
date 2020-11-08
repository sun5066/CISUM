$(function () {
    $("#email-text").text(userJSON.email);

    var userImg = $("#profile-img").attr("src");
    if (userJSON.photoURL !== null) {
        $("#profile-img").attr("src", userJSON.photoURL);
    }

    if (userJSON.displayName !== null) {
        $("#displayname-text").text(userJSON.displayName);
    } else {
        $("#displayname-text").text("닉네임이 없습니다.");
    }

    $("#user-span").click(function () {
        $("div#login-modal").css("display", "none");
    });

    $("#signOut").click(function () {
        signOut();
        $("div#login-modal").css("display", "none");
        document.location.href = "/";
    });
});
