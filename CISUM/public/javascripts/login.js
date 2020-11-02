/**
 * @author 이의현, 김민석, 김헌준
 * @version 0.0.1
 * @since 2020-11-03
 */

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