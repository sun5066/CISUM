function emailCheck(email) {
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return email != "" && email != "undefined" && regex.test(email);
}

$(document).ready(function () {
    const email = $("#email");
    const password = $("#password");
    const re_password = $("#re-password");
    const status = $("#join-status-text");

    $("#join-span").click(function () {
        $("form#join-form").css("display", "none");
        $("div#login-modal").css("display", "none");
    });

    $(email).on("propertychange change keyup paste input", function () {
        if (!emailCheck(email.val())) {
            status.text("이메일 형식으로 입력해주세요.");
        } else {
            status.text("");
        }
    });

    $(re_password).on("propertychange change keyup paste input", function () {
        if (re_password.val() !== password.val()) {
            status.text("비밀번호가 맞지 않습니다.");
        } else {
            status.text("");
        }
    });

    // 공백이면 넘어가지 못하게 하는 유효성 체크
    $("#email-check").click(function () {
        if (email.val() == "") {
            status.text("이메일을 입력해주세요 :)");
            email.focus();
            return false;
        }
    });

    // 회원가입 버튼 클릭했을때의 유효성 체크
    $(document).on("click", "#btn-join", function () {
        if (email.val() == "") {
            status.text("이메일을 입력해주세요 :)");
            email.focus();
            return;
        } else if (password.val() == "") {
            status.text("비밀번호를 입력해주세요.");
            password.focus();
            return;
        } else if (re_password.val() === "") {
            status.text("비밀번호 확인을 입력해주세요.");
            re_password.focus();
            return;
        }

        if (!emailCheck(email.val())) {
            status.text("이메일 형식으로 입력해주세요.");
            return;
        }

        if (re_password.val() !== password.val()) {
            status.text("비밀번호가 맞지 않습니다.");
            return;
        }

        $.ajax({
            url: "/cisum/login",
            type: "GET",
            success: function (result) {
                register(email.val(), password.val());
            },
            error: function (error) {
                status.text("서버 통신 오류 :(");
            },
        });
    });

    $("#login-back").click(function () {
        $.ajax({
            url: "/cisum/login",
            type: "GET",
            success: function (result) {
                $("div#login-modal").html(result);
            },
            error: function (error) {
                status.text("서버 통신 오류 :(");
            },
        });
    });
});
