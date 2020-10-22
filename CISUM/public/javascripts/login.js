$(function () {
    $("#login").click(function () {
        $.ajax({
            url: "/cisum/login",
            type: "GET",
            success: function (result) {
                $("div#login-modal").html(result);
            },
            error: function (error) {
                alert("서버 통신 오류 :(");
            }
        });
    });
});