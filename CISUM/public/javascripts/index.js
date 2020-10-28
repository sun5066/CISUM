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
            alert("앙 기모띠!");
        }
    });
});
