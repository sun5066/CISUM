$(function () {
    $("#email-text").text(userJSON.email);

    $("#user-span").click(function () {
        $("div#login-modal").css("display", "none");
    });
    $("#signOut").click(function () {
        signOut();
        $("div#login-modal").css("display", "none");
        document.location.href = "/";
    });
});
