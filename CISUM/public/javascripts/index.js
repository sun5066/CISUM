$(function () {
    $("div#login-modal").css("display", "none");
    $("#login_a").click(function () {
        $.ajax({
            url: "/cisum/login",
            type: "GET",
            success: function (result) {
                $("div#login-modal").html(result);
                $("div#login-modal").css("display", "block");
            },
            error: function (error) {
                alert("서버 통신 오류 :(");
            },
        });
    });
});
