function emailCheck(email) {
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return email != "" && email != "undefined" && regex.test(email);
}

$(function () {
    const email = $("#userid");
    const password = $("#password");
    const status = $("#login-status-text");

    $("#login-span").click(function () {
        $("div#login-modal").css("display", "none");
    });

    $(email).on("propertychange change keyup paste input", function () {
        if (!emailCheck(email.val())) {
            status.text("이메일 형식으로 입력해주세요.");
        } else {
            status.text("");
        }
    });

    $("#register").click(function () {
        $.ajax({
            url: "/cisum/join",
            type: "GET",
            success: function (result) {
                $("div#login-modal").html(result);
            },
            error: function (error) {
                alert("서버 통신 오류 :(");
            },
        });
    });

    $("#login-btn").click(function () {
        // 로그인 공백일때의 유효성 체크
        if (email.val() == "") {
            status.text("이메일을 입력해주세요 :)");
            email.focus();
            return false;
        } else if (password.val() == "") {
            status.text("비밀번호를 입력해주세요 :)");
            password.focus();
            return false;
        }

        login(email.val(), password.val());
        // 유저정보 Get
        getUser();
    });
});
