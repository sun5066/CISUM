/**
 * @author 이의현, 김민석, 김헌준
 * @version 0.0.1
 * @since 2020-11-03
 */

$(function () {
    getUser();
    $("div#login-modal").css("display", "none");
    $("#login_a").click(function () {
        var fas = $(this).attr("class");

        if (fas === "fas fa-toggle-off") {
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
        } else {
            // logOut();
            // document.location.href = "/";
            $.ajax({
                url: "/cisum/user",
                type: "GET",

                success: function (result) {
                    $("div#login-modal").html(result);
                    $("div#login-modal").css("display", "block");
                },
                error: function (error) {
                    alert("서버 통신 오류 :(");
                },
            });
        }
    });
    // 검색 리스트 열리는 js
    $("div#search-icon i.fas.fa-search").click(function (e) {
        $(".left-aside").toggleClass("open");
    });
});
